import Link from 'next/link';

import { AuthTabSwitch } from './auth-tab-switch';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-[#0b0e14] text-[#eef1fb]">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        <Link className="flex items-center gap-3" href="/">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#6f79ff] text-sm font-black text-[#050816] shadow-[0_0_32px_rgba(111,121,255,0.35)]">
            T
          </span>
          <span className="text-lg font-black tracking-[0.18em] uppercase">
            Tamkybidi
          </span>
        </Link>
      </nav>

      <div className="relative flex flex-1 flex-col items-center justify-center px-4 py-12">
        <div className="pointer-events-none absolute top-0 left-1/2 h-112 w-md -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(111,121,255,0.2)_0%,rgba(111,121,255,0.04)_50%,rgba(11,14,20,0)_75%)] blur-3xl" />
        <AuthTabSwitch />
        {children}
      </div>
    </div>
  );
}
