const DEFAULT_LOCALE = "en" as const
const SECONDARY_LOCALE = "bg" as const

export const SUPPORTED_SEED_LOCALES = [
  DEFAULT_LOCALE,
  SECONDARY_LOCALE,
] as const

type Locale = (typeof SUPPORTED_SEED_LOCALES)[number]

type LocalizedText = Record<Locale, string>

type SeedCollection = {
  handle: string
  title: string
}

type SeedProductCategory = {
  name: string
}

type SeedProductOption = {
  title: string
  values: string[]
}

type SeedProductVariant = {
  title: string
}

type SeedProduct = {
  handle: string
  title: string
  description: string
  options: SeedProductOption[]
  variants: SeedProductVariant[]
}

const CATEGORY_TRANSLATIONS: Record<string, LocalizedText> = {
  Laundry: { en: "Laundry", bg: "Пране" },
  Dish: { en: "Dish", bg: "Съдове" },
  Toilet: { en: "Toilet", bg: "Тоалетна" },
  Accessories: { en: "Accessories", bg: "Аксесоари" },
  Bundles: { en: "Bundles", bg: "Комплекти" },
}

const COLLECTION_TRANSLATIONS: Record<string, LocalizedText> = {
  laundry: { en: "Laundry", bg: "Пране" },
  dish: { en: "Dish", bg: "Съдове" },
  toilet: { en: "Toilet", bg: "Тоалетна" },
  accessories: { en: "Accessories", bg: "Аксесоари" },
  bundles: { en: "Bundles", bg: "Комплекти" },
}

const OPTION_TITLE_TRANSLATIONS: Record<string, LocalizedText> = {
  Format: { en: "Format", bg: "Формат" },
  Size: { en: "Size", bg: "Размер" },
}

const OPTION_VALUE_TRANSLATIONS: Record<string, LocalizedText> = {
  Standard: { en: "Standard", bg: "Стандартен" },
  "48 loads": { en: "48 loads", bg: "48 пранета" },
  "110 loads - refill": {
    en: "110 loads - refill",
    bg: "110 пранета - пълнител",
  },
  "80 loads - refill": {
    en: "80 loads - refill",
    bg: "80 пранета - пълнител",
  },
  "32 loads": { en: "32 loads", bg: "32 пранета" },
}

const PRODUCT_TRANSLATIONS: Record<
  string,
  {
    title: string
    description: string
  }
