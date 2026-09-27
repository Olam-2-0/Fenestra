/* ==========================================================================
   FENESTRA OS — APPLE HIG & PRO MOTION CRAFT CONTROLLER (app.js)
   Powers all 5 Modules: Today | Capture | Planner | Goals & Life | Focus
   Includes: Magnetic Cursor, Card Spotlights, Kinetic Typography,
   "Take Care of My Day" AI Rebalancer, Dynamic Replan Triggers,
   Goal-to-Action Injector, Habit Streaks, and Multi-Mode WebAudio Synth.
   ========================================================================== */

function getInitialSeedState() {
  return {
    user: {
      name: "Cherry",
      email: "cherry@campus.edu",
      department: "Computer Science · Sem 5",
      student_type: "Project-heavy",
      sleep_time: "11:30 PM"
    },
    energyLevel: 3,
    tasks: [
      {
        id: 1,
        title: "Complete project prototype",
        course_tag: "CAMPUSFLOW · DEEP SPRINT",
        category: "Academic",
        deadline: "Today",
        exact_time: "5:00 PM",
        priority: "High",
        estimated_duration: 50,
        status: "in_progress",
        is_flexible: 0,
        bucket: "afternoon"
      },
      {
        id: 2,
        title: "DBMS Assignment (ER & 3NF)",
        course_tag: "CS-302 · DATABASE SYSTEMS",
        category: "Academic",
        deadline: "Tomorrow",
        exact_time: "5:00 PM",
        priority: "High",
        estimated_duration: 90,
        status: "pending",
        is_flexible: 0,
        bucket: "afternoon"
      },
      {
        id: 3,
        title: "Lab Record Submission (CN)",
        course_tag: "CS-304 · NETWORKS LAB",
        category: "Academic",
        deadline: "Tomorrow",
        exact_time: "4:30 PM",
        priority: "High",
        estimated_duration: 45,
        status: "pending",
        is_flexible: 0,
        bucket: "morning"
      },
      {
        id: 4,
        title: "Math Revision (Chapters 3 & 4)",
        course_tag: "MA-201 · CORE REVISION",
        category: "Academic",
        deadline: "Friday",
        exact_time: "7:00 PM",
        priority: "Medium",
        estimated_duration: 60,
        status: "pending",
        is_flexible: 1,
        bucket: "evening"
      },
      {
        id: 5,
        title: "Java Backend Architecture",
        course_tag: "CS-305 · OBJECT ORIENTED",
        category: "Academic",
        deadline: "Next Week",
        exact_time: "11:59 PM",
        priority: "Medium",
        estimated_duration: 90,
        status: "pending",
        is_flexible: 1,
        bucket: "evening"
      },
      {
        id: 6,
        title: "Club Orientation Deck",
        course_tag: "STUDENT LIFE · DESIGN CLUB",
        category: "Events",
        deadline: "Saturday",
        exact_time: "3:00 PM",
        priority: "Low",
        estimated_duration: 30,
        status: "pending",
        is_flexible: 1,
        bucket: "morning"
      },
      {
        id: 7,
        title: "Algorithm Problem Set (Dynamic Programming)",
        course_tag: "CS-301 · ALGORITHMS",
        category: "Academic",
        deadline: "Next Week",
        exact_time: "6:00 PM",
        priority: "Medium",
        estimated_duration: 45,
        status: "pending",
        is_flexible: 1,
        bucket: "morning"
      },
      {
        id: 8,
        title: "Design Portfolio Case Study Review",
        course_tag: "DESIGN · CAREER",
        category: "Career",
        deadline: "Tomorrow",
        exact_time: "2:00 PM",
        priority: "High",
        estimated_duration: 35,
        status: "pending",
        is_flexible: 1,
        bucket: "afternoon"
      }
    ],
    goals: [
      {
        id: 101,
        title: "Master Java & Distributed Backend Systems",
        category: "Skill",
        progress: 68,
        streak_days: 5,
        today_action: "Implement JWT repository pattern (30m)",
        action_duration: 30,
        scheduled_today: false
      },
      {
        id: 102,
        title: "Ship Human-Centered Design Portfolio Case Study",
        category: "Career",
        progress: 75,
        streak_days: 4,
        today_action: "Polish interactive micro-states & typography (45m)",
        action_duration: 45,
        scheduled_today: false
      },
      {
        id: 103,
        title: "Maintain 8.5+ Semester CGPA Without Burnout",
        category: "Academic",
        progress: 82,
        streak_days: 12,
        today_action: "Review DBMS 3NF schema & CN routing tables (45m)",
        action_duration: 45,
        scheduled_today: false
      }
    ],
    habits: [
      { id: 201, title: "30m Deep Architecture / Coding Sprint", streak: 6, window: "Afternoon", completed_today: true },
      { id: 202, title: "Core Subject Revision (Phone in Another Room)", streak: 4, window: "Evening", completed_today: false },
      { id: 203, title: "Sencha Tea & 15m Mindful Decompression", streak: 9, window: "4:30 PM Buffer", completed_today: true },
      { id: 204, title: "Digital Sunset Before 23:30 Sleep Cutoff", streak: 5, window: "23:30 Nightly", completed_today: true }
    ],
    opportunities: [
      {
        id: 301,
        title: "Human-Centered AI Systems Colloquium",
        org: "Campus Innovation Lab",
        type: "Colloquium",
        deadline: "Today · 6:00 PM",
        prep_duration: 45,
        match_reason: "Matches your AI + UI/UX Architecture track",
        conflict: false,
        status: "saved"
      },
      {
        id: 302,
        title: "Open Source Systems Fellowship Prep",
        org: "Open Source Collective",
        type: "Fellowship",
        deadline: "Friday · 5:00 PM",
        prep_duration: 45,
        match_reason: "Directly aligned with your Backend Systems goal",
        conflict: false,
        status: "saved"
      },
      {
        id: 303,
        title: "Product Design Systems Residency",
        org: "Design Collective",
        type: "Internship",
        deadline: "Next Monday · 4:00 PM",
        prep_duration: 60,
        match_reason: "Strong portfolio fit · Fits afternoon peak window",
        conflict: false,
        status: "saved"
      },
      {
        id: 304,
        title: "Late-Night Competitive Coding Blitz",
        org: "ACM Chapter",
        type: "Competition",
        deadline: "Tonight · 11:45 PM",
        prep_duration: 120,
        match_reason: "Crosses your 11:30 PM Protected Sleep Cutoff",
        conflict: true,
        status: "flagged"
      }
    ]
  };
}

const SAMPLE_PRESETS = {
  cn_whatsapp: {
    raw_text: "Guys reminder, CN record submission tomorrow before 4:30 PM. Lab internal marks depend on this.",
    title: "CN Record Submission",
    deadline: "Tomorrow",
    exact_time: "4:30 PM",
    priority: "High",
    duration: 45,
    needs_confirm: false
  },
  dbms_portal: {
    raw_text: "DBMS Assignment 4 (ER Diagram & 3NF Normalization) due tomorrow at 5:00 PM. Upload PDF to Canvas.",
    title: "DBMS Assignment 4 (ER & 3NF)",
    deadline: "Tomorrow",
    exact_time: "5:00 PM",
    priority: "High",
    duration: 90,
    needs_confirm: false
  },
  club_approximate: {
    raw_text: "Hey team, please share the Club Orientation Deck by Monday evening so we can rehearse.",
    title: "Club Orientation Deck",
    deadline: "Monday",
    exact_time: "Evening (Confirm)",
    priority: "Low",
    duration: 30,
    needs_confirm: true,
    note: "Only an approximate window (“Monday evening”) was detected. Select an exact slot:",
    options: ["5:00 PM", "6:30 PM", "8:00 PM"]
  },
  ambiguous_nine: {
    raw_text: "Compiler Design Mini-Project synopsis submission is due tomorrow at 9:00. Upload to department portal.",
    title: "Compiler Design Synopsis",
    deadline: "Tomorrow",
    exact_time: "9:00 (AM or PM?)",
    priority: "High",
    duration: 60,
    needs_confirm: true,
    note: "Ambiguous 12-hour timestamp (“9:00”) detected without AM/PM. Confirm intended deadline:",
    options: ["9:00 AM", "9:00 PM"]
  }
};

