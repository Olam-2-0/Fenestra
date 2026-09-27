---
name: Fenestra Nocturne
colors:
  surface: '#0e1323'
  surface-dim: '#0e1323'
  surface-bright: '#34394a'
  surface-container-lowest: '#080d1d'
  surface-container-low: '#161b2b'
  surface-container: '#1a1f30'
  surface-container-high: '#25293a'
  surface-container-highest: '#2f3446'
  on-surface: '#dee1f9'
  on-surface-variant: '#c5c5d6'
  inverse-surface: '#dee1f9'
  inverse-on-surface: '#2b3041'
  outline: '#8f909f'
  outline-variant: '#444653'
  surface-tint: '#bac3ff'
  primary: '#bac3ff'
  on-primary: '#00208f'
  primary-container: '#7187ff'
  on-primary-container: '#001b7e'
  inverse-primary: '#3b53c8'
  secondary: '#e6c275'
  on-secondary: '#3f2e00'
  secondary-container: '#5e4501'
  on-secondary-container: '#d7b469'
  tertiary: '#94d4b5'
  on-tertiary: '#003826'
  tertiary-container: '#5f9d81'
  on-tertiary-container: '#003120'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#dee0ff'
  primary-fixed-dim: '#bac3ff'
  on-primary-fixed: '#00105a'
  on-primary-fixed-variant: '#1e38b0'
  secondary-fixed: '#ffdf9e'
  secondary-fixed-dim: '#e6c275'
  on-secondary-fixed: '#261a00'
  on-secondary-fixed-variant: '#5b4300'
  tertiary-fixed: '#aff0d0'
  tertiary-fixed-dim: '#94d4b5'
  on-tertiary-fixed: '#002115'
  on-tertiary-fixed-variant: '#0a5139'
  background: '#0e1323'
  on-background: '#dee1f9'
  surface-variant: '#2f3446'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 38px
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: 0em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
    letterSpacing: -0.005em
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: 0em
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system embodies the contemplative atmosphere of a quiet room late at night, illuminated only by distant starlight and the warm, golden glow cast through an open casement window. It rejects the hyper-stimulated, neon-saturated tropes of modern productivity tools in favor of an architectural sanctuary that inspires measured focus, intellectual composure, and quiet craftsmanship.

The visual style blends dark tactile minimalism with soft, cinematic ambient light. By relying on deep architectural surfaces, disciplined 1px borders, and pinpoint accents of soft amber and serene mint, the interface avoids decorative noise. It evokes the feeling of late-night deep work: uninterrupted, deliberate, and sheltered from external distraction.

## Colors

The palette operates under a strict atmospheric balance: 70% deep midnight space, 15% structural blue surfaces, 7% crisp typography, 5% mint progression, and 3% signature window amber.

- **Background (`#0B1020`)**: The midnight canvas, grounding the entire interface in deep, non-distracting space.
- **Surface (`#111A2E`)**: Flat architectural panels, sidebars, and inactive resting states.
- **Surface Elevated (`#17223A`)**: Active containers, hover states, overlays, and floating cards.
- **Border (`#26324B`)**: 1px structural framing with low-contrast luminance to shape space without visual weight.
- **Primary / Fenestra Blue (`#7187FF`)**: Used for interactive focus, primary actions, and brand identity. Linear shifts from `#7187FF` to `#8C7BFF` are reserved strictly for signature focal points.
- **Secondary / Window Light (`#FFD98A`)**: An evocative amber accent symbolizing warmth, candlelight, and gentle focus. Used selectively for key notifications, active highlights, and ambient glow backdrops.
- **Tertiary / Mint (`#A7E8C8`)**: Indicates steady progress, calm completions, and healthy metrics without aggressive green tones.
- **Urgent / Coral (`#FF8585`)**: Used sparingly for overdue tasks, warnings, and high-friction operations.
- **Main Text (`#F6F7FB`)**: Crisp, clear contrast for body copy and headlines.
- **Muted Text (`#8E9AB3`)**: Secondary metadata, timestamps, and resting iconography.

## Typography

The typography uses Plus Jakarta Sans across all roles to achieve an editorial, clean, and modern rhythm without sacrificing technical utility. 

Headings carry subtle negative tracking (`-0.01em` to `-0.02em`) to bind titles into sharp units of thought, while body text uses deliberate line heights (such as 26px on 16px body) to facilitate unhurried, comfortable reading against dark backdrops. Label styles emphasize legibility with slightly wider letter-spacing for status counters, metadata, and navigational chips.

## Layout & Spacing

Layouts follow a fluid 12-column grid system bounded by generous outer margins to simulate the perimeter of a quiet, structured room. 

- **Desktop (1200px+)**: 12 columns with `2rem` outer margins and `1.5rem` gutters. Content containers preserve wide negative space to prevent dense crowding.
- **Tablet (768px – 1199px)**: 8 columns with `1.5rem` outer margins and `1.25rem` gutters. Sidebars fold into compact iconography or slide-over overlays.
- **Mobile (<768px)**: 4 columns with `1rem` outer margins and `1rem` gutters. Complex multicarrier layouts reflow strictly into single vertical columns.

