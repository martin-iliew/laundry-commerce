# Workflows

Orchestrate complex business logic with transaction-safe workflows.

## Overview

Workflows are composable sequences of steps that provide atomicity and automatic rollback on failures.

## Basic Example

```ts
import {
  createStep,
  createWorkflow,
  WorkflowResponse,
  StepResponse,
} from "@medusajs/framework/workflows-sdk";

// Define a step
const calculatePrice = createStep(
  "calculate-price",
  async ({ weight, rate }: { weight: number; rate: number }) => {
    const total = weight * rate;
    return new StepResponse({ total });
  }
);

// Create workflow
export const estimateOrderWorkflow = createWorkflow(
  "estimate-order",
  ({ weight, serviceType }: any) => {
    const pricing = calculatePrice({ weight, rate: 5.99 });
    return new WorkflowResponse(pricing);
  }
);
```

## Step with Compensation

Rollback logic for failed transactions:

```ts
const reserveInventory = createStep(
  "reserve-inventory",
  async ({ productId, qty }: any, { container }) => {
    const inventory = container.resolve("inventory");
    await inventory.reserve(productId, qty);
    return new StepResponse({ reserved: true });
  },
  // Compensation: runs if later steps fail
  async ({ productId, qty }: any, { container }) => {
    const inventory = container.resolve("inventory");
    await inventory.release(productId, qty);
  }
);
```

## Executing Workflows

### From API Routes

```ts
import { estimateOrderWorkflow } from "../../../workflows/estimate-order";

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const { result } = await estimateOrderWorkflow(req.scope).run({
    input: { weight: 5, serviceType: "wash-fold" },
  });

  res.json(result);
}
```

### From Subscribers

```ts
export default async function handleEvent({ event, container }) {
  await processOrderWorkflow(container).run({
    input: { orderId: event.data.id },
  });
}
```

### From Scheduled Jobs

```ts
export default async function job(container: MedusaContainer) {
  const [orders] = await orderService.list({ status: "pending" });
  
  for (const order of orders) {
    await processOrderWorkflow(container).run({
      input: { orderId: order.id },
    });
  }
}
```

## Best Practices

- Keep steps small and focused
- Add compensation for critical operations
- Use TypeScript for type safety
- Log important state changes

---

[Medusa Workflows Docs](https://docs.medusajs.com/learn/fundamentals/workflows) • [Backend README](../README.md)
