'use client';

import {
  BarChart3,
  HelpCircle,
  History,
  LayoutDashboard,
  LogOut,
  Settings,
  Shield,
  TrendingUp,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { useAuth } from '../../src/lib/auth-context';
import { tokens } from '../../src/lib/tokens';
import { useLogoutMutation } from '../../src/shared/logout.schemas';
import { PlaceOrderButton } from './place-order-button';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/dashboard/rates', icon: TrendingUp, label: 'Rates' },
  { href: '/dashboard/history', icon: History, label: 'History' },
  { href: '/dashboard/support', icon: HelpCircle, label: 'Support' },
];

const topNavLinks = [
  { href: '/dashboard', label: 'Market' },
  { href: '/dashboard/rates', label: 'Exchange' },
  { href: '/dashboard/history', label: 'Portfolio' },
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();
  const [logoutMutation] = useLogoutMutation();

  async function handleLogout() {
    try {
      await logoutMutation();
    } catch {
      // best-effort
    }
    tokens.clear();
    router.push('/login');
    toast.success('Signed out');
  }

  const initials = user?.userName
    ? user.userName.slice(0, 2).toUpperCase()
    : '??';

  return (
    <div className="flex h-screen overflow-hidden bg-[#111318] text-[#e2e2e8]">
      {/* ── Sidebar ── */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-white/5 bg-[#191c20] px-4 py-6 md:flex">
        {/* Logo */}
        <div className="mb-10 flex items-center gap-3 px-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#5865f2] shadow-lg">
            <BarChart3 className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg leading-tight font-bold text-white">
              Tamkybidi
            </h1>
            <p className="text-[10px] font-bold tracking-widest text-[#8f8fa0] uppercase">
              Sovereign Tier
            </p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1">
          {navItems.map(({ href, icon: Icon, label }) => {
            const active = pathname === href;
            return (
              <Link
                className={[
                  'flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold tracking-widest uppercase transition-all',
                  active
                    ? 'bg-[#282a2f] text-[#5865f2]'
                    : 'text-[#8f8fa0] hover:bg-[#282a2f] hover:text-white',
                ].join(' ')}
                href={href}
                key={href}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="mt-auto space-y-1 border-t border-white/5 pt-6">
          <PlaceOrderButton className="mb-4 w-full" />

          <Link
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold tracking-widest text-[#8f8fa0] uppercase transition-all hover:bg-[#282a2f] hover:text-white"
            href="/dashboard/security"
          >
            <Shield className="h-5 w-5" />
            Security
          </Link>
          <button
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold tracking-widest text-[#8f8fa0] uppercase transition-all hover:bg-[#282a2f] hover:text-white"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
            Log Out
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-white/5 bg-[#111318] px-8">
          <div className="flex items-center gap-6">
            <BarChart3 className="h-7 w-7 text-[#5865f2]" />
            <span className="text-2xl font-black tracking-tighter text-[#5865f2]">
              Tamkybidi
            </span>
            <nav className="ml-4 hidden items-center gap-6 lg:flex">
              {topNavLinks.map(({ href, label }) => {
                const active = pathname === href;
                return (
                  <Link
                    className={[
                      'text-sm font-medium tracking-tight transition-colors',
                      active
                        ? 'border-b-2 border-[#5865f2] pb-1 font-bold text-[#5865f2]'
                        : 'text-[#8f8fa0] hover:text-white',
                    ].join(' ')}
                    href={href}
                    key={href}
                  >
                    {label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <button className="rounded-lg p-2 text-[#8f8fa0] transition-colors hover:text-white">
              <Settings className="h-5 w-5" />
            </button>
            <PlaceOrderButton />
            {/* Avatar */}
            <div className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#33353a] text-xs font-bold ring-2 ring-[#5865f2]/20">
              {initials}
            </div>
          </div>
        </header>

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto p-8 [scrollbar-color:#5865f2_rgba(255,255,255,0.05)] [scrollbar-width:thin]">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
