// src/features/auth/types/oauth.ts

export type OAuthProvider = 'google' | 'github' | 'linkedin' | 'facebook';
export const oauthUrl = (provider: OAuthProvider) =>
  `/api/auth/oauth/${provider}`;
