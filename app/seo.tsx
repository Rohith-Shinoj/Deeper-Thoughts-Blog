import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'

interface PageSEOProps {
  title: string
  description?: string
  image?: string
  keywords?: string[]
  pathname?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export function genPageMetadata({
  title,
  description,
  image,
  keywords,
  pathname = '',
  ...rest
}: PageSEOProps): Metadata {
  const pageTitle = title === 'Home' ? siteMetadata.title : `${title} | ${siteMetadata.title}`
  const pageDescription = description || siteMetadata.description
  const pageKeywords = keywords || [
    'AI',
    'deep learning',
    'machine learning',
    'neural networks',
    'transformers',
    'attention mechanisms',
    'NLP',
    'computer vision',
    'research',
    'tutorial',
    'blog',
  ]
  // Ensure canonical is always absolute
  const canonicalUrl =
    `${siteMetadata.siteUrl}${pathname.startsWith('/') ? pathname : '/' + pathname}`.replace(
      /\/+$|\/+(?=\?)/g,
      ''
    )

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: pageKeywords.join(', '),
    authors: [{ name: siteMetadata.author }],
    creator: siteMetadata.author,
    publisher: siteMetadata.title,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: canonicalUrl,
      siteName: siteMetadata.title,
      images: image ? [image] : [siteMetadata.socialBanner],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      title: pageTitle,
      card: 'summary_large_image',
      images: image ? [image] : [siteMetadata.socialBanner],
      creator: '@rohithshinoj',
    },
    alternates: {
      canonical: canonicalUrl,
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
    ...rest,
  }
}
