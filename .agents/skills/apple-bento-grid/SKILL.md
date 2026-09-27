---
name: apple-bento-grid
description: >
  Create Apple-inspired bento grid presentation cards for showcasing project stats,
  timelines, product showcases, and achievements. Generates self-contained HTML files with zero-gap grids,
  stat cards, pill tags, bar charts, and dark quote cards — optimized for screenshot export and presentation decks.
  Supports both light (Apple signature #f5f5f7) and dark (#000) themes.
---

# Apple Bento Grid Generator Skill

Generate self-contained HTML files that render Apple-inspired bento card grids. Each output is a single HTML file with inline CSS — zero dependencies except Google Fonts. Cards fill a tight CSS grid with minimal gaps (6px), optimized for high-resolution screenshot export or responsive display.

---

## 1. Design Tokens & Color Palettes

### Light Theme (Apple Signature)
- Page background: `#f5f5f7`
- Card background: `#ffffff`
- Primary text: `#1d1d1f`
- Secondary text: `#86868b`
- Accent / Pill tag background: `#e8e8ed` or `#0071e3` (Apple Blue)
- Card border: `1px solid rgba(0, 0, 0, 0.04)`
- Card shadow: `0 4px 20px rgba(0, 0, 0, 0.04)`

### Dark Theme (Pro / Contemporary)
- Page background: `#000000`
- Card background: `#161617` or `#1c1c1e`
- Primary text: `#f5f5f7`
- Secondary text: `#86868b`
- Accent / Pill tag background: `#2c2c2e` or `#2997ff`
- Card border: `1px solid rgba(255, 255, 255, 0.08)`
- Card shadow: `0 4px 24px rgba(0, 0, 0, 0.4)`

### Typography
- Primary font: `'SF Pro Display', 'Sora', -apple-system, BlinkMacSystemFont, sans-serif`
- Code / Data font: `'SF Mono', 'DM Sans', monospace`

---

## 2. Layout Grid Templates

### Template A: Standard Landscape (4 columns × 3 rows)
Grid CSS foundation:
```css
.bento-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(180px, auto);
  gap: 6px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}
```

### Template B: Hero Spotlight (Hero 2x2 + 4 Side Cards)
```css
.card-hero {
  grid-column: span 2;
  grid-row: span 2;
}
.card-wide {
  grid-column: span 2;
  grid-row: span 1;
}
.card-tall {
  grid-column: span 1;
  grid-row: span 2;
}
.card-standard {
  grid-column: span 1;
  grid-row: span 1;
}
```

### Template C: Vertical / Mobile Portrait (Social Media / Mobile View)
```css
@media (max-width: 768px) {
  .bento-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
}
```

---

## 3. Card Types & Anatomy

Each bento card MUST have:
1. `border-radius: 24px` (or `20px`)
2. `overflow: hidden`
3. Internal padding: `24px` to `32px`
4. Subtle hover transition (`transform: scale(1.01); transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1)`)

### Card Patterns:
1. **Big Stat Card**: Giant numeric highlight (e.g. `99.9%`, `10x`, `2.4M`) in 56pt bold type, accompanied by a label and subtle trend pill badge.
2. **Pill Tag Cloud**: Grouped pill tags (`border-radius: 9999px`) showing tech stack, features, or metrics.
3. **Bar / Progress Chart Card**: Mini CSS bar chart showing key metrics or comparison metrics.
4. **Dark Quote / Highlight Card**: Contrast card with rich dark background, large typography quote, and author avatar or badge.
5. **Feature Showcase Card**: Icon header, bold title, 2-line description, and subtle gradient glow behind.

---

## 4. HTML Generation Workflow

When the user asks for a stat showcase, bento grid, project summary, product launch deck, or Apple presentation layout:
1. Gather the stats, numbers, key features, and quotes.
2. Select light or dark theme (or generate light by default, with dark toggle).
3. Build a zero-gap or 6px-gap CSS grid layout.
4. Fill each card with high-density content (avoid sparse or empty-looking cards).
5. Ensure font sizing prevents text overflow or orphan words.
6. Return complete, self-contained HTML code.
