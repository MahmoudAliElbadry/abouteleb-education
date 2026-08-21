# University asset migration mapping

The 41 original filenames remain traceable in `apps/web/src/data/universities.ts`. Each source record is now vendored using its stable slug, with this complete deterministic mapping:

`/<original filename>` → `/images/<university slug>.png`

The assets are stored in `apps/web/public/images/` and the seed writes `/images/${university.id}.png` in both create and update paths. This replaces the former broken root-hosted URL rule without changing slugs or sort order. All 41 source files were retrieved from `MahmoudAliElbadry/abouteleb-education`; `/images/logo.png` is also vendored as the catalog fallback.
