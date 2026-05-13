import { CreateInventoryLevelInput, ExecArgs } from "@medusajs/framework/types"
import {
  ContainerRegistrationKeys,
  Modules,
  ProductStatus,
} from "@medusajs/framework/utils"
import {
  createApiKeysWorkflow,
  createCollectionsWorkflow,
  createInventoryLevelsWorkflow,
  createProductCategoriesWorkflow,
  createProductsWorkflow,
  createRegionsWorkflow,
  createSalesChannelsWorkflow,
  createShippingOptionsWorkflow,
  createShippingProfilesWorkflow,
  createStockLocationsWorkflow,
  createTaxRegionsWorkflow,
  linkSalesChannelsToApiKeyWorkflow,
  linkSalesChannelsToStockLocationWorkflow,
  updateStoresStep,
  updateStoresWorkflow,
} from "@medusajs/medusa/core-flows"
import {
  createWorkflow,
  transform,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk"
import {
  buildCategoryMetadata,
  buildCollectionMetadata,
  buildProductMetadata,
  buildShippingOptionMetadata,
} from "./lib/localized-seed"

type SeedCollection = {
  handle: string
  title: string
}

type SeedProductCategory = {
  is_active: boolean
  name: string
}

type SeedOption = {
  title: string
  values: string[]
}

type SeedVariant = {
  amount: number
  options: Record<string, string>
  sku: string
  title: string
}

type SeedProduct = {
  categoryNames: string[]
  collectionHandle: string
  description: string
  handle: string
  images: { url: string }[]
  options: SeedOption[]
  title: string
  variants: SeedVariant[]
  weight: number
}

const updateStoreCurrencies = createWorkflow(
  "update-store-currencies",
  (input: {
    supported_currencies: { currency_code: string; is_default?: boolean }[]
    store_id: string
  }) => {
    const normalizedInput = transform({ input }, (data) => {
      return {
        selector: { id: data.input.store_id },
        update: {
          supported_currencies: data.input.supported_currencies.map(
            (currency) => {
              return {
                currency_code: currency.currency_code,
                is_default: currency.is_default ?? false,
              }
            }
          ),
        },
      }
    })

    const stores = updateStoresStep(normalizedInput)

    return new WorkflowResponse(stores)
  }
)

export const DIRTY_LABS_PRODUCT_CATEGORIES: SeedProductCategory[] = [
  {
    name: "Laundry",
    is_active: true,
  },
  {
    name: "Dish",
    is_active: true,
  },
  {
    name: "Toilet",
    is_active: true,
  },
  {
    name: "Accessories",
    is_active: true,
  },
  {
    name: "Bundles",
    is_active: true,
  },
]

export const DIRTY_LABS_COLLECTIONS: SeedCollection[] = [
  {
    handle: "laundry",
    title: "Laundry",
  },
  {
    handle: "dish",
    title: "Dish",
  },
  {
    handle: "toilet",
    title: "Toilet",
  },
  {
    handle: "accessories",
    title: "Accessories",
  },
  {
    handle: "bundles",
    title: "Bundles",
  },
]

export const DIRTY_LABS_PRODUCTS: SeedProduct[] = [
  {
    title: "Aestival Bio Enzyme Dishwasher Detergent",
    handle: "aestival-bio-enzyme-dishwasher-detergent",
    description:
      "Our ultra-concentrated 2-in-1 powder formula is designed with the most advanced bioenzymes and natural, hypoallergenic ingredients to break down tough messes and stubborn stuck on food – clean smarter, not harsher. Biobased and biodegradable formula. Optimized for quick wash cycles. Each tube contains 48 standard loads. Septic safe. Cruelty-free. Vegan. Packaging and formula are BPA-free. Recyclable cardboard container. Scoop is made of responsibly sourced schima superba wood. Made in USA from globally sourced ingredients and components.",
    collectionHandle: "dish",
    categoryNames: ["Dish"],
    weight: 454,
    images: [
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/Aestival_single_PDP_WC_-_lower_left.jpg?v=1776344444" },
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/adw-hero-03.jpg?v=1776345019" },
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/adw-hero-04.jpg?v=1776344444" },
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/ADWAES-PT01.jpg?v=1776345019" },
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/Dish_PT04.jpg?v=1776344523" },
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/DishAest-scoop-PT06alt-website.jpg?v=1776345031" },
    ],
    options: [{ title: "Format", values: ["Standard"] }],
    variants: [
      {
        title: "Standard",
        sku: "DL-113131",
        options: { Format: "Standard" },
        amount: 20,
      },
    ],
  },
  {
    title: "Aestival Bio Enzyme Liquid Dish Soap",
    handle: "aestival-bio-enzyme-liquid-dish-soap",
    description:
      "Introducing a completely new way to wash dishes by hand. Our hyper-concentrated liquid dish soap is formulated with our proprietary Phytolase® enzyme technology—smart cleaning in a hand wash format, created for a full spectrum of stains. Powered by Phytolase® enzyme cleaning technology, it works harder so you don't have to—actively cleaning your dishes while they soak. Developed by green chemists. Formulated with fermented rice water. Hypoallergenic and non-irritant. USDA BioPreferred® certified biobased formula. Dermatologist tested. Vegan & cruelty free. Clean rinse formula. Septic safe. Recyclable aluminum bottle. Reusable metal pump. Net contents: 480 mL (16.2 fl oz).",
    collectionHandle: "dish",
    categoryNames: ["Dish"],
    weight: 726,
    images: [
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/liquid-dish-soap-pump-01.jpg?v=1763561147" },
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/liquid-dish-soap-inhand-02.jpg?v=1748887675" },
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/liquid-dish-soap-05.jpg?v=1750111056" },
    ],
    options: [{ title: "Format", values: ["Standard"] }],
    variants: [
      {
        title: "Standard",
        sku: "DL-113239",
        options: { Format: "Standard" },
        amount: 20,
      },
    ],
  },
  {
    title: "Baby Essential Laundry Bundle",
    handle: "baby-safe-laundry-bundle",
    description:
      "Dirty Labs Bio Laundry Detergents are formulated to be safe for the most precious people in your life. Consciously formulated with natural, hypoallergenic ingredients, our laundry detergents and booster are the hardest-working yet gentlest solution for your baby's laundry. Bundle includes: Free & Clear Bio Laundry Detergent, Bio Enzyme Laundry Booster, and 100% New Zealand Wool Dryer Balls. EWG Verified™, USDA BioPreferred, Certified EPA Safer Choice, and Recognized by the National Eczema Association.",
    collectionHandle: "bundles",
    categoryNames: ["Bundles"],
    weight: 0,
    images: [
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/BSB-01-1800x.jpg?v=1763561117" },
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/BSB-02-1800x.jpg?v=1700172100" },
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/BST-01-1800x_df72c43c-8083-4697-8169-e616410ebded.jpg?v=1700172100" },
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/CWB-01-1800x.jpg?v=1700172100" },
    ],
    options: [{ title: "Format", values: ["Standard"] }],
    variants: [
      {
        title: "Standard",
        sku: "DL-110183",
        options: { Format: "Standard" },
        amount: 46,
      },
    ],
  },
  {
    title: "Bio Enzyme Laundry Booster",
    handle: "bio-enzyme-laundry-booster",
    description:
      "Specifically formulated to work with our Bio Laundry Detergents to tackle your dirtiest, smelliest laundry - all while being safe for you and the planet. When paired with our Bio Laundry Detergents, it becomes a powder and liquid duo that's optimized to make whites and colors vibrant and eliminate the toughest stains and odors. 4-in-1 advanced stain and odor remover. Permastank and odor eliminator. Brightens for more vibrant whites and colors. Removes yellow stains like sweat and sebum. Hyper-concentrated formula. Compatible with traditional and HE washers. Cold water optimized. Made in USA from globally sourced ingredients and components. Septic safe.",
    collectionHandle: "laundry",
    categoryNames: ["Laundry"],
    weight: 454,
    images: [
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/booster-hero-01.jpg?v=1768341575" },
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/booster-hero-02.jpg?v=1768341575" },
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/booster-hero-03.jpg?v=1768341575" },
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/booster-hero-04.jpg?v=1768341575" },
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/bulk-booster-01.jpg?v=1770931977" },
    ],
    options: [{ title: "Size", values: ["48 loads", "110 loads - refill"] }],
    variants: [
      {
        title: "48 loads",
        sku: "DL-112101",
        options: { Size: "48 loads" },
        amount: 20,
      },
      {
        title: "110 loads - refill",
        sku: "DL-112109",
        options: { Size: "110 loads - refill" },
        amount: 42,
      },
    ],
  },
  {
    title: "Bio Enzyme Laundry Starter Kit",
    handle: "bio-laundry-detergent-starter-kit",
    description:
      "Dirty Labs Bio Laundry Detergents tackle dirty laundry with clean science. Contains one 32-load bottle of Signature Bio Laundry Detergent and one 32-load bottle of Free & Clear Bio Laundry Detergent. Phytolase® smart-cleaning technology precision targets tough stains, odors, spots, spills and dirt in just two teaspoons per load. Hypoallergenic, readily biodegradable, safe for sensitive skin, and free of dyes, sulfates, parabens, and all California Prop 65 chemicals. Dermatologist tested and approved and recognized by the National Eczema Association. Compatible with traditional and HE washers. Optimized for cold water. Septic safe.",
    collectionHandle: "bundles",
    categoryNames: ["Bundles"],
    weight: 0,
    images: [
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/SK32-01-1800x.jpg?v=1762454848" },
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/SK32-02-1800x.jpg?v=1699332220" },
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/SK32-03-1800x.jpg?v=1763561144" },
    ],
    options: [{ title: "Format", values: ["Standard"] }],
    variants: [
      {
        title: "Standard",
        sku: "DL-110182",
        options: { Format: "Standard" },
        amount: 26,
      },
    ],
  },
  {
    title: "Bio Enzyme Laundry Booster - 2 Pack",
    handle: "bulk-bio-enzyme-laundry-booster-2-pack",
    description:
      "Stock up with our best deal on Booster. Get 220 loads and a free ceramic canister when you start an autoship. Specifically formulated to work with our Bio Laundry Detergents to tackle your dirtiest, smelliest laundry - all while being safe for you and the planet. 4-in-1 advanced stain and odor remover. Permastank and odor eliminator. Brightens for more vibrant whites and colors. Hyper-concentrated formula. Compatible with traditional and HE washers. Cold water optimized. Made in USA from globally sourced ingredients and components. Septic safe.",
    collectionHandle: "bundles",
    categoryNames: ["Bundles"],
    weight: 0,
    images: [
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/booster-2-pack-pdp-hero.jpg?v=1770930277" },
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/booster-2-pack-pdp.jpg?v=1770930277" },
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/bulk-booster-02.jpg?v=1770931977" },
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/dl-booster-2-pack-pdp.jpg?v=1770930277" },
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/Canister-PDP_34751446-b5c3-4ca4-896e-7664e52f7c11.jpg?v=1776345031" },
    ],
    options: [{ title: "Format", values: ["Standard"] }],
    variants: [
      {
        title: "Standard",
        sku: "DL-114109",
        options: { Format: "Standard" },
        amount: 70,
      },
    ],
  },
  {
    title: "Delicates Mesh Wash Bag",
    handle: "delicates-mesh-wash-bag",
    description:
      "The Delicates Wash Bag is designed to preserve your intimates and delicate items, keeping them looking and feeling new wash after wash. Its breathable, open mesh protects garments from stretching, snagging, and friction while allowing them to fully wash and rinse along with the rest of your laundry. Protects delicate fibers from the stress of machine washing. Porous mesh allows for Dirty Labs Bio Enzyme Laundry Detergents to thoroughly yet gently clean. Low-profile zipper with guard prevents snags and noise in the drum. Size: 10\" (h) x 13\" (w).",
    collectionHandle: "accessories",
    categoryNames: ["Accessories"],
    weight: 0,
    images: [
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/DL_Mesh_Bag_Hero_Front.jpg?v=1763156364" },
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/MESH-BAG-LFSTYL.jpg?v=1763496582" },
    ],
    options: [{ title: "Format", values: ["Standard"] }],
    variants: [
      {
        title: "Standard",
        sku: "DL-112192",
        options: { Format: "Standard" },
        amount: 12,
      },
    ],
  },
  {
    title: "Dish Trio Bundle Aestival + Canister",
    handle: "dish-trio-bundle-aestival-canister",
    description:
      "Start a Dish Trio Bundle Autoship order and receive a FREE Refillable Ceramic Canister with your 1st shipment. Our ultra-concentrated 2-in-1 powder formula is designed with the most advanced bioenzymes and natural, hypoallergenic ingredients to break down tough messes and stubborn stuck on food. Biobased and biodegradable formula. Optimized for quick wash cycles. Natural, hypoallergenic ingredients. Septic safe. Cruelty-free. Vegan. Packaged in recyclable cardboard tubes. Made in USA from globally sourced ingredients and components.",
    collectionHandle: "bundles",
    categoryNames: ["Bundles"],
    weight: 0,
    images: [
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/Aestival_bundle_PDP_WC_-_lower_left.jpg?v=1776345019" },
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/PDP-AestivalDishTrio.jpg?v=1776345019" },
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/adw-hero-03.jpg?v=1776345019" },
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/Canister-PDP_34751446-b5c3-4ca4-896e-7664e52f7c11.jpg?v=1776345031" },
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/ADWAES-PT01.jpg?v=1776345019" },
    ],
    options: [{ title: "Format", values: ["Standard"] }],
    variants: [
      {
        title: "Standard",
        sku: "DL-115132",
        options: { Format: "Standard" },
        amount: 50,
      },
    ],
  },
  {
    title: "Dish Trio Bundle Free & Clear + Canister",
    handle: "dish-trio-bundle-free-and-clear-canister",
    description:
      "Start a Dish Trio Bundle Autoship order and receive a FREE Refillable Ceramic Canister with your 1st shipment. Our ultra-concentrated 2-in-1 powder formula is designed with the most advanced bioenzymes and natural, hypoallergenic ingredients to break down tough messes and stubborn stuck on food. Biobased and biodegradable formula. Optimized for quick wash cycles. Natural, hypoallergenic ingredients. Septic safe. Cruelty-free. Vegan. Packaged in recyclable cardboard tubes. Made in USA from globally sourced ingredients and components.",
    collectionHandle: "bundles",
    categoryNames: ["Bundles"],
    weight: 0,
    images: [
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/FC_bundle_PDP_WC_-_lower_left.jpg?v=1776345031" },
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/PDP-FCDishTrio.jpg?v=1776345031" },
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/adw-fc-hero-02_ef1fe006-109d-456b-b6c0-cda654df27ac.jpg?v=1776345031" },
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/Canister-PDP_34751446-b5c3-4ca4-896e-7664e52f7c11.jpg?v=1776345031" },
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/ADWFC-PT01.jpg?v=1776345031" },
    ],
    options: [{ title: "Format", values: ["Standard"] }],
    variants: [
      {
        title: "Standard",
        sku: "DL-115102",
        options: { Format: "Standard" },
        amount: 50,
      },
    ],
  },
  {
    title: "Enzyme Buddies Wool Dryer Balls",
    handle: "enzyme-buddies-wool-dryer-balls",
    description:
      "Dirty Labs Wool Dryer Balls are a sustainable alternative to traditional dryer sheets and fabric softeners. By fluffing and separating laundry as it tumbles, our Wool Dryer Balls allow air to circulate more evenly, reducing drying time, static, and wrinkles. Responsibly sourced and made from New Zealand wool. Freshens and softens fabrics. Responsible RWS Certified Wool.",
    collectionHandle: "accessories",
    categoryNames: ["Accessories"],
    weight: 181,
    images: [
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/EWB-01-1800x.jpg?v=1763561119" },
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/EWB-02-1800x.jpg?v=1699332345" },
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/EWB-03-1800x.jpg?v=1699332345" },
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/EWB-04-1800x.jpg?v=1699332344" },
    ],
    options: [{ title: "Format", values: ["Standard"] }],
    variants: [
      {
        title: "Standard",
        sku: "DL-112103",
        options: { Format: "Standard" },
        amount: 18,
      },
    ],
  },
  {
    title: "Free & Clear Bio Enzyme Dishwasher Detergent",
    handle: "free-clear-bio-enzyme-dishwasher-detergent",
    description:
      "Our ultra-concentrated 2-in-1 powder formula is designed with the most advanced bioenzymes and natural, hypoallergenic ingredients to break down tough messes and stubborn stuck on food – clean smarter, not harsher. Biobased and biodegradable formula. Optimized for quick wash cycles. Natural, hypoallergenic ingredients. Septic safe. Cruelty-free. Vegan. Packaging and formula are BPA-free. Recyclable cardboard container. Scoop is made of responsibly sourced schima superba wood. Made in USA from globally sourced ingredients and components.",
    collectionHandle: "dish",
    categoryNames: ["Dish"],
    weight: 454,
    images: [
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/FC_single_PDP_WC_-_lower_left.jpg?v=1776344523" },
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/adw-fc-hero-02_ef1fe006-109d-456b-b6c0-cda654df27ac.jpg?v=1776345031" },
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/adw-fc-hero-03_abb08dd8-194d-4c79-a030-a1f11e7e622c.jpg?v=1776344523" },
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/ADWFC-PT01.jpg?v=1776345031" },
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/Dish_PT04.jpg?v=1776344523" },
    ],
    options: [{ title: "Format", values: ["Standard"] }],
    variants: [
      {
        title: "Standard",
        sku: "DL-113101",
        options: { Format: "Standard" },
        amount: 20,
      },
    ],
  },
  {
    title: "Free & Clear Bio Enzyme Liquid Dish Soap",
    handle: "free-clear-bio-enzyme-liquid-dish-soap",
    description:
      "Introducing a completely new way to wash dishes by hand. Our hyper-concentrated liquid dish soap is formulated with our proprietary Phytolase® enzyme technology—smart cleaning in a hand wash format, created for a full spectrum of stains. Powered by Phytolase® enzyme cleaning technology, it works harder so you don't have to—actively cleaning your dishes while they soak. Developed by green chemists. Formulated with fermented rice water. Hypoallergenic and non-irritant. USDA Biopreferred® certified biobased formula. Dermatologist tested. Vegan & cruelty free. Clean rinse formula. Septic safe. Recyclable aluminum bottle. Reusable metal pump. Net contents: 480 mL (16.2 fl oz). Fragrance free.",
    collectionHandle: "dish",
    categoryNames: ["Dish"],
    weight: 454,
    images: [
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/liquid-dish-soap-fc-pump-01.jpg?v=1763672319" },
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/dl-lds-unscented-04.jpg?v=1750122065" },
    ],
    options: [{ title: "Format", values: ["Standard"] }],
    variants: [
      {
        title: "Standard",
        sku: "DL-113209",
        options: { Format: "Standard" },
        amount: 20,
      },
    ],
  },
  {
    title: "Free & Clear Bio Laundry Detergent",
    handle: "free-clear-bio-laundry-detergent",
    description:
      "Dirty Labs Bio Enzyme Laundry Detergents tackle dirty laundry with clean science. Our proprietary 5-in-1 enzyme detergents deliver exceptional cleaning using cutting-edge biobased ingredients—instead of petrochemicals—to clean smarter, not harsher. Consciously formulated with natural, hypoallergenic ingredients, readily biodegradable, and free of dyes, SLS, SLES, parabens, and all California Prop 65 chemicals. Recognized by the National Eczema Association (NEA). Hyper-concentrated formula. Optimized for cold water. Septic Safe. Certified EPA Safer Choice. 100% USDA Biobased certified. Dermatologist tested and approved. Safe for babies and pets. Cruelty-free. Vegan. 32 load bottle contains 8.6 fl oz. 80 load refill bottle contains 21.6 fl oz.",
    collectionHandle: "laundry",
    categoryNames: ["Laundry"],
    weight: 454,
    images: [
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/FC_laundry_80_PDP_WC-WHITE_-_lower_left.jpg?v=1776344702" },
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/FC80-02-1800x.jpg?v=1776344702" },
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/FC80-03-1800x.jpg?v=1776344702" },
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/FC_laundry_32_PDP_WC-WHITE_-_lower_left.jpg?v=1776344702" },
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/FC32-02-1800x.jpg?v=1776344702" },
    ],
    options: [{ title: "Size", values: ["80 loads - refill", "32 loads"] }],
    variants: [
      {
        title: "80 loads - refill",
        sku: "DL-110106",
        options: { Size: "80 loads - refill" },
        amount: 28,
      },
      {
        title: "32 loads",
        sku: "DL-110104",
        options: { Size: "32 loads" },
        amount: 16,
      },
    ],
  },
  {
    title: "German Dish Cloths",
    handle: "german-dish-cloths",
    description:
      "Made from a blend of 70% regenerative cellulose and 30% cotton, this unique material creates a durable, lint-free cloth that outperforms both paper towels and traditional sponges. Ultra absorbent, replace disposables, stay fresh naturally, safe for multiple surfaces, and soften when wet. Includes 3 dish cloths.",
    collectionHandle: "dish",
    categoryNames: ["Dish"],
    weight: 0,
    images: [
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/german-dish-cloths.jpg?v=1763759753" },
    ],
    options: [{ title: "Format", values: ["Standard"] }],
    variants: [
      {
        title: "Standard",
        sku: "DL-113192",
        options: { Format: "Standard" },
        amount: 12,
      },
    ],
  },
  {
    title: "Hand Wash & Delicates Bio Laundry Detergent",
    handle: "hand-wash-delicates",
    description:
      "Dirty Labs Bio Enzyme Laundry Detergents tackle dirty laundry with clean science. Our Hand Wash & Delicates detergent is specially formulated for fine wools, silks, and hand wash only garments. Consciously formulated with natural, hypoallergenic ingredients, free of dyes and fragrances. Dermatologist tested and approved and recognized by the National Eczema Association (NEA). Septic-Safe and compatible with traditional and HE washers. Hyper-concentrated formula. Optimized for cold water. Biodegradable. Safe for babies and pets. Cruelty-free. Vegan. 32 loads / 8.6 fl. oz.",
    collectionHandle: "laundry",
    categoryNames: ["Laundry"],
    weight: 454,
    images: [
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/HWD-32.jpg?v=1763561107" },
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/HW32-02-1800x.jpg?v=1758152022" },
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/HW32-03-1800x.jpg?v=1758152022" },
    ],
    options: [{ title: "Format", values: ["Standard"] }],
    variants: [
      {
        title: "Standard",
        sku: "DL-110124",
        options: { Format: "Standard" },
        amount: 18,
      },
    ],
  },
  {
    title: "Murasaki Bio Laundry Detergent",
    handle: "murasaki-bio-laundry-detergent",
    description:
      "Dirty Labs Bio Enzyme Laundry Detergents tackle dirty laundry with clean science. Our proprietary 5-in-1 enzyme detergents deliver exceptional cleaning using cutting-edge biobased ingredients. Our Murasaki scent is inspired by the early Spring green tea harvest in Japan and features fresh notes of jasmine, matcha, and vetiver. Free of MIT, BIT, and California Prop 65 chemicals. Septic safe and compatible with traditional and HE washers. Hyper-concentrated formula. Optimized for cold water. Hypoallergenic. Certified EPA Safer Choice. 100% USDA Biobased certified. Biodegradable. Dermatologist tested and approved. Safe for babies and pets. Cruelty-free. Vegan. 32 load bottle contains 8.6 fl oz. 80 load refill bottle contains 21.6 fl oz.",
    collectionHandle: "laundry",
    categoryNames: ["Laundry"],
    weight: 454,
    images: [
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/MS80-01-1800x_560dc2d8-3801-4f33-9817-5ead69e9370f.jpg?v=1763561105" },
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/MS80-02-1800x.jpg?v=1705306607" },
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/MS80-03-1800x.jpg?v=1705306607" },
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/MS32-04-1800x.jpg?v=1705306607" },
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/MUR-32.jpg?v=1763155976" },
    ],
    options: [{ title: "Size", values: ["80 loads - refill", "32 loads"] }],
    variants: [
      {
        title: "80 loads - refill",
        sku: "DL-110146",
        options: { Size: "80 loads - refill" },
        amount: 28,
      },
      {
        title: "32 loads",
        sku: "DL-110144",
        options: { Size: "32 loads" },
        amount: 16,
      },
    ],
  },
  {
    title: "Murasaki Scent Oil + Glass Dropper",
    handle: "murasaki-scent-oil-glass-dropper",
    description:
      "Elevate laundry day with our Murasaki Scent. Our Murasaki Scent Oil was created to be the perfect dryer companion to our Murasaki Bio Laundry Detergent. Give your laundry a scent boost by adding a few drops onto wool dryer balls before placing your clothes in the dryer. Features fresh notes of jasmine, matcha, and vetiver. All Dirty Labs fragrances are free of known irritants, endocrine disruptors, California Prop 65 chemicals, MIT, and BIT. 2.7 fl oz. Hypoallergenic. Cruelty-free. Vegan. Recyclable aluminum bottle. Glass dropper. Made in USA from globally sourced ingredients and components.",
    collectionHandle: "accessories",
    categoryNames: ["Accessories"],
    weight: 0,
    images: [
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/MUR-OIL-01-1800x.jpg?v=1763561130" },
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/MUR-OIL-02-1800x.jpg?v=1712181347" },
    ],
    options: [{ title: "Format", values: ["Standard"] }],
    variants: [
      {
        title: "Standard",
        sku: "DL-112142",
        options: { Format: "Standard" },
        amount: 38,
      },
    ],
  },
  {
    title: "Probiotic Toilet Bowl Cleaner with Phytolase®",
    handle: "probiotic-toilet-bowl-cleaner",
    description:
      "Our formula combines our powerful Phytolase® bioenzyme technology with a new probiotic blend that deep cleans your toilet bowl by attacking grime on the spot and prevents future stains by continuously cleaning between uses. With notes of Cassis, Tuberose and Birch, Verdure smells like fresh spring air. Septic-Safe. Vegan and Cruelty Free. Made in USA with globally sourced ingredients and components.",
    collectionHandle: "toilet",
    categoryNames: ["Toilet"],
    weight: 522,
    images: [
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/toilet-01.jpg?v=1763672319" },
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/toilet-02.jpg?v=1742323551" },
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/toilet-03.jpg?v=1742323551" },
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/toilet-05.jpg?v=1743784840" },
    ],
    options: [{ title: "Format", values: ["Standard"] }],
    variants: [
      {
        title: "Standard",
        sku: "DL-116151",
        options: { Format: "Standard" },
        amount: 24,
      },
    ],
  },
  {
    title: "Refillable Ceramic Canister with Bamboo Lid",
    handle: "refillable-ceramic-canister-with-bamboo-lid",
    description:
      "Our Refillable Canister is designed for use with our Bio Enzyme Laundry Booster and Dish Detergents. Holds 48 standard size loads (621mL). Canisters are 5 1/2\" tall & 3 7/8\" in diameter. BPA-free. Canister is ceramic. Base is silicon. Lid is made of bamboo. Scoop is made of responsibly sourced schima superba wood.",
    collectionHandle: "accessories",
    categoryNames: ["Accessories"],
    weight: 680,
    images: [
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/dl-ecom-ceramic-canister-closed-w-scoop-gradientcopy.jpg?v=1763561133" },
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/dl-ecom-ceramic-canister-open-w-scoop-lid-gradientcopy.jpg?v=1718047041" },
    ],
    options: [{ title: "Format", values: ["Standard"] }],
    variants: [
      {
        title: "Standard",
        sku: "DL-112199",
        options: { Format: "Standard" },
        amount: 18,
      },
    ],
  },
  {
    title: "Reusable Erlenmeyer Glass Dispenser + Pump",
    handle: "reusable-erlenmeyer-glass-dispenser-pump",
    description:
      "Our Reusable Erlenmeyer Glass Dispenser + Pump is designed for use with our 80 Load Bio Laundry Detergent Refill bottles. Made of glass with a protective silicone sleeve. Holds over 40 medium / standard size loads (375mL). ~8.5\" tall and the base is ~4\" wide. Includes 1 Dirty Labs reusable silicone measuring beaker. Machine washable. BPA-free. Pro Tip: Pump detergent into the beaker and place directly into your washer drum or main detergent dispensing tray.",
    collectionHandle: "accessories",
    categoryNames: ["Accessories"],
    weight: 726,
    images: [
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/PMP-01-1800x.jpg?v=1763561111" },
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/PMP-02-1800x.jpg?v=1699332374" },
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/PMP-03-1800x.jpg?v=1699332373" },
    ],
    options: [{ title: "Format", values: ["Standard"] }],
    variants: [
      {
        title: "Standard",
        sku: "DL-110197",
        options: { Format: "Standard" },
        amount: 18,
      },
    ],
  },
  {
    title: "Reusable Silicone Measuring Beaker",
    handle: "reusable-silicone-measuring-beaker",
    description:
      "The Dirty Labs measuring beaker is made from durable silicone and is infinitely reusable. Easily measure the perfect amount of Dirty Labs Bio Enzyme Laundry Detergent for your load size. How to use: Pour or pump laundry detergent into the beaker. Toss the beaker into the drum with your clothes or place it in the dispenser drawer. Start your wash. Every drop of your hyper concentrated detergent gets used and the beaker comes out clean. Note: The Reusable Silicone Measuring Beaker comes standard with every 32-load bottle of Dirty Labs Bio Enzyme Laundry Detergent.",
    collectionHandle: "accessories",
    categoryNames: ["Accessories"],
    weight: 27,
    images: [
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/beaker-gradient-01.jpg?v=1763561111" },
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/dl-ecom-beaker-in-hand.jpg?v=1711396577" },
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/beaker-pour-1800x.jpg?v=1761001814" },
    ],
    options: [{ title: "Format", values: ["Standard"] }],
    variants: [
      {
        title: "Standard",
        sku: "DL-110199",
        options: { Format: "Standard" },
        amount: 7,
      },
    ],
  },
  {
    title: "Signature Bio Laundry Detergent",
    handle: "signature-bio-laundry-detergent",
    description:
      "Dirty Labs Bio Enzyme Laundry Detergents tackle dirty laundry with clean science. Our proprietary 5-in-1 enzyme detergents deliver exceptional cleaning using cutting-edge biobased ingredients. Our Signature detergent features a subtle and sophisticated prestige scent with notes of magnolia, bergamot, and cedar, and is free of all EU listed fragrance allergens. Septic safe and compatible with traditional and HE washers. Hyper-concentrated formula. Optimized for cold water. Hypoallergenic. Certified EPA Safer Choice. 100% USDA Biobased certified. Biodegradable. Dermatologist tested and approved. Safe for babies and pets. Cruelty-free. Vegan. 32 load bottle contains 8.6 fl oz. 80 load refill bottle contains 21.6 fl oz.",
    collectionHandle: "laundry",
    categoryNames: ["Laundry"],
    weight: 454,
    images: [
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/SG80-01-1800x_c27420a1-b386-40e0-abbc-d39ece28d810.jpg?v=1762446743" },
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/SG80-02-1800x.jpg?v=1705305904" },
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/SG80-03-1800x.jpg?v=1705305904" },
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/SIG-32.jpg?v=1763672319" },
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/SG32-02-1800x.jpg?v=1705610605" },
    ],
    options: [{ title: "Size", values: ["80 loads - refill", "32 loads"] }],
    variants: [
      {
        title: "80 loads - refill",
        sku: "DL-110116",
        options: { Size: "80 loads - refill" },
        amount: 28,
      },
      {
        title: "32 loads",
        sku: "DL-110114",
        options: { Size: "32 loads" },
        amount: 16,
      },
    ],
  },
  {
    title: "Signature Scent Oil + Glass Dropper",
    handle: "signature-scent-oil-glass-dropper",
    description:
      "Elevate laundry day with our best selling Signature Scent. Our Signature Scent Oil was created to be the perfect dryer companion to our Signature Bio Laundry Detergent. Give your laundry a scent boost by adding a few drops onto wool dryer balls before placing your clothes in the dryer. A subtle and sophisticated prestige scent with notes of magnolia, bergamot, and cedar. All Dirty Labs fragrances are free of known irritants, endocrine disruptors, and California Prop 65 chemicals. 2.7 fl oz. Hypoallergenic. Cruelty-free. Vegan. Recyclable aluminum bottle. Glass dropper. Made in USA from globally sourced ingredients and components.",
    collectionHandle: "accessories",
    categoryNames: ["Accessories"],
    weight: 91,
    images: [
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/OIL-01-1800x.jpg?v=1763561116" },
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/OIL-03-1800x.jpg?v=1700175234" },
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/OIL-02-1800x.jpg?v=1700175234" },
    ],
    options: [{ title: "Format", values: ["Standard"] }],
    variants: [
      {
        title: "Standard",
        sku: "DL-112112",
        options: { Format: "Standard" },
        amount: 38,
      },
    ],
  },
  {
    title: "Sustainable Laundry Starter Set - Signature",
    handle: "sustainable-laundry-starter-set-signature-1",
    description:
      "Start a Sustainable Laundry Starter Set Autoship order and receive a FREE Reusable Glass Refill Pump + FREE Wool Dryer Balls with your 1st shipment. Dirty Labs Signature Bio Laundry Detergent & Bio Booster is a liquid + powder duo that uses advanced bioenzymes to make your whites and colors vibrant and eliminate the toughest stains and odors. Signature Bio Laundry Detergent features notes of magnolia, bergamot, and cedar. 80 loads in a 21.6 fl oz bottle. Bio Enzyme Laundry Booster: 4-in-1 Advanced Stain & Odor Remover. Compatible with traditional and HE washers. Optimized for cold water. Septic safe. Made in USA from globally sourced ingredients and components.",
    collectionHandle: "bundles",
    categoryNames: ["Bundles"],
    weight: 0,
    images: [
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/slss-bundle-hero-signature_b011a68c-67af-45a6-99f9-152dd1b80f0c.jpg?v=1770943762" },
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/dl_slss_sig_pdp_jan_2026.jpg?v=1770943762" },
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/01-sig-boos_abe8f286-2d45-440d-843a-f36923dd3f82.png?v=1770943762" },
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/SLSS-p_9f7af630-88b0-48d7-8ab4-ac813ab70419.jpg?v=1770943762" },
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/SLSS-wb_898c8a97-82b1-4655-b01b-6df8ace160bd.jpg?v=1770943762" },
    ],
    options: [{ title: "Format", values: ["Standard"] }],
    variants: [
      {
        title: "Standard",
        sku: "DL-118112",
        options: { Format: "Standard" },
        amount: 40,
      },
    ],
  },
  {
    title: "Sustainable Laundry Starter Set - Murasaki",
    handle: "sustainable-laundry-starter-set-murasaki-1",
    description:
      "Start a Sustainable Laundry Starter Set Autoship order and receive a FREE Reusable Glass Refill Pump + FREE Wool Dryer Balls with your 1st shipment. Dirty Labs Murasaki Bio Laundry Detergent & Bio Booster is a liquid + powder duo that uses advanced bioenzymes to make your whites and colors vibrant and eliminate the toughest stains and odors. Murasaki scent is inspired by the early Spring green tea harvest in Japan and features fresh notes of jasmine, matcha, and vetiver. 80 loads in a 21.6 fl oz bottle. Bio Enzyme Laundry Booster: 4-in-1 Advanced Stain & Odor Remover. Compatible with traditional and HE washers. Optimized for cold water. Septic safe. Made in USA from globally sourced ingredients and components.",
    collectionHandle: "bundles",
    categoryNames: ["Bundles"],
    weight: 0,
    images: [
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/slss-bundle-hero-murasaki_f6a9e22a-65db-46e2-846d-c969f06219da.jpg?v=1770943649" },
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/dl_slss_mur_pdp_jan_2026.jpg?v=1770943649" },
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/02-mur-boos_6ad3531b-ce23-4acb-8221-350ac1f32008.png?v=1770943649" },
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/SLSS-p_648f702b-d3c2-4352-8e3f-0890cbc0f3a7.jpg?v=1770943649" },
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/SLSS-wb_36bbf144-b603-4e92-af1f-194aac58ef3d.jpg?v=1770943649" },
    ],
    options: [{ title: "Format", values: ["Standard"] }],
    variants: [
      {
        title: "Standard",
        sku: "DL-118142",
        options: { Format: "Standard" },
        amount: 40,
      },
    ],
  },
  {
    title: "Bio Laundry Detergent Travel Pack",
    handle: "travel-kit",
    description:
      "Our Bio Laundry Detergent Travel Pack contains 10 single-dose packets of our best-selling detergents, designed to keep your clothes clean no matter where life takes you. No measuring. No mess. Just tear, pour, wash. Ultra-concentrated bio-enzymes for deep-clean performance. Hypoallergenic. Works in cold-water + high-efficiency machines. Suitable for delicates, casuals, denim, and daily wash. Made in US with global sourced ingredients and components. Safe for travel.",
    collectionHandle: "laundry",
    categoryNames: ["Laundry"],
    weight: 0,
    images: [
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/BIOENZYMELAUNDRYDETERGENTTRAVELPACK_GRADIENT_c14d4dc8-8536-4868-afc7-1e4c03773ca5.jpg?v=1764621729" },
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/travelpack-detail.jpg?v=1764637288" },
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/travelpack-lifestyle.jpg?v=1764637288" },
    ],
    options: [{ title: "Format", values: ["Standard"] }],
    variants: [
      {
        title: "Standard",
        sku: "DL-110382",
        options: { Format: "Standard" },
        amount: 10,
      },
    ],
  },
  {
    title: "Wooden Pan & Dish Scraper",
    handle: "wooden-pan-dish-scraper",
    description:
      "Meet your new favorite dishwashing companion—and the perfect assistant to Dirty Labs Bio Enzyme Liquid Dish Soap. This handcrafted wooden scraper tackles stuck-on food without scratching your cookware. Protects Your Pans: Safe for all cookware including cast iron, stainless steel, non-stick, and enameled surfaces. Works Like Magic: Baked-on cheese, caramelized bits, dried sauce—all gone in seconds. Built to Last: Crafted from durable hardwood. Eco-Friendly Choice: Biodegradable scraper. Made of Beechwood, 13cm x 5cm and 5mm thick.",
    collectionHandle: "dish",
    categoryNames: ["Dish"],
    weight: 0,
    images: [
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/scraper.jpg?v=1763759618" },
    ],
    options: [{ title: "Format", values: ["Standard"] }],
    variants: [
      {
        title: "Standard",
        sku: "DL-113191",
        options: { Format: "Standard" },
        amount: 7,
      },
    ],
  },
  {
    title: "100% New Zealand Wool Dryer Balls",
    handle: "wool-dryer-balls",
    description:
      "Dirty Labs Wool Dryer Balls are a sustainable alternative to traditional dryer sheets and fabric softeners. By fluffing and separating laundry as it tumbles, our Wool Dryer Balls allow air to circulate more evenly, reducing drying time, static, and wrinkles. Responsibly sourced and made from 100% New Zealand wool. Hypoallergenic, biodegradable, and free of added dyes, fragrances, and chemicals. Freshens and softens fabrics. Responsible RWS Certified Wool.",
    collectionHandle: "accessories",
    categoryNames: ["Accessories"],
    weight: 181,
    images: [
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/CWB-01-1800x_7ebb91d0-6356-4e79-92f5-8ab09e247819.jpg?v=1763561104" },
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/CWB-02-1800x.jpg?v=1699332302" },
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/CWB-03-1800x.jpg?v=1699332301" },
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/CWB-04-1800x_766da514-7d11-4a83-a1b3-f9735d23a676.jpg?v=1699332301" },
      { url: "https://cdn.shopify.com/s/files/1/0370/0215/0024/files/CWB-05-1800x.jpg?v=1699332300" },
    ],
    options: [{ title: "Format", values: ["Standard"] }],
    variants: [
      {
        title: "Standard",
        sku: "DL-112102",
        options: { Format: "Standard" },
        amount: 18,
      },
    ],
  },
]

const DIRTY_LABS_SOURCE = "dirtylabs"
const SUPPORTED_COUNTRIES = ["gb", "bg", "de", "dk", "se", "fr", "es", "it"]

const buildPrices = (amount: number) => [
  {
    amount,
    currency_code: "eur",
  },
  {
    amount,
    currency_code: "usd",
  },
]

const buildProductInput = (
  product: SeedProduct,
  categoryIdByName: Map<string, string>,
  collectionIdByHandle: Map<string, string>,
  shippingProfileId: string,
  salesChannelId: string
) => {
  const categoryIds = product.categoryNames.map((name) => {
    const categoryId = categoryIdByName.get(name)

    if (!categoryId) {
      throw new Error(`Missing category id for ${name}`)
    }

    return categoryId
  })

  const collectionId = collectionIdByHandle.get(product.collectionHandle)

  if (!collectionId) {
    throw new Error(`Missing collection id for ${product.collectionHandle}`)
  }

  return {
    title: product.title,
    handle: product.handle,
    description: product.description,
    category_ids: categoryIds,
    collection_id: collectionId,
    weight: product.weight,
    status: ProductStatus.PUBLISHED,
    shipping_profile_id: shippingProfileId,
    images: product.images,
    thumbnail: product.images[0]?.url,
    options: product.options,
    variants: product.variants.map((variant) => ({
      title: variant.title,
      sku: variant.sku,
      options: variant.options,
      prices: buildPrices(variant.amount),
    })),
    sales_channels: [{ id: salesChannelId }],
    metadata: {
      source: DIRTY_LABS_SOURCE,
      source_handle: product.handle,
      source_url: `https://dirtylabs.com/products/${product.handle}`,
      collection_handle: product.collectionHandle,
      ...buildProductMetadata(product),
    },
  }
}

async function ensureCollections({
  container,
  productModuleService,
}: {
  container: ExecArgs["container"]
  productModuleService: any
}) {
  const handles = new Set(
    DIRTY_LABS_COLLECTIONS.map((collection) => collection.handle)
  )
  const allCollections = await productModuleService.listProductCollections(
    {},
    { take: 100, select: ["id", "handle", "title"] }
  )
  const existingCollections = allCollections.filter(
    (collection: { handle: string }) => handles.has(collection.handle)
  )

  const existingHandles = new Set(
    existingCollections.map((collection: { handle: string }) => collection.handle)
  )

  const missingCollections = DIRTY_LABS_COLLECTIONS.filter(
    (collection) => !existingHandles.has(collection.handle)
  )

  const createdCollections = missingCollections.length
    ? (
        await createCollectionsWorkflow(container).run({
          input: {
            collections: missingCollections.map((collection) => ({
              ...collection,
              metadata: buildCollectionMetadata(collection),
            })),
          },
        })
      ).result
    : []

  return new Map(
    [...existingCollections, ...createdCollections].map(
      (collection: { handle: string; id: string }) => [
        collection.handle,
        collection.id,
      ]
    )
  )
}

async function ensureProductCategories({
  container,
  productModuleService,
}: {
  container: ExecArgs["container"]
  productModuleService: any
}) {
  const targetHandles = new Set(
    DIRTY_LABS_PRODUCT_CATEGORIES.map((category) => category.name.toLowerCase())
  )

  const allCategories = await productModuleService.listProductCategories(
    {},
    { take: 1000, select: ["id", "name", "handle"] }
  )

  const existingCategories = allCategories.filter(
    (category: { handle: string }) => targetHandles.has(category.handle)
  )

  const existingHandleSet = new Set(
    existingCategories.map((category: { handle: string }) => category.handle)
  )

  const missingCategories = DIRTY_LABS_PRODUCT_CATEGORIES.filter(
    (category) => !existingHandleSet.has(category.name.toLowerCase())
  )

  const createdCategories = missingCategories.length
    ? (
        await createProductCategoriesWorkflow(container).run({
          input: {
            product_categories: missingCategories.map((category) => ({
              ...category,
              metadata: buildCategoryMetadata(category),
            })),
          },
        })
      ).result
    : []

  return new Map(
    [...existingCategories, ...createdCategories].map(
      (category: { id: string; name: string }) => [category.name, category.id]
    )
  )
}

export default async function seedDemoData({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const link = container.resolve(ContainerRegistrationKeys.LINK)
  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  const apiKeyModuleService = container.resolve(Modules.API_KEY)
  const fulfillmentModuleService = container.resolve(Modules.FULFILLMENT)
  const inventoryModuleService = container.resolve(Modules.INVENTORY)
  const productModuleService = container.resolve(Modules.PRODUCT)
  const regionModuleService = container.resolve(Modules.REGION)
  const salesChannelModuleService = container.resolve(Modules.SALES_CHANNEL)
  const stockLocationModuleService = container.resolve(Modules.STOCK_LOCATION)
  const storeModuleService = container.resolve(Modules.STORE)
  const taxModuleService = container.resolve(Modules.TAX)

  logger.info("Seeding store data...")
  const [store] = await storeModuleService.listStores()
  let defaultSalesChannel = await salesChannelModuleService.listSalesChannels({
    name: "Default Sales Channel",
  })

  if (!defaultSalesChannel.length) {
    const { result: salesChannelResult } = await createSalesChannelsWorkflow(
      container
    ).run({
      input: {
        salesChannelsData: [
          {
            name: "Default Sales Channel",
          },
        ],
      },
    })
    defaultSalesChannel = salesChannelResult
  }

  const defaultSalesChannelId = defaultSalesChannel[0].id

  await updateStoreCurrencies(container).run({
    input: {
      store_id: store.id,
      supported_currencies: [
        {
          currency_code: "eur",
          is_default: true,
        },
        {
          currency_code: "usd",
        },
      ],
    },
  })

  await updateStoresWorkflow(container).run({
    input: {
      selector: { id: store.id },
      update: {
        default_sales_channel_id: defaultSalesChannelId,
      },
    },
  })

  logger.info("Seeding region data...")
  const existingRegions = await regionModuleService.listRegions({
    name: "Europe",
  })
  let region = existingRegions[0] ?? null
  if (!region) {
    const { result: regionResult } = await createRegionsWorkflow(
      container
    ).run({
      input: {
        regions: [
          {
            name: "Europe",
            currency_code: "eur",
            countries: SUPPORTED_COUNTRIES,
            payment_providers: ["pp_system_default"],
          },
        ],
      },
    })
    region = regionResult[0]
  }
  logger.info("Finished seeding regions.")

  logger.info("Seeding tax regions...")
  const existingTaxRegions = await taxModuleService.listTaxRegions({
    country_code: SUPPORTED_COUNTRIES,
  })
  const existingTaxCountryCodes = new Set(
    existingTaxRegions.map((r: { country_code: string }) => r.country_code)
  )
  const missingTaxCountries = SUPPORTED_COUNTRIES.filter(
    (code) => !existingTaxCountryCodes.has(code)
  )
  if (missingTaxCountries.length) {
    await createTaxRegionsWorkflow(container).run({
      input: missingTaxCountries.map((country_code) => ({
        country_code,
        provider_id: "tp_system",
      })),
    })
  }
  logger.info("Finished seeding tax regions.")

  logger.info("Seeding stock location data...")
  const existingLocations = await stockLocationModuleService.listStockLocations(
    { name: "European Warehouse" }
  )
  let stockLocation = existingLocations[0] ?? null
  if (!stockLocation) {
    const { result: stockLocationResult } =
      await createStockLocationsWorkflow(container).run({
        input: {
          locations: [
            {
              name: "European Warehouse",
              address: {
                city: "Copenhagen",
                country_code: "DK",
                address_1: "",
              },
            },
          ],
        },
      })
    stockLocation = stockLocationResult[0]

    await link.create({
      [Modules.STOCK_LOCATION]: {
        stock_location_id: stockLocation.id,
      },
      [Modules.FULFILLMENT]: {
        fulfillment_provider_id: "manual_manual",
      },
    })
  }

  await updateStoresWorkflow(container).run({
    input: {
      selector: { id: store.id },
      update: {
        default_location_id: stockLocation.id,
      },
    },
  })

  logger.info("Seeding fulfillment data...")
  const shippingProfiles = await fulfillmentModuleService.listShippingProfiles({
    type: "default",
  })
  let shippingProfile = shippingProfiles.length ? shippingProfiles[0] : null

  if (!shippingProfile) {
    const { result: shippingProfileResult } =
      await createShippingProfilesWorkflow(container).run({
        input: {
          data: [
            {
              name: "Default Shipping Profile",
              type: "default",
            },
          ],
        },
      })
    shippingProfile = shippingProfileResult[0]
  }

  const existingFulfillmentSets =
    await fulfillmentModuleService.listFulfillmentSets(
      { name: "European Warehouse delivery" },
      { relations: ["service_zones"] }
    )
  let fulfillmentSet = existingFulfillmentSets[0] ?? null
  if (!fulfillmentSet) {
    fulfillmentSet = await fulfillmentModuleService.createFulfillmentSets({
      name: "European Warehouse delivery",
      type: "shipping",
      service_zones: [
        {
          name: "Europe",
          geo_zones: SUPPORTED_COUNTRIES.map((country_code) => ({
            country_code,
            type: "country" as const,
          })),
        },
      ],
    })

    await link.create({
      [Modules.STOCK_LOCATION]: {
        stock_location_id: stockLocation.id,
      },
      [Modules.FULFILLMENT]: {
        fulfillment_set_id: fulfillmentSet.id,
      },
    })
  }

  const existingShippingOptions =
    await fulfillmentModuleService.listShippingOptions({
      service_zone: { id: fulfillmentSet.service_zones[0].id },
    })
  if (!existingShippingOptions.length) {
    await createShippingOptionsWorkflow(container).run({
      input: [
        {
          name: "Standard Shipping",
          price_type: "flat",
          provider_id: "manual_manual",
          service_zone_id: fulfillmentSet.service_zones[0].id,
          shipping_profile_id: shippingProfile.id,
          type: {
            label: "Standard",
            description: "Ship in 2-3 days.",
            code: "standard",
          },
          data: buildShippingOptionMetadata({
            name: "Standard Shipping",
            bgName: "Стандартна доставка",
            description: "Ship in 2-3 days.",
            bgDescription: "Доставка за 2-3 дни.",
            label: "Standard",
            bgLabel: "Стандартна",
          }),
          prices: [
            {
              currency_code: "usd",
              amount: 10,
            },
            {
              currency_code: "eur",
              amount: 10,
            },
            {
              region_id: region.id,
              amount: 10,
            },
          ],
          rules: [
            {
              attribute: "enabled_in_store",
              value: "true",
              operator: "eq",
            },
            {
              attribute: "is_return",
              value: "false",
              operator: "eq",
            },
          ],
        },
        {
          name: "Express Shipping",
          price_type: "flat",
          provider_id: "manual_manual",
          service_zone_id: fulfillmentSet.service_zones[0].id,
          shipping_profile_id: shippingProfile.id,
          type: {
            label: "Express",
            description: "Ship in 24 hours.",
            code: "express",
          },
          data: buildShippingOptionMetadata({
            name: "Express Shipping",
            bgName: "Експресна доставка",
            description: "Ship in 24 hours.",
            bgDescription: "Доставка до 24 часа.",
            label: "Express",
            bgLabel: "Експресна",
          }),
          prices: [
            {
              currency_code: "usd",
              amount: 10,
            },
            {
              currency_code: "eur",
              amount: 10,
            },
            {
              region_id: region.id,
              amount: 10,
            },
          ],
          rules: [
            {
              attribute: "enabled_in_store",
              value: "true",
              operator: "eq",
            },
            {
              attribute: "is_return",
              value: "false",
              operator: "eq",
            },
          ],
        },
      ],
    })
  }
  logger.info("Finished seeding fulfillment data.")

  await linkSalesChannelsToStockLocationWorkflow(container).run({
    input: {
      id: stockLocation.id,
      add: [defaultSalesChannelId],
    },
  })
  logger.info("Finished seeding stock location data.")

  logger.info("Seeding publishable API key data...")
  const existingApiKeys = await apiKeyModuleService.listApiKeys({
    title: "Webshop",
  })
  let publishableApiKey = existingApiKeys[0] ?? null
  if (!publishableApiKey) {
    const { result: publishableApiKeyResult } = await createApiKeysWorkflow(
      container
    ).run({
      input: {
        api_keys: [
          {
            title: "Webshop",
            type: "publishable",
            created_by: "",
          },
        ],
      },
    })
    publishableApiKey = publishableApiKeyResult[0]
  }

  await linkSalesChannelsToApiKeyWorkflow(container).run({
    input: {
      id: publishableApiKey.id,
      add: [defaultSalesChannelId],
    },
  })
  logger.info("Finished seeding publishable API key data.")

  logger.info("Ensuring Dirty Labs collections and product categories...")
  const collectionIdByHandle = await ensureCollections({
    container,
    productModuleService,
  })
  const categoryIdByName = await ensureProductCategories({
    container,
    productModuleService,
  })

  logger.info("Seeding Dirty Labs product data...")
  const existingProducts = await productModuleService.listProducts(
    {
      handle: DIRTY_LABS_PRODUCTS.map((product) => product.handle),
    },
    {
      take: DIRTY_LABS_PRODUCTS.length,
    }
  )

  const existingHandles = new Set(
    existingProducts
      .map((product: { handle?: string | null }) => product.handle)
      .filter((handle: string | null | undefined): handle is string => !!handle)
  )

  const productsToCreate = DIRTY_LABS_PRODUCTS.filter(
    (product) => !existingHandles.has(product.handle)
  ).map((product) =>
    buildProductInput(
      product,
      categoryIdByName,
      collectionIdByHandle,
      shippingProfile.id,
      defaultSalesChannelId
    )
  )

  if (productsToCreate.length) {
    await createProductsWorkflow(container).run({
      input: {
        products: productsToCreate,
      },
    })
  }

  logger.info(
    `Finished seeding Dirty Labs product data. Created ${productsToCreate.length} products.`
  )

  logger.info("Ensuring inventory levels for Dirty Labs variants...")
  const targetSkus = new Set(
    DIRTY_LABS_PRODUCTS.flatMap((product) =>
      product.variants.map((variant) => variant.sku)
    )
  )

  const { data: inventoryItems } = await query.graph({
    entity: "inventory_item",
    fields: ["id", "sku"],
  })

  const targetInventoryItems = inventoryItems.filter(
    (inventoryItem: { id: string; sku?: string | null }) =>
      inventoryItem.sku && targetSkus.has(inventoryItem.sku)
  )

  const existingInventoryLevels = await inventoryModuleService.listInventoryLevels(
    {
      location_id: stockLocation.id,
    },
    {
      take: 500,
    }
  )

  const seededInventoryItemIds = new Set(
    existingInventoryLevels.map(
      (inventoryLevel: { inventory_item_id: string }) =>
        inventoryLevel.inventory_item_id
    )
  )

  const inventoryLevels: CreateInventoryLevelInput[] = targetInventoryItems
    .filter(
      (inventoryItem: { id: string }) =>
        !seededInventoryItemIds.has(inventoryItem.id)
    )
    .map((inventoryItem: { id: string }) => ({
      location_id: stockLocation.id,
      stocked_quantity: 1000000,
      inventory_item_id: inventoryItem.id,
    }))

  if (inventoryLevels.length) {
    await createInventoryLevelsWorkflow(container).run({
      input: {
        inventory_levels: inventoryLevels,
      },
    })
  }

  logger.info(
    `Finished seeding inventory levels data. Created ${inventoryLevels.length} inventory levels.`
  )
}
