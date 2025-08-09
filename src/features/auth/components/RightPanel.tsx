// src/features/auth/components/RightPanel.tsx

import Image from 'next/image';

import { useTranslations } from 'next-intl';

export default function RightPanel() {
  const t = useTranslations('auth.rightPanel');

  return (
    <div className="hidden md:flex flex-col justify-between bg-gradient-to-br from-indigo-600 to-indigo-900 p-12 text-white">
      <div className="flex-grow flex flex-col items-center justify-center text-center px-6 space-y-6">
        <h2 className="text-4xl font-bold leading-tight">{t('headline')}</h2>
        <p className="text-lg text-indigo-100 font-medium leading-relaxed max-w-md">
          {t('subtitle')}
        </p>
      </div>
      <div className="mt-[60px] flex justify-center">
        <Image
          src="/illustrations/group-chatting-3.png"
          alt={t('imageAlt')}
          width={500}
          height={300}
          className="w-full max-w-full rounded-lg h-auto object-contain"
        />
      </div>
    </div>
  );
}
