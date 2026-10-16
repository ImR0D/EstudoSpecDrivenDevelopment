const assert = require("node:assert/strict");
const { mkdtempSync, rmSync } = require("node:fs");
const { tmpdir } = require("node:os");
const { join } = require("node:path");
const { afterEach, test } = require("node:test");
const { openDatabase } = require("../dist/database/database");
const { ClinicRepository } = require("../dist/data/clinic-repository");
const { buildServer } = require("../dist/server");

const temporaryDirectories = [];

function temporaryDatabasePath() {
  const directory = mkdtempSync(join(tmpdir(), "agentclinic-"));
  temporaryDirectories.push(directory);
  return join(directory, "clinic.db");
}

afterEach(() => {
  for (const directory of temporaryDirectories.splice(0)) {
    rmSync(directory, { recursive: true, force: true });
  }
});

test("home page responds at / with informational, responsive HTML", async () => {
  const server = buildServer(temporaryDatabasePath());

  try {
    const response = await server.inject({ method: "GET", url: "/" });
    assert.equal(response.statusCode, 200);
    assert.match(response.headers["content-type"], /text\/html/);
    assert.match(response.body, /AgentClinic/);
    assert.match(response.body, /agent wellbeing/);
    assert.match(response.body, /name="viewport"/);
    assert.doesNotMatch(response.body, /<script\b/i);
    assert.doesNotMatch(response.body, /book an appointment/i);
  } finally {
    await server.close();
  }
});

test("database initializes all domain tables and persists linked records", () => {
  const database = openDatabase(temporaryDatabasePath());
  const repository = new ClinicRepository(database);

  try {
    const agentId = repository.createAgent("Pip");
    assert.equal(database.pragma("foreign_keys", { simple: true }), 1);
    const ailmentId = repository.createAilment(
      "Context fatigue",
      "Needs a quieter prompt window.",
    );
    const therapyId = repository.createTherapy(
      "Prompt pause",
      "A short break between tasks.",
    );

    repository.assignAilmentToAgent(agentId, ailmentId);
    repository.associateTherapyWithAilment(ailmentId, therapyId);
    const appointmentId = repository.createAppointment({
      agentId,
      therapyId,
      scheduledAt: "2026-10-17T10:00:00.000Z",
      notes: "First check-in",
    });

    assert.equal(repository.getAgent(agentId).name, "Pip");
    assert.equal(repository.getAilment(ailmentId).name, "Context fatigue");
    assert.equal(repository.getTherapy(therapyId).name, "Prompt pause");
    assert.deepEqual(
      repository.getAgentAilments(agentId).map(({ id }) => id),
      [ailmentId],
    );
    assert.deepEqual(
      repository.getAilmentTherapies(ailmentId).map(({ id }) => id),
      [therapyId],
    );
    assert.equal(repository.getAppointment(appointmentId).therapy_id, therapyId);
    assert.deepEqual(
      database
        .prepare(
          "SELECT name FROM sqlite_master WHERE type = 'table' AND name IN ('agents', 'ailments', 'therapies', 'appointments') ORDER BY name",
        )
        .all()
        .map(({ name }) => name),
      ["agents", "ailments", "appointments", "therapies"],
    );
  } finally {
    database.close();
  }
});

test("foreign keys, required names, duplicate links, and appointment status are enforced", () => {
  const database = openDatabase(temporaryDatabasePath());
  const repository = new ClinicRepository(database);

  try {
    assert.throws(
      () => repository.assignAilmentToAgent(999, 999),
      /FOREIGN KEY constraint failed/,
    );
    assert.throws(() => repository.createAgent(""), /CHECK constraint failed/);
    const agentId = repository.createAgent("Pip");
    const ailmentId = repository.createAilment("Context fatigue");
    repository.assignAilmentToAgent(agentId, ailmentId);
    assert.throws(
      () => repository.assignAilmentToAgent(agentId, ailmentId),
      /UNIQUE constraint failed/,
    );
    assert.throws(
      () =>
        database
          .prepare(
            "INSERT INTO appointments (agent_id, scheduled_at, status) VALUES (?, ?, ?)",
          )
          .run(agentId, "2026-10-17T10:00:00.000Z", "unknown"),
      /CHECK constraint failed/,
    );
  } finally {
    database.close();
  }
});

test("database initialization is repeatable", () => {
  const path = temporaryDatabasePath();
  const first = openDatabase(path);
  first.close();
  const second = openDatabase(path);

  try {
    assert.equal(
      second
        .prepare("SELECT COUNT(*) AS count FROM sqlite_master WHERE type = 'table'")
        .get().count,
      6,
    );
  } finally {
    second.close();
  }
});
