import { Prisma, type PrismaClient } from '@prisma/client';
import type {
  ManagedContentListQuery,
  UniversityCreateInput,
  UniversityUpdateInput,
} from '@abou/contracts';
import { appErrors } from '../../core/app-error.js';

const publicFields = {
  id: true,
  slug: true,
  nameAr: true,
  nameEn: true,
  nameTr: true,
  summaryAr: true,
  summaryEn: true,
  summaryTr: true,
  city: true,
  imageUrl: true,
  websiteUrl: true,
  featured: true,
  sortOrder: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.UniversitySelect;

const adminFields = {
  ...publicFields,
  isPublished: true,
  archivedAt: true,
} satisfies Prisma.UniversitySelect;

export class UniversitiesService {
  constructor(private readonly prisma: PrismaClient) {}

  async listPublic() {
    return this.prisma.university.findMany({
      where: { isPublished: true, archivedAt: null },
      orderBy: [{ featured: 'desc' }, { sortOrder: 'asc' }, { id: 'asc' }],
      select: publicFields,
    });
  }

  async findPublic(slug: string) {
    const university = await this.prisma.university.findFirst({
      where: { slug, isPublished: true, archivedAt: null },
      select: publicFields,
    });
    if (!university) throw appErrors.notFound();
    return university;
  }

  async listAdmin(query: ManagedContentListQuery) {
    const where: Prisma.UniversityWhereInput = {
      ...(query.isPublished === undefined ? {} : { isPublished: query.isPublished }),
      ...(query.search
        ? {
            OR: [
              { slug: { contains: query.search, mode: 'insensitive' } },
              { nameAr: { contains: query.search, mode: 'insensitive' } },
              { nameEn: { contains: query.search, mode: 'insensitive' } },
              { nameTr: { contains: query.search, mode: 'insensitive' } },
            ],
          }
        : {}),
    };
    const [items, total] = await this.prisma.$transaction([
      this.prisma.university.findMany({
        where,
        orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }],
        skip: (query.page - 1) * query.pageSize,
        take: query.pageSize,
        select: adminFields,
      }),
      this.prisma.university.count({ where }),
    ]);
    return { items, total, page: query.page, pageSize: query.pageSize };
  }

  async findAdmin(id: string) {
    const university = await this.prisma.university.findUnique({
      where: { id },
      select: adminFields,
    });
    if (!university) throw appErrors.notFound();
    return university;
  }

  async create(input: UniversityCreateInput, actorId: string, ipAddress?: string) {
    try {
      const data: Prisma.UniversityCreateInput = {
        ...input,
        websiteUrl: input.websiteUrl ?? null,
      };
      const university = await this.prisma.university.create({ data, select: adminFields });
      await this.audit('content.university.created', university.id, actorId, ipAddress);
      return university;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw appErrors.contentConflict();
      }
      throw error;
    }
  }

  async update(id: string, input: UniversityUpdateInput, actorId: string, ipAddress?: string) {
    try {
      const data = Object.fromEntries(
        Object.entries(input).filter(([, value]) => value !== undefined),
      ) as Prisma.UniversityUpdateInput;
      const university = await this.prisma.university.update({
        where: { id },
        data,
        select: adminFields,
      });
      await this.audit('content.university.updated', id, actorId, ipAddress);
      return university;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw appErrors.contentConflict();
      }
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw appErrors.notFound();
      }
      throw error;
    }
  }

  async archive(id: string, actorId: string, ipAddress?: string) {
    const university = await this.prisma.university.updateMany({
      where: { id },
      data: { archivedAt: new Date(), isPublished: false },
    });
    if (university.count !== 1) throw appErrors.notFound();
    await this.audit('content.university.archived', id, actorId, ipAddress);
  }

  async restore(id: string, actorId: string, ipAddress?: string) {
    const university = await this.prisma.university.updateMany({
      where: { id },
      data: { archivedAt: null },
    });
    if (university.count !== 1) throw appErrors.notFound();
    await this.audit('content.university.restored', id, actorId, ipAddress);
  }

  private async audit(action: string, entityId: string, actorUserId: string, ipAddress?: string) {
    await this.prisma.auditLog.create({
      data: {
        actorUserId,
        action,
        entityType: 'University',
        entityId,
        ipAddress: ipAddress ?? null,
      },
    });
  }
}
