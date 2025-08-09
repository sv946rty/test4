// src/features/auth/components/SignInClient.tsx

'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { Mail } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import {
  LoginSchema,
  flattenErrors,
  LoginFormData,
} from '@/features/auth/types/auth';

// If your reset component lives elsewhere, adjust this import:
import AuthResetPassword from './AuthResetPassword';

type OAuthProvider = 'google' | 'linkedin' | 'facebook';

function SocialButton({
  icon,
  text,
  onClick,
}: {
  icon: React.ReactNode;
  text: string;
  onClick?: () => void;
}) {
  return (
    <Button
      type="button"
      variant="outline"
      className="h-10 w-full max-w-xs mx-auto flex items-center justify-center gap-3 border-gray-300 bg-transparent text-sm md:h-11"
      onClick={onClick}
    >
      {icon}
      {text}
    </Button>
  );
}

export default function SignInClient({ signupHref }: { signupHref: string }) {
  const t = useTranslations('auth.login');
  const router = useRouter();

  const [view, setView] = useState<'main' | 'email' | 'resetPassword'>('main');
  const [form, setForm] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: true,
  });
  const [isLoading, setIsLoading] = useState(false);

  const disabled = useMemo(
    () => !(form.email && form.password) || isLoading,
    [form, isLoading]
  );

  const update =
    (k: keyof LoginFormData) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm(prev => ({ ...prev, [k]: e.target.value }));

  function handleOAuth(provider: OAuthProvider) {
    window.location.href = `/api/auth/oauth/${provider}`;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    const parsed = LoginSchema.safeParse(form);
    if (!parsed.success) {
      const errs = flattenErrors(parsed.error);
      toast.error(
        errs.email ??
          errs.password ??
          t('errors.loginFailed', { defaultValue: 'Invalid form' })
      );
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });
      const data: { success: boolean; error?: string } = await res.json();
      if (res.ok && data.success) {
        toast.success(t('loginSuccess'));
        router.push('/dashboard');
      } else {
        toast.error(data.error || t('errors.loginFailed'));
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex h-full w-full max-w-sm md:max-w-md flex-col justify-between">
      <div className="flex-grow flex flex-col justify-between">
        <div className="space-y-4 md:space-y-6">
          {view === 'main' && (
            <>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                {t('title')}
              </h1>
              <p className="text-sm md:text-base text-gray-700">
                {t('noAccount')}{' '}
                <Link
                  href={signupHref}
                  className="text-primary underline hover:opacity-90"
                >
                  {t('signUp')}
                </Link>
              </p>

              {/* Google */}
              <SocialButton
                icon={
                  <svg
                    className="!w-5 !h-5"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                }
                text={t('continueWithGoogle')}
                onClick={() => handleOAuth('google')}
              />

              {/* Continue with email */}
              <Button
                type="button"
                variant="outline"
                className="h-10 w-full max-w-xs mx-auto flex items-center justify-center gap-3 border-gray-300 bg-transparent text-sm md:h-11"
                onClick={() => setView('email')}
              >
                <Mail className="h-4 w-4" />
                {t('contWithEmail')}
              </Button>

              {/* Divider */}
              <div className="relative pt-1">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-white px-2 text-gray-600 font-medium">
                    OR
                  </span>
                </div>
              </div>

              {/* Secondary providers row */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="flex justify-center">
                  <SocialButton
                    icon={
                      <svg
                        className="!h-5 !w-5"
                        viewBox="0 0 32 32"
                        aria-hidden="true"
                      >
                        <rect
                          x="0"
                          y="0"
                          width="32"
                          height="32"
                          rx="6"
                          fill="#0A66C2"
                        />
                        <path
                          d="M9 12h3v10H9V12zm1.5-5a1.75 1.75 0 1 0 0 3.5A1.75 1.75 0 0 0 10.5 7zm5.5 5h2.8v1.4h.04c.4-.75 1.39-1.55 2.86-1.55 3.05 0 3.62 2 3.62 4.6V22h-3v-5.4c0-1.29-.02-2.95-1.8-2.95s-2.1 1.4-2.1 2.85V22h-3V12z"
                          fill="#ffffff"
                        />
                      </svg>
                    }
                    text={t('continueWithLinkedin', {
                      defaultValue: 'LinkedIn',
                    })}
                    onClick={() => handleOAuth('linkedin')}
                  />
                </div>
                <div className="flex justify-center">
                  <SocialButton
                    icon={
                      <svg
                        className="!h-5 !w-5 text-blue-600"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073C0 18.062 4.388 23.027 10.125 23.927v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    }
                    text={t('continueWithFacebook', {
                      defaultValue: 'Facebook',
                    })}
                    onClick={() => handleOAuth('facebook')}
                  />
                </div>
              </div>
            </>
          )}

          {view === 'email' && (
            <div className="flex flex-col flex-grow justify-between h-full">
              <div className="space-y-4 md:space-y-6">
                <button
                  onClick={() => setView('main')}
                  className="text-sm font-medium text-primary hover:underline mb-2"
                >
                  &larr; {t('back', { defaultValue: 'Back' })}
                </button>

                <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                  {t('contWithEmail')}
                </h1>

                <form
                  className="flex flex-col justify-between h-auto md:h-[360px]"
                  onSubmit={handleSubmit}
                >
                  <div className="space-y-3 md:space-y-4">
                    <div>
                      <Label className="text-sm font-semibold text-gray-800">
                        {t('email')}
                      </Label>
                      <Input
                        type="email"
                        placeholder={t('emailPlaceholder')}
                        className="h-9 md:h-10 text-sm mt-1"
                        value={form.email}
                        onChange={update('email')}
                        required
                        autoComplete="email"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-semibold text-gray-800">
                        {t('password')}
                      </Label>
                      <Input
                        type="password"
                        placeholder={t('passwordPlaceholder')}
                        className="h-9 md:h-10 text-sm mt-1"
                        value={form.password}
                        onChange={update('password')}
                        required
                        autoComplete="current-password"
                      />
                    </div>
                    <div className="text-right text-xs md:text-sm">
                      <button
                        type="button"
                        className="text-gray-700 hover:underline"
                        onClick={() => setView('resetPassword')}
                      >
                        {t('forgotPassword')}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full mt-4 h-10 md:h-11"
                    disabled={disabled}
                  >
                    {isLoading ? t('signingIn') : t('signIn')}
                  </Button>
                </form>
              </div>
            </div>
          )}

          {view === 'resetPassword' && (
            <AuthResetPassword setCurrentView={setView} backToView="email" />
          )}
        </div>
      </div>
    </div>
  );
}
