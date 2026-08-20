# University asset migration mapping

The seed migration preserves every static catalog image without rendering the static catalog at runtime. For each source record in `apps/web/src/data/universities.ts`, the old root-relative path is mapped by the deterministic rule:

`/<filename>` → `https://aboutalebeducation.com/<filename>`

The resulting URL is stored in `University.imageUrl`. This keeps malformed legacy filenames traceable while allowing the approved HTTPS asset host to normalize or replace them later without changing university slugs.
