import {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  verifyEmailSchema,
  type OrderStatusValue,
} from '@abou/contracts';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? '';

export type PublicUser = {
  id: string;
  email: string;
  role: 'CLIENT' | 'ADMIN';
  emailVerified: boolean;
  fullName: string | null;
};

export type AuthResponse = { user: PublicUser };

export class ApiError extends Error {
  constructor(
    public readonly code: string,
    public readonly status: number,
    message: string,
    public readonly requestId?: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export function csrfToken() {
  return (
    document.cookie
      .split('; ')
      .find((value) => value.startsWith('abou_csrf='))
      ?.split('=')
      .slice(1)
      .join('=') ?? ''
  );
}

export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${apiBaseUrl}/api/v1${path}`, {
    credentials: 'include',
    ...options,
    headers: { 'Content-Type': 'application/json', ...(options.headers ?? {}) },
  });
  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as {
      error?: { code?: string; message?: string; requestId?: string };
    } | null;
    throw new ApiError(
      body?.error?.code ?? 'INTERNAL_ERROR',
      response.status,
      body?.error?.message ?? 'Something went wrong. Please try again.',
      body?.error?.requestId,
    );
  }
  return response.status === 204 ? (undefined as T) : (response.json() as Promise<T>);
}

export async function getSession(): Promise<AuthResponse | null> {
  try {
    return await apiFetch<AuthResponse>('/auth/session');
  } catch (error) {
    if (error instanceof ApiError && error.code === 'UNAUTHENTICATED') return null;
    throw error;
  }
}

export function login(input: { email: string; password: string }) {
  return apiFetch<AuthResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(loginSchema.parse(input)),
  });
}

export function register(input: {
  fullName: string;
  email: string;
  password: string;
  consentAccepted: boolean;
}) {
  return apiFetch<AuthResponse & { message: string }>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(registerSchema.parse(input)),
  });
}

export function verifyEmail(input: { email: string; code: string }) {
  return apiFetch<AuthResponse & { message: string }>('/auth/verify-email', {
    method: 'POST',
    body: JSON.stringify(verifyEmailSchema.parse(input)),
  });
}

export function resendVerification(email: string) {
  return apiFetch<{ message: string }>('/auth/resend-verification', {
    method: 'POST',
    body: JSON.stringify(forgotPasswordSchema.parse({ email })),
  });
}

export function forgotPassword(email: string) {
  return apiFetch<{ message: string }>('/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify(forgotPasswordSchema.parse({ email })),
  });
}

export function resetPassword(input: { email: string; code: string; newPassword: string }) {
  return apiFetch<{ message: string }>('/auth/reset-password', {
    method: 'POST',
    body: JSON.stringify(resetPasswordSchema.parse(input)),
  });
}

export function logout() {
  return apiFetch<void>('/auth/logout', {
    method: 'POST',
    headers: { 'X-CSRF-Token': csrfToken() },
  });
}

export function createOrder(input: {
  fullName: string;
  phoneNumber: string;
  specialization: string;
}) {
  return apiFetch<{ order: { id: string; reference: string; status: OrderStatusValue } }>(
    '/orders',
    {
      method: 'POST',
      headers: { 'X-CSRF-Token': csrfToken() },
      body: JSON.stringify(input),
    },
  );
}
