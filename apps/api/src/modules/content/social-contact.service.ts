import { Prisma, type PrismaClient } from '@prisma/client';
import type {
  ManagedContactUpsertInput,
  ManagedContentListQuery,
  SocialLinkCreateInput,
  SocialLinkUpdateInput,
} from '@abou/contracts';
import { appErrors } from '../../core/app-error.js';

const publicSocialFields = {
  id: true,
  platform: true,
  labelAr: true,
  labelEn: true,
  labelTr: true,
  url: true,
  iconKey: true,
  sortOrder: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.SocialLinkSelect;
const adminSocialFields = {
  ...publicSocialFields,
  isVisible: true,
  archivedAt: true,
} satisfies Prisma.SocialLinkSelect;

export class SocialContactService {
  constructor(private readonly prisma: PrismaClient) {}
  async listPublicSocial() {
    return this.prisma.socialLink.findMany({
      where: { isVisible: true, archivedAt: null },
      orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }],
      select: publicSocialFields,
    });
  }
  async listAdminSocial(query: ManagedContentListQuery) {
    const where: Prisma.SocialLinkWhereInput = {
      ...(query.isPublished === undefined ? {} : { isVisible: query.isPublished }),
      ...(query.search
        ? {
            OR: [
              { platform: { contains: query.search, mode: 'insensitive' } },
              { labelAr: { contains: query.search, mode: 'insensitive' } },
              { labelEn: { contains: query.search, mode: 'insensitive' } },
              { labelTr: { contains: query.search, mode: 'insensitive' } },
            ],
          }
        : {}),
    };
    const [items, total] = await this.prisma.$transaction([
      this.prisma.socialLink.findMany({
        where,
        orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }],
        skip: (query.page - 1) * query.pageSize,
        take: query.pageSize,
        select: adminSocialFields,
      }),
      this.prisma.socialLink.count({ where }),
    ]);
    return { items, total, page: query.page, pageSize: query.pageSize };
  }
  async createSocial(input: SocialLinkCreateInput, actorId: string, ipAddress?: string) {
    try {
      const link = await this.prisma.socialLink.create({ data: input, select: adminSocialFields });
      await this.audit('content.social_link.created', link.id, actorId, ipAddress);
      return link;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002')
        throw appErrors.contentConflict();
      throw error;
    }
  }
  async updateSocial(
    id: string,
    input: SocialLinkUpdateInput,
    actorId: string,
    ipAddress?: string,
  ) {
    const data = Object.fromEntries(
      Object.entries(input).filter(([, value]) => value !== undefined),
    ) as Prisma.SocialLinkUpdateInput;
    try {
      const link = await this.prisma.socialLink.update({
        where: { id },
        data,
        select: adminSocialFields,
      });
      await this.audit('content.social_link.updated', id, actorId, ipAddress);
      return link;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002')
        throw appErrors.contentConflict();
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025')
        throw appErrors.notFound();
      throw error;
    }
  }
  async archiveSocial(id: string, actorId: string, ipAddress?: string) {
    const result = await this.prisma.socialLink.updateMany({
      where: { id },
      data: { archivedAt: new Date(), isVisible: false },
    });
    if (result.count !== 1) throw appErrors.notFound();
    await this.audit('content.social_link.archived', id, actorId, ipAddress);
  }
  async restoreSocial(id: string, actorId: string, ipAddress?: string) {
    const result = await this.prisma.socialLink.updateMany({
      where: { id },
      data: { archivedAt: null },
    });
    if (result.count !== 1) throw appErrors.notFound();
    await this.audit('content.social_link.restored', id, actorId, ipAddress);
  }
  async listPublicContact() {
    return this.prisma.managedContent.findMany({
      where: {
        key: {
          in: [
            'contact_phone',
            'contact_email_primary',
            'contact_email_secondary',
            'contact_whatsapp',
          ],
        },
      },
      orderBy: { key: 'asc' },
      select: { key: true, value: true },
    });
  }
  async listAdminContact() {
    return this.listPublicContact();
  }
  async upsertContact(input: ManagedContactUpsertInput, actorId: string, ipAddress?: string) {
    const content = await this.prisma.managedContent.upsert({
      where: { key: input.key },
      update: { value: input.value },
      create: input,
      select: { key: true, value: true },
    });
    await this.audit('content.contact.updated', input.key, actorId, ipAddress);
    return content;
  }
  private async audit(action: string, entityId: string, actorUserId: string, ipAddress?: string) {
    await this.prisma.auditLog.create({
      data: {
        actorUserId,
        action,
        entityType: 'ManagedContent',
        entityId,
        ipAddress: ipAddress ?? null,
      },
    });
  }
}