const WORKFLOW_STEPS = [
  {
    badge: "01 · Capture",
    title: "Drop screenshots or text to extract deadlines.",
    desc: "Parses text and images into scheduled items without manual entry.",
    rows: [
      { left: "“Tomorrow at 4:30 PM”", right: "Exact Locked", strong: true },
      { left: "“Monday evening”", right: "Prompts 6:30 PM / 8 PM", strong: false },
      { left: "“Submit by 9:00”", right: "Prompts AM vs PM", strong: false }
    ]
  },
  {
    badge: "02 · Energy",
    title: "Match tasks to current energy levels.",
    desc: "Low energy surfaces quick wins; high energy queues deep work blocks.",
    rows: [
      { left: "Energy 5 · Peak", right: "Deep Sprints", strong: true },
      { left: "Energy 3 · Normal", right: "Standard Queue", strong: false },
      { left: "Energy 1 · Low", right: "Quick Wins", strong: false }
    ]
  },
  {
    badge: "03 · Focus",
    title: "Single-task focus with instant deferral.",
    desc: "Keeps your screen clear by surfacing one next priority at a time.",
    rows: [
      { left: "Active Card", right: "1 Task Isolated", strong: true },
      { left: "Swipe or Click", right: "Skip or Complete", strong: false },
      { left: "Ambient Audio", right: "Rain / Noise", strong: false }
    ]
  },
  {
    badge: "04 · Sleep",
    title: "Guards your sleep schedule.",
    desc: "Alerts when tasks overflow past your nightly cutoff.",
    rows: [
      { left: "Sleep Boundary", right: "Protected", strong: true },
      { left: "Overflow Check", right: "Real-Time Alert", strong: false },
      { left: "1-Click Defer", right: "Moves Tasks to Tomorrow", strong: false }
    ]
  }
];

let appState = getInitialSeedState();
let currentStage = "landing";
let currentAppView = "today";
let currentTaskFilter = "all";
let skippedTaskIds = [];
let pendingExtractedTask = { ...SAMPLE_PRESETS.cn_whatsapp };
let kineticWordIndex = 0;

// Focus Timer & Multi-Mode Procedural Audio State
let focusSecondsRemaining = 50 * 60;
let focusTimerInterval = null;
let focusTimerRunning = false;
let audioCtx = null;
let activeAudioNodes = [];
let currentAudioMode = "off"; // 'off' | 'rain' | 'brown' | 'drone'

/* ==========================================================================
   1. INITIALIZATION & GLOBAL KEYBOARD SHORTCUTS
   ========================================================================== */
window.addEventListener("DOMContentLoaded", () => {
  loadSavedState();
  applySavedTheme();
  initAllSegmentedControls();
  initWhatNowDragGesture();
  initInteractiveCursor();
  initCardSpotlights();
  initKineticHeroWords();
  initGlobalKeyboardShortcuts();
  renderAll();
});

window.addEventListener("resize", () => {
  refreshActiveSegmentedThumbs();
});

function loadSavedState() {
  try {
    const raw = localStorage.getItem("fenestra_hig_state_v4");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.tasks) && parsed.tasks.length > 0 && Array.isArray(parsed.goals)) {
        appState = parsed;
        if (!appState.user.email) appState.user.email = "cherry@campus.edu";
        if (!appState.user.department) appState.user.department = "Computer Science · Sem 5";
      }
    }
  } catch (e) {
    console.warn("Using default seed state:", e);
  }
}

function saveState() {
  try {
    localStorage.setItem("fenestra_hig_state_v4", JSON.stringify(appState));
  } catch (e) {}
}

function resetDemoWorkspace() {
  appState = getInitialSeedState();
  skippedTaskIds = [];
  saveState();
  renderAll();
  closeHelpModal();
  closeCommandPalette();
  showToast("Demo workspace restored to fresh state");
}

/* ==========================================================================
   2. SMOOTH AMBIENT CURSOR LIGHT AURA, MAGNETIC BUTTONS & CARD SPOTLIGHT
   ========================================================================== */
function initInteractiveCursor() {
  const lightEl = document.getElementById("cursor-ambient-light");
  let mouseX = -1000, mouseY = -1000;
  let lightX = -1000, lightY = -1000;

  window.addEventListener("pointermove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  if (lightEl) {
    function animateAmbientLight() {
      lightX += (mouseX - lightX) * 0.16;
      lightY += (mouseY - lightY) * 0.16;
      const w = lightEl.offsetWidth || 560;
      const h = lightEl.offsetHeight || 560;
      lightEl.style.transform = `translate3d(${lightX - w / 2}px, ${lightY - h / 2}px, 0)`;
      requestAnimationFrame(animateAmbientLight);
    }
    requestAnimationFrame(animateAmbientLight);

    document.addEventListener("mouseover", (e) => {
      const overCard = e.target.closest(".bento-card");
      lightEl.classList.toggle("is-over-card", Boolean(overCard));
    });
  }

  document.querySelectorAll(".magnetic-btn").forEach((btn) => {
    btn.addEventListener("pointermove", (e) => {
      const rect = btn.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      btn.style.transition = "none";
      btn.style.transform = `translate3d(${dx * 0.14}px, ${dy * 0.16}px, 0)`;
    });
    btn.addEventListener("pointerleave", () => {
      btn.style.transition = "transform 0.32s cubic-bezier(0.16, 1, 0.3, 1)";
      btn.style.transform = "translate3d(0, 0, 0)";
    });
  });
}

function initCardSpotlights() {
  let activeCard = null;

  document.addEventListener("pointerover", (e) => {
    activeCard = e.target.closest(".bento-card");
  }, { passive: true });

  document.addEventListener("pointerout", (e) => {
    if (activeCard && !e.relatedTarget?.closest?.(".bento-card")) {
      activeCard = null;
    }
  }, { passive: true });

  document.addEventListener("pointermove", (e) => {
    if (!activeCard) {
      activeCard = e.target.closest(".bento-card");
    }
    if (activeCard) {
      const rect = activeCard.getBoundingClientRect();
      activeCard.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
      activeCard.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
    }
  }, { passive: true });
}

/* ==========================================================================
   3. KINETIC MOVING TYPOGRAPHY CAROUSEL & WORKFLOW SCRUBBER
   ========================================================================== */
function initKineticHeroWords() {
  setInterval(() => {
    if (currentStage === "landing") {
      cycleKineticWord();
    }
  }, 2600);
}

function cycleKineticWord() {
  const track = document.getElementById("kinetic-word-track");
  if (!track) return;
  const count = track.children.length;
  kineticWordIndex = (kineticWordIndex + 1) % count;
  track.style.transform = `translateY(-${kineticWordIndex * 1.12}em)`;
}

function switchWorkflowStep(stepIdx) {
  moveSegmentedThumb("workflow-seg-control", stepIdx);
  const step = WORKFLOW_STEPS[stepIdx] || WORKFLOW_STEPS[0];
  const badge = document.getElementById("wf-badge");
  const title = document.getElementById("wf-title");
  const desc = document.getElementById("wf-desc");
  const visual = document.getElementById("wf-visual");

  if (badge) badge.textContent = step.badge;
  if (title) title.textContent = step.title;
  if (desc) desc.textContent = step.desc;
  if (visual) {
    visual.innerHTML = `
      <div class="hig-caption mb-2">Step Summary</div>
      <div class="hig-title-2 mb-4">${step.title}</div>
      <div class="space-y-2.5">
        ${step.rows
          .map(
            (r, i) => `
          <div class="flex items-center justify-between text-xs py-2 ${i < step.rows.length - 1 ? "border-b" : ""}" style="border-color: var(--sys-hairline);">
            <span style="color: var(--label-secondary);">${r.left}</span>
            <span class="hig-pill ${r.strong ? "hig-pill-strong" : ""}">${r.right}</span>
          </div>
        `
          )
          .join("")}
      </div>
    `;
  }
}

/* ==========================================================================
   4. APPLE SLIDING SEGMENTED CONTROL ENGINE
   ========================================================================== */
function initAllSegmentedControls() {
  refreshActiveSegmentedThumbs();
}

function refreshActiveSegmentedThumbs() {
  const controls = ["lander-seg-control", "workflow-seg-control", "auth-seg-control", "app-seg-control", "energy-seg-control", "tasks-seg-control"];
  controls.forEach((id) => {
    const container = document.getElementById(id);
    if (!container) return;
    const activeBtn = container.querySelector(".hig-segmented-btn.is-active");
    if (activeBtn) {
      const idx = parseInt(activeBtn.getAttribute("data-seg-index") || "0", 10);
      moveSegmentedThumb(id, idx);
    }
  });
}

function moveSegmentedThumb(controlId, activeIndex) {
  const container = document.getElementById(controlId);
  if (!container) return;
  const thumb = container.querySelector(".hig-segmented-thumb");
  const buttons = container.querySelectorAll(".hig-segmented-btn");
  if (!thumb || !buttons.length || !buttons[activeIndex]) return;

  buttons.forEach((btn, i) => {
    btn.classList.toggle("is-active", i === activeIndex);
  });

  const targetBtn = buttons[activeIndex];
  const width = targetBtn.offsetWidth;
  const offsetLeft = targetBtn.offsetLeft;

  if (width > 0) {
    thumb.style.width = `${width}px`;
    thumb.style.transform = `translate3d(${offsetLeft - 3}px, 0, 0)`;
  }
}

/* ==========================================================================
   5. STAGE NAVIGATION (LANDING ↔ AUTH ↔ WORKSPACE)
   ========================================================================== */
function goToStage(stage, authMode = "signin") {
  currentStage = stage;
  const stages = ["landing", "auth", "app"];
  stages.forEach((s) => {
    const el = document.getElementById(`stage-${s}`);
    if (el) el.classList.toggle("hidden", s !== stage);
  });

  window.scrollTo({ top: 0, behavior: "smooth" });

  requestAnimationFrame(() => {
    if (stage === "auth") {
      switchAuthTab(authMode, authMode === "signup" ? 1 : 0);
    } else if (stage === "app") {
      renderAll();
      refreshActiveSegmentedThumbs();
    } else if (stage === "landing") {
      refreshActiveSegmentedThumbs();
    }
  });
}

