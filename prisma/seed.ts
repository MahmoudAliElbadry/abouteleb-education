import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Foundation seed placeholder. Admin bootstrap is implemented with Phase 2 auth.');
}

try {
  await main();
} finally {
  await prisma.$disconnect();
}
