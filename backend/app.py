import os
import json
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from database import init_db, get_db, seed_demo_data
from ocr_engine import process_screenshot, parse_task_from_text, SAMPLE_SCREENSHOT_SCENARIOS
from scheduler import analyze_overload_and_schedule, get_what_now_recommendation

app = Flask(__name__, static_folder="../static", static_url_path="")
CORS(app)

# Ensure DB initialized
init_db()

UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), "uploads")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# -------------------------------------------------------------
# Static Routes
# -------------------------------------------------------------
@app.route("/")
def index():
    return send_from_directory(app.static_folder, "index.html")

@app.route("/static/<path:filename>")
def serve_static_alias(filename):
    return send_from_directory(app.static_folder, filename)

@app.route("/css/<path:filename>")
def serve_css(filename):
    return send_from_directory(os.path.join(app.static_folder, "css"), filename)

@app.route("/js/<path:filename>")
def serve_js(filename):
    return send_from_directory(os.path.join(app.static_folder, "js"), filename)

@app.route("/standalone")
def standalone():
    root_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    return send_from_directory(root_dir, "index.html")

# -------------------------------------------------------------
# User & Onboarding APIs
# -------------------------------------------------------------
@app.route("/api/user", methods=["GET"])
def get_user():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users ORDER BY id DESC LIMIT 1")
    user = cursor.fetchone()
    conn.close()
    if user:
        return jsonify(dict(user))
    return jsonify({
        "name": "Cherry",
        "student_type": "Project-heavy",
        "high_energy_time": "Afternoon (2 PM – 5 PM)",
        "focus_session": 50,
        "sleep_time": "23:30",
        "soundscape": "Kyoto Cedar Rain",
        "theme": "dark",
        "device_view": "desktop",
        "onboarded": 1
    })

@app.route("/api/user", methods=["POST"])
def update_user():
    data = request.json or {}
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("""
        UPDATE users SET
            name = COALESCE(?, name),
            student_type = COALESCE(?, student_type),
            high_energy_time = COALESCE(?, high_energy_time),
            focus_session = COALESCE(?, focus_session),
            sleep_time = COALESCE(?, sleep_time),
            soundscape = COALESCE(?, soundscape),
            theme = COALESCE(?, theme),
            device_view = COALESCE(?, device_view),
            onboarded = COALESCE(?, onboarded)
        WHERE id = (SELECT MAX(id) FROM users)
    """, (
        data.get("name"),
        data.get("student_type"),
        data.get("high_energy_time"),
        data.get("focus_session"),
        data.get("sleep_time"),
        data.get("soundscape"),
        data.get("theme"),
        data.get("device_view"),
        data.get("onboarded")
    ))
    conn.commit()
    cursor.execute("SELECT * FROM users ORDER BY id DESC LIMIT 1")
    updated = dict(cursor.fetchone())
    conn.close()
    return jsonify({"success": True, "user": updated})

# -------------------------------------------------------------
# Tasks & Inbox APIs
# -------------------------------------------------------------
@app.route("/api/tasks", methods=["GET"])
def get_tasks():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM tasks ORDER BY CASE status WHEN 'in_progress' THEN 0 WHEN 'pending' THEN 1 ELSE 2 END, id DESC")
    tasks = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return jsonify(tasks)

@app.route("/api/tasks", methods=["POST"])
def create_task():
    data = request.json or {}
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO tasks (
            title, description, course_tag, category, deadline, exact_time,
            time_accuracy, priority, estimated_duration, status, progress_pct,
            is_flexible, source, why_matters
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        data.get("title", "New Task"),
        data.get("description", "Added via Fenestra Workspace"),
        data.get("course_tag", f"{data.get('category', 'ACADEMIC').upper()} · SPRINT"),
        data.get("category", "Academic"),
        data.get("deadline", "Tomorrow"),
        data.get("exact_time", "5:00 PM"),
        data.get("time_accuracy", "exact"),
        data.get("priority", "Medium"),
        int(data.get("estimated_duration", 45)),
        data.get("status", "pending"),
        int(data.get("progress_pct", 0)),
        1 if data.get("is_flexible", True) else 0,
        data.get("source", "Manual Input"),
        data.get("why_matters", "Fits cleanly into your next deep focus window")
    ))
    task_id = cursor.lastrowid
    conn.commit()
    conn.close()
    return jsonify({"success": True, "task_id": task_id})

