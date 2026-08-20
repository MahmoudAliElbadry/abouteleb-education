import { Prisma, type PrismaClient } from '@prisma/client';
import type {
  ManagedContentListQuery,
  TestimonialCreateInput,
  TestimonialUpdateInput,
} from '@abou/contracts';
import { appErrors, AppError } from '../../core/app-error.js';

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
    const [items, total] = await this.prisma.$transaction([
      this.prisma.testimonial.findMany({
        where,
        orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }],
        skip: (query.page - 1) * query.pageSize,
        take: query.pageSize,
        select: adminFields,
      }),
      this.prisma.testimonial.count({ where }),
    ]);
    return { items, total, page: query.page, pageSize: query.pageSize };
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
    const testimonial = await this.prisma.testimonial.create({ data, select: adminFields });
    await this.audit('content.testimonial.created', testimonial.id, actorId, ipAddress);
    return testimonial;
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
    const testimonial = await this.prisma.testimonial.update({
      where: { id },
      data,
      select: adminFields,
    });
    await this.audit(
      input.isPublished === undefined
        ? 'content.testimonial.updated'
        : 'content.testimonial.publication_changed',
      id,
      actorId,
      ipAddress,
    );
    return testimonial;
  }
  async archive(id: string, actorId: string, ipAddress?: string) {
    const result = await this.prisma.testimonial.updateMany({
      where: { id },
      data: { archivedAt: new Date(), isPublished: false },
    });
    if (result.count !== 1) throw appErrors.notFound();
    await this.audit('content.testimonial.archived', id, actorId, ipAddress);
  }
  private assertPublicationConsent(isPublished: boolean, consentConfirmed: boolean) {
    if (isPublished && !consentConfirmed)
      throw new AppError(
        'VALIDATION_ERROR',
        422,
        'Testimonial publication requires confirmed consent',
      );
  }
  private async audit(action: string, entityId: string, actorUserId: string, ipAddress?: string) {
    await this.prisma.auditLog.create({
      data: {
        actorUserId,
        action,
        entityType: 'Testimonial',
        entityId,
        ipAddress: ipAddress ?? null,
      },
    });
  }
}
