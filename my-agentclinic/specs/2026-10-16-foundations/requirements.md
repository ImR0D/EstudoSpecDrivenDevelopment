# Requirements: Phase 1 Foundations

## Purpose

Establish the TypeScript project foundation, a lightweight SQLite data layer for AgentClinic's four roadmap entities, and a minimal browser-accessible home page.

## Context

- The next unimplemented roadmap phase is **Phase 1: Foundations**. The current application entry point is still a placeholder.
- AgentClinic is intended for course students and conference demos, so the foundation should be small, understandable, and straightforward to run locally.
- The mission calls for a trustworthy product supporting the lifecycle of agent care.
- The tech-stack guidance specifies server-side TypeScript, Node.js, and SQLite, and recommends a maintainable separation between routes, data access, and UI.
- The tech-stack guidance allows server-rendered pages or a minimal JavaScript-enhanced UI; the home page should use the simplest approach consistent with the project.

## Scope

- Organize and configure the existing TypeScript project so it has a clear, buildable foundation for subsequent phases.
- Add SQLite persistence using `better-sqlite3`.
- Define and initialize a database schema for agents, ailments, therapies, and appointments, including the relationships and integrity constraints needed to represent the domain.
- Provide a clear, minimal data-access boundary for later application routes to use.
- Provide a minimal home page at `/` that introduces AgentClinic and its agent-care purpose in a friendly, browser-friendly layout.
- Include automated checks for the project build, the database schema/persistence foundation, and the home page response.

## Decisions

- Use SQLite for local, lightweight persistence, as specified by the tech-stack guidance.
- Use `better-sqlite3` as the SQLite implementation.
- Keep this phase demo-friendly and locally runnable; no additional production deployment or durability requirements were requested.
- Keep the database setup and data access separate from page rendering.
- Include only the root home page in this phase; defer the dashboard and other application routes to later roadmap work.

## Requirements

1. A clean dependency install must make the project build reproducibly using its documented project scripts.
2. The codebase must have a clear location for database setup and data-access code, without coupling persistence to page rendering.
3. Database initialization must create the four roadmap entity tables and enforce the declared domain relationships and applicable integrity constraints.
4. The data layer must support storing and retrieving representative records for each entity, including valid linked records.
5. Invalid references or other declared integrity violations must be rejected by the database rather than silently accepted.
6. Database setup and validation must be runnable locally without requiring a hosted service.
7. The application must serve a minimal home page at `/` that identifies AgentClinic and briefly introduces its purpose.
8. The home page must use a browser-friendly layout, work at common desktop and mobile viewport widths, and remain usable without JavaScript when implemented as a server-rendered page.
9. The home page must not imply that appointment booking, therapy management, or other workflows are already available.
10. HTML templates and SCSS stylesheet sources must be stored in separate files; templates must not contain inline style blocks. Source stylesheet files must use the `.scss` extension and compile to browser-ready CSS during build.
11. Route handling and application functionality must remain in TypeScript modules separate from HTML templates and styles.
12. Domain model interfaces/types must be defined in dedicated model files and imported by data-access code.
13. These component boundaries apply to all subsequent features and code changes, not only the foundation home page; future stylesheet sources must use `.scss`.

## Out of scope

- The dashboard, routes other than the root home page, and interactive care workflows.
- Full ailment-management, therapy-management, or appointment-booking workflows.
- Authentication, authorization, deployment, production operations, or multi-user concurrency requirements.
- A migration framework or production data-retention guarantees.

## Open implementation detail

The roadmap names the entities but does not prescribe their complete attributes or cardinalities. During implementation, define only the fields and relationships required to represent the AgentClinic domain and support later roadmap phases; record any consequential assumptions alongside the schema.
