import { describe, expect, it, vi } from 'vitest';
import { SocialContactService } from './social-contact.service.js';

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

describe('SocialContactService', () => {
  it('returns only visible, non-archived social links publicly', async () => {
    const prisma = { socialLink: { findMany: vi.fn().mockResolvedValue([link]) } };
    await expect(new SocialContactService(prisma as never).listPublicSocial()).resolves.toEqual([
      link,
    ]);
    expect(prisma.socialLink.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { isVisible: true, archivedAt: null } }),
    );
  });

  it('audits contact upserts', async () => {
    const prisma = {
      managedContent: { upsert: vi.fn().mockResolvedValue({ key: 'contact_phone', value: '+90' }) },
      auditLog: { create: vi.fn() },
    };
    await new SocialContactService(prisma as never).upsertContact(
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
