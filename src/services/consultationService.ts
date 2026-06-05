import { apiUrl, parseErrorMessage, parseJsonResponse } from '../config/api';

export interface ConsultationPayload {
  name: string;
  email: string;
  therapyType: string;
  age: number;
  phone: string;
  concern: string;
  additionalNotes?: string;
  preferredDate: string;
  preferredTime: string;
}

export interface Consultation {
  _id: string;
  userId: string;
  name: string;
  email: string;
  therapyType: string;
  age: number;
  phone: string;
  concern: string;
  additionalNotes?: string;
  preferredDate: string;
  preferredTime: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export const submitConsultation = async (
  token: string,
  data: ConsultationPayload
): Promise<Consultation> => {
  const response = await fetch(apiUrl('/api/consultations'), {
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

  return parseJsonResponse<Consultation>(response);
};

export const getAdminConsultations = async (token: string): Promise<Consultation[]> => {
  const response = await fetch(apiUrl('/api/admin/consultations'), {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error(await parseErrorMessage(response));
  }

  return parseJsonResponse<Consultation[]>(response);
};

interface ActionResponse {
  message: string;
  consultation?: Consultation;
}

const adminRequest = async (
  token: string,
  path: string,
  method: 'PATCH' | 'POST',
  body?: { message: string }
): Promise<ActionResponse> => {
  const response = await fetch(apiUrl(path), {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  if (!response.ok) {
    throw new Error(await parseErrorMessage(response));
  }

  return parseJsonResponse<ActionResponse>(response);
};

export const acceptConsultation = (token: string, id: string) =>
  adminRequest(token, `/api/admin/consultations/${id}/accept`, 'PATCH');

export const rejectConsultation = (token: string, id: string) =>
  adminRequest(token, `/api/admin/consultations/${id}/reject`, 'PATCH');

export const sendConsultationMessage = (token: string, id: string, message: string) =>
  adminRequest(token, `/api/admin/consultations/${id}/message`, 'POST', { message });
