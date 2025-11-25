/**
 * Centralized caching configuration for Next.js ISR
 * Defines TTLs (Time To Live) and tag conventions for cache invalidation
 */

// ============================================================================
// TTL Constants (in seconds)
// ============================================================================

/**
 * Products cache TTL - 30 seconds
 * Used for: product listings, product detail pages, variants
 */
export const TTL_PRODUCTS = 30

/**
 * Categories cache TTL - 30 seconds
 * Used for: category listings, category detail pages
 */
export const TTL_CATEGORIES = 30

/**
 * Collections cache TTL - 30 seconds
 * Used for: collection listings, collection detail pages
 */
export const TTL_COLLECTIONS = 30

/**
 * Regions cache TTL - 1 hour (3600 seconds)
 * Used for: region listings, region details
 * Regions change infrequently, so longer cache is acceptable
 */
export const TTL_REGIONS = 3600

/**
 * Middleware regions cache TTL - 1 hour (3600 seconds)
 * Used for: middleware region fetching
 */
export const TTL_MIDDLEWARE_REGIONS = 3600

// ============================================================================
// Cache Tag Helper Functions
// ============================================================================

/**
 * Get tag for all products
 * Use for invalidating all product listings
 */
export const getProductsTag = (): string => "products"

/**
 * Get tag for a specific product by handle
 * Use for invalidating a single product page
 */
export const getProductTag = (handle: string): string => `product:${handle}`

/**
 * Get tag for all categories
 * Use for invalidating all category listings
 */
export const getCategoriesTag = (): string => "categories"

/**
 * Get tag for a specific category by handle
 * Use for invalidating a single category page
 */
export const getCategoryTag = (handle: string): string => `category:${handle}`

/**
 * Get tag for all collections
 * Use for invalidating all collection listings
 */
export const getCollectionsTag = (): string => "collections"

/**
 * Get tag for a specific collection by handle
 * Use for invalidating a single collection page
 */
export const getCollectionTag = (handle: string): string =>
  `collection:${handle}`

/**
 * Get tag for all regions
 * Use for invalidating region data
 */
export const getRegionsTag = (): string => "regions"
