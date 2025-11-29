# CLI Scripts

Execute custom tooling and utilities via Medusa's CLI.

## Overview

Custom CLI scripts run administrative tasks, data migrations, seeding, and custom utilities.

## Basic Example

```ts
import { ExecArgs } from "@medusajs/framework/types";

export default async function myScript({ container }: ExecArgs) {
  const productService = container.resolve("product");
  const [, count] = await productService.listAndCountProducts();

  console.log(`Total products: ${count}`);
}
```

**Run it:**

```bash
npx medusa exec ./src/scripts/my-script.ts
```

## Example: Seed Data

```ts
import { ExecArgs } from "@medusajs/framework/types";

export default async function seedServices({ container }: ExecArgs) {
  const laundryService = container.resolve("laundry");

  const services = [
    { name: "Wash & Fold", pricePerKg: 5.99, turnaroundDays: 2 },
    { name: "Dry Cleaning", pricePerKg: 12.99, turnaroundDays: 3 },
    { name: "Ironing", pricePerKg: 3.99, turnaroundDays: 1 },
  ];

  for (const service of services) {
    await laundryService.createLaundryService(service);
    console.log(`✓ Created: ${service.name}`);
  }
}
```

## Using Arguments

```ts
export default async function myScript({ container, args }: ExecArgs) {
  const [startDate, endDate] = args;
  console.log(`Processing from ${startDate} to ${endDate}`);
}
```

**Run with args:**

```bash
npx medusa exec ./src/scripts/my-script.ts 2024-01-01 2024-12-31
```

## Example: Export Data

```ts
import { writeFileSync } from "fs";

export default async function exportOrders({ container }: ExecArgs) {
  const orderService = container.resolve("order");
  const [orders] = await orderService.list();

  const csv = orders.map(o => 
    `${o.id},${o.email},${o.total}`
  ).join("\n");

  writeFileSync("orders.csv", csv);
  console.log("✓ Exported to orders.csv");
}
```

## Dry Run Pattern

```ts
export default async function cleanupData({ container, args }: ExecArgs) {
  const isDryRun = args.includes("--dry-run");

  if (isDryRun) console.log("DRY RUN - No changes will be made\n");

  const service = container.resolve("customer");
  const [testCustomers] = await service.list({ email: { $ilike: "%@test.com" } });

  for (const customer of testCustomers) {
    if (isDryRun) {
      console.log(`Would delete: ${customer.email}`);
    } else {
      await service.delete(customer.id);
      console.log(`✓ Deleted: ${customer.email}`);
    }
  }
}
```

---

[Medusa CLI Scripts Docs](https://docs.medusajs.com/learn/fundamentals/custom-cli-scripts) • [Backend README](../README.md)