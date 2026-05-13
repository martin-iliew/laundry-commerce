import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

// Supported locales
export const locales = ['en', 'bg'] as const;
export type Locale = (typeof locales)[number];

// Default locale based on country code
export function getDefaultLocale(countryCode: string): Locale {
  return countryCode === 'bg' ? 'bg' : 'en';
}

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  
  if (!locale || !locales.includes(locale as Locale)) {
    locale = 'en';
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
