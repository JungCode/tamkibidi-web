import type { Metadata } from 'next';
import Image from 'next/image';

import { siteConfig } from '../src/common/site-config';

const stats = [
  { label: 'Protected escrow volume', value: '$48.2M' },
  { label: 'Active traders', value: '500k+' },
  { label: 'Average settlement time', value: '< 90 sec' },
] as const;

const featureCards = [
  {
    copy: 'Monitor SKELY, MONEY, and major in-game currencies against live demand so your inventory exits at the right moment.',
    eyebrow: 'Real-time valuation',
    title: 'Live currency rates',
  },
  {
    copy: 'List rare items, bundles, and account-safe inventory from a single exchange layer designed for high-value drops.',
    eyebrow: 'Inventory command',
    title: 'Item inventory',
  },
  {
    copy: 'Smart queue routing prioritizes pricing, security checks, and payout readiness during volatile trading windows.',
    eyebrow: 'Settlement engine',
    title: 'Exchange queue',
  },
] as const;

const marketRows = [
  { asset: 'Legendary Sword', code: '0x4F...E291', price: '$450.00' },
  { asset: '50k SKELY', code: '0xA3...C110', price: '$125.50' },
  { asset: 'Epic Armor Set', code: '0xBC...D884', price: '$89.99' },
] as const;

