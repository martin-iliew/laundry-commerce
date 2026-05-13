 "use client"

import { Heading } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useTranslations } from "next-intl"
import React from "react"

const Help = () => {
  const t = useTranslations("order")

  return (
    <div className="mt-6">
      <Heading className="text-base-semi">{t("help")}</Heading>
      <div className="text-base-regular my-2">
        <ul className="gap-y-2 flex flex-col">
          <li>
            <LocalizedClientLink href="/contact">{t("contact")}</LocalizedClientLink>
          </li>
          <li>
            <LocalizedClientLink href="/contact">{t("returns")}</LocalizedClientLink>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Help
