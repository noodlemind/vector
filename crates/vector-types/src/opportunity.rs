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

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn score_result_serializes_camel_case_fields() {
        let value = ScoreResult {
            value: 4.2,
            max: 5.0,
            band_label: "Apply".into(),
            policy: PolicyVersion {
                constitution_version: "2026-01".into(),
                rubric_version: "1".into(),
            },
        };
        let json = serde_json::to_value(value).expect("serialize");
        assert_eq!(json["bandLabel"], "Apply");
        assert_eq!(json["policy"]["rubricVersion"], "1");
    }

    #[test]
    fn opportunity_decision_serializes_camel_case() {
        let json = serde_json::to_value(OpportunityDecision::ConsiderCarefully).expect("serialize");
        assert_eq!(json, "considerCarefully");
    }
}
