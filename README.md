# FENESTRA — Personal AI Caretaker for Student Life 🎓

> **"Don't manage your life around the app. Let FENESTRA manage your day around you."**

FENESTRA is an AI-powered personal caretaker and adaptive productivity system built for the **OLAM 2.0 Mini Hackathon**.

---

## 🌟 Key Features

1. **Smart Capture & OCR Pipeline**
   - Upload screenshots of WhatsApp messages, college group notifications, or lab record reminders.
   - Intelligent OCR extracts task titles, exact deadlines, priorities, and estimated durations automatically.
2. **"WHAT NOW?" Decision Engine**
   - Eliminates decision fatigue by analyzing energy, free time slots, and hard deadlines to recommend **ONE single best action** with a clear explanation of *why*.
3. **Adaptive Energy Shuffler**
   - Interactive slider from **😴 Dead (1/5)** to **🚀 Peak Focus (5/5)**.
   - When energy drops, heavy tasks move later, breaks increase, and evenings are protected.
4. **Overload Detection & Caretaker Protection**
   - Automatically detects when student workload exceeds available hours.
   - Protects college routines, meals, breaks, and sleep (11:30 PM+).
5. **Apple HIG Glassmorphism UI & Dual Themes**
   - Built with Apple Human Interface Guidelines: SF Pro typography, 8pt grid system, bento card layouts, and glassmorphism.
   - Full global **Dark Mode** and **Light Mode** switching with persistent preferences.
6. **Desktop & Mobile Responsive View System**
   - Dedicated Desktop interface (Sidebar navigation + multi-column Bento dashboard).
   - Dedicated Mobile interface (Bottom navigation bar + stacked cards + mobile frame switcher).

---

## 🛠️ Tech Stack & Architecture

- **Backend**: Python 3.12 + Flask REST API + SQLite Database + Pillow / OCR Engine.
- **Frontend**: HTML5 + Tailwind CSS v3 + Lucide Icons + Apple Glassmorphism Design System.
- **AI & Scheduler**: Custom heuristic rule-based AI parser + adaptive energy-aware scheduling algorithm.

---

## 🚀 Quickstart & Setup

1. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```
2. **Run Application Server**:
   ```bash
   python backend/app.py
   ```
3. **Access Web Application**:
   Open browser at `http://127.0.0.1:5000`

---

## ⏱️ Hackathon Demo Flow (3-Minute Presentation)

1. **Scene 1 (Problem)**: Show fragmented student life across WhatsApp, Gmail, and college portals.
2. **Scene 2 (Capture)**: Upload a messy screenshot ("Guys reminder, CN record submission tomorrow before 4:30 PM"). FENESTRA extracts structured task data via OCR.
3. **Scene 3 (What Now?)**: Dashboard recommends "DBMS Assignment — 45 min" and explains *why*.
4. **Scene 4 (Energy Shuffler)**: Move slider from **⚡ Good** to **😴 Dead**. Watch the timeline instantly shift heavy tasks and insert breaks.
5. **Scene 5 (Caretaker)**: Click **TAKE CARE OF MY DAY** to balance overloaded workload and protect sleep.
