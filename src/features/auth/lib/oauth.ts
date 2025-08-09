// src/features/auth/lib/oauth.ts

export type OAuthProvider = 'google' | 'github' | 'linkedin' | 'facebook';
export const oauthUrl = (provider: OAuthProvider) =>
  `/api/auth/oauth/${provider}`;
