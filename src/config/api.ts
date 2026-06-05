const DEFAULT_API_BASE = 'http://localhost:5000';

const DEV_FRONTEND_PORTS = ['5173', '5174'];

export const getApiBaseUrl = (): string => {
  // In dev, use same-origin /api so Vite proxy works on 5173 or 5174
  if (import.meta.env.DEV) {
    return '';
  }

  const fromEnv = import.meta.env.VITE_API_URL;

  if (typeof fromEnv === 'string' && fromEnv.trim().startsWith('http')) {
    return fromEnv.trim().replace(/\/$/, '');
  }

  return DEFAULT_API_BASE;
};

export const apiUrl = (path: string): string => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const base = getApiBaseUrl();
  return base ? `${base}${normalizedPath}` : normalizedPath;
};

export const getDevFrontendOrigins = (): string[] =>
  DEV_FRONTEND_PORTS.map((port) => `http://localhost:${port}`);

export const parseJsonResponse = async <T>(response: Response): Promise<T> => {
  const contentType = response.headers.get('content-type') ?? '';

  if (!contentType.includes('application/json')) {
    const body = await response.text();
    const isHtml = body.trimStart().startsWith('<!DOCTYPE') || body.trimStart().startsWith('<html');

    if (isHtml) {
      throw new Error(
        'API request received HTML instead of JSON. Ensure the backend is running at http://localhost:5000 and restart the frontend dev server.'
      );
    }

    throw new Error(body || `Unexpected response (${response.status})`);
  }

  return response.json() as Promise<T>;
};

export const parseErrorMessage = async (response: Response): Promise<string> => {
  try {
    const data = await parseJsonResponse<{ message?: string }>(response);
    return data.message || `Request failed (${response.status})`;
  } catch (error) {
    return error instanceof Error ? error.message : `Request failed (${response.status})`;
  }
};
