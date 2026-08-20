import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { UserRole } from '@prisma/client';
import { universities } from '../apps/web/src/data/universities.ts';

const prisma = new PrismaClient();

async function main() {
  const email = process.env.BOOTSTRAP_ADMIN_EMAIL?.trim().toLowerCase();
  if (!email) throw new Error('BOOTSTRAP_ADMIN_EMAIL is required');

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error(
      `No account exists for ${email}. Register and verify it before bootstrapping admin access.`,
    );
  }
  if (!user.emailVerifiedAt) {
    throw new Error(`The account ${email} must verify its email before receiving admin access.`);
  }

  await prisma.$transaction([
    prisma.user.update({ where: { id: user.id }, data: { role: UserRole.ADMIN } }),
    prisma.auditLog.create({
      data: {
        actorUserId: user.id,
        action: 'auth.admin.bootstrap',
        entityType: 'User',
        entityId: user.id,
      },
    }),
  ]);

  await prisma.$transaction(
    universities.map((university, sortOrder) =>
      prisma.university.upsert({
        where: { slug: university.id },
        update: {
          nameAr: university.name,
          nameEn: university.name,
          nameTr: university.name,
          imageUrl: `https://aboutalebeducation.com${university.image}`,
          city: university.city,
          featured: sortOrder < 8,
          isPublished: true,
          archivedAt: null,
          sortOrder,
        },
        create: {
          slug: university.id,
          nameAr: university.name,
          nameEn: university.name,
          nameTr: university.name,
          summaryAr: 'شريك أكاديمي معتمد للطلاب الدوليين.',
          summaryEn: 'An approved academic partner for international students.',
          summaryTr: 'Uluslararası öğrenciler için onaylı akademik ortağımız.',
          city: university.city,
          imageUrl: `https://aboutalebeducation.com${university.image}`,
          featured: sortOrder < 8,
          isPublished: true,
          sortOrder,
        },
      }),
    ),
  );

  await prisma.$transaction([
    prisma.socialLink.upsert({
      where: { platform_url: { platform: 'whatsapp', url: 'https://wa.me/905015959880' } },
      update: {
        labelAr: 'واتساب',
        labelEn: 'WhatsApp',
        labelTr: 'WhatsApp',
        isVisible: true,
        archivedAt: null,
        sortOrder: 0,
      },
      create: {
        platform: 'whatsapp',
        labelAr: 'واتساب',
        labelEn: 'WhatsApp',
        labelTr: 'WhatsApp',
        url: 'https://wa.me/905015959880',
        iconKey: 'whatsapp',
        sortOrder: 0,
      },
    }),
    prisma.socialLink.upsert({
      where: {
        platform_url: {
          platform: 'instagram',
          url: 'https://www.instagram.com/abou.taleb.education',
        },
      },
      update: {
        labelAr: 'إنستجرام',
        labelEn: 'Instagram',
        labelTr: 'Instagram',
        isVisible: true,
        archivedAt: null,
        sortOrder: 1,
      },
      create: {
        platform: 'instagram',
        labelAr: 'إنستجرام',
        labelEn: 'Instagram',
        labelTr: 'Instagram',
        url: 'https://www.instagram.com/abou.taleb.education',
        iconKey: 'instagram',
        sortOrder: 1,
      },
    }),
    prisma.socialLink.upsert({
      where: {
        platform_url: { platform: 'facebook', url: 'https://www.facebook.com/AbouTalebEducation' },
      },
      update: {
        labelAr: 'فيسبوك',
        labelEn: 'Facebook',
        labelTr: 'Facebook',
        isVisible: true,
        archivedAt: null,
        sortOrder: 2,
      },
      create: {
        platform: 'facebook',
        labelAr: 'فيسبوك',
        labelEn: 'Facebook',
        labelTr: 'Facebook',
        url: 'https://www.facebook.com/AbouTalebEducation',
        iconKey: 'facebook',
        sortOrder: 2,
      },
    }),
    ...[
      ['contact_phone', '+90 501 595 98 80'],
      ['contact_email_primary', 'info@aboutalebeducation.com'],
      ['contact_email_secondary', 'AboutalebEducation@gmail.com'],
      ['contact_whatsapp', 'https://wa.me/905015959880'],
    ].map(([key, value]) =>
      prisma.managedContent.upsert({ where: { key }, update: { value }, create: { key, value } }),
    ),
  ]);
  process.stdout.write(JSON.stringify({ event: 'auth.admin.bootstrap', userId: user.id }) + '\n');
}

try {
  await main();
} finally {
  await prisma.$disconnect();
}
