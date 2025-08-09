// src/features/auth/components/AuthResetPassword.tsx
'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import AuthHeader from './AuthHeader';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface AuthResetPasswordProps {
  setCurrentView: (view: 'main' | 'email' | 'resetPassword') => void;
  backToView: 'main' | 'email';
}

// Simple email regex for basic validation
const isValidEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
};

const AuthResetPassword: React.FC<AuthResetPasswordProps> = ({
  setCurrentView,
  backToView,
}) => {
  const t = useTranslations('auth.login');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isButtonEnabled = isValidEmail(email) && !isLoading;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isButtonEnabled) return;

    setIsLoading(true);
    try {
      // TODO: wire up your real reset endpoint
      // await fetch('/api/auth/reset-password', { method: 'POST', body: JSON.stringify({ email }) });
      console.log('Reset link requested for:', email);
      // Optionally: toast.success(t('resetLinkSent')) if you add that key
      setCurrentView('email'); // send them back to email sign-in after request
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col flex-grow justify-between h-full">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 md:space-y-6 flex-grow"
      >
        <AuthHeader
          title={t('resetPassword')}
          subtitle={t('resetPasswordSubtitle')}
          linkText=""
          linkHref="#"
          backButtonText={t('back', { defaultValue: 'Back' })}
          onBackButtonClick={() => setCurrentView(backToView)}
        />

        <div>
          <Label className="text-sm font-semibold text-gray-800">
            {t('email')}
          </Label>
          <Input
            type="email"
            placeholder={t('emailPlaceholder')}
            className="h-9 md:h-10 text-sm mt-1"
            autoComplete="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full h-10 text-sm font-semibold md:h-12 md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!isButtonEnabled}
        >
          {t('sendResetLink')}
        </Button>
      </form>
    </div>
  );
};

export default AuthResetPassword;