function switchLanderTab(tab, index) {
  moveSegmentedThumb("lander-seg-control", index);
  const panes = ["capture", "energy", "focus"];
  panes.forEach((p) => {
    const el = document.getElementById(`lander-pane-${p}`);
    if (!el) return;
    if (p === tab) {
      el.classList.remove("hidden");
      el.classList.add("grid");
    } else {
      el.classList.add("hidden");
      el.classList.remove("grid");
    }
  });
}

function switchAuthTab(mode, index) {
  moveSegmentedThumb("auth-seg-control", index);
  const nameGroup = document.getElementById("auth-name-group");
  const prefsGroup = document.getElementById("auth-signup-prefs");
  const heading = document.getElementById("auth-heading");
  const subheading = document.getElementById("auth-subheading");
  const submitBtn = document.getElementById("auth-submit-btn");

  if (mode === "signup") {
    nameGroup?.classList.remove("hidden");
    prefsGroup?.classList.remove("hidden");
    if (heading) heading.innerHTML = `Create <span class="font-editorial font-normal text-2xl">Fenestra</span> Account`;
    if (subheading) subheading.textContent = "Calibrate your workload rhythm and sleep cutoff.";
    if (submitBtn) submitBtn.textContent = "Create Account & Launch";
  } else {
    nameGroup?.classList.add("hidden");
    prefsGroup?.classList.add("hidden");
    if (heading) heading.innerHTML = `Sign in to <span class="font-editorial font-normal text-2xl">Fenestra</span>`;
    if (subheading) subheading.textContent = "Resume your adaptive schedule and focus queue.";
    if (submitBtn) submitBtn.textContent = "Continue to Workspace";
  }
}

function handleAuthSubmit(e) {
  e.preventDefault();
  const nameInput = document.getElementById("auth-name-input");
  const rhythmSelect = document.getElementById("auth-rhythm-select");
  const sleepSelect = document.getElementById("auth-sleep-select");

  if (nameInput && nameInput.value.trim()) {
    appState.user.name = nameInput.value.trim();
  }
  if (rhythmSelect && rhythmSelect.value) {
    appState.user.student_type = rhythmSelect.value;
  }
  if (sleepSelect && sleepSelect.value) {
    appState.user.sleep_time = sleepSelect.value;
  }

  saveState();
  goToStage("app");
  showToast(`Welcome back, ${appState.user.name}`);
}

function enterDemoWorkspace(targetView = "today") {
  goToStage("app");
  if (targetView === "focus") {
    openFocusOverlay();
    return;
  }
  const viewIndexMap = { today: 0, capture: 1, tasks: 2, life: 3, profile: 4 };
  requestAnimationFrame(() => {
    switchAppView(targetView, viewIndexMap[targetView] ?? 0);
  });
}

function signOutToLanding() {
  goToStage("landing");
  showToast("Returned to Fenestra Landing Page");
}

function signOutUserAccount() {
  goToStage("auth", "signin");
  showToast(`Signed out of ${appState.user.name}'s session`);
}

function switchAppView(view, index) {
  if (view === "focus") {
    openFocusOverlay();
    return;
  }
  currentAppView = view;
  moveSegmentedThumb("app-seg-control", index);

  ["today", "capture", "tasks", "life", "profile"].forEach((v) => {
    const section = document.getElementById(`app-view-${v}`);
    if (section) section.classList.toggle("hidden", v !== view);
  });

  requestAnimationFrame(() => {
    renderAll();
    refreshActiveSegmentedThumbs();
  });
}

/* ==========================================================================
   6. THEME SWITCHER, CARD SELECTION & FEATURE SPOTLIGHT
   ========================================================================== */
function applySavedTheme() {
  const saved = localStorage.getItem("fenestra_hig_theme") || "dark";
  setThemeMode(saved, false);
}

function setThemeMode(mode, notify = false) {
  const normalized = mode === "light" ? "light" : "dark";
  const isLight = normalized === "light";

  document.documentElement.classList.toggle("light-mode", isLight);
  document.documentElement.setAttribute("data-theme", normalized);
  if (document.body) {
    document.body.classList.toggle("light-mode", isLight);
    document.body.setAttribute("data-theme", normalized);
  }

  // Update all apple-theme-switch buttons aria-checked
  document.querySelectorAll(".apple-theme-switch").forEach((btn) => {
    btn.setAttribute("aria-checked", String(isLight));
  });

  localStorage.setItem("fenestra_hig_theme", normalized);
  updateThemeLabels();
  requestAnimationFrame(() => refreshActiveSegmentedThumbs());
}

function toggleTheme() {
  const isCurrentlyLight = document.documentElement.classList.contains("light-mode") ||
                           document.documentElement.getAttribute("data-theme") === "light";
  setThemeMode(isCurrentlyLight ? "dark" : "light", false);
}

function updateThemeLabels() {
  const isLight = document.documentElement.classList.contains("light-mode");
  const activeMode = isLight ? "light" : "dark";

  document.querySelectorAll("[data-theme-btn]").forEach((btn) => {
    const btnMode = btn.getAttribute("data-theme-btn");
    btn.classList.toggle("is-active", btnMode === activeMode);
  });

  const nextModeLabel = isLight ? "Dark" : "Light";
  const l1 = document.getElementById("landing-theme-label");
  const l2 = document.getElementById("app-theme-label");
  if (l1) l1.textContent = nextModeLabel;
  if (l2) l2.textContent = nextModeLabel;
}

function spotlightFeatureCard(cardEl) {
  if (!cardEl) return;
  const isHighlighted = cardEl.classList.toggle("bento-card-highlight");
  cardEl.classList.toggle("is-selected-card", isHighlighted);
  const titleEl = cardEl.querySelector("h3");
  const titleText = titleEl ? titleEl.textContent.trim() : "Feature";
  showToast(isHighlighted ? `✦ Selected & Highlighted "${titleText}"` : `Restored "${titleText}"`);
}

function selectInteractiveCard(cardEl) {
  if (!cardEl) return;
  const isSelected = cardEl.classList.toggle("is-selected-card");
  const captionEl = cardEl.querySelector(".hig-caption");
  const label = captionEl ? captionEl.textContent.trim() : "Card";
  showToast(isSelected ? `✓ Selected "${label}"` : `Deselected "${label}"`);
}

function toggleCardBacklightEffect() {
  const disabled = document.body.classList.toggle("backlight-disabled");
  const btn = document.getElementById("profile-backlight-btn");
  if (btn) {
    btn.textContent = disabled ? "Disabled" : "Enabled ✓";
  }
  showToast(disabled ? "Card hover backlight paused" : "Cursor-touch card backlight & elevation active");
}

/* ==========================================================================
   7. ADAPTIVE ENERGY CALIBRATION, "TAKE CARE OF MY DAY" & DYNAMIC REPLAN
   ========================================================================== */
const ENERGY_META = {
  1: { title: "Low Energy · Recovery", desc: "Showing short 15–30m tasks.", load: "28% Light Load" },
  2: { title: "Low Focus", desc: "Prioritizing short tasks to maintain momentum.", load: "45% Light Load" },
  3: { title: "Balanced Focus", desc: "Standard mix for 45–60 minute tasks.", load: "68% Optimal Load" },
  4: { title: "High Focus", desc: "Focusing on important assignments.", load: "84% High Capacity" },
  5: { title: "Peak Focus", desc: "Focusing on deep work and long sessions.", load: "96% Peak Capacity" }
};

function setEnergyLevel(level) {
  const clamped = Math.max(1, Math.min(5, parseInt(level, 10) || 3));
  appState.energyLevel = clamped;
  skippedTaskIds = [];

  // Ensure at least one appropriate task is active when switching energy
  const activePending = appState.tasks.filter((t) => t.status !== "completed" && t.status !== "deferred");
  if (activePending.length === 0) {
    appState.tasks.forEach((t) => {
      if (t.status === "deferred") t.status = "pending";
    });
  }

  saveState();
  moveSegmentedThumb("energy-seg-control", clamped - 1);
  renderAll();
  showToast(`Energy ${clamped}/5 · ${ENERGY_META[clamped].title}`);
}

function takeCareOfMyDay() {
  let deferred = 0;
  // First reopen any deferred high-priority tasks so Today always has its top priority active
  appState.tasks.forEach((t) => {
    if (t.status === "deferred" && t.priority === "High") {
      t.status = "pending";
    }
  });

  appState.tasks.forEach((t) => {
    if (t.status !== "completed" && (t.is_flexible || t.priority !== "High" || t.exact_time.includes("11:59"))) {
      t.status = "deferred";
      t.deadline = "Tomorrow Morning (Rebalanced)";
      t.exact_time = "9:30 AM";
      deferred++;
    }
  });

  // Guarantee at least 1 active task remains in Today's queue
  const remaining = appState.tasks.filter((t) => t.status !== "completed" && t.status !== "deferred");
  if (remaining.length === 0 && appState.tasks.length > 0) {
    const firstTask = appState.tasks.find((t) => t.status !== "completed") || appState.tasks[0];
    firstTask.status = "pending";
  }

  saveState();
  renderAll();
  showToast(`Day Rebalanced: Kept urgent tasks today, moved ${deferred || 3} flexible items & locked ${appState.user.sleep_time} sleep`);
}

