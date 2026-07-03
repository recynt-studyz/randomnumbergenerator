import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const inter = Inter({ variable: '--font-inter', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Random Number Generator — Free Random Tools',
  description:
    'Free random number generator, coin flip, dice roller, password generator, name picker, random color, spin wheel and more. Instant, private, no signup.',
  keywords: [
    'random number generator',
    'coin flip',
    'dice roller',
    'password generator',
    'random name picker',
    'random color generator',
    'spin wheel',
    'random date generator',
    'random letter',
    'yes or no',
    'team generator',
    'random number',
    'random generator',
  ],
  metadataBase: new URL('https://randomnumbergenerator.app'),
  alternates: { canonical: 'https://randomnumbergenerator.app' },
  openGraph: {
    title: 'Random Number Generator — Free Random Tools',
    description:
      'Free random number generator, coin flip, dice roller, password generator, name picker, random color, spin wheel and more. Instant, private, no signup.',
    url: 'https://randomnumbergenerator.app',
    siteName: 'randomnumbergenerator.app',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Random Number Generator — Free Random Tools',
    description: 'Free random number generator, coin flip, dice roller, password generator and more. No signup.',
  },
  robots: { index: true, follow: true },
  verification: { google: 'PLACEHOLDER_GOOGLE_SITE_VERIFICATION' },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        <meta name="google-adsense-account" content="ca-pub-8792838105001561" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(localStorage.getItem('rng-theme')==='dark'){document.documentElement.classList.add('dark')}}catch(e){}})()`,
          }}
        />
      </head>
      <body
        className="min-h-full flex flex-col bg-white dark:bg-[#0f172a] text-gray-900 dark:text-[#e2e8f0]"
        style={{ fontFamily: 'var(--font-inter), sans-serif' }}
      >
        {children}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8792838105001561"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
