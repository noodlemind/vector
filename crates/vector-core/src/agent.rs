//! Agent runtime adapters (ACP client + per-runtime fallback).
//!
//! Stub module — Phase 1 will add runtime detection and ACP integration.

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum AgentTaskKind {
    ParseJob,
    EvaluateStrategicFit,
    EvaluateReadiness,
    Research,
    TailorResume,
    DraftArtifacts,
    Critique,
}
