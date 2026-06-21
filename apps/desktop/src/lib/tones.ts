// Shared presentation tones, owned by the lib layer so both the view-models
// (e.g. HomeView signals) and the UI primitives (Band) depend on lib, never the
// reverse. Keep the UI a thin view over the core.
export type BandTone = "good" | "neutral";
