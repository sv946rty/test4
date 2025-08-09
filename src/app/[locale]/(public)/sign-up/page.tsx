// src/app/[locale]/(public)/sign-up/page.tsx

import { getLocale } from 'next-intl/server';

import AuthShell from '@/features/auth/components/AuthShell';
import RightPanel from '@/features/auth/components/RightPanel';
import LegalDisclaimer from '@/features/auth/components/LegalDisclaimer';
import SignUpClient from '@/features/auth/components/SignUpClient';

export { generateStaticParamsForLocale as generateStaticParams } from '@/lib/i18n/static-params';

export default async function SignUpPage() {
  const locale = await getLocale();

  return (
    <AuthShell
      left={
        <div className="flex h-full w-full max-w-sm md:max-w-md flex-col justify-between">
          <SignUpClient signInHref={`/${locale}/sign-in`} />
          <LegalDisclaimer />
        </div>
      }
      right={<RightPanel />}
    />
  );
}
