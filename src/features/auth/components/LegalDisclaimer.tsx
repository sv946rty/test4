// src/features/auth/components/LegalDisclaimer.tsx

import { getTranslations, getLocale } from 'next-intl/server';
import Link from 'next/link';

export default async function LegalDisclaimer() {
  const t = await getTranslations('auth.legalDisclaimer');
  const tNav = await getTranslations('navigation');
  const locale = await getLocale();

  const agreeText = t('agreePrefix', { appName: tNav('title') }); // ✅ renamed
  const termsText = t('terms');
  const privacyText = t('privacy');
  const andText = t('and');
  const updatesNote = t('updatesNote');

  const termsHref = `/${locale}/terms`;
  const privacyHref = `/${locale}/privacy`;

  return (
    <div className="text-xs leading-relaxed text-gray-700 font-medium pt-4 md:pt-6">
      {agreeText}{' '}
      <Link
        href={termsHref}
        className="text-primary hover:underline cursor-pointer"
      >
        {termsText}
      </Link>{' '}
      {andText}{' '}
      <Link
        href={privacyHref}
        className="text-primary hover:underline cursor-pointer"
      >
        {privacyText}
      </Link>
      . {updatesNote}
    </div>
  );
}
