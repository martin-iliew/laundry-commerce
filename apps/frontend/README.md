# Frontend - Next.js Storefront

Customer-facing storefront for the Laundry Commerce platform built with Next.js 15.

## Tech Stack

- **Framework**: Next.js 15.3.1 with App Router
- **Styling**: Tailwind CSS + @medusajs/ui
- **Internationalization**: next-intl (English, Bulgarian)
- **Payments**: Stripe integration
- **Language**: TypeScript + React 19 RC

## Features

- Server Components & Server Actions
- Dynamic routing: `/[countryCode]/[locale]/...`
- Country-based locale detection
- Product catalog, cart, checkout
- Customer accounts
- Responsive design

## Getting Started

```bash
cd apps/frontend
yarn install
cp .env.template .env.local
# Configure .env.local with backend URL and Stripe key
yarn dev
```

Visit http://localhost:8000

## Environment Variables

```env
NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
NEXT_PUBLIC_BASE_URL=http://localhost:8000
NEXT_PUBLIC_STRIPE_KEY=pk_test_your_key
```

## Project Structure

```
src/
├── app/[countryCode]/[locale]/(main)/  # Main storefront routes
├── lib/                                # Utilities
├── modules/                            # Feature modules
├── i18n.ts                            # i18n config
└── middleware.ts                      # Locale routing
messages/
├── en.json                            # English translations
└── bg.json                            # Bulgarian translations
```

## Internationalization

Supported locales: `['en', 'bg']`

Routes: `/us/en`, `/bg/bg`, etc.

**Add a translation:**

Edit `messages/en.json` or `messages/bg.json`

**Use in components:**

```tsx
import { useTranslations } from 'next-intl';

const t = useTranslations('common');
return <h1>{t('welcome')}</h1>;
```

## Scripts

| Command | Description |
|---------|-------------|
| `yarn dev` | Start dev server (port 8000) |
| `yarn build` | Build for production |
| `yarn start` | Start production server |
| `yarn lint` | Run ESLint |

## Documentation

- [Main README](../../README.md)
- [Backend README](../backend/README.md)
- [Next.js Docs](https://nextjs.org/docs)

---

Built by Martin Iliew with Next.js 15 and Medusa v2
