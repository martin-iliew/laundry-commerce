import { getLocale, getTranslations } from "next-intl/server"
import { Container, Heading, Text } from "@medusajs/ui"

import {
  getPaymentInfoTitleKey,
  isStripeLike,
  paymentInfoMap,
} from "@lib/constants"
import Divider from "@modules/common/components/divider"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"

type PaymentDetailsProps = {
  order: HttpTypes.StoreOrder
}

const PaymentDetails = async ({ order }: PaymentDetailsProps) => {
  const t = await getTranslations("order")
  const tPayment = await getTranslations("paymentProviders")
  const locale = await getLocale()
  const payment = order.payment_collections?.[0].payments?.[0]

  const paymentTitleKey = getPaymentInfoTitleKey(payment?.provider_id)

  return (
    <div>
      <Heading level="h2" className="flex flex-row text-3xl-regular my-6">
        {t("paymentSection")}
      </Heading>
      <div>
        {payment && (
          <div className="flex items-start gap-x-1 w-full">
            <div className="flex flex-col w-1/3">
              <Text className="txt-medium-plus text-ui-fg-base mb-1">
                {t("paymentMethod")}
              </Text>
              <Text
                className="txt-medium text-ui-fg-subtle"
                data-testid="payment-method"
              >
                {paymentTitleKey
                  ? tPayment(paymentTitleKey)
                  : payment.provider_id}
              </Text>
            </div>
            <div className="flex flex-col w-2/3">
              <Text className="txt-medium-plus text-ui-fg-base mb-1">
                {t("paymentDetails")}
              </Text>
              <div className="flex gap-2 txt-medium text-ui-fg-subtle items-center">
                <Container className="flex items-center h-7 w-fit p-2 bg-ui-button-neutral-hover">
                  {paymentInfoMap[payment.provider_id].icon}
                </Container>
                <Text data-testid="payment-amount">
                  {isStripeLike(payment.provider_id) && payment.data?.card_last4
                    ? t("cardEnding", { last4: payment.data.card_last4 })
                    : t("paymentRecordedAt", {
                        amount: convertToLocale({
                        amount: payment.amount,
                        currency_code: order.currency_code,
                      }),
                        timestamp: new Intl.DateTimeFormat(locale, {
                          dateStyle: "medium",
                          timeStyle: "short",
                        }).format(new Date(payment.created_at ?? "")),
                      })}
                </Text>
              </div>
            </div>
          </div>
        )}
      </div>

      <Divider className="mt-8" />
    </div>
  )
}

export default PaymentDetails
