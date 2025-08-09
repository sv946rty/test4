// src/features/auth/constants/index.ts

export const PASSWORD_REQUIREMENTS = [
  { text: "At least 8 characters", regex: /.{8,}/ },
  { text: "At least 1 uppercase letter", regex: /[A-Z]/ },
  { text: "At least 1 lowercase letter", regex: /[a-z]/ },
  { text: "At least 1 number", regex: /[0-9]/ },
];

// Add other auth-related constants here if needed
