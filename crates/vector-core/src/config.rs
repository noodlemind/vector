use std::path::PathBuf;

use anyhow::Context;

/// Resolved filesystem locations for Vector local-first storage.
#[derive(Debug, Clone)]
pub struct AppPaths {
    pub root: PathBuf,
    pub database: PathBuf,
    pub artifacts: PathBuf,
    pub exports: PathBuf,
}

impl AppPaths {
    pub fn from_root(root: impl Into<PathBuf>) -> Self {
        let root = root.into();
        Self {
            database: root.join("vector.db"),
            artifacts: root.join("artifacts"),
            exports: root.join("exports"),
            root,
        }
    }

    pub fn default_for_current_os() -> anyhow::Result<Self> {
        let root = default_data_dir()?.join("vector");
        Ok(Self::from_root(root))
    }

    pub fn ensure_directories(&self) -> anyhow::Result<()> {
        for dir in [&self.root, &self.artifacts, &self.exports] {
            std::fs::create_dir_all(dir)
                .with_context(|| format!("create directory {}", dir.display()))?;
        }
        Ok(())
    }
}

fn default_data_dir() -> anyhow::Result<PathBuf> {
    directories::ProjectDirs::from("dev", "vector", "Vector")
        .map(|dirs| dirs.data_dir().to_path_buf())
        .context("resolve platform data directory")
}

// Re-export for convenience in tests and desktop shell overrides.
pub fn data_dir_from_env() -> anyhow::Result<PathBuf> {
    if let Ok(path) = std::env::var("VECTOR_DATA_DIR") {
        return Ok(PathBuf::from(path));
    }
    Ok(default_data_dir()?.join("vector"))
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::path::Path;
    use tempfile::tempdir;

    #[test]
    fn builds_paths_from_root() {
        let root = Path::new("/tmp/vector-test");
        let paths = AppPaths::from_root(root);
        assert_eq!(paths.database, root.join("vector.db"));
        assert_eq!(paths.artifacts, root.join("artifacts"));
    }

    #[test]
    fn creates_directories() {
        let dir = tempdir().expect("tempdir");
        let paths = AppPaths::from_root(dir.path());
        paths.ensure_directories().expect("create dirs");
        assert!(paths.artifacts.is_dir());
    }
}
