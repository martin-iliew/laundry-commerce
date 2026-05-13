import { Locale, locales, getDefaultLocale } from "../../i18n";

/**
 * Get the default locale for a given country code
 */
export function getLocaleForCountry(countryCode: string): Locale {
  return getDefaultLocale(countryCode);
}

/**
 * Map route locale to Intl.NumberFormat locale
 */
export function getFormattingLocale(locale: Locale): string {
  const localeMap: Record<Locale, string> = {
    bg: "bg-BG",
    en: "en-US",
  };
  return localeMap[locale] || "en-US";
}

/**
 * Build a localized path with optional locale segment
 * @param countryCode - The country code (e.g., 'bg', 'us')
 * @param locale - The current locale ('en' or 'bg')
 * @param href - The path to localize (e.g., '/store', '/products/shirt')
 * @returns The localized path
 */
export function buildLocalizedPath(
  countryCode: string,
  locale: Locale,
  href: string
): string {
  const defaultLocale = getDefaultLocale(countryCode);
  
  // If locale is default for this country, omit locale segment
  if (locale === defaultLocale) {
    return `/${countryCode}${href}`;
  }
  
  // Otherwise, include locale segment
  return `/${countryCode}/${locale}${href}`;
}

/**
 * Check if a locale is valid
 */
export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

/**
 * Normalize a potentially missing route locale to a supported locale.
 */
export function getRouteLocale(locale?: string): Locale {
  return locale && isValidLocale(locale) ? locale : "en";
}

/**
 * Switch to a different locale from current path
 * @param currentPathname - Current URL pathname
 * @param targetLocale - Target locale to switch to
 * @returns New pathname with target locale
 */
export function switchLocale(
  currentPathname: string,
  targetLocale: Locale
): string {
  // Parse pathname: /{countryCode}/{locale?}/...rest
  const segments = currentPathname.split('/').filter(Boolean);
  
  if (segments.length === 0) return '/';
  
  const countryCode = segments[0];
  const defaultLocale = getDefaultLocale(countryCode);
  
  // Check if second segment is a locale
  const hasLocaleSegment = segments.length > 1 && isValidLocale(segments[1]);
  
  // Remove existing locale segment if present
  const pathWithoutLocale = hasLocaleSegment
    ? `/${segments.slice(2).join('/')}`
    : `/${segments.slice(1).join('/')}`;
  
  return buildLocalizedPath(countryCode, targetLocale, pathWithoutLocale || '/');
}
