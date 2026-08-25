import { Prisma, type PrismaClient } from '@prisma/client';
import type {
  ManagedContentListQuery,
  UniversityCreateInput,
  UniversityUpdateInput,
} from '@abou/contracts';
import { appErrors } from '../../core/app-error.js';
import { audit, listAdminPage } from './shared.js';

const publicFields = {
  id: true,
  slug: true,
  nameAr: true,
  nameEn: true,
  nameTr: true,
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
    return listAdminPage(
      this.prisma,
      this.prisma.university,
      where,
      [{ sortOrder: 'asc' }, { id: 'asc' }],
      query.page,
      query.pageSize,
      adminFields,
    );
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
      return await this.prisma.$transaction(async (tx) => {
        const university = await tx.university.create({ data, select: adminFields });
        await audit(
          tx,
          'content.university.created',
          'University',
          university.id,
          actorId,
          ipAddress,
        );
        return university;
      });
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
      return await this.prisma.$transaction(async (tx) => {
        const university = await tx.university.update({ where: { id }, data, select: adminFields });
        await audit(tx, 'content.university.updated', 'University', id, actorId, ipAddress);
        return university;
      });
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
    await this.prisma.$transaction(async (tx) => {
      const university = await tx.university.updateMany({
        where: { id },
        data: { archivedAt: new Date() },
      });
      if (university.count !== 1) throw appErrors.notFound();
      await audit(tx, 'content.university.archived', 'University', id, actorId, ipAddress);
    });
  }

  async restore(id: string, actorId: string, ipAddress?: string) {
    await this.prisma.$transaction(async (tx) => {
      const university = await tx.university.updateMany({
        where: { id },
        data: { archivedAt: null },
      });
      if (university.count !== 1) throw appErrors.notFound();
      await audit(tx, 'content.university.restored', 'University', id, actorId, ipAddress);
    });
  }
}
