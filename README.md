# Vector

**Apply less. Apply better.**

Vector is an open-source, local-first desktop career workspace. Every job opportunity becomes a structured application workspace for evaluation, research, tailoring, review, and outcome learning.

Vector is an **agent orchestrator, not an AI provider**. You bring your own agent runtime (Claude Code, Codex, Gemini CLI, OpenCode, or other ACP-compatible agents). Vector coordinates workflows, context, memory, and verification.

## Principles

- **Quality over quantity** — decide which roles are worth pursuing
- **Human-in-the-loop** — you review, edit, export, and apply manually
- **Local-first** — your data stays on your device
- **Transparent scoring** — evidence-backed, deterministic evaluation
- **Open source** — inspectable rubrics, agents, and workflows

## Status

Early development. The desktop shell and Rust core foundation are in place; product features are being built incrementally.

## Requirements

- [Rust](https://rustup.rs/) (stable)
- [Node.js](https://nodejs.org/) 20+
- [pnpm](https://pnpm.io/) 9+
- macOS (first target platform)

## Development

```bash
# Install frontend dependencies
pnpm install

# Run the desktop app (Tauri + Vite)
pnpm dev

# Or from repo root via just
just dev
```

### Checks

```bash
just check    # fmt, clippy, tests, frontend typecheck + lint
cargo test    # Rust tests only
```

### Environment

Override the local data directory during development:

```bash
export VECTOR_DATA_DIR=/tmp/vector-dev
pnpm dev
```

## Repository layout

```text
apps/desktop/        Tauri shell + React UI (thin view)
crates/vector-core/  Authoritative Rust core
crates/vector-db/    SQLite persistence
crates/vector-types/ Shared domain types
schemas/             Versioned JSON schemas
```

See [docs/architecture.md](docs/architecture.md) for a high-level overview.

## Contributing

Contributions welcome. See [CONTRIBUTING.md](CONTRIBUTING.md).

## Security

Report vulnerabilities privately — see [SECURITY.md](SECURITY.md).

## License

Apache License 2.0 — see [LICENSE](LICENSE).
