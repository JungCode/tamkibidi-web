import './globals.css';

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import { siteConfig } from '../src/common/site-config';
import { Providers } from '../src/shared/components/providers/providers';

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
});

export const metadata: Metadata = {
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  description: siteConfig.description,
  generator: 'Next.js',
  keywords: [
    'gaming asset exchange',
    'game currency marketplace',
    'digital item trading',
    'SKELY exchange',
    'in-game asset marketplace',
  ],
  metadataBase: new URL(siteConfig.siteUrl),
  openGraph: {
    description: siteConfig.description,
    images: [
      {
        alt: 'Tamkybidi gaming asset exchange interface preview',
        url: siteConfig.ogImage,
      },
    ],
    locale: 'en_US',
    siteName: siteConfig.name,
    title: siteConfig.title,
    type: 'website',
    url: siteConfig.siteUrl,
  },
  robots: {
    follow: true,
    googleBot: {
      follow: true,
      index: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
    index: true,
  },
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  twitter: {
    card: 'summary_large_image',
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    title: siteConfig.title,
  },
  verification: {
    google: 'xV6ib9uCh0tpi3DctM5PXQH97r4kN0uhA99R3z7q67w',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
      lang="en"
    >
      <body className="flex min-h-full flex-col bg-[#0b0e14] text-[#eef1fb]">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
