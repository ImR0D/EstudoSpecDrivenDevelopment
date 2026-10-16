export type AppointmentStatus = "scheduled" | "completed" | "cancelled";

export interface Appointment {
  id: number;
  agent_id: number;
  therapy_id: number | null;
  scheduled_at: string;
  status: AppointmentStatus;
  notes: string;
  created_at: string;
}

export interface NewAppointment {
  agentId: number;
  therapyId?: number | null;
  scheduledAt: string;
  status?: AppointmentStatus;
  notes?: string;
}
