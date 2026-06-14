-- Vector initial schema (Phase 1 foundation)
-- App metadata and core entity placeholders. Expanded in later phases.

CREATE TABLE IF NOT EXISTS app_meta (
    key TEXT PRIMARY KEY NOT NULL,
    value TEXT NOT NULL
);

INSERT INTO app_meta (key, value) VALUES ('schema_version', '1');

-- Profile Vault (source of truth for career data)
CREATE TABLE IF NOT EXISTS user_profile (
    id TEXT PRIMARY KEY NOT NULL,
    display_name TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- One job opportunity = one workspace
CREATE TABLE IF NOT EXISTS job_workspace (
    id TEXT PRIMARY KEY NOT NULL,
    title TEXT NOT NULL,
    company TEXT,
    board_column TEXT NOT NULL DEFAULT 'inbox'
        CHECK (board_column IN (
            'inbox', 'evaluating', 'recommended', 'consider', 'preparing',
            'needsReview', 'ready', 'applied', 'interviewing', 'offer',
            'rejected', 'skipped', 'archived'
        )),
    workspace_state TEXT NOT NULL DEFAULT 'created'
        CHECK (workspace_state IN (
            'created', 'parsing', 'parsed', 'evaluatingStrategicFit',
            'evaluatingReadiness', 'researching', 'evaluated', 'tailoringResume',
            'draftingArtifacts', 'critiquing', 'awaitingReview', 'ready',
            'applied', 'interviewing', 'offer', 'rejected', 'archived'
        )),
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_job_workspace_column ON job_workspace (board_column);
CREATE INDEX IF NOT EXISTS idx_job_workspace_state ON job_workspace (workspace_state);

-- Agent run audit trail (orchestrator writes here)
CREATE TABLE IF NOT EXISTS agent_run (
    id TEXT PRIMARY KEY NOT NULL,
    workspace_id TEXT,
    runtime_name TEXT,
    task_type TEXT NOT NULL
        CHECK (task_type IN (
            'parseJob', 'evaluateStrategicFit', 'evaluateReadiness', 'research',
            'tailorResume', 'draftArtifacts', 'critique'
        )),
    status TEXT NOT NULL DEFAULT 'queued'
        CHECK (status IN ('queued', 'running', 'succeeded', 'failed', 'cancelled')),
    started_at TEXT,
    finished_at TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (workspace_id) REFERENCES job_workspace (id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_agent_run_workspace ON agent_run (workspace_id);
