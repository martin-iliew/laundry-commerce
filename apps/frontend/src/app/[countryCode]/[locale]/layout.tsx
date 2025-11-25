import { setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { locales, Locale } from '../../../i18n';

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{
    countryCode: string;
    locale: string;
  }>;
};

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  // Validate locale
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Load messages for the locale
  const messages = (await import( `../../../messages/${locale}.json`)).default;

  return (
    <html lang={locale} data-mode="light" suppressHydrationWarning>
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
      </NextIntlClientProvider>
    </html>
  );
}
