"use server"

import { sdk } from "@lib/config"
import { HttpTypes } from "@medusajs/types"

import { getAuthHeaders, getCacheOptions } from "./cookies"
import { TTL_PRODUCTS, getProductsTag } from "./cache-config"

export const retrieveVariant = async (
  variant_id: string
): Promise<HttpTypes.StoreProductVariant | null> => {
  const authHeaders = await getAuthHeaders()

  if (!authHeaders) return null

  const headers = {
    ...authHeaders,
  }

  const cacheOptions = await getCacheOptions("variants")
  const existingTags = "tags" in cacheOptions ? cacheOptions.tags : []
  const next = {
    ...cacheOptions,
    revalidate: TTL_PRODUCTS,
    tags: [...existingTags, getProductsTag()],
  }

  return await sdk.client
    .fetch<{ variant: HttpTypes.StoreProductVariant }>(
      `/store/product-variants/${variant_id}`,
      {
        method: "GET",
        query: {
          fields: "*images",
        },
        headers,
        next,
      }
    )
    .then(({ variant }) => variant)
    .catch(() => null)
}
