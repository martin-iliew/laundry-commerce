# Module Links

Create relationships between data models across different modules.

## Overview

Module links connect data from different modules while maintaining module independence.

## Basic Example

```ts
import { defineLink } from "@medusajs/framework/utils";
import ProductModule from "@medusajs/medusa/product";
import LaundryModule from "../modules/laundry";

// Many-to-many: Products can have multiple services
export default defineLink(
  ProductModule.linkable.product,
  {
    linkable: LaundryModule.linkable.laundryService,
    isList: true,
  }
);
```

## Relationship Types

### One-to-One

```ts
defineLink(
  CustomerModule.linkable.customer,
  LaundryModule.linkable.preferences
);
```

### One-to-Many

```ts
defineLink(
  OrderModule.linkable.order,
  {
    linkable: LaundryModule.linkable.item,
    isList: true,
  }
);
```

### Many-to-Many

```ts
defineLink(
  { linkable: ModuleA.linkable.entityA, isList: true },
  { linkable: ModuleB.linkable.entityB, isList: true }
);
```

## Sync to Database

After creating links:

```bash
npx medusa db:migrate
```

## Query Linked Data

```ts
const product = await productService.retrieve("prod_123", {
  relations: ["laundry_services"],
});

// Access linked data
product.laundry_services.forEach(service => {
  console.log(service.name);
});
```

## Create Links Programmatically

```ts
const remoteLink = container.resolve("remoteLink");

await remoteLink.create({
  productService: {
    product_id: "prod_123",
    laundry_service_id: "service_123",
  },
});
```

## Example Use Cases

- Product → Laundry Services (which services apply)
- Customer → Preferences (customer laundry settings)
- Order → Items (detailed order breakdown)
- Variant → Fabric Type (care instructions)

---

[Medusa Module Links Docs](https://docs.medusajs.com/learn/fundamentals/module-links) • [Backend README](../README.md)