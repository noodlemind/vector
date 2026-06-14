use vector_db::Database;
use vector_types::{AppInfo, AppSection, WorkspaceSummary};

use crate::config::AppPaths;

/// Central application handle owned by the desktop shell.
pub struct VectorApp {
    paths: AppPaths,
    database: Database,
}

impl VectorApp {
    pub async fn bootstrap(paths: AppPaths) -> anyhow::Result<Self> {
        paths.ensure_directories()?;
        let database = Database::connect(&paths.database).await?;
        database.migrate().await?;

        Ok(Self { paths, database })
    }

    pub async fn bootstrap_default() -> anyhow::Result<Self> {
        let paths = if let Ok(root) = std::env::var("VECTOR_DATA_DIR") {
            AppPaths::from_root(root)
        } else {
            AppPaths::default_for_current_os()?
        };
        Self::bootstrap(paths).await
    }

    pub fn info(&self) -> AppInfo {
        AppInfo::default()
    }

    pub fn paths(&self) -> &AppPaths {
        &self.paths
    }

    pub fn database(&self) -> &Database {
        &self.database
    }

    pub fn sections() -> &'static [AppSection] {
        &AppSection::ALL
    }

    /// Board aggregate — empty until workspace intake is implemented.
    pub fn list_workspaces(&self) -> Vec<WorkspaceSummary> {
        Vec::new()
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use tempfile::tempdir;

    #[tokio::test]
    async fn bootstraps_with_migrations() {
        let dir = tempdir().expect("tempdir");
        let paths = AppPaths::from_root(dir.path());
        let app = VectorApp::bootstrap(paths).await.expect("bootstrap");
        assert_eq!(app.info().name, "Vector");
        assert!(app.list_workspaces().is_empty());
    }
}
