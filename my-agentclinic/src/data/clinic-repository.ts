import type Database from "better-sqlite3";

export interface Agent {
  id: number;
  name: string;
  created_at: string;
}

export interface Ailment {
  id: number;
  name: string;
  description: string;
}

export interface Therapy {
  id: number;
  name: string;
  description: string;
}

export interface Appointment {
  id: number;
  agent_id: number;
  therapy_id: number | null;
  scheduled_at: string;
  status: "scheduled" | "completed" | "cancelled";
  notes: string;
  created_at: string;
}

export interface NewAppointment {
  agentId: number;
  therapyId?: number | null;
  scheduledAt: string;
  status?: Appointment["status"];
  notes?: string;
}

export class ClinicRepository {
  constructor(private readonly database: Database.Database) {}

  createAgent(name: string): number {
    return this.insert("INSERT INTO agents (name) VALUES (?)", name);
  }

  getAgent(id: number): Agent | undefined {
    return this.database.prepare("SELECT * FROM agents WHERE id = ?").get(id) as
      | Agent
      | undefined;
  }

  createAilment(name: string, description = ""): number {
    return this.insert(
      "INSERT INTO ailments (name, description) VALUES (?, ?)",
      name,
      description,
    );
  }

  getAilment(id: number): Ailment | undefined {
    return this.database.prepare("SELECT * FROM ailments WHERE id = ?").get(id) as
      | Ailment
      | undefined;
  }

  createTherapy(name: string, description = ""): number {
    return this.insert(
      "INSERT INTO therapies (name, description) VALUES (?, ?)",
      name,
      description,
    );
  }

  getTherapy(id: number): Therapy | undefined {
    return this.database.prepare("SELECT * FROM therapies WHERE id = ?").get(id) as
      | Therapy
      | undefined;
  }

  assignAilmentToAgent(agentId: number, ailmentId: number): void {
    this.database
      .prepare(
        "INSERT INTO agent_ailments (agent_id, ailment_id) VALUES (?, ?)",
      )
      .run(agentId, ailmentId);
  }

  getAgentAilments(agentId: number): Ailment[] {
    return this.database
      .prepare(
        `SELECT ailments.*
         FROM ailments
         JOIN agent_ailments ON agent_ailments.ailment_id = ailments.id
         WHERE agent_ailments.agent_id = ?
         ORDER BY ailments.id`,
      )
      .all(agentId) as Ailment[];
  }

  associateTherapyWithAilment(ailmentId: number, therapyId: number): void {
    this.database
      .prepare(
        "INSERT INTO ailment_therapies (ailment_id, therapy_id) VALUES (?, ?)",
      )
      .run(ailmentId, therapyId);
  }

  getAilmentTherapies(ailmentId: number): Therapy[] {
    return this.database
      .prepare(
        `SELECT therapies.*
         FROM therapies
         JOIN ailment_therapies ON ailment_therapies.therapy_id = therapies.id
         WHERE ailment_therapies.ailment_id = ?
         ORDER BY therapies.id`,
      )
      .all(ailmentId) as Therapy[];
  }

  createAppointment(appointment: NewAppointment): number {
    const result = this.database
      .prepare(
        `INSERT INTO appointments
          (agent_id, therapy_id, scheduled_at, status, notes)
         VALUES (?, ?, ?, ?, ?)`,
      )
      .run(
        appointment.agentId,
        appointment.therapyId ?? null,
        appointment.scheduledAt,
        appointment.status ?? "scheduled",
        appointment.notes ?? "",
      );
    return Number(result.lastInsertRowid);
  }

  getAppointment(id: number): Appointment | undefined {
    return this.database
      .prepare("SELECT * FROM appointments WHERE id = ?")
      .get(id) as Appointment | undefined;
  }

  private insert(statement: string, ...values: string[]): number {
    const result = this.database.prepare(statement).run(...values);
    return Number(result.lastInsertRowid);
  }
}