@app.route("/api/tasks/<int:task_id>", methods=["PUT"])
def update_task(task_id):
    data = request.json or {}
    conn = get_db()
    cursor = conn.cursor()
    fields = []
    values = []
    allowed = [
        "title", "description", "course_tag", "category", "deadline",
        "exact_time", "time_accuracy", "priority", "estimated_duration",
        "status", "progress_pct", "is_flexible", "source", "why_matters"
    ]
    for key in allowed:
        if key in data:
            fields.append(f"{key} = ?")
            values.append(data[key])

    if fields:
        values.append(task_id)
        cursor.execute(f"UPDATE tasks SET {', '.join(fields)} WHERE id = ?", values)
        conn.commit()

    conn.close()
    return jsonify({"success": True})

@app.route("/api/tasks/<int:task_id>", methods=["DELETE"])
def delete_task(task_id):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM tasks WHERE id = ?", (task_id,))
    conn.commit()
    conn.close()
    return jsonify({"success": True})

# -------------------------------------------------------------
# Smart Capture & OCR Processing APIs
# -------------------------------------------------------------
@app.route("/api/capture/upload", methods=["POST"])
def upload_screenshot():
    if "file" not in request.files:
        data = request.form or request.json or {}
        text = data.get("text", SAMPLE_SCREENSHOT_SCENARIOS["cn_whatsapp"]["raw_text"])
        parsed = parse_task_from_text(text, source_override="Screenshot OCR")
        return jsonify({
            "success": True,
            "raw_text": text,
            "extracted_task": parsed
        })

    file = request.files["file"]
    safe_name = file.filename or "capture.png"
    file_path = os.path.join(UPLOAD_FOLDER, safe_name)
    file.save(file_path)

    result = process_screenshot(file_path)
    return jsonify(result)

@app.route("/api/capture/text", methods=["POST"])
def capture_text():
    data = request.json or {}
    raw_text = data.get("text", "")
    source = data.get("source", "Pasted Text / Message")
    parsed = parse_task_from_text(raw_text, source_override=source)
    return jsonify({
        "success": True,
        "raw_text": raw_text,
        "extracted_task": parsed
    })

@app.route("/api/capture/sample/<preset>", methods=["POST"])
def capture_sample(preset):
    scenario = SAMPLE_SCREENSHOT_SCENARIOS.get(preset, SAMPLE_SCREENSHOT_SCENARIOS["cn_whatsapp"])
    parsed = parse_task_from_text(scenario["raw_text"], source_override=scenario["source_label"])
    return jsonify({
        "success": True,
        "raw_text": scenario["raw_text"],
        "source_label": scenario["source_label"],
        "extracted_task": parsed
    })

# -------------------------------------------------------------
# Scheduling, Energy & Dynamic Replanning APIs
# -------------------------------------------------------------
@app.route("/api/schedule", methods=["GET"])
def get_schedule():
    skip_index = int(request.args.get("skip_index", 0))
    conn = get_db()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM tasks")
    tasks = [dict(row) for row in cursor.fetchall()]

    cursor.execute("SELECT * FROM routines")
    routines = [dict(row) for row in cursor.fetchall()]

    cursor.execute("SELECT level, label FROM energy_state ORDER BY id DESC LIMIT 1")
    energy_row = cursor.fetchone()
    energy_level = energy_row["level"] if energy_row else 3
    energy_label = energy_row["label"] if energy_row else "Good"

    conn.close()

    result = analyze_overload_and_schedule(tasks, routines, energy_level, skip_index=skip_index)
    result["energy_level"] = energy_level
    result["energy_label"] = energy_label
    return jsonify(result)

