import { apiUrl, parseErrorMessage, parseJsonResponse } from '../config/api';

export interface ConsultationSlot {
  _id: string;
  title: string;
  recurrenceType: 'daily' | 'weekly';
  dayOfWeek: number | null;
  startTime: string;
  endTime: string;
  maxSessions: number;
  bookedCount: number;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface ScheduleSlotOccurrence {
  slotId: string;
  title: string;
  startTime: string;
  endTime: string;
  timeRange: string;
  maxSessions: number;
  bookedCount: number;
  availableCapacity: number;
  isFull: boolean;
}

export interface ScheduleDay {
  date: string;
  dayName: string;
  dayNumber: string;
  fullDate: string;
  weekday: string;
  slots: ScheduleSlotOccurrence[];
}

export interface CreateSlotPayload {
  title: string;
  recurrenceType: 'daily' | 'weekly';
  dayOfWeek?: number;
  startTime: string;
  endTime: string;
  maxSessions?: number;
}

export const getPublicSchedule = async (): Promise<{ schedule: ScheduleDay[] }> => {
  const response = await fetch(apiUrl('/api/slots'));

  if (!response.ok) {
    throw new Error(await parseErrorMessage(response));
  }

  return parseJsonResponse<{ schedule: ScheduleDay[] }>(response);
};

export const getAdminSlots = async (token: string): Promise<ConsultationSlot[]> => {
  const response = await fetch(apiUrl('/api/admin/slots'), {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error(await parseErrorMessage(response));
  }

  return parseJsonResponse<ConsultationSlot[]>(response);
};

export const createAdminSlot = async (
  token: string,
  data: CreateSlotPayload
): Promise<ConsultationSlot> => {
  const response = await fetch(apiUrl('/api/admin/slots'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(await parseErrorMessage(response));
  }

  return parseJsonResponse<ConsultationSlot>(response);
};

export const updateAdminSlotStatus = async (
  token: string,
  id: string,
  status: 'active' | 'inactive'
): Promise<ConsultationSlot> => {
  const response = await fetch(apiUrl(`/api/admin/slots/${id}`), {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    throw new Error(await parseErrorMessage(response));
  }

  return parseJsonResponse<ConsultationSlot>(response);
};

export const deleteAdminSlot = async (token: string, id: string): Promise<{ message: string }> => {
  const response = await fetch(apiUrl(`/api/admin/slots/${id}`), {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error(await parseErrorMessage(response));
  }

  return parseJsonResponse<{ message: string }>(response);
};
