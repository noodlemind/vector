# Security Policy

Vector stores sensitive career data locally. We take security seriously.

## Supported versions

| Version | Supported |
| --- | --- |
| 0.1.x (development) | ✅ |

## Reporting a vulnerability

**Please do not open public GitHub issues for security vulnerabilities.**

Report security issues privately by emailing the maintainers or using GitHub's private vulnerability reporting for this repository.

Include:

- Description of the issue
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

We aim to acknowledge reports within 72 hours.

## Scope

In scope:

- Vector desktop application and Rust core
- Local data storage and export paths
- Agent runtime integration boundaries

Out of scope:

- Vulnerabilities in third-party agent runtimes themselves
- Social engineering against users

## Design notes

- Vector does **not** store AI provider credentials
- Agent runtimes authenticate independently (BYOA model)
- Sensitive local secrets should use OS keychain integration (planned)
