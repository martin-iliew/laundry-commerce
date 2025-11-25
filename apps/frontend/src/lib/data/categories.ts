import { sdk } from "@lib/config"
import { HttpTypes } from "@medusajs/types"
import { getCacheOptions } from "./cookies"
import {
  TTL_CATEGORIES,
  getCategoriesTag,
  getCategoryTag,
} from "./cache-config"

export const listCategories = async (query?: Record<string, any>) => {
  const cacheOptions = await getCacheOptions("categories")
  const existingTags = "tags" in cacheOptions ? cacheOptions.tags : []
  const next = {
    ...cacheOptions,
    revalidate: TTL_CATEGORIES,
    tags: [...existingTags, getCategoriesTag()],
  }

  const limit = query?.limit || 100

  return sdk.client
    .fetch<{ product_categories: HttpTypes.StoreProductCategory[] }>(
      "/store/product-categories",
      {
        query: {
          fields:
            "*category_children, *products, *parent_category, *parent_category.parent_category",
          limit,
          ...query,
        },
        next,
      }
    )
    .then(({ product_categories }) => product_categories)
}

export const getCategoryByHandle = async (categoryHandle: string[]) => {
  const handle = `${categoryHandle.join("/")}`

  const cacheOptions = await getCacheOptions("categories")
  const existingTags = "tags" in cacheOptions ? cacheOptions.tags : []
  const next = {
    ...cacheOptions,
    revalidate: TTL_CATEGORIES,
    tags: [...existingTags, getCategoriesTag(), getCategoryTag(handle)],
  }

  return sdk.client
    .fetch<HttpTypes.StoreProductCategoryListResponse>(
      `/store/product-categories`,
      {
        query: {
          fields: "*category_children, *products",
          handle,
        },
        next,
      }
    )
    .then(({ product_categories }) => product_categories[0])
}