> = {
  "aestival-bio-enzyme-dishwasher-detergent": {
    title: "Aestival биоензимен препарат за съдомиялна",
    description:
      "Нашата ултраконцентрирана 2-в-1 прахообразна формула с усъвършенствани биоензими и хипоалергенни съставки разгражда трудни замърсявания и упорити остатъци от храна.",
  },
  "aestival-bio-enzyme-liquid-dish-soap": {
    title: "Aestival биоензимен течен сапун за съдове",
    description:
      "Хиперконцентриран течен сапун за съдове с ензимната технология Phytolase на Dirty Labs за по-умно ръчно миене.",
  },
  "baby-safe-laundry-bundle": {
    title: "Бебешки комплект за пране Essential",
    description:
      "Нежен комплект Dirty Labs за бебешко пране с хипоалергенен препарат, бустер и вълнени топки за сушилня.",
  },
  "bio-enzyme-laundry-booster": {
    title: "Биоензимен бустер за пране",
    description:
      "Бустерът на Dirty Labs е създаден да се комбинира с препаратите за пране на марката за по-трудни петна и по-силно премахване на миризми.",
  },
  "bio-laundry-detergent-starter-kit": {
    title: "Стартов комплект с биоензимен препарат за пране",
    description:
      "Стартов комплект Dirty Labs, който събира основните продукти за пране в един комплект.",
  },
  "bulk-bio-enzyme-laundry-booster-2-pack": {
    title: "Биоензимен бустер за пране - пакет от 2",
    description:
      "Комплект от два бустера Dirty Labs за клиенти, които искат най-голямото предложение за допълване срещу петна.",
  },
  "delicates-mesh-wash-bag": {
    title: "Мрежеста торба за пране на деликатни дрехи Dirty Labs",
    description:
      "Дишаща торба за пране, която предпазва деликатните дрехи и им помага да запазят формата си при многократно пране.",
  },
  "dish-trio-bundle-aestival-canister": {
    title: "Комплект Dish Trio - Aestival",
    description:
      "Комплект Dirty Labs за съдове, който съчетава серията Aestival с презареждащ се контейнер на марката.",
  },
  "dish-trio-bundle-free-and-clear-canister": {
    title: "Комплект Dish Trio - Free & Clear",
    description:
      "Комплект Free & Clear за съдове, който съчетава основните продукти на Dirty Labs за съдомиялна и ръчно миене с контейнер за презареждане.",
  },
  "enzyme-buddies-wool-dryer-balls": {
    title: "Вълнени топки за сушилня Enzyme Buddies",
    description:
      "Закачлив комплект вълнени топки за сушилня със същите ползи за омекотяване и по-кратко сушене във формат с характер.",
  },
  "free-clear-bio-enzyme-dishwasher-detergent": {
    title: "Free & Clear биоензимен препарат за съдомиялна",
    description:
      "Препарат за съдомиялна Dirty Labs без аромат, 2-в-1, създаден за силно почистване с хипоалергенни съставки.",
  },
  "free-clear-bio-enzyme-liquid-dish-soap": {
    title: "Free & Clear биоензимен течен сапун за съдове",
    description:
      "Течен сапун за съдове без аромат с ензимната технология на Dirty Labs за ежедневно ръчно миене.",
  },
  "free-clear-bio-laundry-detergent": {
    title: "Free & Clear биоензимен препарат за пране",
    description:
      "Препарат за пране Dirty Labs без аромат, изграден около 5-в-1 формулата за почистване с Phytolase.",
  },
  "german-dish-cloths": {
    title: "Немски кухненски кърпи",
    description:
      "Многократни кърпи от целулоза и памук, които превъзхождат хартиените кърпи и гъбите за ежедневното почистване.",
  },
  "hand-wash-delicates": {
    title: "Биоензимен препарат за ръчно пране и деликатни тъкани",
    description:
      "Препарат Dirty Labs за деликатни материи и ръчно пране със същата биоензимна основа като основната линия за пране.",
  },
  "luxe-scent-gift-set": {
    title: "Подаръчен комплект Luxe Scent",
    description:
      "Подаръчен комплект Dirty Labs, изграден около премиум ароматите за пране и най-продаваните почистващи продукти на марката.",
  },
  "murasaki-bio-laundry-detergent": {
    title: "Murasaki биоензимен препарат за пране",
    description:
      "Препарат Dirty Labs с жасмин, матча и ветивер, изграден върху 5-в-1 биоензимната формула за пране на марката.",
  },
  "murasaki-scent-oil-glass-dropper": {
    title: "Ароматно масло Murasaki + стъклен капкомер",
    description:
      "Концентрирано ароматно масло, създадено да се използва с топките за сушилня Dirty Labs и да удължи ароматния профил Murasaki.",
  },
  "probiotic-toilet-bowl-cleaner": {
    title: "Пробиотичен препарат за тоалетна чиния с Phytolase",
    description:
      "Пробиотичен препарат за тоалетна чиния, който съчетава ензимното почистване Phytolase на Dirty Labs с пробиотичен поддържащ бленд.",
  },
  "refillable-ceramic-canister-with-bamboo-lid": {
    title: "Презареждаем керамичен контейнер с дървен капак",
    description:
      "Многократен контейнер, създаден за бустера за пране и препаратите за съдове на Dirty Labs при презареждане.",
  },
  "reusable-erlenmeyer-glass-dispenser-pump": {
    title: "Многократен стъклен дозатор Erlenmeyer с помпа",
    description:
      "Многократен стъклен дозатор, създаден за презарежданията на препарата за пране Dirty Labs за 80 пранета и за съхранение на плота.",
  },
  "reusable-silicone-measuring-beaker": {
    title: "Многократна силиконова мерителна чашка",
    description:
      "Многократна силиконова чашка за измерване на дозите препарат за пране Dirty Labs без еднократни чашки.",
  },
  "signature-bio-laundry-detergent": {
    title: "Signature биоензимен препарат за пране",
    description:
      "Препарат Dirty Labs с магнолия, бергамот и кедър, изграден върху 5-в-1 биоензимната формула за пране.",
  },
  "signature-scent-oil-glass-dropper": {
    title: "Ароматно масло Signature + стъклен капкомер",
    description:
      "Концентрирано ароматно масло, създадено да се използва с топките за сушилня Dirty Labs и да подсили аромата Signature.",
  },
  "sustainable-laundry-starter-set-free-clear": {
    title: "Стартов комплект Sustainable Laundry Free & Clear",
    description:
      "Стартов комплект Dirty Labs с фокус върху абонаментно зареждане, който съчетава системата Free & Clear с многократните аксесоари на марката.",
  },
  "sustainable-laundry-starter-set-murasaki": {
    title: "Стартов комплект Sustainable Laundry Murasaki",
    description:
      "Стартов комплект Dirty Labs с фокус върху абонаментно зареждане, който съчетава системата Murasaki с многократните аксесоари на марката.",
  },
  "sustainable-laundry-starter-set-signature": {
    title: "Стартов комплект Sustainable Laundry Signature",
    description:
      "Стартов комплект Dirty Labs с фокус върху абонаментно зареждане, който съчетава системата Signature с многократните аксесоари на марката.",
  },
  "sustainable-laundry-starter-set-signature-1": {
    title: "Стартов комплект Sustainable Laundry Signature",
    description:
      "Стартов комплект Dirty Labs с фокус върху абонаментно зареждане, който съчетава системата Signature с многократните аксесоари на марката.",
  },
  "sustainable-laundry-starter-set-murasaki-1": {
    title: "Стартов комплект Sustainable Laundry Murasaki",
    description:
      "Стартов комплект Dirty Labs с фокус върху абонаментно зареждане, който съчетава системата Murasaki с многократните аксесоари на марката.",
  },
  "travel-kit": {
    title: "Пътнически пакет с биоензимен препарат за пране",
    description:
      "Пакет Dirty Labs за пътуване с 10 еднократни дози за пране извън дома.",
  },
  "wooden-pan-dish-scraper": {
    title: "Дървена шпатула за тигани и съдове",
    description:
      "Ръчно изработена шпатула за миене на съдове за засъхнала храна, безопасна за тенджери и тигани.",
  },
  "wool-dryer-balls": {
    title: "100% вълнени топки за сушилня от Нова Зеландия",
    description:
      "Многократни вълнени топки за сушилня, които намаляват времето за сушене и заменят еднократните омекотяващи кърпички в рутината на Dirty Labs.",
  },
}

