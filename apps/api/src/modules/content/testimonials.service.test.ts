import { describe, expect, it, vi } from 'vitest';
import type { PrismaClient } from '@prisma/client';
import { TestimonialsService } from './testimonials.service.js';

const testimonial = {
  id: 'testimonial-1',
  clientNameAr: 'عميل',
  clientNameEn: 'Client',
  clientNameTr: 'Müşteri',
  quoteAr: 'رأي',
  quoteEn: 'Quote',
  quoteTr: 'Alıntı',
  imageUrl: null,
  consentConfirmed: true,
  isPublished: true,
  archivedAt: null,
  sortOrder: 0,
  createdAt: new Date('2026-08-20T00:00:00.000Z'),
  updatedAt: new Date('2026-08-20T00:00:00.000Z'),
};

describe('TestimonialsService', () => {
  it('filters public results to published consented records', async () => {
    const prisma = { testimonial: { findMany: vi.fn().mockResolvedValue([testimonial]) } };
    await expect(
      new TestimonialsService(prisma as unknown as PrismaClient).listPublic(),
    ).resolves.toEqual([testimonial]);
    expect(prisma.testimonial.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { isPublished: true, consentConfirmed: true, archivedAt: null },
      }),
    );
  });

  it('rejects publication without consent on the server', async () => {
    const prisma = { testimonial: { create: vi.fn() } };
    await expect(
      new TestimonialsService(prisma as unknown as PrismaClient).create(
        {
          clientNameAr: 'عميل',
          clientNameEn: 'Client',
          clientNameTr: 'Müşteri',
          quoteAr: 'رأي',
          quoteEn: 'Quote',
          quoteTr: 'Alıntı',
          imageUrl: null,
          consentConfirmed: false,
          isPublished: true,
          sortOrder: 0,
        },
        'admin-1',
      ),
    ).rejects.toMatchObject({ status: 422 });
    expect(prisma.testimonial.create).not.toHaveBeenCalled();
  });

  it('audits a consented publication', async () => {
    const prisma = {
      testimonial: { create: vi.fn().mockResolvedValue(testimonial) },
      auditLog: { create: vi.fn() },
      $transaction: vi.fn(async (callback) => callback(prisma)),
    };
    await new TestimonialsService(prisma as unknown as PrismaClient).create(
      {
        clientNameAr: 'عميل',
        clientNameEn: 'Client',
        clientNameTr: 'Müşteri',
        quoteAr: 'رأي',
        quoteEn: 'Quote',
        quoteTr: 'Alıntı',
        imageUrl: null,
        consentConfirmed: true,
        isPublished: true,
        sortOrder: 0,
      },
      'admin-1',
    );
    expect(prisma.auditLog.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ action: 'content.testimonial.created' }),
      }),
    );
  });
});
