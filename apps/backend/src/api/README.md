# Custom API Routes

REST API endpoints for the Laundry Commerce platform.

## Overview

API routes use file-based routing. Create a `route.ts` file to define endpoints.

**Route Path → File Location**
- `/store/services` → `src/api/store/services/route.ts`
- `/admin/custom` → `src/api/admin/custom/route.ts`

## Supported HTTP Methods

Export functions: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `OPTIONS`, `HEAD`

## Basic Example

```ts
// src/api/store/services/route.ts
import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  res.json({
    services: [
      { id: "wash-fold", name: "Wash & Fold", pricePerKg: 5.99 },
      { id: "dry-clean", name: "Dry Cleaning", pricePerKg: 12.99 },
    ]
  });
}
```

## Route Parameters

Use `[param]` directories:

```ts
// src/api/store/estimate/[serviceId]/route.ts
export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const { serviceId } = req.params;
  const { weight } = req.body;
  
  const total = calculatePrice(serviceId, weight);
  res.json({ total });
}
```

## Using Services

Access Medusa modules via `req.scope`:

```ts
export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const productService = req.scope.resolve("product");
  const [, count] = await productService.listAndCount();
  
  res.json({ count });
}
```

## Authentication

Protected routes receive authenticated user info:

```ts
export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const customerId = req.user?.customer_id;
  
  if (!customerId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  
  // Fetch customer data
}
```

## Middleware

Define custom middleware in `src/api/middlewares.ts`:

```ts
import { defineMiddlewares } from "@medusajs/framework/http";

export default defineMiddlewares({
  routes: [
    {
      matcher: "/store/services/*",
      middlewares: [logger],
    },
  ],
});
```

## Testing

```bash
curl http://localhost:9000/store/services
curl -X POST http://localhost:9000/store/estimate/wash-fold \
  -H "Content-Type: application/json" \
  -d '{"weight": 5}'
```

---

[Medusa API Routes Docs](https://docs.medusajs.com/learn/fundamentals/api-routes) • [Backend README](../README.md)
