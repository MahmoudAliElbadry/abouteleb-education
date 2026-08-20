import type { AuthUser } from './auth.repository.js';

export function presentPublicUser(user: AuthUser) {
  return {
    id: user.id,
    email: user.email,
    role: user.role,
    emailVerified: Boolean(user.emailVerifiedAt),
    fullName: user.profile?.fullName ?? null,
  };
}
