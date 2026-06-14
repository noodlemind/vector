# Architecture

Vector is a **Tauri 2 desktop application** with a **thin React UI** over an **authoritative Rust core**.

```text
┌─────────────────────────────────────────────┐
│  React UI (apps/desktop/src)                │
│  Dashboard · Board · Vault · Review · Settings│
└─────────────────────┬───────────────────────┘
                      │ Tauri commands / events
┌─────────────────────▼───────────────────────┐
│  vector-core (Rust)                         │
│  orchestrator · scoring · vault · workspace │
└──────────┬──────────────────────┬─────────────┘
           │                      │
┌──────────▼──────────┐  ┌────────▼────────────┐
│  vector-db (SQLite) │  │  Local artifacts    │
│  app state + runs   │  │  markdown · json    │
└─────────────────────┘  └─────────────────────┘
           │
┌──────────▼──────────────────────────────────┐
│  Agent runtimes (BYOA, external)            │
│  ACP-compatible agents via adapters           │
└─────────────────────────────────────────────┘
```

## Design constraints

1. **Core owns state** — the UI renders and invokes; it does not own business logic.
2. **One job = one workspace** — isolated artifacts, runs, and review surfaces per opportunity.
3. **Deterministic scoring** — agents extract cited evidence; Vector core computes scores from versioned rubric data.
4. **Async by default** — agent runs and I/O never block the UI thread.
5. **Local-first storage** — SQLite for structured state; filesystem for documents and exports.

## Crate responsibilities

| Crate | Role |
| --- | --- |
| `vector-types` | Domain types and IPC contract |
| `vector-db` | Migrations and SQLite access |
| `vector-core` | Application bootstrap, future orchestration and engines |
| `vector-desktop` | Tauri shell, command handlers, lifecycle |

## Extension points

Future work plugs into `vector-core` modules:

- `agent` — ACP client and runtime adapters
- `orchestrator` — job queue, concurrency limits, quality gates
- `scoring` — Constitution/Rubric-driven deterministic evaluation
- `vault` — Profile Vault and career memory
- `workspace` — board lifecycle and artifact versioning

JSON schemas in `schemas/` define portable artifacts exchanged between agents and the core.
