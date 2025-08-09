// src/lib/i18n/static-params.ts

/**
 * This file helps Next.js pre-build all language versions of a page.
 *
 * What is `generateStaticParams` in Next.js?
 * ------------------------------------------
 * In Next.js, when you have a dynamic route (for example `/[locale]/sign-in`),
 * the part inside square brackets `[locale]` is called a **dynamic segment**.
 * Normally, Next.js does not know in advance what values `[locale]` can have.
 *
 * `generateStaticParams` is a special Next.js function you can export from a page file
 * to tell Next.js:
 *   “Here is the list of all possible values for this dynamic segment. Please build them all at build time.”
 *
 * Example:
 * --------
 * If `generateStaticParams` returns:
 *   [ { locale: 'en' }, { locale: 'es' }, { locale: 'zh' } ]
 *
 * Next.js will pre-build:
 *   /en/sign-in
 *   /es/sign-in
 *   /zh/sign-in
 *
 * Why we need this file:
 * ----------------------
 * Our app supports multiple languages, and we have many pages under `/[locale]/...`
 * Instead of repeating the same `generateStaticParams` code in every page,
 * we keep it here as a shared helper.
 *
 * Where it’s used:
 * ----------------
 * Any page in a `[locale]` folder can do:
 *
 *   export { generateStaticParamsForLocale as generateStaticParams } from '@/lib/i18n/static-params';
 *
 * That way, Next.js knows to pre-build that page in **all supported languages**.
 * Without this, only one language version might be built, and other locales could give 404 errors.
 *
 * How it works internally:
 * ------------------------
 * - It reads the list of supported languages from `routing.locales` (see routing.ts).
 * - It returns an array of objects where each object contains a `locale` value.
 * - Next.js runs this at build time and generates a static HTML page for every locale.
 */

import { routing } from './routing';

export type Locale = (typeof routing.locales)[number];

export function generateStaticParamsForLocale() {
  return routing.locales.map(locale => ({ locale })) as Array<{
    locale: Locale;
  }>;
}

export function makeGenerateStaticParams(paramName: string) {
  return () =>
    routing.locales.map(locale => ({ [paramName]: locale })) as Array<
      Record<typeof paramName, Locale>
    >;
}
