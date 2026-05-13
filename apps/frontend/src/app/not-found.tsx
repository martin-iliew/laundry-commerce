import { ArrowUpRightMini } from "@medusajs/icons"
import { Text } from "@medusajs/ui"
import { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import Link from "next/link"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("errors")

  return {
    title: t("404"),
    description: t("somethingWentWrong"),
  }
}

export default async function NotFound() {
  const t = await getTranslations("errors")

  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-[calc(100vh-64px)]">
      <h1 className="text-2xl-semi text-ui-fg-base">{t("pageNotFound")}</h1>
      <p className="text-small-regular text-ui-fg-base">
        {t("pageNotFoundDescription")}
      </p>
      <Link
        className="flex gap-x-1 items-center group"
        href="/"
      >
        <Text className="text-ui-fg-interactive">{t("goToFrontpage")}</Text>
        <ArrowUpRightMini
          className="group-hover:rotate-45 ease-in-out duration-150"
          color="var(--fg-interactive)"
        />
      </Link>
    </div>
  )
}
