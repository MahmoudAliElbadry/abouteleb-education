import type { UserRole, UserStatus } from '@prisma/client';

declare global {
  namespace Express {
    interface Locals {
      requestId: string;
      user?: {
        id: string;
        email: string;
        passwordHash: string;
        role: UserRole;
        status: UserStatus;
        emailVerifiedAt: Date | null;
        profile: { fullName: string } | null;
      };
    }
  }
}

export {};
