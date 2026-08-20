import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { UserRole } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const email = process.env.BOOTSTRAP_ADMIN_EMAIL?.trim().toLowerCase();
  if (!email) throw new Error('BOOTSTRAP_ADMIN_EMAIL is required');

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error(
      `No account exists for ${email}. Register and verify it before bootstrapping admin access.`,
    );
  }
  if (!user.emailVerifiedAt) {
    throw new Error(`The account ${email} must verify its email before receiving admin access.`);
  }

  await prisma.$transaction([
    prisma.user.update({ where: { id: user.id }, data: { role: UserRole.ADMIN } }),
    prisma.auditLog.create({
      data: {
        actorUserId: user.id,
        action: 'auth.admin.bootstrap',
        entityType: 'User',
        entityId: user.id,
      },
    }),
  ]);
  process.stdout.write(JSON.stringify({ event: 'auth.admin.bootstrap', userId: user.id }) + '\n');
}

try {
  await main();
} finally {
  await prisma.$disconnect();
}
