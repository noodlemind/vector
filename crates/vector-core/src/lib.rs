//! Vector core — authoritative application state and domain logic.
//!
//! The desktop UI is a thin view over this crate. All orchestration, scoring,
//! persistence, and agent coordination will live here.

#![allow(dead_code)]

mod agent;
mod app;
mod config;
mod orchestrator;
mod scoring;
mod vault;
mod workspace;

pub use app::VectorApp;
pub use config::AppPaths;

pub mod prelude {
    pub use crate::app::VectorApp;
    pub use crate::config::AppPaths;
    pub use vector_types::*;
}