function restoreAllDeferredTasks() {
  let restored = 0;
  appState.tasks.forEach((t) => {
    if (t.status === "deferred") {
      t.status = "pending";
      restored++;
    }
  });
  skippedTaskIds = [];
  saveState();
  renderAll();
  showToast(restored > 0 ? `Restored ${restored} deferred tasks to Today's queue` : "All pending tasks are already active in Today's queue");
}

function simulateDynamicReplan(trigger) {
  if (trigger === "exhausted") {
    setEnergyLevel(1);
    appState.tasks.forEach((t) => {
      if (t.status !== "completed" && t.estimated_duration >= 60) {
        t.status = "deferred";
        t.deadline = "Tomorrow (Energy Guard)";
      } else if (t.status === "deferred" && t.estimated_duration <= 45) {
        t.status = "pending";
        t.deadline = "Today (Light Win)";
      }
    });
    saveState();
    renderAll();
    showToast("Exhausted Mode: Heavy 60m+ blocks deferred to tomorrow · Only light 30–45m wins kept");
  } else if (trigger === "meeting_cancelled") {
    const cnTask = appState.tasks.find((t) => t.title.includes("Lab Record") || t.priority === "High");
    if (cnTask) {
      cnTask.status = "pending";
      cnTask.exact_time = "4:00 PM (Pulled Forward)";
      cnTask.deadline = "Today";
    }
    saveState();
    renderAll();
    showToast("Sync Cancelled (+45m freed): Pulled Lab Record into 4:00 PM slot so your evening finishes early");
  } else if (trigger === "deadline_moved") {
    const dbms = appState.tasks.find((t) => t.title.includes("DBMS"));
    if (dbms) {
      dbms.deadline = "Friday (Extended)";
      dbms.priority = "Medium";
      dbms.is_flexible = 1;
    }
    saveState();
    renderAll();
    showToast("DBMS Deadline Moved to Friday: Re-ranked queue to prioritize today's prototype & CN Lab");
  }
}

function getRankedPendingTasks() {
  const pending = appState.tasks.filter((t) => t.status !== "completed" && t.status !== "deferred");
  const energy = appState.energyLevel;

  return [...pending].sort((a, b) => {
    const aSkipped = skippedTaskIds.includes(a.id) ? 1 : 0;
    const bSkipped = skippedTaskIds.includes(b.id) ? 1 : 0;
    if (aSkipped !== bSkipped) return aSkipped - bSkipped;

    if (energy <= 2) {
      return a.estimated_duration - b.estimated_duration;
    }
    if (energy >= 4) {
      const pWeight = { High: 3, Medium: 2, Low: 1 };
      const diff = (pWeight[b.priority] || 1) - (pWeight[a.priority] || 1);
      if (diff !== 0) return diff;
      return b.estimated_duration - a.estimated_duration;
    }
    const pWeight = { High: 3, Medium: 2, Low: 1 };
    return (pWeight[b.priority] || 1) - (pWeight[a.priority] || 1);
  });
}

/* ==========================================================================
   8. RENDERING ENGINE (TODAY, TIMELINE, PLANNER, GOALS, HABITS, PROFILE)
   ========================================================================== */
function renderAll() {
  const userPill = document.getElementById("nav-user-pill");
  if (userPill) userPill.textContent = appState.user.name;

  const sleepStat = document.getElementById("stat-sleep-cutoff");
  if (sleepStat) sleepStat.textContent = appState.user.sleep_time;

  const sleepDesc = document.getElementById("sleep-guard-desc");
  if (sleepDesc) {
    sleepDesc.textContent = `Tasks crossing ${appState.user.sleep_time} are automatically flagged for morning deferral.`;
  }

  const lvl = appState.energyLevel;
  const meta = ENERGY_META[lvl] || ENERGY_META[3];

  const navEnergy = document.getElementById("nav-energy-pill");
  if (navEnergy) navEnergy.textContent = `Energy ${lvl}/5`;

  const badge = document.getElementById("energy-level-badge");
  if (badge) badge.textContent = `${lvl} / 5`;

  const eTitle = document.getElementById("energy-state-title");
  if (eTitle) eTitle.textContent = meta.title;

  const eDesc = document.getElementById("energy-state-desc");
  if (eDesc) eDesc.textContent = meta.desc;

  const loadText = document.getElementById("telemetry-load-text");
  if (loadText) loadText.textContent = meta.load;

  moveSegmentedThumb("energy-seg-control", lvl - 1);

  const pendingCount = appState.tasks.filter((t) => t.status !== "completed" && t.status !== "deferred").length;
  const deferredCount = appState.tasks.filter((t) => t.status === "deferred").length;
  const completedCount = appState.tasks.filter((t) => t.status === "completed").length;
  const totalCount = appState.tasks.length || 1;

  const statPending = document.getElementById("stat-pending-count");
  if (statPending) statPending.textContent = `${pendingCount} Tasks`;

  const statDeferred = document.getElementById("stat-deferred-count");
  if (statDeferred) statDeferred.textContent = `${deferredCount} Tasks`;

  const doneRatio = document.getElementById("telemetry-done-ratio");
  if (doneRatio) doneRatio.textContent = `${completedCount} / ${totalCount}`;

  const progBar = document.getElementById("telemetry-progress-bar");
  if (progBar) progBar.style.width = `${Math.round((completedCount / totalCount) * 100)}%`;

  renderWhatNowCard();
  renderTimeline();
  renderPlannerBuckets();
  renderAllTasksList();
  renderGoalsAndLife();
  renderProfileView();
}

function renderProfileView() {
  const u = appState.user || {};
  const name = u.name || "Cherry";
  const email = u.email || "cherry@campus.edu";
  const dept = u.department || "Computer Science · Sem 5";
  const sType = u.student_type || "Project-heavy";
  const sleep = u.sleep_time || "11:30 PM";

  const initialsEl = document.getElementById("profile-avatar-initials");
  if (initialsEl) {
    const parts = name.trim().split(/\s+/);
    initialsEl.textContent =
      parts.length > 1
        ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
        : name.slice(0, 2).toUpperCase();
  }

  const dName = document.getElementById("profile-display-name");
  if (dName) dName.textContent = name;

  const dEmail = document.getElementById("profile-display-email");
  if (dEmail) dEmail.textContent = `${email} · ${dept}`;

  const dType = document.getElementById("profile-display-type");
  if (dType) dType.textContent = sType;

  const dSleep = document.getElementById("profile-display-sleep");
  if (dSleep) dSleep.textContent = `Sleep Cutoff · ${sleep}`;

  const completedCount = appState.tasks.filter((t) => t.status === "completed").length;
  const pendingCount = appState.tasks.filter((t) => t.status !== "completed" && t.status !== "deferred").length;
  const totalStreaks = (appState.habits || []).reduce((acc, h) => acc + (h.streak || 0), 0);

  const stComp = document.getElementById("profile-stat-completed");
  if (stComp) stComp.textContent = `${completedCount} ${completedCount === 1 ? "Task" : "Tasks"}`;

  const stPend = document.getElementById("profile-stat-pending");
  if (stPend) stPend.textContent = `${pendingCount} ${pendingCount === 1 ? "Task" : "Tasks"}`;

  const stStrk = document.getElementById("profile-stat-streaks");
  if (stStrk) stStrk.textContent = `${totalStreaks} Days`;

  const stEng = document.getElementById("profile-stat-energy");
  if (stEng) stEng.textContent = `Energy ${appState.energyLevel} / 5`;

  const inName = document.getElementById("profile-input-name");
  if (inName && document.activeElement !== inName) inName.value = name;

  const inEmail = document.getElementById("profile-input-email");
  if (inEmail && document.activeElement !== inEmail) inEmail.value = email;

  const inDept = document.getElementById("profile-input-dept");
  if (inDept && document.activeElement !== inDept) inDept.value = dept;

  const inType = document.getElementById("profile-input-type");
  if (inType && document.activeElement !== inType) inType.value = sType;

  const inSleep = document.getElementById("profile-input-sleep");
  if (inSleep && document.activeElement !== inSleep) inSleep.value = sleep;

  const inEnergy = document.getElementById("profile-input-energy");
  if (inEnergy && document.activeElement !== inEnergy) inEnergy.value = String(appState.energyLevel);
}

