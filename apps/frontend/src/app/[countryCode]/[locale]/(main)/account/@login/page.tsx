import { Metadata } from "next"

import LoginTemplate from "@modules/account/templates/login-template"

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const { getTranslations } = await import("next-intl/server")
  const t = await getTranslations({ locale, namespace: "account" })

  return {
    title: t("signIn"),
    description: t("signInPageDescription"),
  }
}

export default function Login() {
  return <LoginTemplate />
}
