# Custom Modules

Extend Medusa with domain-specific modules containing data models and business logic.

## Creating a Module

### 1. Define Data Model

```ts
// src/modules/laundry/models/service.ts
import { model } from "@medusajs/framework/utils";

const LaundryService = model.define("laundry_service", {
  id: model.id().primaryKey(),
  name: model.text(),
  pricePerKg: model.number(),
  turnaroundDays: model.number(),
});

export default LaundryService;
```

### 2. Create Service

```ts
// src/modules/laundry/service.ts
import { MedusaService } from "@medusajs/framework/utils";
import LaundryService from "./models/service";

class LaundryModuleService extends MedusaService({ LaundryService }) {
  async getActiveServices() {
    return await this.listLaundryServices({ active: true });
  }
}

export default LaundryModuleService;
```

### 3. Export Module

```ts
// src/modules/laundry/index.ts
import LaundryModuleService from "./service";
import { Module } from "@medusajs/framework/utils";

export const LAUNDRY_MODULE = "laundry";

export default Module(LAUNDRY_MODULE, {
  service: LaundryModuleService,
});
```

### 4. Register in Config

```ts
// medusa-config.ts
modules: [
  {
    resolve: "./src/modules/laundry",
  },
]
```

### 5. Generate & Run Migrations

```bash
npx medusa db:generate laundry
npx medusa db:migrate
```

## Using Your Module

### In API Routes

```ts
import { LAUNDRY_MODULE } from "../../../modules/laundry";

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const laundryService = req.scope.resolve(LAUNDRY_MODULE);
  const services = await laundryService.getActiveServices();
  
  res.json({ services });
}
```

### In Workflows

```ts
const step = createStep("my-step", async (input, { container }) => {
  const laundryService = container.resolve(LAUNDRY_MODULE);
  // Use service
});
```

## Data Model Field Types

```ts
model.id()           // Primary key
model.text()         // String
model.number()       // Number
model.boolean()      // Boolean
model.dateTime()     // Timestamp
model.json()         // JSON data
model.enum([...])    // Enum values
```

---

[Medusa Modules Docs](https://docs.medusajs.com/learn/fundamentals/modules) • [Backend README](../README.md)
