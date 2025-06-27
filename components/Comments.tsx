'use client'

import { Comments as CommentsComponent } from 'pliny/comments'
import siteMetadata from '@/data/siteMetadata'
import { useTheme } from 'next-themes'

export default function Comments({ slug }: { slug: string }) {
  const { resolvedTheme } = useTheme()

  if (!siteMetadata.comments?.provider) {
    return null
  }

  let commentsConfig = siteMetadata.comments

  // Only override theme if provider is giscus
  if (siteMetadata.comments.provider === 'giscus') {
    let giscusTheme = 'light'
    if (resolvedTheme === 'dark') {
      giscusTheme = 'transparent_dark'
    }
    commentsConfig = {
      ...siteMetadata.comments,
      giscusConfig: {
        ...siteMetadata.comments.giscusConfig,
        theme: giscusTheme,
      },
    }
  }

  return <CommentsComponent commentsConfig={commentsConfig} slug={slug} />
}
