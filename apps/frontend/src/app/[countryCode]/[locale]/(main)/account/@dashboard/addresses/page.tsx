import { Metadata } from "next"
import { notFound } from "next/navigation"

import AddressBook from "@modules/account/components/address-book"

import { getRegion } from "@lib/data/regions"
import { retrieveCustomer } from "@lib/data/customer"

type Props = {
  params: Promise<{ countryCode: string; locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const { getTranslations } = await import("next-intl/server")
  const t = await getTranslations({ locale, namespace: "account" })

  return {
    title: t("addresses"),
    description: t("addressesPageDescription"),
  }
}

export default async function Addresses(props: Props) {
  const t = await (await import("next-intl/server")).getTranslations("account")
  const params = await props.params
  const { countryCode } = params
  const customer = await retrieveCustomer()
  const region = await getRegion(countryCode)

  if (!customer || !region) {
    notFound()
  }

  return (
    <div className="w-full" data-testid="addresses-page-wrapper">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-2xl-semi">{t("shippingAddresses")}</h1>
        <p className="text-base-regular">{t("addressesDescription")}</p>
      </div>
      <AddressBook customer={customer} region={region} />
    </div>
  )
}
