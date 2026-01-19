# Backend - Medusa Commerce Engine

Headless commerce backend powering the Laundry Commerce platform.

## Overview

Medusa v2 backend with custom modules, workflows, and API routes for laundry service operations.

## Tech Stack

- **Framework**: Medusa v2.11.3
- **Database**: PostgreSQL 14+
- **Language**: TypeScript
- **Admin**: Built-in admin dashboard

## Quick Start

```bash
cd apps/backend
npm install
npm run docker:up        # Start PostgreSQL
npx medusa db:migrate    # Run migrations
npm run seed             # Optional: seed data
npm run dev              # Start server
```

Access:
- API: http://localhost:9000
- Admin: http://localhost:9000/app

## Project Structure

```
src/
├── admin/         # Admin panel customizations
├── api/           # Custom API routes
├── jobs/          # Scheduled jobs
├── links/         # Module relationships
├── modules/       # Custom modules
├── scripts/       # CLI utilities
├── subscribers/   # Event handlers
└── workflows/     # Business logic
```

## Customization

### API Routes

Create file-based routes in `src/api/`:

```ts
// src/api/store/services/route.ts
import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  res.json({ services: [...] });
}
```

### Workflows

Orchestrate business logic:

```ts
import { createWorkflow, createStep } from "@medusajs/framework/workflows-sdk";

const myWorkflow = createWorkflow("my-workflow", (input) => {
  // Define steps
});
```

### Custom Modules

Add domain-specific functionality in `src/modules/`.

See README files in each subdirectory for detailed guides.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run docker:up` | Start PostgreSQL |
| `npm run docker:down` | Stop PostgreSQL |
| `npm run seed` | Seed database |

## Environment Variables

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/medusa
JWT_SECRET=your-secret
COOKIE_SECRET=your-cookie-secret
ADMIN_CORS=http://localhost:9000
STORE_CORS=http://localhost:8000
```

## Documentation

- [Main README](../../README.md)
- [Frontend README](../frontend/README.md)
- [API Routes](./src/api/README.md)
- [Workflows](./src/workflows/README.md)
- [Modules](./src/modules/README.md)
- [Medusa Docs](https://docs.medusajs.com)

---

Powered by Medusa v2 • Built by Martin Iliew
