# Scheduled Jobs

Automate recurring tasks with cron-based scheduled jobs.

## Overview

Scheduled jobs are functions that run automatically at specified intervals.

## Basic Example

```ts
import { MedusaContainer } from "@medusajs/framework/types";

export default async function dailyReport(container: MedusaContainer) {
  const orderService = container.resolve("order");
  
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  
  const [orders, count] = await orderService.listAndCount({
    created_at: { gte: yesterday },
  });

  console.log(`Orders yesterday: ${count}`);
  
  // Send report email
  const notificationService = container.resolve("notification");
  await notificationService.send({
    to: process.env.ADMIN_EMAIL,
    template: "daily-report",
    data: { count, orders },
  });
}

export const config = {
  name: "daily-order-report",
  schedule: "0 8 * * *", // Every day at 8 AM
};
```

## Cron Schedule Reference

| Schedule | Expression | Description |
|----------|------------|-------------|
| Every hour | `0 * * * *` | Hourly |
| Every 6 hours | `0 */6 * * *` | 4 times daily |
| Daily at midnight | `0 0 * * *` | End of day |
| Daily at 9 AM | `0 9 * * *` | Morning |
| Weekly (Monday) | `0 9 * * 1` | Monday at 9 AM |

**Format**: `minute hour day month weekday`

Use [crontab.guru](https://crontab.guru/) for help.

## Limited Executions

Run a job a specific number of times:

```ts
export const config = {
  name: "limited-job",
  schedule: "0 0 * * *",
  numberOfExecutions: 7,  // Run for 7 days, then stop
};
```

## Example: Inventory Check

```ts
export default async function inventoryCheck(container: MedusaContainer) {
  const inventoryService = container.resolve("inventory");
  const [items] = await inventoryService.listInventoryItems();

  const lowStock = items.filter(item => item.quantity < 10);

  if (lowStock.length > 0) {
    // Send alert
  }
}

export const config = {
  name: "inventory-check",
  schedule: "0 */6 * * *", // Every 6 hours
};
```

## Testing

Run manually:

```bash
npx medusa exec ./src/jobs/daily-report.ts
```

---

[Medusa Scheduled Jobs Docs](https://docs.medusajs.com/learn/fundamentals/scheduled-jobs) • [Backend README](../README.md)
