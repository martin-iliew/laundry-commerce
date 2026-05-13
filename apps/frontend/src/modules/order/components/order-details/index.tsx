import { getLocale, getTranslations } from "next-intl/server"
import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"

type OrderDetailsProps = {
  order: HttpTypes.StoreOrder
  showStatus?: boolean
}

const FULFILLMENT_STATUS_LABELS: Record<string, string> = {
  not_fulfilled: "notFulfilled",
  partially_fulfilled: "partiallyFulfilled",
  fulfilled: "fulfilled",
  partially_shipped: "partiallyShipped",
  shipped: "shipped",
  delivered: "delivered",
  canceled: "canceled",
}

const PAYMENT_STATUS_LABELS: Record<string, string> = {
  not_paid: "notPaid",
  awaiting: "awaiting",
  authorized: "authorized",
  partially_authorized: "partiallyAuthorized",
  captured: "captured",
  partially_captured: "partiallyCaptured",
  refunded: "refunded",
  partially_refunded: "partiallyRefunded",
  canceled: "canceled",
  requires_action: "requiresAction",
}

const OrderDetails = async ({ order, showStatus }: OrderDetailsProps) => {
  const t = await getTranslations("order")
  const locale = await getLocale()

  const formatStatus = (str: string) => {
    const formatted = str.split("_").join(" ")

    return formatted.slice(0, 1).toUpperCase() + formatted.slice(1)
  }

  const formatLocalizedStatus = (
    status: string | null | undefined,
    statusMap: Record<string, string>,
    key: "fulfillmentStatusValues" | "paymentStatusValues"
  ) => {
    if (!status) {
      return ""
    }

    const labelKey = statusMap[status]

    return labelKey ? t(`${key}.${labelKey}`) : formatStatus(status)
  }

  return (
    <div>
      <Text>
        {t("confirmationSentTo")}{" "}
        <span
          className="text-ui-fg-medium-plus font-semibold"
          data-testid="order-email"
        >
          {order.email}
        </span>
        .
      </Text>
      <Text className="mt-2">
        {t("orderDate")}:{" "}
        <span data-testid="order-date">
          {new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(
            new Date(order.created_at)
          )}
        </span>
      </Text>
      <Text className="mt-2 text-ui-fg-interactive">
        {t("orderNumber")}: <span data-testid="order-id">{order.display_id}</span>
      </Text>

      <div className="flex items-center text-compact-small gap-x-4 mt-4">
        {showStatus && (
          <>
            <Text>
              {t("orderStatus")}:{" "}
              <span className="text-ui-fg-subtle " data-testid="order-status">
                {formatLocalizedStatus(
                  order.fulfillment_status,
                  FULFILLMENT_STATUS_LABELS,
                  "fulfillmentStatusValues"
                )}
              </span>
            </Text>
            <Text>
              {t("paymentStatus")}:{" "}
              <span
                className="text-ui-fg-subtle "
                sata-testid="order-payment-status"
              >
                {formatLocalizedStatus(
                  order.payment_status,
                  PAYMENT_STATUS_LABELS,
                  "paymentStatusValues"
                )}
              </span>
            </Text>
          </>
        )}
      </div>
    </div>
  )
}

export default OrderDetails
