# Vector Design System

The visual language and UI conventions for the Vector desktop app (Tauri 2 + React + Tailwind v4). Build new surfaces to this so the app stays consistent. A reference implementation of the home surface lives at [`mockups/vector-home.html`](mockups/vector-home.html) — open it in a browser and toggle the theme.

## Principles

- **Calm and subtractive.** Generous whitespace, hairlines over hard borders, a single accent used sparingly. Give each surface one clear purpose and show only what the user needs to act on.
- **Light is low-contrast, not stark.** In light mode the calm comes from low contrast and soft panels — a white canvas (`surface` = `#ffffff`) with off-white raised panels (`surface-raised` = `#f5f7fa`) and a faint backdrop — not from avoiding white.
- **Honest, not decorative.** No manufactured warmth, cheerleading, or emoji. State things plainly and let evidence and scores carry the message.
- **Keep scores separate.** When a surface shows more than one score (for example a fit score out of 5 and a readiness score out of 100), render them as distinct readouts — never blend them into a single number.
- **Status is legible.** "Working" and "waiting on the user" must always be visually distinguishable.
- **Semantic color only.** Reserve color for meaning (e.g. fit bands); keep everything else neutral and quiet.

## Theming

Light and dark are both first-class and fully token-driven: the same Tailwind utilities re-theme because light overrides the same `--color-*` variables under `:root[data-theme="light"]`. The app respects the OS preference (`prefers-color-scheme`) on first load, with a manual toggle for an explicit override. A small pre-paint script in `index.html` sets `data-theme` before React mounts, so there is no flash.

### Design tokens

Defined in `apps/desktop/src/index.css`. Names below are the canonical token names; the Tailwind layer exposes them as `--color-*` utilities (the doc token `text` maps to `--color-foreground`).

| Token | Dark | Light |
| --- | --- | --- |
| `surface` | `#0f1117` | `#ffffff` |
| `surface-raised` | `#171a22` | `#f5f7fa` |
| `border` | `#2a2f3a` | `#e1e5ec` |
| `border-faint` | `#20242e` | `#eef0f4` |
| `foreground` | `#e9ecf3` | `#1b1e26` |
| `muted` | `#8b93a7` | `#5f6675` |
| `muted-dim` | `#5b6273` | `#9aa1b0` |
| `accent` | `#6ea8fe` | `#2f6fe0` |
| `good` (positive band) | `#7fd1a8` | `#1c8a5a` |
| `good-soft` (band fill) | `#16301f` | `#e3f3ea` |
| `good-border` | `#244a34` | `#bfe3cd` |
| `separator` | `#343a47` | `#cdd2dc` |

The body backdrop and window shadows are themed alongside these: dark uses deep radial backdrops and soft heavy shadows; light uses pale radial backdrops and light, low-opacity shadows. Add semantic band tones (e.g. caution, stop) following the same quiet-tint pattern as `good`, without introducing loud color.

### Typography

Inter throughout.

| Role | Size | Weight |
| --- | --- | --- |
| Surface title | 25–30px | 600 |
| Item title | 16.5–19px | 600 |
| Body / signal | 13–15px | 400–450 |
| Eyebrow / label | 11–12px, `0.16em` tracking, uppercase | 500 |
| Caption / hum | 12.5px | 400 |

### Components

Reusable primitives in `apps/desktop/src/components/`:

- **IconButton** — icon-only control; requires a `label` (rendered as `aria-label`).
- **Eyebrow** — small uppercase tracked label with an accent dot.
- **Band** — quiet tinted chip carrying a `tone` (the `BandTone` type lives in `src/lib/tones.ts`).
- **ArrowRight** — shared affordance glyph using `currentColor`.
- **App shell** — `Brand`, `ThemeToggle`, `TopBar`, `AppShell`; the shell fills the webview (no faux window chrome).

### Motion

Subtle and brief (160–240ms). Hover lifts a hairline or nudges an affordance a couple of pixels; theme changes cross-fade. Avoid spinner-storms — show streamed or optimistic feedback rather than decorative busyness.

## Accessibility

Built into every surface, not a late pass: a skip link, a `<main>` landmark, accessible names on icon-only controls, visible focus (a global `:focus-visible` outline using the accent token), and full keyboard navigation.

## Avoid

- Blending separate scores into one number.
- Manufactured warmth, cheerleading, or emoji.
- Loud or multi-hue color; reserve color for meaning.
- Clutter — more than one purpose competing on a surface.
- Faux window chrome; the shell fills the native window.
