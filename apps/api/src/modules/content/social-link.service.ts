import { Prisma, type PrismaClient } from '@prisma/client';
import type {
  ManagedContentListQuery,
  SocialLinkCreateInput,
  SocialLinkUpdateInput,
} from '@abou/contracts';
import { appErrors } from '../../core/app-error.js';
import { audit, listAdminPage } from './shared.js';

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
export class SocialLinkService {
  constructor(private readonly prisma: PrismaClient) {}
  async listPublic() {
    return this.prisma.socialLink.findMany({
      where: { isVisible: true, archivedAt: null },
      orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }],
      select: publicSocialFields,
    });
  }
  async listAdmin(query: ManagedContentListQuery) {
    const where: Prisma.SocialLinkWhereInput = {
      ...(query.isPublished === undefined ? {} : { isVisible: query.isPublished }),
      ...(query.search
        ? {
            OR: ['platform', 'labelAr', 'labelEn', 'labelTr'].map((field) => ({
              [field]: { contains: query.search, mode: 'insensitive' },
            })),
          }
        : {}),
    };
    return listAdminPage(
      this.prisma,
      this.prisma.socialLink,
      where,
      [{ sortOrder: 'asc' }, { id: 'asc' }],
      query.page,
      query.pageSize,
      adminSocialFields,
    );
  }
  async create(input: SocialLinkCreateInput, actorId: string, ipAddress?: string) {
    try {
      return await this.prisma.$transaction(async (tx) => {
        const link = await tx.socialLink.create({ data: input, select: adminSocialFields });
        await audit(tx, 'content.social_link.created', 'SocialLink', link.id, actorId, ipAddress);
        return link;
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002')
        throw appErrors.contentConflict();
      throw error;
    }
  }
  async update(id: string, input: SocialLinkUpdateInput, actorId: string, ipAddress?: string) {
    const data = Object.fromEntries(
      Object.entries(input).filter(([, value]) => value !== undefined),
    ) as Prisma.SocialLinkUpdateInput;
    try {
      return await this.prisma.$transaction(async (tx) => {
        const link = await tx.socialLink.update({ where: { id }, data, select: adminSocialFields });
        await audit(tx, 'content.social_link.updated', 'SocialLink', id, actorId, ipAddress);
        return link;
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002')
        throw appErrors.contentConflict();
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025')
        throw appErrors.notFound();
      throw error;
    }
  }
  async archive(id: string, actorId: string, ipAddress?: string) {
    await this.prisma.$transaction(async (tx) => {
      const result = await tx.socialLink.updateMany({
        where: { id },
        data: { archivedAt: new Date() },
      });
      if (result.count !== 1) throw appErrors.notFound();
      await audit(tx, 'content.social_link.archived', 'SocialLink', id, actorId, ipAddress);
    });
  }
  async restore(id: string, actorId: string, ipAddress?: string) {
    await this.prisma.$transaction(async (tx) => {
      const result = await tx.socialLink.updateMany({ where: { id }, data: { archivedAt: null } });
      if (result.count !== 1) throw appErrors.notFound();
      await audit(tx, 'content.social_link.restored', 'SocialLink', id, actorId, ipAddress);
    });
  }
}
