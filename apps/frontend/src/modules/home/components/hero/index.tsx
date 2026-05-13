import { Button, Heading, Text } from "@medusajs/ui"
import { getTranslations } from "next-intl/server"
import { buildLocalizedPath } from "@lib/util/locale"
import { Locale } from "../../../../i18n"
import Link from "next/link"

type HeroProps = {
  countryCode: string
  locale: Locale
}

const Hero = async ({ countryCode, locale }: HeroProps) => {
  const t = await getTranslations("home")
  const shopHref = buildLocalizedPath(countryCode, locale, "/store")

  return (
    <div className="w-full border-b border-ui-border-base bg-neutral-950">
      <div className="content-container py-24 small:py-36 flex flex-col items-start gap-8 small:gap-10">
        <div className="flex flex-col gap-3 max-w-2xl">
          <Heading
            level="h1"
            className="text-4xl small:text-6xl leading-tight text-white font-medium tracking-tight"
          >
            {t("hero.headline")}
          </Heading>
          <Text className="text-lg text-neutral-400 leading-relaxed">
            {t("hero.subheadline")}
          </Text>
        </div>
        <Link href={shopHref}>
          <Button variant="primary" size="large">
            {t("hero.cta")}
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default Hero
