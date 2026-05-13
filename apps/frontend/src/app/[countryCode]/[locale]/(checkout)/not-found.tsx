import InteractiveLink from "@modules/common/components/interactive-link"
import { Metadata } from "next"

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const { getTranslations } = await import("next-intl/server")
  const t = await getTranslations({ locale, namespace: "errors" })

  return {
    title: t("404"),
    description: t("somethingWentWrong"),
  }
}

export default async function NotFound() {
  const { getTranslations } = await import("next-intl/server")
  const t = await getTranslations("errors")

  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-[calc(100vh-64px)]">
      <h1 className="text-2xl-semi text-ui-fg-base">{t("pageNotFound")}</h1>
      <p className="text-small-regular text-ui-fg-base">
        {t("pageNotFoundDescription")}
      </p>
      <InteractiveLink href="/">{t("goToFrontpage")}</InteractiveLink>
    </div>
  )
}
