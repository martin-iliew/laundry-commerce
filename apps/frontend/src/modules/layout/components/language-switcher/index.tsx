"use client"

import { useParams, usePathname, useRouter } from "next/navigation"
import { Locale, locales } from "../../../../i18n"
import { useState } from "react"
import clx from "clsx"
import { useTranslations } from "next-intl"

const LanguageSwitcher = () => {
  const params = useParams()
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const t = useTranslations("locales")

  const currentLocale = (params.locale as Locale) || (params.countryCode as Locale) || "en"

  const localeOptions: { code: Locale; label: string; codeDisplay: string }[] = [
    { code: "en", label: t("en"), codeDisplay: "EN" },
    { code: "bg", label: t("bg"), codeDisplay: "BG" },
  ]

  const handleLocaleChange = (newLocale: Locale) => {
    if (newLocale !== currentLocale) {
      // Path is /{countryCode}/{locale?}/...rest
      // We want /{newLocale}/...rest (countryCode = locale, no separate locale segment)
      const segments = pathname.split("/").filter(Boolean)
      const hasLocaleSegment =
        segments.length > 1 && locales.includes(segments[1] as Locale)
      const rest = hasLocaleSegment ? segments.slice(2) : segments.slice(1)
      const newPath = `/${newLocale}${rest.length ? "/" + rest.join("/") : ""}`
      router.push(newPath)
    }
    setIsOpen(false)
  }

  const currentLocaleData = localeOptions.find((l) => l.code === currentLocale)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 hover:text-ui-fg-base text-ui-fg-subtle transition-colors px-2 py-1"
        data-testid="language-switcher-button"
        aria-label={t("changeLanguage")}
      >
        <span className="text-sm font-medium">
          {currentLocaleData?.codeDisplay}
        </span>
        <svg
          className={clx("w-4 h-4 transition-transform", {
            "rotate-180": isOpen,
          })}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-ui-border-base z-20">
            <div className="py-1">
              {localeOptions.map((locale) => (
                <button
                  key={locale.code}
                  onClick={() => handleLocaleChange(locale.code)}
                  className={clx(
                    "w-full text-left px-4 py-2 text-sm flex items-center gap-3 transition-colors",
                    {
                      "bg-ui-bg-subtle text-ui-fg-base":
                        locale.code === currentLocale,
                      "hover:bg-ui-bg-subtle-hover text-ui-fg-subtle hover:text-ui-fg-base":
                        locale.code !== currentLocale,
                    }
                  )}
                  data-testid={`locale-option-${locale.code}`}
                >
                  <span className="font-medium w-6">{locale.codeDisplay}</span>
                  <span>{locale.label}</span>
                  {locale.code === currentLocale && (
                    <svg
                      className="w-4 h-4 ml-auto"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default LanguageSwitcher
