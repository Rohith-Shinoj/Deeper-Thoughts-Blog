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
        <title>Deeper Thoughts – AI & Deep Learning Blog</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Exploring AI systems and deep learning architectures — one idea at a time."
        />
        <meta property="og:title" content="Deeper Thoughts – AI & Deep Learning Blog" />
        <meta property="og:site_name" content="Deeper Thoughts" />

        <meta
          property="og:description"
          content="Exploring AI systems and deep learning architectures — one idea at a time."
        />
        <meta property="og:url" content="https://www.deeper-thoughts-blog.rohithshinoj.com" />
        <meta
          property="og:image"
          content="https://www.deeper-thoughts-blog.rohithshinoj.com/social-preview.png"
        />
        <meta name="twitter:title" content="Deeper Thoughts – AI & Deep Learning Blog" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.deeper-thoughts-blog.rohithshinoj.com" />
        <link rel="icon" href="static/favicons/favicon.ico" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'WebSite',
                  name: 'Deeper Thoughts - Blog',
                  alternateName: 'Rohith Shinoj',
                  url: 'https://www.deeper-thoughts-blog.rohithshinoj.com',
                },
                {
                  '@type': 'Organization',
                  name: 'Deeper Thoughts',
                  url: 'https://www.deeper-thoughts-blog.rohithshinoj.com',
                  logo: 'https://www.deeper-thoughts-blog.rohithshinoj.com/logo.png',
                },
                {
                  '@type': 'Blog',
                  name: 'Deeper Thoughts',
                  url: 'https://www.deeper-thoughts-blog.rohithshinoj.com',
                  description:
                    'Exploring AI systems and deep learning architectures — one idea at a time.',
                  publisher: {
                    '@type': 'Organization',
                    name: 'Deeper Thoughts',
                    logo: {
                      '@type': 'ImageObject',
                      url: 'https://www.deeper-thoughts-blog.rohithshinoj.com/logo.png',
                    },
                  },
                },
              ],
            }),
          }}
        />
      </Head>

      <main>
        <h1 className="sr-only">Deeper Thoughts – AI and Deep Learning Blog</h1>
        <Main posts={posts} />
      </main>
    </>
  )
}
