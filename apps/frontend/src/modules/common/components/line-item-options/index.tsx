"use client"

import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"
import { useLocale, useTranslations } from "next-intl"
import { getLocalizedVariantTitle } from "@lib/util/localized-content"

type LineItemOptionsProps = {
  variant: HttpTypes.StoreProductVariant | undefined
  product?: HttpTypes.StoreProduct | null
  "data-testid"?: string
  "data-value"?: HttpTypes.StoreProductVariant
}

const LineItemOptions = ({
  variant,
  product,
  "data-testid": dataTestid,
  "data-value": dataValue,
}: LineItemOptionsProps) => {
  const t = useTranslations("common")
  const locale = useLocale()

  return (
    <Text
      data-testid={dataTestid}
      data-value={dataValue}
      className="inline-block txt-medium text-ui-fg-subtle w-full overflow-hidden text-ellipsis"
    >
      {t("variant")}:{" "}
      {getLocalizedVariantTitle(
        product ?? variant?.product,
        variant?.title ?? "",
        locale
      )}
    </Text>
  )
}

export default LineItemOptions
