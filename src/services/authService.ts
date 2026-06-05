import { apiUrl, parseErrorMessage, parseJsonResponse } from '../config/api';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
}

interface AuthResponse {
  token: string;
  user: User;
}

export const googleLogin = async (credential: string): Promise<AuthResponse> => {
  if (!credential?.trim()) {
    throw new Error('Google credential is required');
  }

  const response = await fetch(apiUrl('/api/auth/google'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ credential, token: credential }),
  });

  if (!response.ok) {
    throw new Error(await parseErrorMessage(response));
  }

  return parseJsonResponse<AuthResponse>(response);
};

export const getCurrentUser = async (token: string): Promise<User> => {
  const response = await fetch(apiUrl('/api/auth/me'), {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }

  return parseJsonResponse<User>(response);
};
