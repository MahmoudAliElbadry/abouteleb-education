# Abou-Taleb Education

## Development status

The project is being migrated from the original static GitHub Pages site to a TypeScript monorepo with React, Express, PostgreSQL, and Prisma.

- Current implementation branch: `codex/phase-01-foundation`
- Project baseline: [PROJECT_BASELINE.md](PROJECT_BASELINE.md)
- Approved development plan: [DEVELOPMENT_PLAN.md](DEVELOPMENT_PLAN.md)

### Local foundation setup

Requirements: Node.js 20+, npm, and Docker.

```bash
npm install
docker compose up -d postgres
cp .env.example .env
npm run db:generate
npm run db:migrate
npm run dev
```

The web app runs at `http://localhost:5173` and the API health endpoint is available at `http://localhost:4000/api/v1/health`.

After registering and verifying the bootstrap account, promote it to admin with:

```bash
npm run db:seed
```

Run the quality checks with:

```bash
npm run format:check
npm run lint
npm run typecheck
npm test
npm run build
```

### Development component tools

When the React app runs through `npm run dev`, two development-only tools are available:

- **React Grab:** hover a UI element and press `Ctrl+C` (or `Cmd+C` on macOS) to copy its component/source context for a fix request.
- **React Scan:** use its floating toolbar to inspect React re-renders and performance hotspots.

These tools are excluded from the production build.

موقع الشركة المتخصص في تقديم خدمات القبول الجامعي والتسجيل والسكن والتأشيرة للطلاب الراغبين في الدراسة بتركيا.

## لغات الدراسة
- الإنجليزية
- التركية

## روابط
- [الموقع المباشر](https://mahmoudalielbadry.github.io/abouteleb-education/)
- [فيسبوك](https://www.facebook.com/profile.php?id=61584648631420)
- [إنستجرام](https://www.instagram.com/abou.taleb.education)
