import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import universityImages from './university-image-manifest.json' with { type: 'json' };

const prisma = new PrismaClient();
const manifest = universityImages as Record<string, { secureUrl: string; publicId: string }>;
const apply = process.argv.includes('--apply');

async function main() {
  const rows = await prisma.university.findMany({
    select: { id: true, slug: true, imageUrl: true },
  });

  const planned: { id: string; slug: string; from: string; to: string }[] = [];
  const alreadyCloudinary: string[] = [];
  const unmapped: string[] = [];

  for (const row of rows) {
    if (row.imageUrl.startsWith('https://')) {
      alreadyCloudinary.push(row.slug);
      continue;
    }
    const entry = manifest[row.slug];
    if (!entry) {
      unmapped.push(row.slug);
      continue;
    }
    planned.push({ id: row.id, slug: row.slug, from: row.imageUrl, to: entry.secureUrl });
  }

  for (const change of planned) console.log(`${change.slug}: ${change.from} -> ${change.to}`);
  if (unmapped.length) console.warn(`\nNo manifest entry (left untouched): ${unmapped.join(', ')}`);
  console.log(
    `\nplanned=${planned.length} alreadyCloudinary=${alreadyCloudinary.length} unmapped=${unmapped.length}`,
  );

  if (!apply) {
    console.log('\nDry run. Re-run with --apply to write these changes.');
    return;
  }

  await prisma.$transaction(
    planned.map((change) =>
      prisma.university.update({ where: { id: change.id }, data: { imageUrl: change.to } }),
    ),
  );
  console.log(`\nApplied ${planned.length} updates.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
