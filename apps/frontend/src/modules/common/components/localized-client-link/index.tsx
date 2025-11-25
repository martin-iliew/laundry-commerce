"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import React from "react"
import { buildLocalizedPath } from "@lib/util/locale"
import { Locale } from "../../../../i18n"

/**
 * Use this component to create a Next.js `<Link />` that persists the current country code and locale in the url,
 * without having to explicitly pass them as props.
 */
const LocalizedClientLink = ({
  children,
  href,
  ...props
}: {
  children?: React.ReactNode
  href: string
  className?: string
  onClick?: () => void
  passHref?: true
  [x: string]: any
}) => {
  const params = useParams()
  const countryCode = params.countryCode as string
  const locale = (params.locale as Locale) || 'en'

  const localizedHref = buildLocalizedPath(countryCode, locale, href)

  return (
    <Link href={localizedHref} {...props}>
      {children}
    </Link>
  )
}

export default LocalizedClientLink
