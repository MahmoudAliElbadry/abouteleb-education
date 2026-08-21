import type { PrismaClient } from '@prisma/client';
import { CONTACT_KEYS, type ManagedContactUpsertInput } from '@abou/contracts';
import { audit } from './shared.js';
export class ManagedContactService {
  constructor(private readonly prisma: PrismaClient) {}
  async listPublic() {
    return this.prisma.managedContent.findMany({
      where: { key: { in: [...CONTACT_KEYS] } },
      orderBy: { key: 'asc' },
      select: { key: true, value: true },
    });
  }
  async listAdmin() {
    return this.listPublic();
  }
  async upsert(input: ManagedContactUpsertInput, actorId: string, ipAddress?: string) {
    return this.prisma.$transaction(async (tx) => {
      const content = await tx.managedContent.upsert({
        where: { key: input.key },
        update: { value: input.value },
        create: input,
        select: { key: true, value: true },
      });
      await audit(tx, 'content.contact.updated', 'ManagedContent', input.key, actorId, ipAddress);
      return content;
    });
  }
}