const partnerStrip = [
  'Marketplace-ready settlement',
  'Rare item liquidation',
  'Sovereign-tier asset custody',
  'Fraud-screened payouts',
  'Cross-game trading rails',
  'Real-world cash-out velocity',
] as const;

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
  description:
    'Trade game currency, rare items, and marketplace inventory through a server-rendered Tamkybidi landing page built for search visibility and high-conviction conversion.',
  keywords: [
    'gaming exchange landing page',
    'trade game assets',
    'game currency exchange',
    'rare item marketplace',
    'Tamkybidi',
  ],
  openGraph: {
    description:
      'Explore Tamkybidi, a premium exchange for real-world trading of game assets, currencies, and inventory.',
    images: [
      {
        alt: 'Tamkybidi gaming asset exchange landing page preview',
        url: siteConfig.ogImage,
      },
    ],
    title: 'Tamkybidi Gaming Exchange Landing Page',
    url: '/',
  },
  title: 'Gaming Asset Exchange Landing Page',
  twitter: {
    card: 'summary_large_image',
    description:
      'Tamkybidi turns digital victories into market-ready value with live pricing, secure settlement, and inventory control.',
    images: [siteConfig.ogImage],
    title: 'Tamkybidi Gaming Exchange Landing Page',
  },
};

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    description: siteConfig.description,
    image: `${siteConfig.siteUrl}${siteConfig.ogImage}`,
    name: siteConfig.name,
    potentialAction: {
      '@type': 'SearchAction',
      query: 'game assets',
      target: `${siteConfig.siteUrl}/?q={search_term_string}`,
    },
    url: siteConfig.siteUrl,
  };

  return (
    <main className="landing-grid flex-1 overflow-x-hidden bg-[#0b0e14] text-[#eef1fb]">
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />

      <header className="sticky top-0 z-50 border-b border-white/8 bg-[#0b0e14]/85 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <a className="flex items-center gap-3" href="#top">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#6f79ff] text-sm font-black text-[#050816] shadow-[0_0_32px_rgba(111,121,255,0.35)]">
              T
            </span>
            <span className="text-lg font-black tracking-[0.18em] uppercase">
              Tamkybidi
            </span>
          </a>

          <nav className="hidden items-center gap-8 text-sm text-[#a4acc3] md:flex">
            <a className="transition hover:text-white" href="#marketplace">
              Marketplace
            </a>
            <a className="transition hover:text-white" href="#insights">
              Insights
            </a>
            <a className="transition hover:text-white" href="#security">
              Security
            </a>
          </nav>

          <a
            className="rounded-full bg-[#6f79ff] px-5 py-2.5 text-sm font-semibold text-[#050816] transition hover:bg-[#9097ff]"
            href="/register"
          >
            Get started
          </a>
        </div>
      </header>

      <section className="relative" id="top">
        <div className="landing-glow absolute top-0 left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(111,121,255,0.34)_0%,_rgba(111,121,255,0.06)_45%,_rgba(11,14,20,0)_72%)] blur-3xl" />
        <div className="mx-auto grid w-full max-w-7xl gap-16 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:px-10 lg:py-28">
          <div className="relative z-10 flex flex-col gap-8">
            <div className="inline-flex w-fit items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium tracking-[0.18em] text-[#cbd2e8] uppercase">
              Sovereign-tier security
              <span className="h-2 w-2 rounded-full bg-[#6f79ff] shadow-[0_0_16px_rgba(111,121,255,0.8)]" />
            </div>

            <div className="space-y-6">
              <h1 className="max-w-3xl text-5xl leading-none font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
                The ultimate bridge between game assets and reality.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-[#a4acc3] sm:text-xl">
                Buy, sell, and exchange in-game currency, rare drops, and
                premium marketplace inventory with institutional-grade
                settlement controls.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                className="inline-flex items-center justify-center rounded-2xl bg-[#6f79ff] px-7 py-4 text-base font-bold text-[#050816] shadow-[0_24px_60px_rgba(111,121,255,0.28)] transition hover:-translate-y-0.5 hover:bg-[#9097ff]"
                href="/register"
              >
                Start trading items
              </a>
              <a
                className="inline-flex items-center justify-center rounded-2xl border border-white/12 bg-white/5 px-7 py-4 text-base font-semibold text-white transition hover:border-white/20 hover:bg-white/8"
                href="/login"
              >
                Enter marketplace
              </a>
            </div>

            <dl className="grid gap-4 pt-4 sm:grid-cols-3">
              {stats.map((stat) => (
                <div
                  className="rounded-3xl border border-white/8 bg-white/4 p-5 backdrop-blur-sm"
                  key={stat.label}
                >
                  <dt className="text-xs tracking-[0.18em] text-[#8f98b3] uppercase">
                    {stat.label}
                  </dt>
                  <dd className="mt-3 text-2xl font-bold text-white">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="landing-float relative z-10">
            <div className="absolute inset-0 rounded-[2rem] bg-[linear-gradient(140deg,rgba(111,121,255,0.22),rgba(255,183,134,0.12),rgba(17,22,31,0.05))] blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#11161f] p-3 shadow-[0_32px_90px_rgba(0,0,0,0.45)]">
              <Image
                alt="Tamkybidi exchange dashboard preview"
                className="rounded-[1.4rem] border border-white/6"
                height={7450}
                priority
                sizes="(max-width: 1024px) 100vw, 44vw"
                src="/stitch/tamkybidi-landing.png"
                width={2560}
              />
              <div className="pointer-events-none absolute inset-x-6 bottom-6 flex flex-wrap gap-3">
                <div className="rounded-full border border-white/10 bg-[#0b0e14]/88 px-4 py-2 text-xs font-medium tracking-[0.14em] text-[#cbd2e8] uppercase backdrop-blur">
                  Real-time settlement
                </div>
                <div className="rounded-full border border-[#6f79ff]/30 bg-[#6f79ff]/16 px-4 py-2 text-xs font-medium tracking-[0.14em] text-[#dbe0ff] uppercase backdrop-blur">
                  Curated item liquidity
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-hidden border-y border-white/8 bg-white/[0.03] py-4">
        <div className="landing-marquee flex min-w-max gap-4 whitespace-nowrap">
          {[...partnerStrip, ...partnerStrip].map((item, index) => (
            <span
              className="rounded-full border border-white/8 bg-white/4 px-4 py-2 text-xs font-medium tracking-[0.2em] text-[#c2cae0] uppercase"
              key={`${item}-${index}`}
            >
              {item}
            </span>
          ))}
        </div>
      </section>

      <section
        className="mx-auto w-full max-w-7xl px-6 py-24 lg:px-10"
        id="insights"
      >
        <div className="mb-14 max-w-2xl space-y-4">
          <p className="text-sm font-bold tracking-[0.22em] text-[#9097ff] uppercase">
            Gaming economy insights
          </p>
          <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
            A premium control room for digital asset trading.
          </h2>
          <p className="text-lg leading-8 text-[#a4acc3]">
            Tamkybidi translates the Stitch concept into a high-clarity landing
            page focused on value discovery, inventory control, and trust.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-12">
          <article className="rounded-[2rem] border border-white/8 bg-[#11161f] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.25)] md:col-span-8 lg:p-10">
            <div className="flex h-full flex-col justify-between gap-10">
              <div className="space-y-4">
                <p className="text-sm font-semibold tracking-[0.2em] text-[#9097ff] uppercase">
                  {featureCards[0].eyebrow}
                </p>
                <h3 className="text-3xl font-bold text-white">
                  {featureCards[0].title}
                </h3>
                <p className="max-w-2xl text-lg leading-8 text-[#a4acc3]">
                  {featureCards[0].copy}
                </p>
              </div>

              <div className="grid h-36 grid-cols-5 items-end gap-3 rounded-[1.5rem] border border-white/6 bg-[#0b0e14]/70 px-5 py-5">
                <div className="landing-bar h-[38%] rounded-t-2xl bg-[#5660f1]" />
                <div className="landing-bar landing-bar-delay-1 h-[62%] rounded-t-2xl bg-[#6f79ff]" />
                <div className="landing-bar landing-bar-delay-2 h-[48%] rounded-t-2xl bg-[#4a52bf]" />
                <div className="landing-bar landing-bar-delay-3 h-[78%] rounded-t-2xl bg-[#9097ff]" />
                <div className="landing-bar landing-bar-delay-4 h-[56%] rounded-t-2xl bg-[#6f79ff]" />
              </div>
            </div>
          </article>

          <article className="rounded-[2rem] border border-white/8 bg-[#161c28] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.25)] md:col-span-4">
            <div className="flex h-full flex-col gap-6">
              <div className="space-y-4">
                <p className="text-sm font-semibold tracking-[0.2em] text-[#ffb786] uppercase">
                  {featureCards[1].eyebrow}
                </p>
                <h3 className="text-2xl font-bold text-white">
                  {featureCards[1].title}
                </h3>
                <p className="text-base leading-7 text-[#a4acc3]">
                  {featureCards[1].copy}
                </p>
              </div>

              <div className="mt-auto grid grid-cols-2 gap-3">
                {['Shielded', 'Hot items', 'Rare loot', 'Optimized'].map(
                  (tile, index) => (
                    <div
                      className={`flex aspect-square items-end rounded-[1.4rem] border p-4 text-sm font-semibold ${
                        index === 1
                          ? 'border-[#6f79ff]/35 bg-[#6f79ff]/16 text-white'
                          : 'border-white/6 bg-[#11161f] text-[#c8d0e5]'
                      }`}
                      key={tile}
                    >
                      {tile}
                    </div>
                  ),
                )}
              </div>
            </div>
          </article>

          <article className="rounded-[2rem] border border-white/8 bg-[#11161f] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.25)] md:col-span-12 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div className="space-y-4">
                <p className="text-sm font-semibold tracking-[0.2em] text-[#c9d0ff] uppercase">
                  {featureCards[2].eyebrow}
                </p>
                <h3 className="text-3xl font-bold text-white">
                  {featureCards[2].title}
                </h3>
                <p className="text-lg leading-8 text-[#a4acc3]">
                  {featureCards[2].copy}
                </p>
              </div>

              <div className="space-y-3" id="marketplace">
                {marketRows.map((row, index) => (
                  <div
                    className={`flex flex-col gap-2 rounded-[1.3rem] border border-white/6 bg-[#0b0e14]/88 px-5 py-4 text-sm text-[#cad2e8] sm:flex-row sm:items-center sm:justify-between ${
                      index === 1
                        ? 'shadow-[0_0_0_1px_rgba(111,121,255,0.18)]'
                        : ''
                    }`}
                    key={row.code}
                  >
                    <div>
                      <p className="font-mono text-xs tracking-[0.18em] text-[#8f98b3] uppercase">
                        {row.code}
                      </p>
                      <p className="mt-1 text-base font-semibold text-white">
                        {row.asset}
                      </p>
                    </div>
                    <p className="text-base font-bold text-[#9097ff]">
                      {row.price}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="border-y border-white/8 bg-[#0f131b]" id="security">
        <div className="mx-auto grid w-full max-w-7xl gap-14 px-6 py-24 lg:grid-cols-[0.85fr_1.15fr] lg:px-10">
          <div className="space-y-5">
            <p className="text-sm font-bold tracking-[0.22em] text-[#9097ff] uppercase">
              About Tamkybidi
            </p>
            <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
              Powering the gamer economy with trust-first infrastructure.
            </h2>
          </div>

          <div className="space-y-6 text-lg leading-8 text-[#a4acc3]">
            <p>
              Tamkybidi is designed for players and traders who need a credible
              path from digital inventory to real-world value. The interface
              borrows the Stitch screen’s editorial dark aesthetic while keeping
              the implementation fully server-rendered and search-friendly.
            </p>
            <p>
              Sovereign-tier controls, real-time price awareness, and fast
              settlement messaging position the product as a premium exchange
              rather than a generic marketplace.
            </p>
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-[#d7def4]">
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#6f79ff] shadow-[0_0_18px_rgba(111,121,255,0.85)]" />
              Trusted by 500k+ active traders
            </div>
          </div>
        </div>
      </section>

      <section
        className="mx-auto w-full max-w-7xl px-6 py-24 lg:px-10"
        id="cta"
      >
        <div className="relative overflow-hidden rounded-[2.4rem] border border-[#8f98ff]/30 bg-[linear-gradient(135deg,#5b66f3_0%,#7280ff_58%,#8c93ff_100%)] px-8 py-16 shadow-[0_30px_90px_rgba(77,88,255,0.35)] md:px-14 md:py-20">
          <div className="landing-glow absolute top-1/2 -left-24 h-64 w-64 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.34)_0%,_rgba(255,255,255,0)_70%)] blur-3xl" />
          <div className="landing-glow absolute -top-10 -right-16 h-64 w-64 rounded-full bg-[radial-gradient(circle,_rgba(255,183,134,0.35)_0%,_rgba(255,183,134,0)_70%)] blur-3xl" />
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold tracking-[0.24em] text-[#eef1fb]/80 uppercase">
              Join the economy
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-[#050816] sm:text-5xl">
              Join the Tamkybidi gamer economy today.
            </h2>
            <p className="mt-6 text-lg leading-8 text-[#11161f]/78 sm:text-xl">
              Secure your place in a high-trust asset exchange where game loot,
              currency, and premium inventory move with clarity and speed.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                className="inline-flex items-center justify-center rounded-2xl bg-[#050816] px-7 py-4 text-base font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#11161f]"
                href="/register"
              >
                Start trading now
              </a>
              <a
                className="inline-flex items-center justify-center rounded-2xl border border-[#050816]/12 bg-white/14 px-7 py-4 text-base font-semibold text-[#050816] transition hover:bg-white/22"
                href="#top"
              >
                Back to top
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/8 bg-[#090c11]">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-10 text-sm text-[#98a1bc] md:flex-row md:items-center md:justify-between lg:px-10">
          <div>
            <p className="font-black tracking-[0.18em] text-white uppercase">
              Tamkybidi
            </p>
            <p className="mt-2 max-w-lg leading-7">
              A premium exchange interface for in-game currency, rare items, and
              real-world settlement flows.
            </p>
          </div>

          <div className="flex flex-wrap gap-5">
            <a className="transition hover:text-white" href="#marketplace">
              Marketplace
            </a>
            <a className="transition hover:text-white" href="#security">
              Security
            </a>
            <a
              className="transition hover:text-white"
              href="mailto:trade@tamkybidi.com"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
