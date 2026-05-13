const DEFAULT_LOCALE = "en"

function getEntityTranslations(entity) {
  return entity?.metadata?.translations ?? entity?.data?.translations ?? {}
}

function getOptionTranslations(product) {
  return product?.metadata?.option_translations ?? {}
}

export function getLocalizedField(entity, field, locale = DEFAULT_LOCALE) {
  const translations = getEntityTranslations(entity)

  return (
    translations?.[locale]?.[field] ??
    translations?.[DEFAULT_LOCALE]?.[field] ??
    entity?.[field] ??
    ""
  )
}

export function getLocalizedProductOptionTitle(
  product,
  optionTitle,
  locale = DEFAULT_LOCALE
) {
  const translations = getOptionTranslations(product)

  return (
    translations?.[locale]?.titles?.[optionTitle] ??
    translations?.[DEFAULT_LOCALE]?.titles?.[optionTitle] ??
    optionTitle
  )
}

export function getLocalizedProductOptionValue(
  product,
  optionTitle,
  optionValue,
  locale = DEFAULT_LOCALE
) {
  const translations = getOptionTranslations(product)

  return (
    translations?.[locale]?.values?.[optionTitle]?.[optionValue] ??
    translations?.[DEFAULT_LOCALE]?.values?.[optionTitle]?.[optionValue] ??
    optionValue
  )
}

export function getLocalizedVariantTitle(
  product,
  variantTitle,
  locale = DEFAULT_LOCALE
) {
  const translations = getOptionTranslations(product)

  return (
    translations?.[locale]?.variants?.[variantTitle] ??
    translations?.[DEFAULT_LOCALE]?.variants?.[variantTitle] ??
    variantTitle
  )
}
