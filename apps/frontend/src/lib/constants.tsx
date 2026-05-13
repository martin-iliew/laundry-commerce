import React from "react"
import { CreditCard } from "@medusajs/icons"

import Ideal from "@modules/common/icons/ideal"
import Bancontact from "@modules/common/icons/bancontact"
import PayPal from "@modules/common/icons/paypal"

/* Map of payment provider_id to their title and icon. Add in any payment providers you want to use. */
export const paymentInfoMap: Record<
  string,
  { titleKey: string; icon: React.JSX.Element }
> = {
  pp_stripe_stripe: {
    titleKey: "creditCard",
    icon: <CreditCard />,
  },
  "pp_medusa-payments_default": {
    titleKey: "creditCard",
    icon: <CreditCard />,
  },
  "pp_stripe-ideal_stripe": {
    titleKey: "ideal",
    icon: <Ideal />,
  },
  "pp_stripe-bancontact_stripe": {
    titleKey: "bancontact",
    icon: <Bancontact />,
  },
  pp_paypal_paypal: {
    titleKey: "paypal",
    icon: <PayPal />,
  },
  pp_system_default: {
    titleKey: "manualPayment",
    icon: <CreditCard />,
  },
  // Add more payment providers here
}

export const getPaymentInfoTitleKey = (providerId?: string) => {
  if (!providerId) {
    return null
  }

  return paymentInfoMap[providerId]?.titleKey ?? null
}

// This only checks if it is native stripe or medusa payments for card payments, it ignores the other stripe-based providers
export const isStripeLike = (providerId?: string) => {
  return (
    providerId?.startsWith("pp_stripe_") || providerId?.startsWith("pp_medusa-")
  )
}

export const isPaypal = (providerId?: string) => {
  return providerId?.startsWith("pp_paypal")
}
export const isManual = (providerId?: string) => {
  return providerId?.startsWith("pp_system_default")
}

// Add currencies that don't need to be divided by 100
export const noDivisionCurrencies = [
  "krw",
  "jpy",
  "vnd",
  "clp",
  "pyg",
  "xaf",
  "xof",
  "bif",
  "djf",
  "gnf",
  "kmf",
  "mga",
  "rwf",
  "xpf",
  "htg",
  "vuv",
  "xag",
  "xdr",
  "xau",
]
