import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import HomeFeatures from "@modules/home/components/home-features"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import { Locale } from "../../../../i18n"

type Props = {
  params: Promise<{ countryCode: string; locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const { getTranslations } = await import("next-intl/server")
  const t = await getTranslations({ locale, namespace: "metadata" })

  return {
    title: t("defaultTitle"),
    description: t("defaultDescription"),
  }
}

export default async function Home(props: Props) {
  const params = await props.params
  const { countryCode, locale } = params

  const region = await getRegion(countryCode)

  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  if (!collections || !region) {
    return null
  }

  return (
    <>
      <Hero countryCode={countryCode} locale={locale as Locale} />
      <HomeFeatures />
      <div className="py-12">
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </div>
    </>
  )
}
