import sqlite3
import os
import json

DB_PATH = os.path.join(os.path.dirname(__file__), "fenestra.db")

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    cursor = conn.cursor()

    # Drop and recreate if schema upgraded (check for opportunities table)
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='opportunities'")
    has_opp = cursor.fetchone()
    if not has_opp:
        for tbl in ["users", "tasks", "events", "goals", "habits", "routines", "energy_state", "opportunities"]:
            cursor.execute(f"DROP TABLE IF EXISTS {tbl}")

    # Users table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT DEFAULT 'Cherry',
            student_type TEXT DEFAULT 'Project-heavy',
            high_energy_time TEXT DEFAULT 'Afternoon (2 PM – 5 PM)',
            focus_session INTEGER DEFAULT 50,
            sleep_time TEXT DEFAULT '23:30',
            soundscape TEXT DEFAULT 'Kyoto Cedar Rain',
            theme TEXT DEFAULT 'dark',
            device_view TEXT DEFAULT 'desktop',
            onboarded BOOLEAN DEFAULT 1
        )
    """)

    # Tasks table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            course_tag TEXT DEFAULT 'CAMPUSFLOW · DEEP SPRINT',
            category TEXT DEFAULT 'Academic',
            deadline TEXT DEFAULT 'Tomorrow',
            exact_time TEXT DEFAULT '4:30 PM',
            time_accuracy TEXT DEFAULT 'exact',
            priority TEXT DEFAULT 'High',
            estimated_duration INTEGER DEFAULT 45,
            status TEXT DEFAULT 'pending',
            progress_pct INTEGER DEFAULT 0,
            is_flexible BOOLEAN DEFAULT 1,
            source TEXT DEFAULT 'Manual',
            why_matters TEXT DEFAULT 'Directly impacts tomorrow submission & protects evening rest',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)

    # Events table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS events (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            category TEXT DEFAULT 'Personal',
            start_time TEXT NOT NULL,
            end_time TEXT NOT NULL,
            date TEXT NOT NULL,
            location TEXT,
            status TEXT DEFAULT 'scheduled'
        )
    """)

    # Opportunities table (Student Life)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS opportunities (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            org TEXT DEFAULT 'IEEE / Campus Hub',
            type TEXT DEFAULT 'Fellowship',
            deadline TEXT NOT NULL,
            prep_duration INTEGER DEFAULT 60,
            match_reason TEXT,
            status TEXT DEFAULT 'saved'
        )
    """)

    # Goals table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS goals (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            progress INTEGER DEFAULT 0,
            target_date TEXT,
            category TEXT DEFAULT 'Skill',
            today_action TEXT,
            action_duration INTEGER DEFAULT 30,
            streak_days INTEGER DEFAULT 4
        )
    """)

    # Habits table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS habits (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            streak INTEGER DEFAULT 0,
            category TEXT DEFAULT 'Routine',
            completed_today BOOLEAN DEFAULT 0,
            preferred_window TEXT DEFAULT 'Evening'
        )
    """)

    # Routines table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS routines (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            start_time TEXT NOT NULL,
            end_time TEXT NOT NULL,
            days TEXT DEFAULT 'Mon,Tue,Wed,Thu,Fri',
            type TEXT DEFAULT 'Fixed'
        )
    """)

    # Energy State table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS energy_state (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            level INTEGER DEFAULT 3,
            label TEXT DEFAULT 'Good',
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)

    conn.commit()

    cursor.execute("SELECT COUNT(*) FROM users")
    if cursor.fetchone()[0] == 0:
        seed_demo_data(conn)

    conn.close()