function saveProfileSettings(e) {
  e.preventDefault();
  const inName = document.getElementById("profile-input-name")?.value.trim();
  const inEmail = document.getElementById("profile-input-email")?.value.trim();
  const inDept = document.getElementById("profile-input-dept")?.value.trim();
  const inType = document.getElementById("profile-input-type")?.value;
  const inSleep = document.getElementById("profile-input-sleep")?.value;
  const inEnergy = parseInt(document.getElementById("profile-input-energy")?.value || "3", 10);

  if (inName) appState.user.name = inName;
  if (inEmail) appState.user.email = inEmail;
  if (inDept) appState.user.department = inDept;
  if (inType) appState.user.student_type = inType;
  if (inSleep) appState.user.sleep_time = inSleep;
  if (inEnergy >= 1 && inEnergy <= 5) appState.energyLevel = inEnergy;

  saveState();
  renderAll();
  showToast(`Saved profile for ${appState.user.name} · Sleep Guard locked at ${appState.user.sleep_time}`);
}

function exportProfileDataJSON() {
  try {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(appState, null, 2));
    const dlAnchor = document.createElement("a");
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute("download", `fenestra-profile-${(appState.user.name || "user").toLowerCase().replace(/\s+/g, "-")}.json`);
    document.body.appendChild(dlAnchor);
    dlAnchor.click();
    dlAnchor.remove();
    showToast("Exported Fenestra workspace & profile data (.JSON)");
  } catch (err) {
    showToast("Workspace state saved to local storage");
  }
}

function renderWhatNowCard() {
  const ranked = getRankedPendingTasks();
  const top = ranked[0];

  const titleEl = document.getElementById("wn-title");
  const tagEl = document.getElementById("wn-course-tag");
  const reasonEl = document.getElementById("wn-reason");
  const durEl = document.getElementById("wn-duration");
  const deadEl = document.getElementById("wn-deadline");
  const prioEl = document.getElementById("wn-priority");

  if (!top) {
    if (titleEl) titleEl.textContent = "All Active Tasks Complete";
    if (tagEl) tagEl.textContent = "REST & RECOVERY";
    if (reasonEl) reasonEl.textContent = `Your queue is clear. Enjoy your evening before ${appState.user.sleep_time}, or click Reshuffle Queue to restore deferred items.`;
    if (durEl) durEl.textContent = "0 min";
    if (deadEl) deadEl.textContent = "Done";
    if (prioEl) prioEl.textContent = "Rest";
    return;
  }

  if (titleEl) titleEl.textContent = top.title;
  if (tagEl) tagEl.textContent = top.course_tag || "ACADEMIC · SPRINT";
  if (durEl) durEl.textContent = `${top.estimated_duration} min`;
  if (deadEl) deadEl.textContent = `${top.deadline} · ${top.exact_time}`;
  if (prioEl) prioEl.textContent = top.priority;

  if (reasonEl) {
    if (appState.energyLevel <= 2) {
      reasonEl.textContent = `Short ${top.estimated_duration}m task selected for low energy.`;
    } else if (appState.energyLevel >= 4) {
      reasonEl.textContent = `High-priority ${top.estimated_duration}m task matched for high focus.`;
    } else {
      reasonEl.textContent = `Estimated ${top.estimated_duration}m · Fits before your ${appState.user.sleep_time} sleep cutoff.`;
    }
  }

  const fTitle = document.getElementById("focus-task-title");
  const fMeta = document.getElementById("focus-task-meta");
  if (fTitle) fTitle.textContent = top.title;
  if (fMeta) fMeta.textContent = `${top.estimated_duration} min · ${top.priority} Priority`;
}

function renderTimeline() {
  const container = document.getElementById("timeline-list");
  if (!container) return;

  const ranked = getRankedPendingTasks().slice(0, 4);
  if (ranked.length === 0) {
    container.innerHTML = `
      <div class="inset-row">
        <span class="hig-footnote">No pending tasks remaining today.</span>
        <span class="hig-pill">Clear</span>
      </div>
    `;
    return;
  }

  const slots = ["4:00 PM", "5:15 PM", "6:30 PM", "8:00 PM"];
  container.innerHTML = ranked
    .map(
      (t, idx) => `
      <div class="inset-row">
        <div class="flex items-center gap-4 min-w-0">
          <span class="hig-caption tabular-nums w-16 shrink-0">${slots[idx] || t.exact_time}</span>
          <div class="min-w-0">
            <div class="hig-headline truncate">${escapeHtml(t.title)}</div>
            <div class="hig-footnote tabular-nums">${escapeHtml(t.deadline)} · ${t.estimated_duration}m</div>
          </div>
        </div>
        <div class="flex items-center gap-2 shrink-0">
          <span class="hig-pill ${idx === 0 ? "hig-pill-strong" : ""}">${idx === 0 ? "Up Next" : t.priority}</span>
        </div>
      </div>
    `
    )
    .join("");
}

function renderPlannerBuckets() {
  const bMorning = document.getElementById("bucket-morning");
  const bAfternoon = document.getElementById("bucket-afternoon");
  const bEvening = document.getElementById("bucket-evening");
  if (!bMorning || !bAfternoon || !bEvening) return;

  const pending = appState.tasks.filter((t) => t.status !== "completed");
  const morningTasks = pending.filter((t) => t.estimated_duration <= 45).slice(0, 2);
  const afternoonTasks = pending.filter((t) => t.priority === "High").slice(0, 2);
  const eveningTasks = pending.filter((t) => t.priority !== "High" || t.status === "deferred").slice(0, 2);

  const renderBucketRows = (items, fallback) =>
    items.length
      ? items
          .map(
            (t) => `
        <div class="inset-row py-2.5 min-h-[46px]">
          <div class="min-w-0">
            <div class="hig-headline text-sm truncate">${escapeHtml(t.title)}</div>
            <div class="hig-footnote text-xs tabular-nums">${t.estimated_duration}m · ${escapeHtml(t.deadline)}</div>
          </div>
          <span class="hig-pill">${t.status === "deferred" ? "Deferred" : t.priority}</span>
        </div>
      `
          )
          .join("")
      : `<div class="inset-row py-2.5"><span class="hig-footnote text-xs">${fallback}</span></div>`;

  bMorning.innerHTML = renderBucketRows(morningTasks, "Clear morning block");
  bAfternoon.innerHTML = renderBucketRows(afternoonTasks, "No heavy sprints remaining");
  bEvening.innerHTML = renderBucketRows(eveningTasks, "Protected 23:30 Sleep Cutoff");
}

