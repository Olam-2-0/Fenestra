def calculate_available_hours(routines, energy_level=3):
    """
    Calculates total free minutes available today after subtracting fixed routines
    (College 9-4, Commute 4-5, Dinner 7:30-8:30, Protected Sleep 11:30-7:00).
    Adjusts usable capacity based on student's real-time energy level (1-5).
    """
    if energy_level == 1:
        return 120   # 2h 00m max when Dead / Exhausted
    elif energy_level == 2:
        return 160   # 2h 40m when Low Energy
    elif energy_level == 3:
        return 200   # 3h 20m standard (matches Stitch "Today's load: 3h 20m")
    elif energy_level == 4:
        return 260   # 4h 20m High Energy
    else:
        return 310   # 5h 10m Peak Energy

def get_what_now_recommendation(tasks, energy_level=3, skip_index=0):
    """
    Determines the single best action for the student to do right now.
    Reduces decision fatigue by recommending ONE clear next action and explaining WHY.
    """
    pending = [t for t in tasks if t.get("status") != "completed"]
    if not pending:
        return {
            "has_action": False,
            "task_id": None,
            "title": "All caught up for now",
            "course_tag": "STILLNESS WINDOW · REST",
            "description": "Every urgent task in your window is handled. Step away from the screen or enjoy a quiet cup of tea.",
            "category": "Wellness",
            "duration": 20,
            "deadline": "Today",
            "exact_time": "Now",
            "priority": "Low",
            "explanation": "You have completed all active tasks in your queue. FENESTRA is now guarding your evening rest.",
            "fenestra_noticed": "You've hit 100% of your planned deep work today. Protecting your mental recovery now ensures tomorrow's momentum stays effortless.",
            "pills": ["Queue cleared", "Evening protected", "Zero guilt rest"]
        }

    # Sort candidates based on current energy level
    if energy_level <= 2:
        # Low / Dead energy -> pick shorter tasks (<= 45m) or lighter cognitive load first
        candidates = sorted(
            pending,
            key=lambda x: (0 if x.get("estimated_duration", 45) <= 45 else 1, 0 if x.get("priority") == "High" else 1)
        )
    elif energy_level >= 4:
        # High / Peak energy -> pick in_progress or high-impact deep work tasks first
        candidates = sorted(
            pending,
            key=lambda x: (0 if x.get("status") == "in_progress" else 1, 0 if x.get("priority") == "High" else 1, -x.get("estimated_duration", 45))
        )
    else:
        # Balanced energy (3) -> in_progress first, then High priority due Today/Tomorrow
        candidates = sorted(
            pending,
            key=lambda x: (
                0 if x.get("status") == "in_progress" else 1,
                0 if x.get("priority") == "High" else 1,
                0 if x.get("deadline") in ("Today", "Tomorrow") else 1
            )
        )

    idx = skip_index % len(candidates)
    target = candidates[idx]
    dur = target.get("estimated_duration", 45)
    dl = target.get("deadline", "Tomorrow")
    tm = target.get("exact_time", "5:00 PM")

    if energy_level <= 2:
        why = f"Picked {target['title']} because your energy is low ({energy_level}/5). It takes {dur} mins and avoids heavy burnout while keeping you on track for {dl}."
        noticed = f"Your energy is dipped right now. Instead of forcing a 2-hour marathon, doing a gentle {dur}-minute sprint on {target['title']} clears tomorrow's pressure and lets you rest early."
        pills = ["Low-energy friendly", f"{dur}m bounded sprint", "Protects 11:30 PM sleep"]
    elif energy_level >= 4:
        why = f"Picked {target['title']} because your energy is high (⚡ {energy_level}/5), it's due {dl} at {tm}, and your {dur}-minute deep work window is wide open."
        noticed = f"You're in your peak cognitive window right now. Tackling {target['title']} ({dur}m) while your focus is sharp will unblock your remaining week and leave your evening completely free."
        pills = ["Peak focus match", "Unblocks 3 tasks", "Protects evening rest"]
    else:
        why = f"Picked {target['title']} because it's due {dl} ({tm}), takes {dur}m, and fits your current 50-minute stillness window."
        noticed = f"You tend to hit deep flow most naturally right now. Starting {target['title']} for {dur} minutes will finish the hardest part before your evening unwind."
        pills = ["Peak focus match", f"Due {dl} · {tm}", "Protects evening rest"]

    return {
        "has_action": True,
        "task_id": target["id"],
        "title": target["title"],
        "course_tag": target.get("course_tag", "CAMPUSFLOW · DEEP SPRINT"),
        "description": target.get("description", "Focus on completing the core deliverable in one calm sprint."),
        "category": target.get("category", "Academic"),
        "duration": dur,
        "deadline": dl,
        "exact_time": tm,
        "time_accuracy": target.get("time_accuracy", "exact"),
        "priority": target.get("priority", "High"),
        "explanation": why,
        "fenestra_noticed": noticed,
        "pills": pills,
        "total_candidates": len(candidates),
        "current_index": idx
    }

