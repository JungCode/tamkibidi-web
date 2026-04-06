'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function AuthTabSwitch() {
  const pathname = usePathname();
  const isLogin = pathname === '/login';

  return (
    <div className="mb-6 flex w-full max-w-md">
      <div className="flex w-full rounded-2xl border border-white/10 bg-[#11161f] p-1">
        <Link
          className={`flex-1 rounded-xl py-2.5 text-center text-sm font-semibold transition-all duration-200 ${
            isLogin
              ? 'bg-[#6f79ff] text-[#050816] shadow-[0_4px_20px_rgba(111,121,255,0.35)]'
              : 'text-[#a4acc3] hover:text-white'
          }`}
          href="/login"
        >
          Sign in
        </Link>
        <Link
          className={`flex-1 rounded-xl py-2.5 text-center text-sm font-semibold transition-all duration-200 ${
            !isLogin
              ? 'bg-[#6f79ff] text-[#050816] shadow-[0_4px_20px_rgba(111,121,255,0.35)]'
              : 'text-[#a4acc3] hover:text-white'
          }`}
          href="/register"
        >
          Create account
        </Link>
      </div>
    </div>
  );
}