@app.route("/api/energy", methods=["POST"])
def update_energy():
    data = request.json or {}
    level = int(data.get("level", 3))
    label_map = {
        1: "😴 Dead / Exhausted",
        2: "Low Energy · Gentle Tempo",
        3: "Balanced · Steady Flow",
        4: "High Energy · Deep Work",
        5: "⚡ Peak Focus Window"
    }
    label = label_map.get(level, "Balanced")

    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO energy_state (level, label) VALUES (?, ?)", (level, label))
    conn.commit()
    conn.close()

    return get_schedule()

@app.route("/api/take-care-of-my-day", methods=["POST"])
def take_care_of_my_day():
    conn = get_db()
    cursor = conn.cursor()

    # Move flexible non-urgent tasks to Tomorrow/Weekend so today is no longer overloaded
    cursor.execute("""
        UPDATE tasks
        SET deadline = CASE
            WHEN title LIKE '%Math%' THEN 'Tomorrow · 6:00 PM'
            WHEN title LIKE '%Java%' THEN 'Weekend Block'
            ELSE 'Friday · 4:30 PM'
        END
        WHERE is_flexible = 1 AND status != 'completed'
    """)
    conn.commit()

    cursor.execute("SELECT * FROM tasks")
    tasks = [dict(row) for row in cursor.fetchall()]

    cursor.execute("SELECT * FROM routines")
    routines = [dict(row) for row in cursor.fetchall()]

    cursor.execute("SELECT level FROM energy_state ORDER BY id DESC LIMIT 1")
    energy_row = cursor.fetchone()
    energy_level = energy_row[0] if energy_row else 3

    conn.close()

    schedule_res = analyze_overload_and_schedule(tasks, routines, energy_level)

    return jsonify({
        "success": True,
        "message": "Your day is handled. FENESTRA prioritized your urgent deadlines, shifted flexible heavy work, inserted a 45m Stillness & Tea buffer, and locked your 11:30 PM sleep boundary.",
        "schedule": schedule_res
    })

@app.route("/api/replan", methods=["POST"])
def dynamic_replan():
    data = request.json or {}
    trigger = data.get("trigger", "accept_overload_plan")
    conn = get_db()
    cursor = conn.cursor()

    msg = "Schedule dynamically adapted."
    if trigger == "exhausted":
        cursor.execute("INSERT INTO energy_state (level, label) VALUES (1, '😴 Dead / Exhausted')")
        msg = "Switched to Low-Energy Caretaker Mode: heavy tasks deferred to tomorrow, 40m recovery break added, and only light/urgent work kept today."
    elif trigger == "meeting_cancelled":
        cursor.execute("UPDATE events SET status = 'cancelled' WHERE title LIKE '%Sync%' OR title LIKE '%Meeting%'")
        msg = "Project Sync freed up 45 minutes! Moved Lab Record Submission into the newly opened 4:00 PM window so your evening finishes 45m earlier."
    elif trigger == "deadline_moved":
        cursor.execute("UPDATE tasks SET deadline = 'Friday', priority = 'Medium', is_flexible = 1 WHERE title LIKE '%DBMS%'")
        msg = "DBMS Assignment deadline updated to Friday. Promoted CN Lab Record & Prototype Sprint into today's primary focus slot."
    elif trigger == "accept_overload_plan":
        cursor.execute("""
            UPDATE tasks
            SET status = 'deferred', deadline = 'Tomorrow (Moved by Fenestra)'
            WHERE is_flexible = 1 AND status = 'pending' AND priority != 'High'
        """)
        msg = "Overload resolved! Kept urgent submissions today, moved flexible study blocks to tomorrow & weekend, and protected your dinner + 11:30 PM sleep."

    conn.commit()
    conn.close()

    sched_response = get_schedule().get_json()
    return jsonify({
        "success": True,
        "trigger": trigger,
        "message": msg,
        "schedule": sched_response
    })

