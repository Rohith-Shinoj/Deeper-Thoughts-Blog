import 'css/tailwind.css'
import 'pliny/search/algolia.css'
import 'remark-github-blockquote-alert/alert.css'

import { Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { SearchProvider, SearchConfig } from 'pliny/search'
import Header from '@/components/Header'
import SectionContainer from '@/components/SectionContainer'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import ScrollToTop from '@/components/ScrollToTop'
import Footer from '@/components/Footer'
import siteMetadata from '@/data/siteMetadata'
import { ThemeProviders } from './theme-providers'
import { Metadata } from 'next'
import Script from 'next/script'

const space_grotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: `${siteMetadata.title} – ${siteMetadata.description}`,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    types: {
      'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: siteMetadata.title,
    card: 'summary_large_image',
    images: [siteMetadata.socialBanner],
  },
  manifest: '/site.webmanifest',
  applicationName: siteMetadata.title,
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: siteMetadata.title,
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/static/favicons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/static/favicons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/static/favicons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    other: [
      { url: '/static/favicons/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/static/favicons/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const basePath = process.env.BASE_PATH || ''
  const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID

  return (
    <html
      lang={siteMetadata.language}
      className={`${space_grotesk.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        {/* <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${basePath}/static/favicons/apple-touch-icon.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${basePath}/static/favicons/favicon-32x32.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${basePath}/static/favicons/favicon-16x16.png`}
        />
        <link rel="manifest" href="/site.webmanifest" /> */}

        <link
          rel="icon"
          type="image/png"
          href={`${basePath}/static/favicons/favicon-96x96.png`}
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href={`${basePath}/static/favicons/favicon.svg`} />
        <link rel="shortcut icon" href={`${basePath}/static/favicons/favicon.ico`} />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${basePath}/static/favicons/apple-touch-icon.png`}
        />
        <meta name="apple-mobile-web-app-title" content="Deeper Thoughts" />
        <link rel="manifest" href="/site.webmanifest" />

        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        {/* <meta name="apple-mobile-web-app-title" content={siteMetadata.title} /> */}
        {/* <meta name="mobile-web-app-capable" content="yes" /> */}
        <meta
          name="google-site-verification"
          content="Y30rOgmn0prJFAn0sMmt0yNVLdipiySeM0B3Uwk71bo"
        />
        <link rel="alternate" type="application/rss+xml" href={`${basePath}/feed.xml`} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}
      </head>

      <body className="bg-white pl-[calc(100vw-100%)] text-black antialiased dark:bg-gray-950 dark:text-white">
        <div className="relative">
          <ThemeProviders>
            <Analytics />
            <SpeedInsights />

            <SectionContainer>
              <SearchProvider searchConfig={siteMetadata.search as SearchConfig}>
                <ScrollToTop />
                {/* Semantic header and H1 for SEO */}
                <header>
                  <Header />
                  <h1 className="sr-only">
                    {siteMetadata.title} – {siteMetadata.description}
                  </h1>
                </header>

                <main className="mb-auto" role="main">
                  {children}
                </main>

                <ScrollTopAndComment />
              </SearchProvider>
              <Footer />
            </SectionContainer>
          </ThemeProviders>
        </div>
      </body>
    </html>
  )
}
