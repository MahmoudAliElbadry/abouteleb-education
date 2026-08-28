import 'dotenv/config';
import { readFile, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { universities } from '../apps/web/src/data/universities.ts';
import { UploadsService } from '../apps/api/src/modules/uploads/uploads.service.ts';

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(here, '..');
const imagesDir = join(repoRoot, 'apps/web/public/images');
const manifestPath = join(here, 'university-image-manifest.json');
const FOLDER = 'abou-taleb/universities';

type ManifestEntry = { secureUrl: string; publicId: string };

async function main() {
  for (const key of ['CLOUDINARY_CLOUD_NAME', 'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET']) {
    if (!process.env[key]) throw new Error(`${key} is required to run this migration`);
  }

  const service = new UploadsService();
  const manifest: Record<string, ManifestEntry> = JSON.parse(
    await readFile(manifestPath, 'utf8').catch(() => '{}'),
  );

  let uploaded = 0;
  let skipped = 0;
  for (const university of universities) {
    if (manifest[university.id]) {
      console.log(`skip  ${university.id} (already in manifest)`);
      skipped += 1;
      continue;
    }
    const buffer = await readFile(join(imagesDir, `${university.id}.png`));
    const result = await service.uploadImage(buffer, {
      publicId: university.id,
      folder: FOLDER,
    });
    manifest[university.id] = {
      secureUrl: result.secure_url,
      publicId: result.public_id,
    };
    await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
    console.log(`ok    ${university.id} -> ${result.secure_url}`);
    uploaded += 1;
  }

  console.log(`\nDone. uploaded=${uploaded} skipped=${skipped} total=${universities.length}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