# -------------------------------------------------------------
# Goals, Habits, Routines, Events, Opportunities APIs
# -------------------------------------------------------------
@app.route("/api/goals", methods=["GET", "POST"])
def handle_goals():
    conn = get_db()
    cursor = conn.cursor()
    if request.method == "POST":
        data = request.json or {}
        cursor.execute("""
            INSERT INTO goals (title, progress, target_date, category, today_action, action_duration, streak_days)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        """, (
            data.get("title", "New Goal"),
            int(data.get("progress", 15)),
            data.get("target_date", "2026-11-01"),
            data.get("category", "Skill"),
            data.get("today_action", "Focused 30m practice session"),
            int(data.get("action_duration", 30)),
            1
        ))
        conn.commit()
        conn.close()
        return jsonify({"success": True})

    cursor.execute("SELECT * FROM goals ORDER BY id ASC")
    goals = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return jsonify(goals)

@app.route("/api/goals/<int:goal_id>/schedule", methods=["POST"])
def schedule_goal_action(goal_id):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM goals WHERE id = ?", (goal_id,))
    goal = cursor.fetchone()
    if not goal:
        conn.close()
        return jsonify({"success": False}), 404

    goal_dict = dict(goal)
    cursor.execute("""
        INSERT INTO tasks (
            title, description, course_tag, category, deadline, exact_time,
            time_accuracy, priority, estimated_duration, status, progress_pct,
            is_flexible, source, why_matters
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        goal_dict["today_action"],
        f"Daily micro-step toward goal: {goal_dict['title']}",
        f"GOAL · {goal_dict['category'].upper()}",
        "Goals",
        "Today",
        "6:00 PM",
        "exact",
        "Medium",
        goal_dict["action_duration"],
        "pending",
        0,
        1,
        "Goal Engine",
        f"Builds daily momentum on '{goal_dict['title']}'"
    ))
    cursor.execute("UPDATE goals SET progress = MIN(100, progress + 5) WHERE id = ?", (goal_id,))
    conn.commit()
    conn.close()
    return jsonify({"success": True, "message": f"Scheduled '{goal_dict['today_action']}' into today's flow!"})

@app.route("/api/habits", methods=["GET", "POST"])
def handle_habits():
    conn = get_db()
    cursor = conn.cursor()
    if request.method == "POST":
        data = request.json or {}
        cursor.execute("""
            INSERT INTO habits (title, streak, category, completed_today, preferred_window)
            VALUES (?, ?, ?, ?, ?)
        """, (
            data.get("title", "New Habit"),
            int(data.get("streak", 1)),
            data.get("category", "Routine"),
            1 if data.get("completed_today", False) else 0,
            data.get("preferred_window", "Evening")
        ))
        conn.commit()
        conn.close()
        return jsonify({"success": True})

    cursor.execute("SELECT * FROM habits ORDER BY id ASC")
    habits = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return jsonify(habits)

@app.route("/api/habits/<int:habit_id>/toggle", methods=["POST"])
def toggle_habit(habit_id):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT completed_today, streak FROM habits WHERE id = ?", (habit_id,))
    row = cursor.fetchone()
    if row:
        new_completed = 0 if row["completed_today"] else 1
        new_streak = row["streak"] + 1 if new_completed else max(0, row["streak"] - 1)
        cursor.execute("UPDATE habits SET completed_today = ?, streak = ? WHERE id = ?", (new_completed, new_streak, habit_id))
        conn.commit()
    conn.close()
    return jsonify({"success": True})

@app.route("/api/routines", methods=["GET", "POST"])
def handle_routines():
    conn = get_db()
    cursor = conn.cursor()
    if request.method == "POST":
        data = request.json or {}
        cursor.execute("""
            INSERT INTO routines (title, start_time, end_time, days, type)
            VALUES (?, ?, ?, ?, ?)
        """, (
            data.get("title", "Custom Routine"),
            data.get("start_time", "18:00"),
            data.get("end_time", "19:00"),
            data.get("days", "Everyday"),
            data.get("type", "Fixed")
        ))
        conn.commit()
        conn.close()
        return jsonify({"success": True})

    cursor.execute("SELECT * FROM routines")
    routines = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return jsonify(routines)

@app.route("/api/events", methods=["GET", "POST"])
def handle_events():
    conn = get_db()
    cursor = conn.cursor()
    if request.method == "POST":
        data = request.json or {}
        cursor.execute("""
            INSERT INTO events (title, category, start_time, end_time, date, location, status)
            VALUES (?, ?, ?, ?, ?, ?, 'scheduled')
        """, (
            data.get("title", "New Campus Event"),
            data.get("category", "Personal"),
            data.get("start_time", "4:00 PM"),
            data.get("end_time", "5:00 PM"),
            data.get("date", "Today"),
            data.get("location", "Campus Hub")
        ))
        conn.commit()
        conn.close()
        return jsonify({"success": True})

    cursor.execute("SELECT * FROM events ORDER BY id ASC")
    events = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return jsonify(events)

@app.route("/api/opportunities", methods=["GET", "POST"])
def handle_opportunities():
    conn = get_db()
    cursor = conn.cursor()
    if request.method == "POST":
        data = request.json or {}
        cursor.execute("""
            INSERT INTO opportunities (title, org, type, deadline, prep_duration, match_reason, status)
            VALUES (?, ?, ?, ?, ?, ?, 'saved')
        """, (
            data.get("title", "New Opportunity"),
            data.get("org", "Campus Collective"),
            data.get("type", "Workshop"),
            data.get("deadline", "This Weekend"),
            int(data.get("prep_duration", 45)),
            data.get("match_reason", "Matches your student profile")
        ))
        conn.commit()
        conn.close()
        return jsonify({"success": True})

    cursor.execute("SELECT * FROM opportunities ORDER BY id ASC")
    opps = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return jsonify(opps)

@app.route("/api/opportunities/<int:opp_id>", methods=["PUT"])
def update_opportunity(opp_id):
    data = request.json or {}
    action = data.get("action", "saved") # 'saved', 'scheduled', 'ignored'
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("UPDATE opportunities SET status = ? WHERE id = ?", (action, opp_id))

    if action == "scheduled":
        cursor.execute("SELECT * FROM opportunities WHERE id = ?", (opp_id,))
        opp = cursor.fetchone()
        if opp:
            opp_d = dict(opp)
            cursor.execute("""
                INSERT INTO tasks (
                    title, description, course_tag, category, deadline, exact_time,
                    time_accuracy, priority, estimated_duration, status, progress_pct,
                    is_flexible, source, why_matters
                ) VALUES (?, ?, ?, 'Opportunities', ?, '6:00 PM', 'exact', 'Medium', ?, 'pending', 0, 1, 'Opportunity Hub', ?)
            """, (
                f"Prep: {opp_d['title']}",
                f"Preparation block for {opp_d['org']} ({opp_d['type']})",
                f"OPPORTUNITY · {opp_d['type'].upper()}",
                opp_d["deadline"],
                opp_d["prep_duration"],
                opp_d["match_reason"]
            ))
    conn.commit()
    conn.close()
    return jsonify({"success": True})

# -------------------------------------------------------------
# Demo Reset API
# -------------------------------------------------------------
@app.route("/api/demo/reset", methods=["POST"])
def reset_demo():
    seed_demo_data()
    return jsonify({"success": True, "message": "Demo dataset restored to default state!"})

if __name__ == "__main__":
    print("FENESTRA server running on http://127.0.0.1:5000")
    app.run(host="127.0.0.1", port=5000, debug=False)
