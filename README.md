# Laundry Commerce Platform

A modern, full-stack e-commerce platform for laundry services built with Medusa v2 and Next.js 15, featuring bilingual support (English/Bulgarian) and a headless commerce architecture.

## Project Highlights

- **Bilingual Platform**: Full internationalization support for English and Bulgarian markets
- **Modern Stack**: Next.js 15 (App Router, Server Components, Server Actions) with Medusa v2
- **Headless Architecture**: Decoupled backend/frontend for maximum flexibility
- **Type-Safe**: End-to-end TypeScript implementation
- **Production-Ready**: Docker support, optimized builds, enterprise-grade patterns

## Architecture

This monorepo contains two main applications:

```
laundry-commerce/
├── apps/
│   ├── backend/      # Medusa v2 commerce engine
│   └── frontend/     # Next.js 15 storefront
```

### Backend

- **Framework**: Medusa v2.11.3
- **Database**: PostgreSQL (Docker)
- **Features**: Custom modules, workflows, API routes, admin customizations
- **Language**: TypeScript

### Frontend

- **Framework**: Next.js 15.3.1 with App Router
- **UI**: Tailwind CSS + @medusajs/ui components
- **Internationalization**: next-intl (en, bg)
- **Payments**: Stripe integration
- **Language**: TypeScript + React 19 RC

## Quick Start

### Prerequisites

- Node.js ≥ 20
- Docker & Docker Compose
- Yarn 4.6.0

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/martin-iliew/laundry-commerce.git
   cd laundry-commerce
   ```

2. **Start both backend and frontend**
   ```bash
   npm start
   ```
   This will:
   - Spin up PostgreSQL via Docker
   - Start Medusa backend on `http://localhost:9000`
   - Start Next.js frontend on `http://localhost:8000`

3. **Stop services**
   ```bash
   npm stop
   ```

### Manual Setup

**Backend:**
```bash
cd apps/backend
npm run docker:up    # Start PostgreSQL
npm run dev          # Start Medusa dev server
```

**Frontend:**
```bash
cd apps/frontend
npm run dev          # Start Next.js dev server (port 8000)
```

## Key Features

### E-commerce Capabilities

- Product catalog with collections
- Shopping cart & checkout
- Order management
- Customer accounts
- Stripe payment processing

### Internationalization

- **English (en)**: Default for international customers
- **Bulgarian (bg)**: Localized experience for Bulgarian market
- Country-based locale detection
- Translations managed via JSON files

### Next.js 15 Features

- App Router architecture
- Server Components for optimal performance
- Server Actions for data mutations
- Streaming & Suspense
- Static Pre-Rendering
- Turbopack for fast development

### Medusa Customizations

- Custom API routes
- Workflows for complex business logic
- Admin panel extensions
- Custom modules

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 15, React 19, TypeScript |
| **Styling** | Tailwind CSS, Radix UI, @medusajs/ui |
| **Backend** | Medusa v2, Node.js |
| **Database** | PostgreSQL |
| **Payments** | Stripe |
| **i18n** | next-intl |
| **Deployment** | Docker |

## Documentation

- [Backend README](./apps/backend/README.md) - Medusa setup & customizations
- [Frontend README](./apps/frontend/README.md) - Next.js storefront details
- [API Routes](./apps/backend/src/api/README.md) - Custom API documentation
- [Workflows](./apps/backend/src/workflows/README.md) - Business logic flows
- [Modules](./apps/backend/src/modules/README.md) - Custom modules
- [Admin](./apps/backend/src/admin/README.md) - Admin customizations

## Development

### Environment Variables

**Frontend** (`apps/frontend/.env.local`):
```env
NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
NEXT_PUBLIC_BASE_URL=http://localhost:8000
NEXT_PUBLIC_STRIPE_KEY=your_stripe_publishable_key
```

**Backend**: See `apps/backend/.env` for Medusa configuration

### Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start backend + frontend concurrently |
| `npm stop` | Stop all services |

## Internationalization

The platform automatically detects user location and serves content in their language:

- **`/us/en`** → English storefront (US)
- **`/bg/bg`** → Bulgarian storefront (Bulgaria)

Translations are managed in:
- `apps/frontend/messages/en.json`
- `apps/frontend/messages/bg.json`

## Customization

This project serves as a foundation for a laundry service e-commerce platform. Key areas to customize:

1. **Product Types**: Extend Medusa product models for laundry-specific attributes
2. **Pricing Logic**: Implement custom pricing based on item type, weight, etc.
3. **Branding**: Update colors, fonts, and design in Tailwind config
4. **Features**: Add booking systems, pickup/delivery scheduling, customer subscriptions

## License

MIT License - see [LICENSE](./LICENSE) file

## Author

**Martin Iliew**
- GitHub: [@martin-iliew](https://github.com/martin-iliew)

---

Built with Medusa and Next.js