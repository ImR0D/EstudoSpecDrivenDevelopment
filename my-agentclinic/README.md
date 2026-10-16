# AgentClinic

AgentClinic is a small, friendly starting point for exploring AI agent
wellbeing. This foundation includes an informational home page and a local
SQLite data layer; care workflows and appointment booking are not implemented.

## Requirements

- Node.js 20 or newer
- npm

## Install and build

From this directory, install the locked dependencies and compile the
TypeScript application:

```sh
npm ci
npm run build
```

## Run locally

```sh
npm start
```

Open <http://127.0.0.1:3000/>. The server creates `data/agentclinic.db` when it
starts. Set `PORT`, `HOST`, or `DATABASE_PATH` to override the default settings.

## Validate

```sh
npm test
```

The test command builds the TypeScript first, then checks the home page,
database initialization, persistence, relationships, and database constraints.
`npm run validate` is an alias for the same complete check.

## Initial schema assumptions

- An agent can have many ailments, and an ailment can affect many agents;
  `agent_ailments` records this relationship.
- An ailment can have many therapies, and a therapy can address many ailments;
  `ailment_therapies` records this relationship.
- Each appointment belongs to one agent and may refer to one therapy.
- Appointments have a required scheduled time and one of three statuses:
  `scheduled`, `completed`, or `cancelled`.
- Entity names and appointment times are required. Ailment and therapy
  descriptions and appointment notes are optional in meaning and default to an
  empty string.
- Deleting an agent or ailment removes its association rows. Agents and
  therapies referenced by appointments cannot be deleted until those
  appointments are addressed.

## Input from stakeholders

- Mary in engineering wants a reliable site with a popular stack based on TypeScript, giving agents and staff a dashboard for easy access.
- Susan in product has a set of features about agents and their ailments, therapies, and booking appointments.
- Steve in marketing wants an attractive site that works well with a modern browser.
