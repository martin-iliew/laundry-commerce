"use server"

import { sdk } from "@lib/config"
import { HttpTypes } from "@medusajs/types"
import { getCacheOptions } from "./cookies"
import {
  TTL_COLLECTIONS,
  getCollectionsTag,
  getCollectionTag,
} from "./cache-config"

export const retrieveCollection = async (id: string) => {
  const cacheOptions = await getCacheOptions("collections")
  const existingTags = "tags" in cacheOptions ? cacheOptions.tags : []
  const next = {
    ...cacheOptions,
    revalidate: TTL_COLLECTIONS,
    tags: [...existingTags, getCollectionsTag(), getCollectionTag(id)],
  }

  return sdk.client
    .fetch<{ collection: HttpTypes.StoreCollection }>(
      `/store/collections/${id}`,
      {
        next,
      }
    )
    .then(({ collection }) => collection)
}

export const listCollections = async (
  queryParams: Record<string, string> = {}
): Promise<{ collections: HttpTypes.StoreCollection[]; count: number }> => {
  const cacheOptions = await getCacheOptions("collections")
  const existingTags = "tags" in cacheOptions ? cacheOptions.tags : []
  const next = {
    ...cacheOptions,
    revalidate: TTL_COLLECTIONS,
    tags: [...existingTags, getCollectionsTag()],
  }

  queryParams.limit = queryParams.limit || "100"
  queryParams.offset = queryParams.offset || "0"

  return sdk.client
    .fetch<{ collections: HttpTypes.StoreCollection[]; count: number }>(
      "/store/collections",
      {
        query: queryParams,
        next,
      }
    )
    .then(({ collections }) => ({ collections, count: collections.length }))
}

export const getCollectionByHandle = async (
  handle: string
): Promise<HttpTypes.StoreCollection> => {
  const cacheOptions = await getCacheOptions("collections")
  const existingTags = "tags" in cacheOptions ? cacheOptions.tags : []
  const next = {
    ...cacheOptions,
    revalidate: TTL_COLLECTIONS,
    tags: [...existingTags, getCollectionsTag(), getCollectionTag(handle)],
  }

  return sdk.client
    .fetch<HttpTypes.StoreCollectionListResponse>(`/store/collections`, {
      query: { handle, fields: "*products" },
      next,
    })
    .then(({ collections }) => collections[0])
}
