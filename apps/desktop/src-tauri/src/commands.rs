use std::sync::Arc;

use tauri::State;
use tokio::sync::RwLock;
use vector_core::VectorApp;
use vector_types::{AppInfo, WorkspaceSummary};

pub struct AppState {
    pub app: Arc<RwLock<VectorApp>>,
}

#[tauri::command]
pub fn get_app_info(state: State<'_, AppState>) -> AppInfo {
    let app = state
        .app
        .blocking_read();
    app.info()
}

#[tauri::command]
pub fn list_workspaces(state: State<'_, AppState>) -> Vec<WorkspaceSummary> {
    let app = state
        .app
        .blocking_read();
    app.list_workspaces()
}
