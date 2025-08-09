// src/lib/auth/better-auth.ts

// https://www.better-auth.com/docs/installation

// https://www.better-auth.com/docs/concepts/database >> Custom Table Names

import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin, organization } from "better-auth/plugins";

import { db } from "@/lib/db/drizzle";
import env from "@/config/env";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),

  // Authentication Methods >> https://www.better-auth.com/docs/installation
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID as string,
      clientSecret: env.GOOGLE_CLIENT_SECRET as string,
    },
  },

  // https://www.better-auth.com/docs/plugins/admin
  plugins: [admin(), organization()],
});