function createTranslations(fields: Record<string, LocalizedText>) {
  return {
    en: Object.fromEntries(
      Object.entries(fields).map(([key, value]) => [key, value.en])
    ),
    bg: Object.fromEntries(
      Object.entries(fields).map(([key, value]) => [key, value.bg])
    ),
  }
}

function getOptionValueTranslation(value: string): LocalizedText {
  return OPTION_VALUE_TRANSLATIONS[value] ?? { en: value, bg: value }
}

export function buildCollectionMetadata(collection: SeedCollection) {
  const title = COLLECTION_TRANSLATIONS[collection.handle] ?? {
    en: collection.title,
    bg: collection.title,
  }

  return {
    translations: createTranslations({
      title,
    }),
  }
}

export function buildCategoryMetadata(category: SeedProductCategory) {
  const name = CATEGORY_TRANSLATIONS[category.name] ?? {
    en: category.name,
    bg: category.name,
  }

  return {
    translations: createTranslations({
      name,
    }),
  }
}

export function buildProductMetadata(product: SeedProduct) {
  const productCopy = PRODUCT_TRANSLATIONS[product.handle] ?? {
    title: product.title,
    description: product.description,
  }

  const optionTitleTranslations = product.options.reduce<Record<string, LocalizedText>>(
    (acc, option) => {
      acc[option.title] = OPTION_TITLE_TRANSLATIONS[option.title] ?? {
        en: option.title,
        bg: option.title,
      }

      return acc
    },
    {}
  )

  const optionValueTranslations = product.options.reduce<
    Record<string, Record<string, LocalizedText>>
  >((acc, option) => {
    acc[option.title] = option.values.reduce<Record<string, LocalizedText>>(
      (valueAcc, value) => {
        valueAcc[value] = getOptionValueTranslation(value)

        return valueAcc
      },
      {}
    )

    return acc
  }, {})

  const variantTranslations = product.variants.reduce<Record<string, LocalizedText>>(
    (acc, variant) => {
      acc[variant.title] = getOptionValueTranslation(variant.title)

      return acc
    },
    {}
  )

  return {
    translations: createTranslations({
      title: { en: product.title, bg: productCopy.title },
      description: {
        en: product.description,
        bg: productCopy.description,
      },
    }),
    option_translations: {
      en: {
        titles: Object.fromEntries(
          Object.entries(optionTitleTranslations).map(([key, value]) => [
            key,
            value.en,
          ])
        ),
        values: Object.fromEntries(
          Object.entries(optionValueTranslations).map(([optionTitle, values]) => [
            optionTitle,
            Object.fromEntries(
              Object.entries(values).map(([valueKey, value]) => [
                valueKey,
                value.en,
              ])
            ),
          ])
        ),
        variants: Object.fromEntries(
          Object.entries(variantTranslations).map(([key, value]) => [
            key,
            value.en,
          ])
        ),
      },
      bg: {
        titles: Object.fromEntries(
          Object.entries(optionTitleTranslations).map(([key, value]) => [
            key,
            value.bg,
          ])
        ),
        values: Object.fromEntries(
          Object.entries(optionValueTranslations).map(([optionTitle, values]) => [
            optionTitle,
            Object.fromEntries(
              Object.entries(values).map(([valueKey, value]) => [
                valueKey,
                value.bg,
              ])
            ),
          ])
        ),
        variants: Object.fromEntries(
          Object.entries(variantTranslations).map(([key, value]) => [
            key,
            value.bg,
          ])
        ),
      },
    },
  }
}

export function buildShippingOptionMetadata(input: {
  name: string
  bgName: string
  description: string
  bgDescription: string
  label: string
  bgLabel: string
}) {
  return {
    translations: createTranslations({
      name: { en: input.name, bg: input.bgName },
      description: {
        en: input.description,
        bg: input.bgDescription,
      },
      label: { en: input.label, bg: input.bgLabel },
    }),
  }
}
