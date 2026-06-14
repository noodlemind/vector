mod commands;

use std::sync::Arc;

use tauri::Manager;
use tokio::sync::RwLock;
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt, EnvFilter};
use vector_core::VectorApp;

use commands::AppState;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    init_tracing();

    tauri::Builder::default()
        .setup(|app| {
            let handle = app.handle().clone();
            tauri::async_runtime::block_on(async move {
                let vector_app = VectorApp::bootstrap_default().await.map_err(|error| {
                    tracing::error!(?error, "failed to bootstrap vector core");
                    error
                })?;

                handle.manage(AppState {
                    app: Arc::new(RwLock::new(vector_app)),
                });

                Ok::<(), anyhow::Error>(())
            })
            .map_err(|error| {
                Box::<dyn std::error::Error>::from(format!("bootstrap failed: {error}"))
            })?;

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            commands::get_app_info,
            commands::list_workspaces,
        ])
        .run(tauri::generate_context!())
        .expect("error while running Vector desktop app");
}

fn init_tracing() {
    let _ = tracing_subscriber::registry()
        .with(EnvFilter::try_from_default_env().unwrap_or_else(|_| EnvFilter::new("info")))
        .with(tracing_subscriber::fmt::layer())
        .try_init();
}
