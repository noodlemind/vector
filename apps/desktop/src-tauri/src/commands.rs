use std::sync::Arc;

use tauri::State;
use tokio::sync::RwLock;
use vector_core::VectorApp;
use vector_types::{AppInfo, WorkspaceSummary};

pub struct AppState {
    pub app: Arc<RwLock<VectorApp>>,
}

#[tauri::command]
pub async fn get_app_info(state: State<'_, AppState>) -> Result<AppInfo, String> {
    let app = state.app.read().await;
    Ok(app.info())
}

#[tauri::command]
pub async fn list_workspaces(state: State<'_, AppState>) -> Result<Vec<WorkspaceSummary>, String> {
    let app = state.app.read().await;
    Ok(app.list_workspaces())
}
