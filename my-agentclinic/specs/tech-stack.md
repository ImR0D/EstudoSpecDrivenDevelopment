# Tech Stack

## Core stack
- Server-side TypeScript for application logic, request handling, and type safety.
- SQLite for local data storage and lightweight persistence.
- Node.js runtime for executing the server-side application.

## Recommended framework
Use Fastify as the server-side TypeScript framework for routing and API structure. It is a popular, performant choice with TypeScript support and fits AgentClinic's needs for a reliable, maintainable backend.

## Frontend
- Server-rendered pages or a minimal JS-enhanced UI for simplicity.
- Keep the interface modern, responsive, and browser-friendly.
- Store each HTML template in its own `.html` file and each stylesheet source in a separate `.scss` file; do not embed styles in HTML or templates in TypeScript.
- Compile SCSS to browser-ready CSS as part of the build; generated `.css` files belong in `dist`, not alongside source files.
- Keep route handling and application functionality in TypeScript modules, separate from view and style files.
- Define domain models/interfaces in dedicated files under `src/models`; import them into data-access code rather than defining them in repositories.

## Development principles
- Prefer a small, maintainable architecture.
- Use clear separation between routes, application functionality, data access, domain models, HTML templates, and SCSS styles.
- Apply these boundaries to all future features and code changes; extend the existing components instead of combining presentation, styles, behavior, or model definitions in one file. New style sources must use the `.scss` extension.
- Keep the system dependable and easy for students to understand.

## Tooling
- TypeScript compiler for build validation.
- SQLite for persisted data.
- Simple local development workflow with a clear project structure.