function renderAllTasksList() {
  const container = document.getElementById("all-tasks-container");
  if (!container) return;

  let filtered = appState.tasks;
  if (currentTaskFilter === "pending") {
    filtered = appState.tasks.filter((t) => t.status !== "completed");
  } else if (currentTaskFilter === "completed") {
    filtered = appState.tasks.filter((t) => t.status === "completed");
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="inset-row">
        <span class="hig-footnote">No tasks in this filter.</span>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered
    .map((t) => {
      const isDone = t.status === "completed";
      const isDeferred = t.status === "deferred";
      return `
      <div class="inset-row">
        <div class="flex items-center gap-3.5 min-w-0">
          <button
            type="button"
            onclick="toggleTaskDone(${t.id})"
            class="task-check-btn ${isDone ? "is-checked" : ""}"
            aria-label="Toggle task complete"
          >✓</button>
          <div class="min-w-0">
            <div class="hig-headline truncate ${isDone ? "line-through opacity-50" : ""}">${escapeHtml(t.title)}</div>
            <div class="hig-footnote tabular-nums">${escapeHtml(t.deadline)} · ${escapeHtml(t.exact_time)} · ${t.estimated_duration}m</div>
          </div>
        </div>
        <div class="flex items-center gap-2 shrink-0">
          <span class="hig-pill">${isDeferred ? "Deferred" : t.priority}</span>
        </div>
      </div>
    `;
    })
    .join("");
}

function renderGoalsAndLife() {
  const goalsEl = document.getElementById("goals-list-container");
  const habitsEl = document.getElementById("habits-list-container");
  const oppsEl = document.getElementById("opportunities-list-container");

  if (goalsEl && Array.isArray(appState.goals)) {
    goalsEl.innerHTML = appState.goals
      .map(
        (g) => `
        <div class="inset-group p-5">
          <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
            <div class="flex items-center gap-2">
              <span class="hig-pill">${escapeHtml(g.category)}</span>
              <span class="hig-caption tabular-nums">${g.streak_days}d streak</span>
            </div>
            <span class="hig-headline tabular-nums text-sm">${g.progress}%</span>
          </div>
          <div class="hig-headline mb-2">${escapeHtml(g.title)}</div>
          <div class="h-2 rounded-full overflow-hidden mb-4" style="background: var(--sys-tertiary);">
            <div class="h-full rounded-full transition-all duration-500" style="width: ${g.progress}%; background: var(--accent-fill);"></div>
          </div>
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t" style="border-color: var(--sys-hairline);">
            <span class="hig-footnote">Today: <strong>${escapeHtml(g.today_action)}</strong></span>
            <button
              type="button"
              onclick="scheduleGoalMicroStep(${g.id})"
              class="${g.scheduled_today ? "hig-btn-secondary" : "hig-btn-primary"} hig-btn-compact shrink-0"
            >
              <span class="ms-icon text-sm">${g.scheduled_today ? "check" : "add_task"}</span>
              <span>${g.scheduled_today ? "Scheduled" : "Schedule"}</span>
            </button>
          </div>
        </div>
      `
      )
      .join("");
  }

  if (habitsEl && Array.isArray(appState.habits)) {
    habitsEl.innerHTML = appState.habits
      .map(
        (h) => `
        <div class="inset-row cursor-pointer" onclick="toggleHabitStreak(${h.id})">
          <div class="flex items-center gap-3 min-w-0">
            <button
              type="button"
              class="w-6 h-6 rounded-full border flex items-center justify-center text-xs transition-colors shrink-0"
              style="border-color: var(--sys-hairline-strong); background: ${h.completed_today ? "var(--accent-fill)" : "transparent"}; color: ${h.completed_today ? "var(--accent-text)" : "transparent"};"
            >✓</button>
            <div class="min-w-0">
              <div class="hig-headline text-sm truncate ${h.completed_today ? "line-through opacity-60" : ""}">${escapeHtml(h.title)}</div>
              <div class="hig-footnote text-xs">${escapeHtml(h.window)}</div>
            </div>
          </div>
          <span class="hig-pill tabular-nums shrink-0">${h.streak}d streak</span>
        </div>
      `
      )
      .join("");
  }

  if (oppsEl && Array.isArray(appState.opportunities)) {
    oppsEl.innerHTML = appState.opportunities
      .map(
        (o) => `
        <div class="inset-group p-5 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between gap-2 mb-2">
              <span class="hig-pill ${o.conflict ? "" : "hig-pill-strong"}">${escapeHtml(o.type)} · ${escapeHtml(o.org)}</span>
              <span class="hig-caption tabular-nums">${escapeHtml(o.deadline)}</span>
            </div>
            <div class="hig-headline mb-1">${escapeHtml(o.title)}</div>
            <p class="hig-footnote mb-4">${escapeHtml(o.match_reason)}</p>
          </div>
          <div class="flex items-center justify-between pt-3 border-t" style="border-color: var(--sys-hairline);">
            <span class="hig-caption tabular-nums">${o.prep_duration}m Prep</span>
            <button
              type="button"
              onclick="scheduleOpportunityPrep(${o.id})"
              class="hig-btn-secondary hig-btn-compact"
            >
              <span class="ms-icon text-sm">${o.conflict ? "shield_moon" : "calendar_add_on"}</span>
              <span>${o.status === "scheduled" ? "Scheduled" : o.conflict ? "Past Cutoff" : "Add Prep"}</span>
            </button>
          </div>
        </div>
      `
      )
      .join("");
  }
}

function scheduleGoalMicroStep(goalId) {
  const goal = appState.goals.find((g) => g.id === goalId);
  if (!goal) return;
  if (!goal.scheduled_today) {
    goal.scheduled_today = true;
    goal.progress = Math.min(100, goal.progress + 5);
    goal.streak_days += 1;
    appState.tasks.unshift({
      id: Date.now(),
      title: goal.today_action,
      course_tag: `GOAL · ${goal.category.toUpperCase()}`,
      category: "Academic",
      deadline: "Today",
      exact_time: "6:00 PM",
      priority: "Medium",
      estimated_duration: goal.action_duration || 30,
      status: "pending",
      is_flexible: 1
    });
    saveState();
    renderAll();
    showToast(`Injected "${goal.today_action}" into Today's schedule`);
  } else {
    showToast("Micro-step is already in Today's schedule");
  }
}

function toggleHabitStreak(habitId) {
  const habit = appState.habits.find((h) => h.id === habitId);
  if (!habit) return;
  habit.completed_today = !habit.completed_today;
  habit.streak = habit.completed_today ? habit.streak + 1 : Math.max(0, habit.streak - 1);
  saveState();
  renderAll();
  showToast(habit.completed_today ? `Habit logged · ${habit.streak}d streak!` : "Habit unchecked");
}

function scheduleOpportunityPrep(oppId) {
  const opp = appState.opportunities.find((o) => o.id === oppId);
  if (!opp) return;
  if (opp.conflict) {
    showToast(`Protected 23:30 Sleep Cutoff: "${opp.title}" kept out of late-night queue`);
    return;
  }
  opp.status = "scheduled";
  appState.tasks.unshift({
    id: Date.now(),
    title: `Prep: ${opp.title}`,
    course_tag: `OPPORTUNITY · ${opp.type.toUpperCase()}`,
    category: "Events",
    deadline: opp.deadline.split("·")[0].trim() || "Tomorrow",
    exact_time: "5:30 PM",
    priority: "Medium",
    estimated_duration: opp.prep_duration || 45,
    status: "pending",
    is_flexible: 1
  });
  saveState();
  renderAll();
  showToast(`Scheduled ${opp.prep_duration}m prep block for "${opp.title}"`);
}

/* ==========================================================================
   9. NATURAL LANGUAGE QUICK ADD & TASK ACTIONS
   ========================================================================== */
function handleQuickNaturalAdd(e) {
  e.preventDefault();
  const input = document.getElementById("quick-nlp-input");
  if (!input || !input.value.trim()) return;

  const raw = input.value.trim();
  let priority = "Medium";
  if (/#high\b/i.test(raw)) priority = "High";
  else if (/#low\b/i.test(raw)) priority = "Low";

  let deadline = "Tomorrow";
  if (/\btoday\b/i.test(raw)) deadline = "Today";
  else if (/\bfriday\b/i.test(raw)) deadline = "Friday";
  else if (/\bmonday\b/i.test(raw)) deadline = "Monday";

  const timeMatch = raw.match(/\b(\d{1,2}(?::\d{2})?\s*(?:AM|PM|am|pm))\b/);
  const exactTime = timeMatch ? timeMatch[1].toUpperCase() : "5:00 PM";

  const cleanTitle = raw
    .replace(/#(high|medium|low)\b/gi, "")
    .replace(/\b(today|tomorrow|friday|monday)\b/gi, "")
    .replace(/\b(\d{1,2}(?::\d{2})?\s*(?:AM|PM|am|pm))\b/gi, "")
    .replace(/\s{2,}/g, " ")
    .trim();

  appState.tasks.unshift({
    id: Date.now(),
    title: cleanTitle || raw,
    course_tag: "QUICK NLP · WORKSPACE",
    category: "Academic",
    deadline,
    exact_time: exactTime,
    priority,
    estimated_duration: priority === "High" ? 60 : 45,
    status: "pending",
    is_flexible: priority === "High" ? 0 : 1
  });

  input.value = "";
  saveState();
  renderAll();
  showToast(`Added "${cleanTitle || raw}" (${deadline} · ${exactTime})`);
}

function initWhatNowDragGesture() {
  const card = document.getElementById("what-now-card");
  if (!card) return;

  let startX = 0;
  let currentX = 0;
  let isDragging = false;

  card.addEventListener("pointerdown", (e) => {
    if (e.target.closest("button")) return;
    isDragging = true;
    startX = e.clientX;
    currentX = 0;
    card.style.transition = "none";
  });

  window.addEventListener("pointermove", (e) => {
    if (!isDragging) return;
    currentX = e.clientX - startX;
    if (currentX < 0) {
      const damped = currentX * 0.65;
      const rot = Math.max(-4, damped * 0.02);
      card.style.transform = `translate3d(${damped}px, 0, 0) rotate(${rot}deg)`;
      card.style.opacity = `${Math.max(0.55, 1 - Math.abs(damped) / 320)}`;
    }
  });

  window.addEventListener("pointerup", () => {
    if (!isDragging) return;
    isDragging = false;
    card.style.transition = "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease";

    if (currentX < -90) {
      skipWhatNowTask();
    }
    card.style.transform = "translate3d(0, 0, 0) rotate(0deg)";
    card.style.opacity = "1";
  });
}

function skipWhatNowTask() {
  const ranked = getRankedPendingTasks();
  if (!ranked.length) return;
  const current = ranked[0];
  if (!skippedTaskIds.includes(current.id)) {
    skippedTaskIds.push(current.id);
  }
  if (skippedTaskIds.length >= ranked.length) {
    skippedTaskIds = [];
  }
  renderAll();
  showToast("Task deferred · Surfaced next optimal option");
}

function completeCurrentWhatNow() {
  const ranked = getRankedPendingTasks();
  if (!ranked.length) return;
  const top = ranked[0];
  top.status = "completed";
  saveState();
  renderAll();
  showToast(`Completed "${top.title}"`);
}

function toggleTaskDone(id) {
  const task = appState.tasks.find((t) => t.id === id);
  if (!task) return;
  task.status = task.status === "completed" ? "pending" : "completed";
  saveState();
  renderAll();
  showToast(task.status === "completed" ? "Task marked complete" : "Task reopened");
}

function filterTasksList(filter, idx) {
  currentTaskFilter = filter;
  moveSegmentedThumb("tasks-seg-control", idx);
  renderAllTasksList();
}

function toggleQuickAddTask() {
  const form = document.getElementById("quick-add-form");
  if (!form) return;
  form.classList.toggle("hidden");
  if (!form.classList.contains("hidden")) {
    document.getElementById("qa-title")?.focus();
  }
}

function submitQuickAddTask(e) {
  e.preventDefault();
  const titleEl = document.getElementById("qa-title");
  const deadEl = document.getElementById("qa-deadline");
  const prioEl = document.getElementById("qa-priority");
  if (!titleEl || !titleEl.value.trim()) return;

  appState.tasks.unshift({
    id: Date.now(),
    title: titleEl.value.trim(),
    course_tag: "WORKSPACE · MANUAL",
    category: "Academic",
    deadline: deadEl?.value.trim() || "Tomorrow",
    exact_time: "5:00 PM",
    priority: prioEl?.value || "Medium",
    estimated_duration: 45,
    status: "pending",
    is_flexible: 1
  });

  titleEl.value = "";
  if (deadEl) deadEl.value = "";
  toggleQuickAddTask();
  saveState();
  renderAll();
  showToast("Task added to adaptive queue");
}

function triggerAutoReshuffle() {
  skippedTaskIds = [];
  const activePending = appState.tasks.filter((t) => t.status !== "completed" && t.status !== "deferred");
  if (activePending.length === 0) {
    appState.tasks.forEach((t) => {
      if (t.status === "deferred") t.status = "pending";
    });
    saveState();
  }
  renderAll();
  showToast(`Schedule reshuffled for Energy ${appState.energyLevel}/5`);
}

function applyOverloadRelief() {
  let moved = 0;
  appState.tasks.forEach((t) => {
    if (t.status !== "completed" && (t.is_flexible || t.priority !== "High")) {
      t.status = "deferred";
      t.deadline = "Tomorrow Morning";
      moved++;
    }
  });
  const remaining = appState.tasks.filter((t) => t.status !== "completed" && t.status !== "deferred");
  if (remaining.length === 0 && appState.tasks.length > 0) {
    const top = appState.tasks.find((t) => t.status !== "completed") || appState.tasks[0];
    top.status = "pending";
  }
  saveState();
  renderAll();
  showToast(moved > 0 ? `Deferred ${moved} flexible tasks to tomorrow` : "Queue already optimized");
}

function protectSleepWindow() {
  let count = 0;
  appState.tasks.forEach((t) => {
    if (t.status !== "completed" && t.exact_time.includes("11:59")) {
      t.exact_time = "9:00 AM";
      t.deadline = "Tomorrow Morning";
      count++;
    }
  });
  saveState();
  renderAll();
  showToast(count > 0 ? `Protected ${appState.user.sleep_time} cutoff` : `${appState.user.sleep_time} sleep cutoff is clear`);
}

/* ==========================================================================
   10. SMART CAPTURE OCR & TIME DISAMBIGUATION
   ========================================================================== */
function loadSampleScenario(key) {
  const preset = SAMPLE_PRESETS[key] || SAMPLE_PRESETS.cn_whatsapp;
  const rawInput = document.getElementById("capture-raw-text");
  if (rawInput) rawInput.value = preset.raw_text;
  pendingExtractedTask = { ...preset };
  renderExtractionPreview(pendingExtractedTask);
  showToast("Scenario loaded · Inspect structured preview");
}

function handleScreenshotUpload(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const name = file.name.toLowerCase();
  if (name.includes("club") || name.includes("discord")) {
    loadSampleScenario("club_approximate");
  } else if (name.includes("dbms") || name.includes("canvas")) {
    loadSampleScenario("dbms_portal");
  } else {
    loadSampleScenario("cn_whatsapp");
  }
}

function runSmartExtract() {
  const raw = document.getElementById("capture-raw-text")?.value.trim() || "";
  if (!raw) {
    loadSampleScenario("cn_whatsapp");
    return;
  }

  const lower = raw.toLowerCase();
  const hasEveningOrMorning = lower.includes("evening") || lower.includes("morning") || lower.includes("night");
  const hasAmbiguousNine = /\b([1-9]|1[0-2]):00\b/.test(raw) && !/\b(am|pm)\b/i.test(raw);
  const timeMatch = raw.match(/\b(\d{1,2}:\d{2}\s*(?:AM|PM|am|pm)?)\b/);

  const needsConfirm = hasEveningOrMorning || hasAmbiguousNine || !timeMatch;
  pendingExtractedTask = {
    raw_text: raw,
    title: raw.split(/[.,!]/)[0].slice(0, 42) || "Captured Academic Task",
    deadline: lower.includes("monday") ? "Monday" : "Tomorrow",
    exact_time: timeMatch ? timeMatch[1].toUpperCase() : "Needs Confirmation",
    priority: lower.includes("marks") || lower.includes("due") ? "High" : "Medium",
    duration: 45,
    needs_confirm: needsConfirm,
    note: "Ambiguous or approximate time window detected. Confirm an exact slot before scheduling:",
    options: ["9:00 AM", "5:00 PM", "8:00 PM"]
  };

  renderExtractionPreview(pendingExtractedTask);
  showToast(needsConfirm ? "Please confirm exact time slot" : "Structured task extracted");
}

function renderExtractionPreview(item) {
  const tEl = document.getElementById("ext-title");
  const dEl = document.getElementById("ext-deadline");
  const tmEl = document.getElementById("ext-time");
  const pEl = document.getElementById("ext-priority");
  const badge = document.getElementById("ext-accuracy-badge");
  const confirmBox = document.getElementById("ext-confirm-box");
  const confirmNote = document.getElementById("ext-confirm-note");
  const confirmBtns = document.getElementById("ext-confirm-buttons");

  if (tEl) tEl.textContent = item.title;
  if (dEl) dEl.textContent = item.deadline;
  if (tmEl) tmEl.textContent = item.exact_time;
  if (pEl) pEl.textContent = `${item.priority} · ${item.duration}m`;

  if (badge) {
    badge.textContent = item.needs_confirm ? "Confirm Time" : "Exact Time Verified";
    badge.classList.toggle("hig-pill-strong", !item.needs_confirm);
  }

  if (confirmBox) {
    confirmBox.classList.toggle("hidden", !item.needs_confirm);
    if (confirmNote && item.note) confirmNote.textContent = item.note;
    if (confirmBtns && Array.isArray(item.options)) {
      confirmBtns.innerHTML = item.options
        .map(
          (slot) =>
            `<button type="button" onclick="confirmApproximateTime('${slot}')" class="hig-btn-secondary hig-btn-compact tabular-nums">${slot}</button>`
        )
        .join("");
    }
  }
}

function confirmApproximateTime(slot) {
  pendingExtractedTask.exact_time = slot;
  pendingExtractedTask.needs_confirm = false;
  renderExtractionPreview(pendingExtractedTask);
  showToast(`Time verified as ${slot}`);
}

function commitExtractedTask() {
  appState.tasks.unshift({
    id: Date.now(),
    title: pendingExtractedTask.title,
    course_tag: "SMART CAPTURE · OCR",
    category: "Academic",
    deadline: pendingExtractedTask.deadline,
    exact_time: pendingExtractedTask.needs_confirm ? "6:00 PM" : pendingExtractedTask.exact_time,
    priority: pendingExtractedTask.priority,
    estimated_duration: pendingExtractedTask.duration || 45,
    status: "pending",
    is_flexible: 1
  });

  saveState();
  renderAll();
  switchAppView("today", 0);
  showToast(`Added "${pendingExtractedTask.title}" to schedule`);
}

/* ==========================================================================
   11. FOCUS SANCTUARY & PROCEDURAL WEBAUDIO SOUNDSCAPE SYNTHESIZER
   ========================================================================== */
function openFocusOverlay() {
  const ranked = getRankedPendingTasks();
  const top = ranked[0];
  if (top) {
    focusSecondsRemaining = (top.estimated_duration || 50) * 60;
    updateFocusTimerText();
  }
  document.getElementById("focus-overlay")?.classList.remove("hidden");
}

function closeFocusOverlay() {
  if (focusTimerRunning) toggleFocusTimer();
  document.getElementById("focus-overlay")?.classList.add("hidden");
  const idxMap = { today: 0, capture: 1, tasks: 2, life: 3, profile: 5 };
  moveSegmentedThumb("app-seg-control", idxMap[currentAppView] ?? 0);
}

function setFocusDurationMinutes(mins) {
  clearInterval(focusTimerInterval);
  focusTimerRunning = false;
  focusSecondsRemaining = mins * 60;
  updateFocusTimerText();
  const btn = document.getElementById("focus-play-btn");
  if (btn) btn.innerHTML = '<span class="ms-icon text-base">play_arrow</span><span>Start</span>';
  showToast(`Focus timer set to ${mins} minutes`);
}

function toggleFocusTimer() {
  const btn = document.getElementById("focus-play-btn");
  if (focusTimerRunning) {
    clearInterval(focusTimerInterval);
    focusTimerRunning = false;
    if (btn) btn.innerHTML = '<span class="ms-icon text-base">play_arrow</span><span>Resume</span>';
  } else {
    focusTimerRunning = true;
    if (btn) btn.innerHTML = '<span class="ms-icon text-base">pause</span><span>Pause</span>';
    focusTimerInterval = setInterval(() => {
      if (focusSecondsRemaining > 0) {
        focusSecondsRemaining--;
        updateFocusTimerText();
      } else {
        clearInterval(focusTimerInterval);
        focusTimerRunning = false;
        showToast("Focus session complete");
      }
    }, 1000);
  }
}

function resetFocusTimer() {
  clearInterval(focusTimerInterval);
  focusTimerRunning = false;
  const ranked = getRankedPendingTasks();
  focusSecondsRemaining = ((ranked[0] && ranked[0].estimated_duration) || 50) * 60;
  updateFocusTimerText();
  const btn = document.getElementById("focus-play-btn");
  if (btn) btn.innerHTML = '<span class="ms-icon text-base">play_arrow</span><span>Start</span>';
}

function updateFocusTimerText() {
  const mins = Math.floor(focusSecondsRemaining / 60);
  const secs = focusSecondsRemaining % 60;
  const display = document.getElementById("focus-timer-display");
  if (display) {
    display.textContent = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }
}

function completeTaskFromFocus() {
  completeCurrentWhatNow();
  closeFocusOverlay();
}

function stopCurrentAudioNodes() {
  activeAudioNodes.forEach((n) => {
    try {
      if (n.stop) n.stop();
      if (n.disconnect) n.disconnect();
    } catch (e) {}
  });
  activeAudioNodes = [];
}

function selectFocusAudioMode(mode) {
  stopCurrentAudioNodes();
  currentAudioMode = mode;

  const labelMap = {
    off: "Off",
    rain: "Cedar Rain",
    brown: "Brown Noise",
    drone: "40Hz Focus"
  };

  const headerLabel = document.getElementById("header-audio-label");
  const focusStatus = document.getElementById("focus-sound-status");
  if (headerLabel) headerLabel.textContent = `Audio: ${labelMap[mode] || "Off"}`;
  if (focusStatus) focusStatus.textContent = `Soundscape: ${labelMap[mode] || "Off"}`;

  if (mode === "off") {
    showToast("Ambient audio muted");
    return;
  }

  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === "suspended") audioCtx.resume();

    if (mode === "rain" || mode === "brown") {
      const bufferSize = 2 * audioCtx.sampleRate;
      const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = output[i];
        output[i] *= mode === "brown" ? 2.2 : 1.4;
      }

      const source = audioCtx.createBufferSource();
      source.buffer = noiseBuffer;
      source.loop = true;

      const filter = audioCtx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = mode === "brown" ? 320 : 880;

      const gain = audioCtx.createGain();
      gain.gain.value = 0.08;

      source.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);
      source.start();
      activeAudioNodes.push(source, filter, gain);
    } else if (mode === "drone") {
      const osc1 = audioCtx.createOscillator();
      const osc2 = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc1.type = "sine";
      osc2.type = "sine";
      osc1.frequency.value = 200;
      osc2.frequency.value = 240;
      gain.gain.value = 0.04;

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(audioCtx.destination);
      osc1.start();
      osc2.start();
      activeAudioNodes.push(osc1, osc2, gain);
    }

    showToast(`Playing ${labelMap[mode]}`);
  } catch (err) {
    console.warn("WebAudio unavailable:", err);
  }
}