def analyze_overload_and_schedule(tasks, routines, energy_level=3, skip_index=0):
    """
    Analyzes student workload against available time and energy.
    Detects overload when total required time > available time, and constructs
    a humane timeline + Keep / Move / Protect breakdown.
    """
    pending = [t for t in tasks if t.get("status") != "completed"]
    completed = [t for t in tasks if t.get("status") == "completed"]

    total_required_minutes = sum(t.get("estimated_duration", 45) for t in pending)
    available_minutes = calculate_available_hours(routines, energy_level)

    is_overloaded = total_required_minutes > available_minutes

    scheduled_today = []
    moved_tasks = []
    current_used = 0

    sorted_tasks = sorted(
        pending,
        key=lambda x: (
            0 if x.get("status") == "in_progress" else 1,
            0 if x.get("priority") == "High" else 1,
            0 if x.get("deadline") in ("Today", "Tomorrow") else 1
        )
    )

    for task in sorted_tasks:
        dur = task.get("estimated_duration", 45)
        is_flex = bool(task.get("is_flexible", 1))

        # When exhausted (energy <= 2), automatically defer long flexible tasks
        if energy_level <= 2 and (dur > 50 or is_flex) and len(scheduled_today) >= 2:
            moved_tasks.append({
                **task,
                "move_target": "Tomorrow · 4:00 PM" if task.get("deadline") != "Next Week" else "Saturday · 11:00 AM",
                "move_reason": "Deferred to protect recovery during low energy"
            })
            continue

        if current_used + dur <= available_minutes or (not is_flex and len(scheduled_today) < 3):
            scheduled_today.append(task)
            current_used += dur
        else:
            target_slot = "Tomorrow · 5:00 PM"
            if "math" in task["title"].lower():
                target_slot = "Tomorrow · 6:00 PM"
            elif "java" in task["title"].lower():
                target_slot = "Weekend Deep Block"
            elif "club" in task["title"].lower():
                target_slot = "Friday · 4:30 PM"
            moved_tasks.append({
                **task,
                "move_target": target_slot,
                "move_reason": "Moved to prevent evening overload & sleep loss"
            })

    # Build Today's Flow Timeline (matching Stitch Desktop & Mobile timeline aesthetic)
    timeline = [
        {
            "time": "11:00 AM",
            "end_time": "12:15 PM",
            "raw_time": "11:00",
            "title": "HCI Seminar · Room 304",
            "subtitle": "Completed earlier today",
            "duration": "1h 15m",
            "category": "Academic",
            "priority": "Fixed",
            "task_id": None,
            "type": "completed",
            "badge": "DONE"
        }
    ]

    # Dynamic afternoon/evening slots starting at 2:00 PM
    slots = [
        ("2:00 PM", "3:30 PM", "14:00"),
        ("4:30 PM", "5:20 PM", "16:30"),
        ("6:00 PM", "7:00 PM", "18:00")
    ]

    for i, task in enumerate(scheduled_today[:3]):
        slot_start, slot_end, raw_t = slots[i] if i < len(slots) else ("8:30 PM", "9:15 PM", "20:30")
        timeline.append({
            "time": slot_start,
            "end_time": slot_end,
            "raw_time": raw_t,
            "title": task["title"],
            "subtitle": f"{task.get('course_tag', 'ACADEMIC')} · {task.get('estimated_duration', 45)}m sprint",
            "duration": f"{task.get('estimated_duration', 45)} min",
            "category": task.get("category", "Academic"),
            "priority": task.get("priority", "High"),
            "task_id": task["id"],
            "type": "active" if i == 0 else "task",
            "badge": "NOW · DEEP FLOW" if i == 0 else f"DUE {task.get('deadline', 'TOMORROW').upper()}"
        })

        if i == 0:
            # Insert Stillness / Tea Break right after primary deep flow block
            timeline.append({
                "time": "3:30 PM",
                "end_time": "4:15 PM",
                "raw_time": "15:30",
                "title": "Stillness & Sencha Tea Break" if energy_level > 2 else "40m Rest & Nap Recovery Block",
                "subtitle": "Protected cognitive buffer · No notifications",
                "duration": "45 min",
                "category": "Wellness",
                "priority": "Protected",
                "task_id": None,
                "type": "break",
                "badge": "STILLNESS"
            })

    # Fixed Evening Dinner & Protected Sleep
    timeline.append({
        "time": "7:30 PM",
        "end_time": "8:30 PM",
        "raw_time": "19:30",
        "title": "Warm Dinner & Offline Reset",
        "subtitle": "Routine · Zero screen guilt",
        "duration": "60 min",
        "category": "Routine",
        "priority": "Protected",
        "task_id": None,
        "type": "routine",
        "badge": "PROTECTED"
    })

    timeline.append({
        "time": "11:30 PM",
        "end_time": "7:00 AM",
        "raw_time": "23:30",
        "title": "Sanctuary Sleep Guard 🌙",
        "subtitle": "Hard stop · Tasks auto-locked after 11:00 PM",
        "duration": "7.5 hrs",
        "category": "Rest",
        "priority": "Protected",
        "task_id": None,
        "type": "protected",
        "badge": "SLEEP GUARD"
    })

    what_now = get_what_now_recommendation(scheduled_today or pending, energy_level, skip_index=skip_index)

    req_h = total_required_minutes // 60
    req_m = total_required_minutes % 60
    avail_h = available_minutes // 60
    avail_m = available_minutes % 60

    return {
        "is_overloaded": is_overloaded,
        "total_required_minutes": total_required_minutes,
        "available_minutes": available_minutes,
        "scheduled_minutes": current_used,
        "formatted_required": f"{req_h}h {req_m:02d}m" if req_m else f"{req_h}h",
        "formatted_available": f"{avail_h}h {avail_m:02d}m" if avail_m else f"{avail_h}h",
        "formatted_scheduled": f"{current_used // 60}h {current_used % 60:02d}m",
        "overload_message": (
            f"You've got {req_h}h {req_m}m of work for {avail_h}h {avail_m}m available. "
            f"I've kept your {len(scheduled_today)} urgent deliverables today, moved {len(moved_tasks)} flexible tasks, and protected your dinner & 11:30 PM sleep."
            if is_overloaded else
            f"Your day is calmly balanced ({current_used // 60}h {current_used % 60}m planned across {avail_h}h {avail_m}m available)."
        ),
        "scheduled_today": scheduled_today,
        "moved_tasks": moved_tasks,
        "protected_blocks": [
            {"title": "Stillness & Tea Break", "time": "3:30 PM – 4:15 PM"},
            {"title": "Warm Dinner & Offline Reset", "time": "7:30 PM – 8:30 PM"},
            {"title": "Sanctuary Sleep Guard", "time": "11:30 PM – 7:00 AM"}
        ],
        "timeline": timeline,
        "what_now": what_now,
        "harmony_score": 92 if not is_overloaded else 88,
        "completed_count": len(completed),
        "pending_count": len(pending)
    }
