// src/features/auth/components/AuthHeader.tsx

// For the "Create a new account" or "Sign in to your account" headings and the "Already have an account?" / "Don't have an account?" links.

import React from 'react';
import Link from 'next/link';

interface AuthHeaderProps {
  title: string;
  subtitle?: string;
  linkText?: string;
  linkHref?: string;
  backButtonText?: string;
  onBackButtonClick?: () => void;
  onLinkTextClick?: () => void;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({
  title,
  subtitle,
  linkText,
  linkHref,
  backButtonText,
  onBackButtonClick,
  onLinkTextClick,
}) => {
  return (
    <div className="space-y-4 md:space-y-6">
      {backButtonText && onBackButtonClick && (
        <button
          onClick={onBackButtonClick}
          className="text-sm font-medium text-primary hover:underline mb-4 cursor-pointer"
        >
          ← {backButtonText}
        </button>
      )}
      <h1 className="text-xl md:text-2xl font-bold text-gray-900">{title}</h1>
      {/* Only render the subtitle paragraph if subtitle or linkText are provided */}
      {(subtitle || linkText) && (
        <p className="text-sm md:text-base text-gray-700 font-medium">
          {subtitle}{' '}
          {onLinkTextClick && linkText ? ( // Ensure linkText is also present for button rendering
            <button
              type="button"
              onClick={onLinkTextClick}
              className="text-primary underline hover:opacity-90 cursor-pointer"
            >
              {linkText}
            </button>
          ) : (
            linkText &&
            linkHref && ( // Ensure linkText and linkHref are present for Link rendering
              <Link
                href={linkHref}
                className="text-primary underline hover:opacity-90 cursor-pointer"
              >
                {linkText}
              </Link>
            )
          )}
        </p>
      )}
    </div>
  );
};

export default AuthHeader;
