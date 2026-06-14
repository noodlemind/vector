use serde::{Deserialize, Serialize};

/// User-facing board columns. Every workspace maps to exactly one column.
#[derive(Debug, Clone, Copy, Serialize, Deserialize, PartialEq, Eq, Hash)]
#[serde(rename_all = "camelCase")]
pub enum BoardColumn {
    Inbox,
    Evaluating,
    Recommended,
    Consider,
    Preparing,
    NeedsReview,
    Ready,
    Applied,
    Interviewing,
    Offer,
    Rejected,
    Skipped,
    Archived,
}

/// Internal processing state for a job workspace.
#[derive(Debug, Clone, Copy, Serialize, Deserialize, PartialEq, Eq, Hash)]
#[serde(rename_all = "camelCase")]
pub enum WorkspaceState {
    Created,
    Parsing,
    Parsed,
    EvaluatingStrategicFit,
    EvaluatingReadiness,
    Researching,
    Evaluated,
    TailoringResume,
    DraftingArtifacts,
    Critiquing,
    AwaitingReview,
    Ready,
    Applied,
    Interviewing,
    Offer,
    Rejected,
    Archived,
}

impl WorkspaceState {
    pub fn is_resting(self) -> bool {
        matches!(self, Self::Evaluated | Self::AwaitingReview)
    }

    pub fn is_agent_active(self) -> bool {
        matches!(
            self,
            Self::Parsing
                | Self::EvaluatingStrategicFit
                | Self::EvaluatingReadiness
                | Self::Researching
                | Self::TailoringResume
                | Self::DraftingArtifacts
                | Self::Critiquing
        )
    }
}

/// Summary shown on the workspace board.
#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(rename_all = "camelCase")]
pub struct WorkspaceSummary {
    pub id: uuid::Uuid,
    pub title: String,
    pub company: Option<String>,
    pub column: BoardColumn,
    pub state: WorkspaceState,
}
