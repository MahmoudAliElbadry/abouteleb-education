// Compatibility exports for callers not yet migrated to the composition root.
// New code should use authModule.account directly.
import { authModule } from './auth.module.js';
import type { RegisterInput } from './auth.schemas.js';

export const register = (input: RegisterInput) => authModule.account.register(input);
export const verifyEmail = (email: string, code: string) =>
  authModule.account.verifyEmail(email, code);
export const resendVerification = (email: string) => authModule.account.resendVerification(email);
export const login = (email: string, password: string) => authModule.account.login(email, password);
export const requestPasswordReset = (email: string) =>
  authModule.account.requestPasswordReset(email);
export const resetPassword = (email: string, code: string, password: string) =>
  authModule.account.resetPassword(email, code, password);
