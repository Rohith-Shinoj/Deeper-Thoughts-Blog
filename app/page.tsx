// import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
// import { allBlogs } from 'contentlayer/generated'
// import Main from './Main'

// export default async function Page() {
//   const sortedPosts = sortPosts(allBlogs)
//   const posts = allCoreContent(sortedPosts)
//   return <Main posts={posts} />
// }

import Head from 'next/head'
import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import Main from './Main'

export default async function Page() {
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)

  return (
    <>
      <Head>
        <title>Deeper Thoughts - AI & Deep Learning Blog</title>
        <meta
          name="description"
          content="Exploring AI systems and deep learning architectures — one idea at a time."
        />
        <meta property="og:title" content="Deeper Thoughts | AI & Deep Learning Blog" />
        <meta
          property="og:description"
          content="Exploring AI systems and deep learning architectures — one idea at a time."
        />
        <meta name="twitter:title" content="Deeper Thoughts | AI & Deep Learning Blog" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://deeper-thoughts-blog.rohithshinoj.com" />
        <link rel="icon" href="/favicon.ico" />

        {/* Structured data for WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Deeper Thoughts - Blog',
              alternateName: 'Rohith Shinoj',
              url: 'https://deeper-thoughts-blog.rohithshinoj.com',
            }),
          }}
        />

        {/* Structured data for Organization (optional) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Deeper Thoughts',
              url: 'https://deeper-thoughts-blog.rohithshinoj.com',
              logo: 'https://deeper-thoughts-blog.rohithshinoj.com/logo.png',
            }),
          }}
        />
      </Head>

      <Main posts={posts} />
    </>
  )
}