def seed_demo_data(conn=None):
    close_at_end = False
    if conn is None:
        conn = get_db()
        close_at_end = True

    cursor = conn.cursor()

    for tbl in ["users", "tasks", "events", "opportunities", "goals", "habits", "routines", "energy_state"]:
        cursor.execute(f"DELETE FROM {tbl}")

    # Seed User (Cherry / Aanya S.)
    cursor.execute("""
        INSERT INTO users (name, student_type, high_energy_time, focus_session, sleep_time, soundscape, theme, device_view, onboarded)
        VALUES ('Cherry', 'Project-heavy', 'Afternoon (2 PM – 5 PM)', 50, '23:30', 'Kyoto Cedar Rain', 'dark', 'desktop', 1)
    """)

    # Seed Tasks
    tasks = [
        (
            "Complete project prototype",
            "Finalize the interactive onboarding cards and dark-mode transitions before tomorrow's studio critique.",
            "CAMPUSFLOW · DEEP SPRINT",
            "Academic",
            "Today",
            "5:00 PM",
            "exact",
            "High",
            50,
            "in_progress",
            65,
            0,
            "Stitch Studio",
            "Peak focus match · Unblocks 3 downstream design tasks · Protects evening rest"
        ),
        (
            "DBMS Assignment",
            "Complete ER diagram and 3NF normalization section for university portal submission.",
            "CS-302 · DATABASE SYSTEMS",
            "Academic",
            "Tomorrow",
            "5:00 PM",
            "exact",
            "High",
            90,
            "pending",
            20,
            0,
            "Screenshot OCR",
            "Hard deadline tomorrow at 5:00 PM · High internal weightage"
        ),
        (
            "Lab Record Submission (CN)",
            "Write observations and routing tables for Computer Networks Experiment 5.",
            "CS-304 · NETWORKS LAB",
            "Academic",
            "Tomorrow",
            "4:30 PM",
            "exact",
            "High",
            45,
            "pending",
            0,
            0,
            "WhatsApp Screenshot",
            "Due tomorrow before 4:30 PM · Quick 45m win"
        ),
        (
            "Math Revision",
            "Review multivariable calculus & linear transformations (Chapters 3 & 4).",
            "MA-201 · CORE REVISION",
            "Academic",
            "Friday",
            "7:00 PM",
            "approximate",
            "Medium",
            60,
            "pending",
            15,
            1,
            "Manual",
            "Flexible study block · Can move to tomorrow if overloaded"
        ),
        (
            "Java Project",
            "Implement JWT authentication middleware and SQLite repository pattern.",
            "CS-305 · OBJECT ORIENTED",
            "Academic",
            "Next Week",
            "11:59 PM",
            "date_only",
            "High",
            120,
            "pending",
            40,
            1,
            "GitHub Issue",
            "Long-horizon project · Best split into 45m sprints"
        ),
        (
            "Club Event Presentation",
            "Draft 5 visual slides for IEEE Student Branch & Design Collective orientation.",
            "STUDENT LIFE · CLUBS",
            "Events",
            "Saturday",
            "3:00 PM",
            "approximate",
            "Low",
            30,
            "pending",
            0,
            1,
            "WhatsApp Group",
            "Low cognitive load · Great for low-energy windows"
        ),
        (
            "Export SVG icon tokens for developer handoff",
            "Cleaned 24px grid bounds & dark mode variables.",
            "CAMPUSFLOW · DESIGN SYSTEM",
            "Academic",
            "Today",
            "11:15 AM",
            "exact",
            "Medium",
            35,
            "completed",
            100,
            1,
            "Stitch Studio",
            "Completed during morning flow"
        )
    ]

    for t in tasks:
        cursor.execute("""
            INSERT INTO tasks (
                title, description, course_tag, category, deadline, exact_time,
                time_accuracy, priority, estimated_duration, status, progress_pct,
                is_flexible, source, why_matters
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, t)

    # Seed Events
    events = [
        ("HCI Seminar · Room 304", "Academic", "11:00 AM", "12:15 PM", "Today", "Lecture Hall B", "completed"),
        ("Project Sync & Design Critique", "Personal", "4:00 PM", "4:45 PM", "Today", "Google Meet · Studio B", "scheduled"),
        ("Family Dinner & Unplug", "Personal", "7:30 PM", "8:30 PM", "Today", "Home", "scheduled"),
        ("AI & Human-Centered Systems Workshop", "Events", "2:00 PM", "3:30 PM", "Tomorrow", "Auditorium 2", "scheduled")
    ]
    for e in events:
        cursor.execute("""
            INSERT INTO events (title, category, start_time, end_time, date, location, status)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        """, e)

    # Seed Opportunities (Student Life)
    opportunities = [
        ("Human-Centered AI Systems Colloquium", "Campus Innovation Lab", "Colloquium", "Today · 6:00 PM", 60, "Matches your AI + UI/UX Architecture skills", "scheduled"),
        ("Google Summer of Code Prep Seminar", "Open Source Club", "Seminar", "Friday · 5:00 PM", 45, "Aligned with your Backend & Java Goal", "saved"),
        ("Product Design Fellowship 2026", "Figma Campus Collective", "Internship", "Oct 12", 90, "Strong portfolio fit for CampusFlow", "saved"),
        ("Late-Night Competitive Coding Blitz", "ACM Chapter", "Competition", "Tonight · 11:30 PM", 120, "Conflicts with Protected Sleep Window (11:30 PM)", "ignored")
    ]
    for opp in opportunities:
        cursor.execute("""
            INSERT INTO opportunities (title, org, type, deadline, prep_duration, match_reason, status)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        """, opp)

    # Seed Goals
    goals = [
        ("Master Java & Backend Systems", 68, "2026-10-15", "Skill", "Practice OOP & Interface Design (30m)", 30, 5),
        ("Ship CampusFlow & Fenestra Portfolio Case Study", 75, "2026-10-05", "Career", "Polish interactive prototype micro-states (45m)", 45, 4),
        ("Maintain 8.5+ Semester CGPA Without Burnout", 82, "2026-12-01", "Academic", "Complete DBMS ER Normalization & CN Record", 45, 12)
    ]
    for g in goals:
        cursor.execute("""
            INSERT INTO goals (title, progress, target_date, category, today_action, action_duration, streak_days)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        """, g)

    # Seed Habits
    habits = [
        ("30m Deep Coding / Architecture Sprint", 6, "Skill", 1, "Afternoon"),
        ("Core Subject Revision (No Phone)", 4, "Academic", 0, "Evening"),
        ("Sencha Tea & 15m Mindful Decompress", 9, "Wellness", 1, "Afternoon"),
        ("Digital Sunset before 11:30 PM", 4, "Sleep", 1, "Night")
    ]
    for h in habits:
        cursor.execute("""
            INSERT INTO habits (title, streak, category, completed_today, preferred_window)
            VALUES (?, ?, ?, ?, ?)
        """, h)

    # Seed Routines
    routines = [
        ("University Lectures & Labs", "09:00", "16:00", "Mon,Tue,Wed,Thu,Fri", "Fixed"),
        ("Commute & Mindful Decompression", "16:00", "17:00", "Mon,Tue,Wed,Thu,Fri", "Break"),
        ("Warm Dinner & Offline Reset", "19:30", "20:30", "Everyday", "Meal"),
        ("Sanctuary Sleep Guard", "23:30", "07:00", "Everyday", "Protected")
    ]
    for r in routines:
        cursor.execute("""
            INSERT INTO routines (title, start_time, end_time, days, type)
            VALUES (?, ?, ?, ?, ?)
        """, r)

    # Seed Energy State (Level 3 = Good / Balanced)
    cursor.execute("INSERT INTO energy_state (level, label) VALUES (3, 'Good')")

    conn.commit()
    if close_at_end:
        conn.close()

if __name__ == "__main__":
    init_db()
    print("Database initialized successfully!")
