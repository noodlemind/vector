# Vector — UI/UX Direction

The finalized design direction for Vector's desktop app. Every surface is built to this. The reference implementation of the home surface lives at [`mockups/vector-home.html`](mockups/vector-home.html) — open it in a browser and toggle the theme.

---

## The spine

**Vector is a Career Operating System, not a job-search portal.**

- **You are the center.** The persistent kernel is your *vector* — direction (career north-star, target roles) plus magnitude (your proof, your standing). The Profile Vault is that kernel. Opportunities are **processes that run on it**; they come and go, the kernel persists.
- **The workspace is the unit.** One job = one workspace, seen whole. The Vault is the persistent self. Everything else is a view onto these.
- **Ambient, not foreground.** The surface shows only *what needs you* and asks the *one question that's yours to answer*. The machinery — deterministic scoring, the Constitution/Rubric, the engines, the 17 internal states — is absorbed underneath. Ambient ≠ empty; it is a maintained OS at rest, surfacing rather than making you search.

## The three human moments

A person is only ever on the hook for three things. These are the only moments Vector asks for the user, and they map to the lifecycle's two resting states plus outcomes:

| Moment | State | Question |
| --- | --- | --- |
| **Decide** | `Evaluated` (Gate 1) | Is this opportunity worth pursuing? |
| **Review** | `AwaitingReview` (Gate 2) | Is the package ready — and is it me? |
| **Record** | applied, awaiting result | What happened? (feeds learning) |

Everything between these is the machine working, and stays underneath.

## Principles (the design discipline)

1. **Subtract, don't accrete.** One purpose per surface. A bloated screen violates the direction. When in doubt, cut.
2. **Ambient, not a feed.** Surface what needs the user; hum the rest. No inbox energy, no job-board scroll, no metrics tiles.
3. **Care in the unseen.** Heavy rigor underneath earns a light surface. Show cited evidence and explainable results, not the machinery that produced them.
4. **Never blend the scores.** Strategic Fit (x / 5.0) and Application Readiness (x / 100) and the Submission Checklist stay visually and conceptually separate. No single opaque number.
5. **Busy vs waiting-on-you is always legible.** `Preparing` (machine working) and `Needs Review` (waiting on the user) are never confused on any surface.
6. **Honesty over warmth.** No cheerleading, no manufactured enthusiasm, no emoji morale. Name gaps plainly; respect is in the clarity. Every score carries its evidence.
7. **Human authorship at the gates.** The consequential act — applying — is manual and the user's. Vector prepares; the user commits. Consequential actions are surfaced and confirmed, never hidden behind "inevitability."
8. **Quiet by default ("mostly quiet").** One honest count is the ambient signal; the truth is one tap away, never performed. Vector speaks only to say *a gate has opened* — never to report progress or nudge. Notifications are **inside-only by default** (no OS push); the user comes to it.

## The six areas, given ambient roles

The product's structure is kept; the *experience* is calm. The user mostly lives in the home and drops into a workspace when something needs them.

| Area | Ambient role |
| --- | --- |
| **Dashboard (home)** | The OS at rest — what needs you, what changed, what's underway |
| **Application Workspace** | The heart — one job seen whole (the never-blended summary + tabbed life) |
| **Workspace Board** | Spatial overview on demand — busy vs waiting vs resting |
| **Artifact Editor** | The craft surface — diffs, evidence links, accept/reject; no destructive overwrite |
| **Profile Vault** | The persistent self — inspectable, editable career memory |
| **Review Center** | Gate 2 aggregated — packages awaiting approval |

## The home (reference surface)

The canonical expression of the direction. Pattern:

- **Catch-up line** — a single quiet sentence: *"Since Tuesday — 2 evaluations finished, 1 package ready to review."*
- **Needs you** — only the workspaces at a human moment, each as a *reduced glance* (role · company · the one relevant signal · the action verb). Three verbs only: **Decide / Review / Record**.
- **The hum** — one muted line at the bottom: *"Underway — 3 preparing, 2 evaluating · 19 resolved."* The machine working, not asking for the user.

