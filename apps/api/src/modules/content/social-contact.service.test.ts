import { describe, expect, it, vi } from 'vitest';
import type { PrismaClient } from '@prisma/client';
import { ManagedContactService } from './managed-contact.service.js';
import { SocialLinkService } from './social-link.service.js';

const link = {
  id: 'social-1',
  platform: 'instagram',
  labelAr: 'إنستجرام',
  labelEn: 'Instagram',
  labelTr: 'Instagram',
  url: 'https://www.instagram.com/example',
  iconKey: 'instagram',
  isVisible: true,
  archivedAt: null,
  sortOrder: 0,
  createdAt: new Date('2026-08-20T00:00:00.000Z'),
  updatedAt: new Date('2026-08-20T00:00:00.000Z'),
};

describe('managed social content services', () => {
  it('returns only visible, non-archived social links publicly', async () => {
    const prisma = { socialLink: { findMany: vi.fn().mockResolvedValue([link]) } };
    await expect(
      new SocialLinkService(prisma as unknown as PrismaClient).listPublic(),
    ).resolves.toEqual([link]);
    expect(prisma.socialLink.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { isVisible: true, archivedAt: null } }),
    );
  });

  it('audits contact upserts', async () => {
    const prisma = {
      managedContent: { upsert: vi.fn().mockResolvedValue({ key: 'contact_phone', value: '+90' }) },
      auditLog: { create: vi.fn() },
      $transaction: vi.fn(async (callback) => callback(prisma)),
    };
    await new ManagedContactService(prisma as unknown as PrismaClient).upsert(
      { key: 'contact_phone', value: '+90' },
      'admin-1',
    );
    expect(prisma.auditLog.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ action: 'content.contact.updated' }),
      }),
    );
  });
});
