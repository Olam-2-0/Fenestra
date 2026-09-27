---
name: apple-motion-craft
description: >
  Apple fluid animation, spring physics, and interactive motion craft skill. Use when creating or refining
  CSS/JS animations, Framer Motion transitions, SwiftUI spring animations, Flutter physics curves, or React Native Reanimated interactions
  to achieve Apple's signature organic motion, haptic feedback integration, dynamic view morphing, and accessible reduced-motion support.
---

# Apple Motion Craft Skill

Master Apple's motion design principles to create fluid, tactile, and non-distracting animations across platforms.

---

## 1. Apple Motion Principles

Apple motion is defined by three rules:

1. **Fluid Physics, Not Constant Linear Speed**: Apple animations accelerate dynamically and decelerate naturally using spring physics (stiffness, damping, mass) or cubic-bezier curves like `cubic-bezier(0.16, 1, 0.3, 1)`.
2. **Spatial Continuity**: Elements don't pop into existence; they expand from their trigger point or morph smoothly from cards into full-screen views.
3. **Purposeful Feedback**: Every motion informs the user of state changes or structural hierarchy. Avoid decorative, slow, or distracting linear animations.

---

## 2. Platform Motion Specifications

### CSS & Web Timing Curves
- **Default Ease (Apple Fluid Out)**: `transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1)`
- **Interactive Press (Active Scale)**: `transform: scale(0.96); transition: transform 0.15s cubic-bezier(0.2, 0.9, 0.3, 1)`
- **Modal Sheet Slide-Up**: `transform: translateY(0); transition: transform 0.5s cubic-bezier(0.32, 0.72, 0, 1)`

### SwiftUI Spring Animations
```swift
// Apple Standard Fluid Spring
.animation(.spring(response: 0.35, dampingFraction: 0.8, blendDuration: 0), value: isExpanded)

// Bouncy / Playful Spring
.animation(.spring(response: 0.4, dampingFraction: 0.65, blendDuration: 0), value: isSelected)
```

### Framer Motion (React / Next.js)
```jsx
<motion.div
  initial={{ opacity: 0, scale: 0.95, y: 10 }}
  animate={{ opacity: 1, scale: 1, y: 0 }}
  exit={{ opacity: 0, scale: 0.95, y: 10 }}
  transition={{
    type: "spring",
    stiffness: 380,
    damping: 30,
  }}
/>
```

---

## 3. Reduced Motion & Accessibility

ALWAYS respect system motion preferences:

```css
@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

In SwiftUI: `@Environment(\.accessibilityReduceMotion) var reduceMotion`.

---

## 4. Review & Implementation Checklist

- [ ] Does the animation use spring physics or `cubic-bezier(0.16, 1, 0.3, 1)` rather than `linear` or `ease-in-out`?
- [ ] Are tap / press feedback states instant (≤ 150ms response)?
- [ ] Is spatial continuity maintained (elements expanding out from origin)?
- [ ] Is `prefers-reduced-motion` supported with immediate opacity fades?
