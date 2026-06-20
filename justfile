# Vector development commands

default:
    @just --list

# Run the desktop app in development mode
dev:
    pnpm dev

# Format all code
fmt:
    cargo fmt --all
    pnpm fmt

# Run all checks (Rust + frontend)
check:
    pnpm build
    cargo fmt --all -- --check
    cargo clippy --workspace --all-targets -- -D warnings
    cargo test --workspace
    pnpm check
    pnpm lint
    pnpm --filter @vector/desktop test

# Build release desktop app
build:
    pnpm build

# Run Rust tests only
test:
    cargo test --workspace