Vertical rhythm adheres strictly to the 4px baseline. Padding within cards scales between `space-md` (16px) for utility panels and `space-xl` (32px) for hero modules.

## Elevation & Depth

Visual hierarchy is constructed through tonal layering and razor-sharp 1px boundary lines (`#26324B`), rather than standard heavy drop shadows. 

- **Layer 0 (Canvas)**: Background tone `#0B1020`. No border or shadow.
- **Layer 1 (Recessed/Default Cards)**: `#111A2E` enclosed with a 1px solid `#26324B` border.
- **Layer 2 (Elevated & Hover)**: `#17223A` with a 1px `#26324B` border. Hover triggers a subtle edge luminance change where the border shifts to an opacity blend of primary blue (`rgba(113, 135, 255, 0.35)`).
- **The Fenestra Glow (Signature Elevation)**: Reserved for hero cards, focal elements, and window light moments. Achieved with a layered background radial gradient: `radial-gradient(ellipse at top right, rgba(255, 217, 138, 0.08), transparent 70%)` combined with an extremely soft, warm ambient drop shadow (`0 20px 48px -12px rgba(11, 16, 32, 0.95), 0 0 24px 0 rgba(255, 217, 138, 0.05)`).

## Shapes

The geometric architecture avoids bubbly, playful curves in favor of structured refinement. 

- **Standard Cards & Sidebars**: Radii range between 12px (`0.75rem`) and 16px (`1rem`).
- **Signature Hero Cards**: Radii expand to 18px–20px (`1.125rem`–`1.25rem`) to frame primary vistas and focus areas.
- **Interactive Controls & Tags**: Buttons, pills, status indicators, and text tags employ fully rounded pill radii (`9999px`) to create an intentional visual contrast against the crisp, rectangular frames of the containers they inhabit.
- **Input Fields**: Uniform 10px (`0.625rem`) or 12px (`0.75rem`) radii.

## Components

### Buttons
- **Primary**: Pill-shaped (`rounded-full`), background gradient from `#7187FF` to `#8C7BFF`, text `#0B1020` or crisp white `#F6F7FB`, height 40px, horizontal padding 20px. Hover creates an inner glow (`box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.25)`).
- **Secondary**: Pill-shaped, surface `#111A2E`, 1px border `#26324B`, text `#F6F7FB`. Hover shifts background to `#17223A` with a border tint of `#7187FF`.
- **Window Light Action (Special)**: Amber pill with `#FFD98A` background, text `#0B1020` with font weight 600, reserved for focal trigger points and focus mode launches.

### Cards
- Standard cards sit on `#111A2E` with a 1px `#26324B` border and 14px–16px border-radius.
- **Hero Window Card**: Features the signature top-right warm radial ambient sheen (`#FFD98A` at 6% opacity fading into `#17223A`), with an 18px–20px corner radius and a subtle top-border highlight (`rgba(255, 217, 138, 0.2)`).

### Chips & Badges
- Pill-shaped with 11px uppercase label text (`label-sm`).
- **Progress Chip**: Mint tint (`rgba(167, 232, 200, 0.12)`), text `#A7E8C8`, border `1px solid rgba(167, 232, 200, 0.25)`.
- **Window / Amber Chip**: Amber tint (`rgba(255, 217, 138, 0.12)`), text `#FFD98A`, border `1px solid rgba(255, 217, 138, 0.25)`.
- **Overdue / Critical Chip**: Coral tint (`rgba(255, 133, 133, 0.12)`), text `#FF8585`, border `1px solid rgba(255, 133, 133, 0.25)`.

### Inputs & Form Fields
- Height 44px, surface `#0B1020` inset against `#111A2E` container cards.
- Border is 1px `#26324B`; on focus, shifts to `#7187FF` with a subtle box-shadow ring (`0 0 0 3px rgba(113, 135, 255, 0.15)`).
- Text `#F6F7FB` with placeholder `#8E9AB3`.

### Lists & Row Items
- Divided by hairline rules (`1px solid #1E283D`).
- Hovering a list row applies a smooth background transition to `rgba(23, 34, 58, 0.5)` with an 8px radius inner padding offset.

### Checkboxes & Radios
- 18px dimensions with a 5px radius (checkbox) or circular (radio).
- Unchecked: `#111A2E` interior with a 1.5px `#26324B` perimeter.
- Checked: `#7187FF` fill or `#A7E8C8` for completion checklists, displaying an `#0B1020` checkmark.

### Bespoke Component: The Focus Aperture Bar
- A slender top or floating bottom control dock representing the open window. Features an ambient amber under-glow (`#FFD98A`), housing progress meters that fill with `#A7E8C8` to celebrate quiet completion without noisy gamification.