use serde::{Deserialize, Serialize};

/// Strategic fit recommendation derived from deterministic scoring.
#[derive(Debug, Clone, Copy, Serialize, Deserialize, PartialEq, Eq, Hash)]
#[serde(rename_all = "camelCase")]
pub enum OpportunityDecision {
    StrongApply,
    Apply,
    ConsiderCarefully,
    WeakFit,
    Skip,
}

impl OpportunityDecision {
    pub fn label(self) -> &'static str {
        match self {
            Self::StrongApply => "Strong Apply",
            Self::Apply => "Apply",
            Self::ConsiderCarefully => "Consider Carefully",
            Self::WeakFit => "Weak Fit",
            Self::Skip => "Skip",
        }
    }
}

/// Version metadata for Constitution and Rubric artifacts.
#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
#[serde(rename_all = "camelCase")]
pub struct PolicyVersion {
    pub constitution_version: String,
    pub rubric_version: String,
}

/// Deterministic score output stamped with policy versions.
#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(rename_all = "camelCase")]
pub struct ScoreResult {
    pub value: f64,
    pub max: f64,
    pub band_label: String,
    pub policy: PolicyVersion,
}
