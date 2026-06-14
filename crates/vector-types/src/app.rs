use serde::{Deserialize, Serialize};

/// Public application metadata returned to the UI.
#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
#[serde(rename_all = "camelCase")]
pub struct AppInfo {
    pub name: String,
    pub version: String,
    pub tagline: String,
}

impl Default for AppInfo {
    fn default() -> Self {
        Self {
            name: "Vector".into(),
            version: env!("CARGO_PKG_VERSION").into(),
            tagline: "Apply less. Apply better.".into(),
        }
    }
}

/// High-level navigation areas in the desktop shell.
#[derive(Debug, Clone, Copy, Serialize, Deserialize, PartialEq, Eq, Hash)]
#[serde(rename_all = "camelCase")]
pub enum AppSection {
    Dashboard,
    WorkspaceBoard,
    ProfileVault,
    ReviewCenter,
    Settings,
}

impl AppSection {
    pub const ALL: [Self; 5] = [
        Self::Dashboard,
        Self::WorkspaceBoard,
        Self::ProfileVault,
        Self::ReviewCenter,
        Self::Settings,
    ];

    pub fn label(self) -> &'static str {
        match self {
            Self::Dashboard => "Dashboard",
            Self::WorkspaceBoard => "Board",
            Self::ProfileVault => "Vault",
            Self::ReviewCenter => "Review",
            Self::Settings => "Settings",
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn app_info_serializes_to_camel_case() {
        let info = AppInfo::default();
        let json = serde_json::to_value(info).expect("serialize");
        assert_eq!(json["name"], "Vector");
        assert_eq!(json["tagline"], "Apply less. Apply better.");
    }
}
