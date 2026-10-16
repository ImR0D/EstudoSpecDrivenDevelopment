# Validation: Phase 1 Foundations

The feature is ready to merge when all of the following are true:

## Project setup

- A clean dependency installation succeeds using the committed lockfile.
- The documented TypeScript build command completes successfully.
- Database and data-access code are clearly separated from routes and presentation code.

## Minimal home page

- The application can be started locally using documented instructions and serves a successful response at `/`.
- The page identifies AgentClinic and briefly introduces its agent-care purpose.
- The layout remains usable at common desktop and mobile viewport widths.
- The page does not require JavaScript for its basic content when server-rendered.
- The page is informational and does not suggest that deferred booking or care-management workflows are implemented.

## SQLite schema and persistence

- Local initialization succeeds without a hosted database.
- Initialization creates tables for agents, ailments, therapies, and appointments.
- The schema enforces primary keys, required values, and the declared domain relationships.
- Automated checks can insert and retrieve representative records for all four entities, including valid linked records.
- Automated checks confirm that a declared integrity violation is rejected and surfaced as an error.

## Review and merge

- Automated validation is runnable through a documented project command and passes.
- Setup, local run, and validation instructions are present in the project documentation.
- No dashboard, additional application routes, or complete care workflow has been introduced as part of this phase.
- The implementation and any consequential schema assumptions remain consistent with `specs/mission.md`, `specs/roadmap.md`, and `specs/tech-stack.md`.