function cycleAmbientSoundscape() {
  const order = ["off", "rain", "brown", "drone"];
  const nextIdx = (order.indexOf(currentAudioMode) + 1) % order.length;
  selectFocusAudioMode(order[nextIdx]);
}

/* ==========================================================================
   12. UNIVERSAL ⌘K COMMAND PALETTE & INTERACTIVE HELP GUIDE
   ========================================================================== */
const COMMAND_ITEMS = [
  { title: "Take Care of My Day (Rebalance)", shortcut: "Auto", action: () => { enterDemoWorkspace("today"); takeCareOfMyDay(); } },
  { title: "Today View", shortcut: "View", action: () => { enterDemoWorkspace("today"); } },
  { title: "Smart Capture", shortcut: "View", action: () => { enterDemoWorkspace("capture"); } },
  { title: "Planner Buckets", shortcut: "View", action: () => { enterDemoWorkspace("tasks"); } },
  { title: "Goals & Habits", shortcut: "View", action: () => { enterDemoWorkspace("life"); } },
  { title: "Profile & Settings", shortcut: "Profile", action: () => { enterDemoWorkspace("profile"); } },
  { title: "Focus Mode", shortcut: "Focus", action: () => { enterDemoWorkspace("focus"); } },
  { title: "Set Energy Level 5 (Peak)", shortcut: "5", action: () => { enterDemoWorkspace("today"); setEnergyLevel(5); } },
  { title: "Set Energy Level 1 (Low)", shortcut: "1", action: () => { enterDemoWorkspace("today"); setEnergyLevel(1); } },
  { title: "Toggle Ambient Audio", shortcut: "Audio", action: () => { selectFocusAudioMode(currentAudioMode === "rain" ? "off" : "rain"); } },
  { title: "Switch Dark / Light Theme", shortcut: "T", action: () => { toggleTheme(); } },
  { title: "Sign Out", shortcut: "Exit", action: () => { signOutUserAccount(); } },
  { title: "Help & Shortcuts", shortcut: "?", action: () => { openHelpModal(); } },
  { title: "Reset Demo Data", shortcut: "Reset", action: () => { resetDemoWorkspace(); } }
];