Absent by design: the 13 board columns, metrics dashboards, any feed. Scores shown at a glance stay unblended.

---

## Visual language

**Aesthetic.** Calm, restrained, considered. Generous whitespace. Hairlines over hard borders. One accent, used sparingly. Semantic color only where it carries real meaning (fit bands), kept quiet. Inter throughout. A desktop-app window, macOS-first.

**Theming.** Both light and dark are first-class. The palette is fully token-driven, so every surface inherits both for free. The app respects the OS preference (`prefers-color-scheme`) by default, with a manual toggle in Settings. Light is *calm, not stark* — soft off-white surfaces (never pure white), deeper accent and semantic colors for contrast, the same restraint as dark, inverted.

**Motion.** Subtle and brief (160–240ms). Hover lifts a hairline or shifts an affordance a couple of pixels. Theme changes cross-fade. No spinner-storms; progress is a streamed or optimistic signal, never decorative busyness.

### Design tokens

These extend the existing `@theme` block in `apps/desktop/src/index.css` (the dark values already match). Names below are the canonical token names; the Tailwind layer maps them to `--color-*`.

| Token | Dark | Light |
| --- | --- | --- |
| `surface` | `#0f1117` | `#ffffff` |
| `surface-raised` | `#171a22` | `#f5f7fa` |
| `border` | `#2a2f3a` | `#e1e5ec` |
| `border-faint` | `#20242e` | `#eef0f4` |
| `text` | `#e9ecf3` | `#1b1e26` |
| `muted` | `#8b93a7` | `#5f6675` |
| `muted-dim` | `#5b6273` | `#9aa1b0` |
| `accent` | `#6ea8fe` | `#2f6fe0` |
| `good` (positive band) | `#7fd1a8` | `#1c8a5a` |
| `good-soft` (band fill) | `#16301f` | `#e3f3ea` |
| `good-border` | `#244a34` | `#bfe3cd` |
| `separator` | `#343a47` | `#cdd2dc` |
| `window-lights` | `#2c313c` | `#d4d8e0` |

Gradients (body backdrop / window) and shadows are themed alongside: dark uses deep radial backdrops and heavy soft shadows; light uses pale radial backdrops and light, low-opacity shadows. Semantic bands beyond `good` (Consider, Skip) follow the same quiet-tint pattern; define them as needed without introducing loud color.

### Typography

| Role | Size | Weight |
| --- | --- | --- |
| Surface title / direction | 25–30px | 600 |
| Item title (e.g. role) | 16.5–19px | 600 |
| Body / signal | 13–15px | 400–450 |
| Eyebrow / label | 11–12px, `0.16em` tracking, uppercase | 500 |
| Catch-up / hum | 12.5px | 400 |

### Core components

- **Window chrome** — titlebar with monochrome traffic lights; topbar with the Vector mark + name, and quiet icon buttons (theme toggle, Settings).
- **Needs-you row** — hairline-separated, generous padding, subtle hover lift; role / context / signal on the left, action verb + arrow on the right.
- **Band chip** — small, quiet tint (e.g. `Strong Apply` in `good`).
- **Hum line** — one muted line, static dot, no animation.
- **Eyebrow** — uppercase tracked label with a small accent dot.
- **Buttons** — restrained primary (soft accent fill, accent text); ghost (muted text). No shouty filled CTAs.

---

## Anti-patterns (learned the hard way)

- Portal / feed / job-board energy. Vector is not a place you browse.
- Clutter and accretion — multi-block forms, strengths/gaps grids, everything-on-one-screen.
- Blended scores or vanity meters.
- Manufactured warmth, cheerleading, emoji, performed personality.
- The machine's vocabulary on the surface (13 columns, 17 states, raw spinners).
- OS push notifications by default.

---

## Status

This is the **locked UI/UX direction**. The home surface is the approved reference.

Next (separate, planned work): wire the token system into `apps/desktop/src/index.css` with light-theme support, then build the remaining surfaces to this spec — Application Workspace, the two gates, Profile Vault, Review Center — each keyboard-navigable and screen-reader-friendly as it ships.
