import { Heading, Text } from "@medusajs/ui"
import { getTranslations } from "next-intl/server"

const EnzymeIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <circle cx="14" cy="14" r="4" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="14" cy="5" r="2" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="14" cy="23" r="2" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="5" cy="14" r="2" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="23" cy="14" r="2" stroke="currentColor" strokeWidth="1.5" />
    <line x1="14" y1="10" x2="14" y2="7" stroke="currentColor" strokeWidth="1.5" />
    <line x1="14" y1="18" x2="14" y2="21" stroke="currentColor" strokeWidth="1.5" />
    <line x1="10" y1="14" x2="7" y2="14" stroke="currentColor" strokeWidth="1.5" />
    <line x1="18" y1="14" x2="21" y2="14" stroke="currentColor" strokeWidth="1.5" />
  </svg>
)

const LeafIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M6 22C6 22 8 10 20 6C20 6 22 16 12 20"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 22L12 20"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M20 6L12 14"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
)

const RecycleIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M14 5L17 9H11L14 5Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M14 9V16"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M6 18L8.5 14L5 12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.5 14C7 16.5 7.5 20 11 21.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M22 18L19.5 14L23 12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19.5 14C21 16.5 20.5 20 17 21.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <line x1="11" y1="21.5" x2="17" y2="21.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

const HomeFeatures = async () => {
  const t = await getTranslations("home")

  const features = [
    {
      icon: <EnzymeIcon />,
      title: t("features.bioEnzymes.title"),
      description: t("features.bioEnzymes.description"),
    },
    {
      icon: <LeafIcon />,
      title: t("features.hypoallergenic.title"),
      description: t("features.hypoallergenic.description"),
    },
    {
      icon: <RecycleIcon />,
      title: t("features.ecoFriendly.title"),
      description: t("features.ecoFriendly.description"),
    },
  ]

  return (
    <div className="border-b border-ui-border-base bg-ui-bg-subtle">
      <div className="content-container py-16 small:py-24">
        <div className="grid grid-cols-1 small:grid-cols-3 gap-12">
          {features.map((feature) => (
            <div key={feature.title} className="flex flex-col gap-4">
              <span className="text-ui-fg-base">{feature.icon}</span>
              <Heading
                level="h3"
                className="text-ui-fg-base font-medium txt-large"
              >
                {feature.title}
              </Heading>
              <Text className="text-ui-fg-subtle leading-relaxed">
                {feature.description}
              </Text>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomeFeatures
