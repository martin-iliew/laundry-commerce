# Admin Customizations

Extend the Medusa Admin dashboard with widgets and custom pages.

## Overview

Create React components to add functionality to the admin panel.

## Widget Example

Inject components into existing admin pages:

```tsx
// src/admin/widgets/product-widget.tsx
import { defineWidgetConfig } from "@medusajs/admin-sdk";
import { Container, Heading } from "@medusajs/ui";

const ProductWidget = ({ data }: any) => {
  return (
    <Container>
      <Heading level="h2">Laundry Services</Heading>
      <p>Product ID: {data?.id}</p>
    </Container>
  );
};

export const config = defineWidgetConfig({
  zone: "product.details.after",
});

export default ProductWidget;
```

## Available Widget Zones

- `product.details.before` / `product.details.after`
- `order.details.before` / `order.details.after`
- `customer.details.before` / `customer.details.after`

## Custom Page Example

Create new admin pages:

```tsx
// src/admin/routes/laundry/page.tsx
import { defineRouteConfig } from "@medusajs/admin-sdk";
import { Container, Heading } from "@medusajs/ui";

const LaundryPage = () => {
  return (
    <Container>
      <Heading level="h1">Laundry Services</Heading>
      {/* Your content */}
    </Container>
  );
};

export const config = defineRouteConfig({
  label: "Laundry",
});

export default LaundryPage;
```

## Data Fetching

```tsx
import { useEffect, useState } from "react";

const MyWidget = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/admin/custom-endpoint')
      .then(res => res.json())
      .then(setData);
  }, []);

  return <div>{/* Render data */}</div>;
};
```

## Testing

1. Start dev server: `npm run dev`
2. Access admin: http://localhost:9000/app
3. Navigate to pages where widgets should appear

---

[Medusa Admin Docs](https://docs.medusajs.com/learn/fundamentals/admin) • [Backend README](../README.md)