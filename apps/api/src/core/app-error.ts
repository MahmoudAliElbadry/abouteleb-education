export type AppErrorCode =
  | 'ACCOUNT_EXISTS'
  | 'CONTENT_CONFLICT'
  | 'EMAIL_NOT_VERIFIED'
  | 'FORBIDDEN'
  | 'EMAIL_DELIVERY_FAILED'
  | 'INVALID_ASSIGNMENT'
  | 'INVALID_CSRF'
  | 'INVALID_LOGIN'
  | 'INVALID_ORDER_TRANSITION'
  | 'INVALID_RESET'
  | 'INVALID_VERIFICATION'
  | 'NOT_FOUND'
  | 'UNAUTHENTICATED'
  | 'VALIDATION_ERROR';

export class AppError extends Error {
  constructor(
    public readonly code: AppErrorCode,
    public readonly status: number,
    public readonly publicMessage: string,
    public readonly metadata?: Record<string, unknown>,
  ) {
    super(publicMessage);
    this.name = 'AppError';
  }
}

export const appErrors = {
  accountExists: () => new AppError('ACCOUNT_EXISTS', 409, 'Account already exists'),
  contentConflict: () =>
    new AppError('CONTENT_CONFLICT', 409, 'Managed content conflicts with an existing record'),
  emailDeliveryFailed: () =>
    new AppError('EMAIL_DELIVERY_FAILED', 503, 'Unable to send email. Please try again shortly.'),
  emailNotVerified: () =>
    new AppError('EMAIL_NOT_VERIFIED', 403, 'Verify your email before signing in'),
  invalidCsrf: () => new AppError('INVALID_CSRF', 403, 'Invalid CSRF token'),
  invalidLogin: () => new AppError('INVALID_LOGIN', 401, 'Invalid email or password'),
  forbidden: () =>
    new AppError('FORBIDDEN', 403, 'You do not have permission to perform this action'),
  invalidAssignment: () =>
    new AppError('INVALID_ASSIGNMENT', 400, 'The selected administrator is not available'),
  invalidReset: () => new AppError('INVALID_RESET', 400, 'Invalid or expired reset code'),
  invalidVerification: () =>
    new AppError('INVALID_VERIFICATION', 400, 'Invalid or expired verification code'),
  notFound: () => new AppError('NOT_FOUND', 404, 'Route not found'),
  unauthenticated: () => new AppError('UNAUTHENTICATED', 401, 'Sign in required'),
};
