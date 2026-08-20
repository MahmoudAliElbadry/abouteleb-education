import { Prisma, type PrismaClient } from '@prisma/client';
import type {
  ManagedContentListQuery,
  TestimonialCreateInput,
  TestimonialUpdateInput,
} from '@abou/contracts';
import { appErrors, AppError } from '../../core/app-error.js';
import { audit, listAdminPage } from './shared.js';

const publicFields = {
  id: true,
  clientNameAr: true,
  clientNameEn: true,
  clientNameTr: true,
  quoteAr: true,
  quoteEn: true,
  quoteTr: true,
  imageUrl: true,
  sortOrder: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.TestimonialSelect;
const adminFields = {
  ...publicFields,
  consentConfirmed: true,
  isPublished: true,
  archivedAt: true,
} satisfies Prisma.TestimonialSelect;

export class TestimonialsService {
  constructor(private readonly prisma: PrismaClient) {}
  async listPublic() {
    return this.prisma.testimonial.findMany({
      where: { isPublished: true, consentConfirmed: true, archivedAt: null },
      orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }],
      select: publicFields,
    });
  }
  async listAdmin(query: ManagedContentListQuery) {
    const where: Prisma.TestimonialWhereInput = {
      ...(query.isPublished === undefined ? {} : { isPublished: query.isPublished }),
      ...(query.search
        ? {
            OR: [
              { clientNameAr: { contains: query.search, mode: 'insensitive' } },
              { clientNameEn: { contains: query.search, mode: 'insensitive' } },
              { clientNameTr: { contains: query.search, mode: 'insensitive' } },
            ],
          }
        : {}),
    };
    return listAdminPage(
      this.prisma,
      this.prisma.testimonial,
      where,
      [{ sortOrder: 'asc' }, { id: 'asc' }],
      query.page,
      query.pageSize,
      adminFields,
    );
  }
  async findAdmin(id: string) {
    const testimonial = await this.prisma.testimonial.findUnique({
      where: { id },
      select: adminFields,
    });
    if (!testimonial) throw appErrors.notFound();
    return testimonial;
  }
  async create(input: TestimonialCreateInput, actorId: string, ipAddress?: string) {
    this.assertPublicationConsent(input.isPublished, input.consentConfirmed);
    const data: Prisma.TestimonialCreateInput = { ...input, imageUrl: input.imageUrl ?? null };
    return this.prisma.$transaction(async (tx) => {
      const testimonial = await tx.testimonial.create({ data, select: adminFields });
      await audit(
        tx,
        'content.testimonial.created',
        'Testimonial',
        testimonial.id,
        actorId,
        ipAddress,
      );
      return testimonial;
    });
  }
  async update(id: string, input: TestimonialUpdateInput, actorId: string, ipAddress?: string) {
    const existing = await this.prisma.testimonial.findUnique({
      where: { id },
      select: { isPublished: true, consentConfirmed: true },
    });
    if (!existing) throw appErrors.notFound();
    this.assertPublicationConsent(
      input.isPublished ?? existing.isPublished,
      input.consentConfirmed ?? existing.consentConfirmed,
    );
    const data = Object.fromEntries(
      Object.entries(input).filter(([, value]) => value !== undefined),
    ) as Prisma.TestimonialUpdateInput;
    return this.prisma.$transaction(async (tx) => {
      const testimonial = await tx.testimonial.update({ where: { id }, data, select: adminFields });
      await audit(
        tx,
        input.isPublished === undefined
          ? 'content.testimonial.updated'
          : 'content.testimonial.publication_changed',
        'Testimonial',
        id,
        actorId,
        ipAddress,
      );
      return testimonial;
    });
  }
  async archive(id: string, actorId: string, ipAddress?: string) {
    await this.prisma.$transaction(async (tx) => {
      const result = await tx.testimonial.updateMany({
        where: { id },
        data: { archivedAt: new Date() },
      });
      if (result.count !== 1) throw appErrors.notFound();
      await audit(tx, 'content.testimonial.archived', 'Testimonial', id, actorId, ipAddress);
    });
  }
  async restore(id: string, actorId: string, ipAddress?: string) {
    await this.prisma.$transaction(async (tx) => {
      const result = await tx.testimonial.updateMany({ where: { id }, data: { archivedAt: null } });
      if (result.count !== 1) throw appErrors.notFound();
      await audit(tx, 'content.testimonial.restored', 'Testimonial', id, actorId, ipAddress);
    });
  }
  private assertPublicationConsent(isPublished: boolean, consentConfirmed: boolean) {
    if (isPublished && !consentConfirmed)
      throw new AppError(
        'VALIDATION_ERROR',
        422,
        'Testimonial publication requires confirmed consent',
      );
  }
}
