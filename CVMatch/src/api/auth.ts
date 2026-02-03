const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000/api';

type AuthPayload = {
  email: string;
  password: string;
};

export type AuthResponse = {
  id: string;
  email: string;
  // add token or other fields here if your backend returns them
};

async function request(
  path: string,
  payload: AuthPayload
): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    let message = 'Request failed';
    try {
      const data = (await res.json()) as { message?: string; email?: string[] };
      
      if (data.email && Array.isArray(data.email) && data.email.length > 0) {
        message = data.email[0];
      } else if (data.message) {
        message = data.message;
      }
    } catch {
      // ignore JSON parse errors
    }
    throw new Error(message);
  }

  return (await res.json()) as AuthResponse;
}

export function login(payload: AuthPayload) {
  return request('/login/', payload);
}

export function signup(payload: AuthPayload) {
  return request('/sign-up/', payload);
}

