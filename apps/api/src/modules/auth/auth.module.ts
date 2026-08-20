import { prisma } from '../../lib/prisma.js';
import { AuditService } from './audit.service.js';
import { AccountService } from './account.service.js';
import { PrismaAuthRepository, type AuthRepository } from './auth.repository.js';
import { ChallengeService } from './challenge.service.js';
import { createEmailProvider, type EmailProvider } from './email.provider.js';
import { SessionService } from './session.service.js';

export function createAuthModule(dependencies?: {
  repository?: AuthRepository;
  emailProvider?: EmailProvider;
}) {
  const repository = dependencies?.repository ?? new PrismaAuthRepository(prisma);
  const audit = new AuditService(repository);
  const challenges = new ChallengeService(
    repository,
    dependencies?.emailProvider ?? createEmailProvider(),
  );
  return {
    account: new AccountService(repository, challenges, audit),
    audit,
    repository,
    sessions: new SessionService(repository),
  };
}

export const authModule = createAuthModule();
