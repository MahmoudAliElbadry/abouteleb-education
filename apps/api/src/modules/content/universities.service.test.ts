import { describe, expect, it, vi } from 'vitest';
import type { PrismaClient } from '@prisma/client';
import { UniversitiesService } from './universities.service.js';

const university = {
  id: 'university-1',
  slug: 'example-university',
  nameAr: 'جامعة تجريبية',
  nameEn: 'Example University',
  nameTr: 'Örnek Üniversitesi',
  city: 'Istanbul',
  imageUrl: 'https://aboutalebeducation.com/example.png',
  websiteUrl: null,
  featured: true,
  isPublished: true,
  archivedAt: null,
  sortOrder: 0,
  createdAt: new Date('2026-08-20T00:00:00.000Z'),
  updatedAt: new Date('2026-08-20T00:00:00.000Z'),
};

describe('UniversitiesService', () => {
  it('returns only published, non-archived universities publicly', async () => {
    const prisma = {
      university: { findMany: vi.fn().mockResolvedValue([university]) },
    };
    const result = await new UniversitiesService(prisma as unknown as PrismaClient).listPublic();

    expect(result).toEqual([university]);
    expect(prisma.university.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { isPublished: true, archivedAt: null },
        orderBy: [{ featured: 'desc' }, { sortOrder: 'asc' }, { id: 'asc' }],
      }),
    );
  });

  it('does not expose an unpublished university by slug', async () => {
    const prisma = { university: { findFirst: vi.fn().mockResolvedValue(null) } };

    await expect(
      new UniversitiesService(prisma as unknown as PrismaClient).findPublic('hidden'),
    ).rejects.toMatchObject({
      code: 'NOT_FOUND',
    });
  });

  it('audits an administrator-created university', async () => {
    const prisma = {
      university: { create: vi.fn().mockResolvedValue(university) },
      auditLog: { create: vi.fn() },
      $transaction: vi.fn(async (callback) => callback(prisma)),
    };
    const service = new UniversitiesService(prisma as unknown as PrismaClient);

    await service.create(
      {
        slug: university.slug,
        nameAr: university.nameAr,
        nameEn: university.nameEn,
        nameTr: university.nameTr,
        city: university.city,
        imageUrl: university.imageUrl,
        featured: false,
        isPublished: false,
        sortOrder: 0,
      },
      'admin-1',
    );

    expect(prisma.auditLog.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        action: 'content.university.created',
        entityId: university.id,
      }),
    });
  });
});
