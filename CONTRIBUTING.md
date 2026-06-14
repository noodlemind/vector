# Contributing to Vector

Thank you for helping build Vector. This project is open source and developed in public.

## Getting started

1. Fork and clone the repository
2. Install [Rust](https://rustup.rs/), [Node.js 20+](https://nodejs.org/), and [pnpm 9+](https://pnpm.io/)
3. Run `pnpm install`
4. Run `just dev` to launch the desktop app
5. Run `just check` before opening a pull request

## What belongs in the repo

- Source code, tests, and public schemas
- User-facing and contributor-facing documentation
- Issue and pull request templates

Please **do not** commit internal planning documents, roadmaps, or private design notes. Keep those outside the repository.

## Pull requests

- Keep changes focused and explain the motivation in the PR description
- Ensure `just check` passes
- Add tests when changing Rust core behavior
- Follow existing code style (Rustfmt, Clippy, Prettier, ESLint)

## Code organization

- Put domain logic in `crates/vector-core`, not in the React UI
- Add shared types to `crates/vector-types`
- Database changes require a new SQLx migration in `crates/vector-db/migrations/`

## Community

Be respectful and constructive. See [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

## Questions

Open a [GitHub Discussion](https://github.com/noodlemind/vector/discussions) or file an issue for bugs and feature requests.
