---
name: apple-hig-designer
description: >
  Generate Apple Human Interface Guidelines (HIG) compliant UI components, pages, design systems,
  and layout structures for web, mobile, and desktop applications. Provides exact design tokens,
  SF Pro typography hierarchies, system color palettes, glassmorphism / Liquid Glass materials,
  8pt grid spatial spacing, and accessible interactive controls.
---

# Apple HIG Designer Skill

A complete generator and design token system for building pixel-perfect Apple interfaces for Web (React, Next.js, HTML/Tailwind), Mobile (iOS, SwiftUI, React Native, Flutter), and Desktop (macOS, Electron, Tauri).

---

## 1. System Color Tokens

Always use semantic system color tokens that automatically adapt between Light and Dark mode:

| Semantic Token | Light Hex | Dark Hex | Usage |
|---|---|---|---|
| `systemBackground` | `#FFFFFF` | `#000000` | Main canvas background |
| `secondarySystemBackground` | `#F2F2F7` | `#1C1C1E` | Inset grouped list rows, card backgrounds |
| `tertiarySystemBackground` | `#FFFFFF` | `#2C2C2E` | Elevated cards, popovers, dropdown menus |
| `label` | `#000000` | `#FFFFFF` | Primary text |
| `secondaryLabel` | `#3C3C43 (60%)` | `#EBEBF5 (60%)` | Subtitles, captions, metadata |
| `tertiaryLabel` | `#3C3C43 (30%)` | `#EBEBF5 (30%)` | Placeholder text, disabled labels |
| `systemBlue` | `#007AFF` | `#0A84FF` | Primary action buttons, links, active selections |
| `systemGreen` | `#34C759` | `#30D158` | Success, online state, growth metrics |
| `systemRed` | `#FF3B30` | `#FF453A` | Errors, destructive actions, warning badges |
| `systemOrange` | `#FF9500` | `#FF9F0A` | Warnings, pending state |

---

## 2. Spatial Grid & Corner Radii

Apple HIG relies heavily on rounded squircles (`continuous` corner smoothing) and clean spatial padding:

### Spacing Scale (8pt Grid System)
- `4pt` — Micro gaps between icon and text
- `8pt` — Tight element spacing
- `12pt` — Compact padding inside buttons and input fields
- `16pt` — Standard card inner padding and list item inset
- `24pt` — Section gaps and container padding
- `32pt / 48pt` — Large section dividers and modal margins

### Radius Guidelines
- Outer App / Modal Window: `20px` to `24px`
- Cards & Inset Containers: `16px` to `20px`
- Input Fields & Buttons: `10px` to `12px` (or `9999px` for pill buttons)
- Small Tags / Badges: `6px` to `8px`

---

## 3. Component Blueprints & HTML/Tailwind Reference

### 1. Inset Grouped Section (Apple Settings / iOS List Style)
```html
<div class="max-w-md mx-auto p-4 bg-[#F2F2F7] dark:bg-[#1C1C1E] min-h-screen text-[#000000] dark:text-[#FFFFFF]">
  <h2 class="px-4 pb-2 text-xs uppercase tracking-wider text-[#3C3C43]/60 dark:text-[#EBEBF5]/60 font-semibold">
    Account Settings
  </h2>
  <div class="bg-white dark:bg-[#2C2C2E] rounded-2xl overflow-hidden shadow-sm divide-y divide-gray-200/50 dark:divide-white/10">
    <div class="flex items-center justify-between px-4 py-3.5 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition">
      <div class="flex items-center space-x-3">
        <span class="w-7 h-7 rounded-lg bg-[#007AFF] text-white flex items-center justify-center text-sm">👤</span>
        <span class="font-medium text-[17px]">Profile Information</span>
      </div>
      <span class="text-gray-400 font-semibold text-lg">›</span>
    </div>
    <div class="flex items-center justify-between px-4 py-3.5 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition">
      <div class="flex items-center space-x-3">
        <span class="w-7 h-7 rounded-lg bg-[#34C759] text-white flex items-center justify-center text-sm">🔒</span>
        <span class="font-medium text-[17px]">Privacy & Security</span>
      </div>
      <span class="text-gray-400 font-semibold text-lg">›</span>
    </div>
  </div>
</div>
```

### 2. Apple Liquid Glass Header Bar
```html
<header class="sticky top-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-black/70 border-b border-black/5 dark:border-white/10 px-6 py-4 flex items-center justify-between">
  <div class="flex items-center space-x-3">
    <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600"></div>
    <h1 class="text-xl font-bold tracking-tight">Dashboard</h1>
  </div>
  <button class="bg-[#007AFF] hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-full text-sm transition shadow-sm active:scale-95">
    New Action
  </button>
</header>
```

---

## 4. UI Generation Guidelines

When asked to generate an Apple-style screen or component:
1. Maintain consistent **Dynamic Type** typography scales.
2. Enforce the **8pt Spatial Grid** across margins, padding, and flex gaps.
3. Use **Liquid Glass / Translucency** for headers, tab bars, floating action bars, and modal backdrops.
4. Ensure full adaptivity between **Light and Dark mode**.
5. Keep buttons and controls at minimum **44pt** tap targets for touch, **28pt** for pointer.
