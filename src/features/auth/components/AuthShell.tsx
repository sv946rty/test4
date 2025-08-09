// src/features/auth/components/AuthShell.tsx
import Image from 'next/image';
import { ReactNode } from 'react';

export default function AuthShell({
  left,
  right,
}: {
  left: ReactNode;
  right: ReactNode;
}) {
  return (
    <div className="bg-primary min-h-screen relative flex items-center justify-center">
      {/* Logo */}
      <Image
        src="/logo-dark-mode.png"
        alt="Testimora Logo"
        className="absolute top-8 left-8 h-8 md:h-10 w-auto z-10"
        width={120}
        height={109}
      />

      {/* Outer container */}
      <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-[hsl(var(--gradient-start))] to-[hsl(var(--gradient-end))] px-4 py-6 md:p-12">
        <div className="grid w-full max-w-5xl grid-cols-1 overflow-hidden rounded-lg shadow-lg md:grid-cols-2">
          {/* Left (client form goes here) */}
          <div className="bg-background flex items-center justify-center p-6 md:p-12">
            {left}
          </div>

          {/* Right (illustration/info) */}
          {right}
        </div>
      </div>
    </div>
  );
}
