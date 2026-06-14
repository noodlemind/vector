//! Shared domain types for Vector.
//!
//! These types form the contract between the Rust core, persistence layer,
//! JSON schemas, and the thin desktop UI.

mod app;
mod opportunity;
mod workspace;

pub use app::*;
pub use opportunity::*;
pub use workspace::*;
