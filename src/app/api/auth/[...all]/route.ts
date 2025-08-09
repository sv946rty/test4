// src/app/api/auth/[...all]/route.ts

/*
Better Auth Setup – Mount Handler
Docs: https://www.better-auth.com/docs/installation

Step 7: Mount the API handler

- Create a catch-all route for `/api/auth/*` (or your custom base path).  
- This single route will handle all auth-related requests (e.g., `signin`, `signout`, `callback/*`).  

✅ TL;DR:
`[...all]` or `[...betterauth]` or `[...xyz]` = Catch-all dynamic route segment  
→ Lets one `route.ts` handle every sub-path under `/api/auth/*`  
→ Avoids creating multiple files for each endpoint.
*/

import { auth } from "@/lib/auth/better-auth";
import { toNextJsHandler } from "better-auth/next-js";

export const { POST, GET } = toNextJsHandler(auth);
