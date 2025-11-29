# Event Subscribers

React to events emitted in the Medusa application.

## Overview

Subscribers are event handlers that execute when specific events occur (e.g., order placed, customer created).

## Basic Example

```ts
import { type SubscriberConfig, type SubscriberArgs } from "@medusajs/framework";

export default async function handleOrderPlaced({
  event,
  container,
}: SubscriberArgs<{ id: string; customer_id: string }>) {
  const { id: orderId, customer_id: customerId } = event.data;

  console.log(`New order: ${orderId}`);

  // Send confirmation email
  const notificationService = container.resolve("notification");
  await notificationService.send({
    to: customerId,
    template: "order-confirmation",
    data: { orderId },
  });
}

export const config: SubscriberConfig = {
  event: "order.placed",
};
```

## Common Events

| Event | Description | Data |
|-------|-------------|------|
| `order.placed` | Order created | `{ id, customer_id }` |
| `order.updated` | Order status changed | `{ id, status }` |
| `customer.created` | Customer registered | `{ id, email }` |
| `product.created` | Product added | `{ id }` |

## Custom Events

Emit your own events:

```ts
// Emit event
const eventBus = container.resolve("eventBus");
await eventBus.emit("laundry.order.ready", {
  orderId: "order_123",
  customerId: "cus_456",
});

// Subscribe to it
export const config: SubscriberConfig = {
  event: "laundry.order.ready",
};
```

## Using Workflows

For complex logic, trigger workflows from subscribers:

```ts
import { processOrderWorkflow } from "../workflows/process-order";

export default async function handleOrderPlaced({ event, container }) {
  await processOrderWorkflow(container).run({
    input: { orderId: event.data.id },
  });
}
```

## Error Handling

```ts
export default async function handleEvent({ event, container }) {
  try {
    // Your logic
  } catch (error) {
    console.error("Subscriber error:", error);
  }
}
```

---

[Medusa Subscribers Docs](https://docs.medusajs.com/learn/fundamentals/events-and-subscribers) • [Backend README](../README.md)