function openCommandPalette() {
  const modal = document.getElementById("cmd-palette-modal");
  const input = document.getElementById("cmd-palette-input");
  if (!modal) return;
  modal.classList.remove("hidden");
  if (input) {
    input.value = "";
    renderCommandPaletteList("");
    setTimeout(() => input.focus(), 40);
  }
}

function closeCommandPalette() {
  document.getElementById("cmd-palette-modal")?.classList.add("hidden");
}

function renderCommandPaletteList(query = "") {
  const list = document.getElementById("cmd-palette-list");
  if (!list) return;
  const q = query.trim().toLowerCase();
  const matches = COMMAND_ITEMS.filter((item) => item.title.toLowerCase().includes(q) || item.shortcut.toLowerCase().includes(q));

  if (!matches.length) {
    list.innerHTML = `<div class="p-4 text-center hig-footnote">No matching commands found.</div>`;
    return;
  }

  list.innerHTML = matches
    .map(
      (item) => `
      <button
        type="button"
        onclick="executeCommandItem(${COMMAND_ITEMS.indexOf(item)})"
        class="w-full px-4 py-3 flex items-center justify-between text-left rounded-xl hover:opacity-80 transition-opacity"
      >
        <span class="hig-headline text-sm">${item.title}</span>
        <span class="kbd-badge">${item.shortcut}</span>
      </button>
    `
    )
    .join("");
}

function executeCommandItem(index) {
  closeCommandPalette();
  const item = COMMAND_ITEMS[index];
  if (item && item.action) item.action();
}

function openHelpModal() {
  document.getElementById("help-modal")?.classList.remove("hidden");
}

function closeHelpModal() {
  document.getElementById("help-modal")?.classList.add("hidden");
}

function initGlobalKeyboardShortcuts() {
  window.addEventListener("keydown", (e) => {
    const tag = (e.target && e.target.tagName) || "";
    const isTyping = tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";

    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      const modal = document.getElementById("cmd-palette-modal");
      if (modal && !modal.classList.contains("hidden")) {
        closeCommandPalette();
      } else {
        openCommandPalette();
      }
      return;
    }

    if (e.key === "Escape") {
      closeCommandPalette();
      closeHelpModal();
      const focusModal = document.getElementById("focus-overlay");
      if (focusModal && !focusModal.classList.contains("hidden")) {
        closeFocusOverlay();
      }
      return;
    }

    if (isTyping) return;

    if (e.key === "?") {
      e.preventDefault();
      openHelpModal();
    } else if (e.key.toLowerCase() === "t") {
      e.preventDefault();
      toggleTheme();
    } else if (["1", "2", "3", "4", "5"].includes(e.key) && currentStage === "app") {
      setEnergyLevel(parseInt(e.key, 10));
    }
  });
}

/* ==========================================================================
   13. DYNAMIC ISLAND HUD TOAST FEEDBACK
   ========================================================================== */
function showToast(message) {
  const container = document.getElementById("hud-container");
  if (!container) return;

  const pill = document.createElement("div");
  pill.className = "hig-pill hig-pill-strong px-4 py-2 text-xs shadow-lg";
  pill.style.height = "34px";
  pill.style.transition = "opacity 0.22s ease-out, transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)";
  pill.style.opacity = "0";
  pill.style.transform = "translateY(-8px) scale(0.96)";
  pill.textContent = message;

  container.appendChild(pill);

  requestAnimationFrame(() => {
    pill.style.opacity = "1";
    pill.style.transform = "translateY(0) scale(1)";
  });

  setTimeout(() => {
    pill.style.opacity = "0";
    pill.style.transform = "translateY(-6px) scale(0.96)";
    setTimeout(() => pill.remove(), 260);
  }, 2200);
}

function escapeHtml(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
