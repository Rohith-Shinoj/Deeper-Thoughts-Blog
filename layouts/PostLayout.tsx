import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import Comments from '@/components/Comments'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import Image from '@/components/Image'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import Breadcrumbs from '@/components/Breadcrumbs'

const editUrl = (path) => `${siteMetadata.siteRepo}/blob/main/data/${path}`
const discussUrl = (path) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(`${siteMetadata.siteUrl}/${path}`)}`

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

interface LayoutProps {
  content: CoreContent<Blog>
  authorDetails: CoreContent<Authors>[]
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  children: ReactNode
}

export default function PostLayout({ content, authorDetails, next, prev, children }: LayoutProps) {
  const { filePath, path, slug, date, title, tags } = content
  const hasCustomAuthor =
    Array.isArray((content as unknown as { authors?: string[] }).authors) &&
    (content as unknown as { authors?: string[] }).authors!.filter(Boolean).length > 0 &&
    (content as unknown as { authors?: string[] }).authors![0] !== 'default'
  const customAuthorName = hasCustomAuthor
    ? (content as unknown as { authors?: string[] }).authors![0]
    : undefined
  const basePath = path.split('/')[0]

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog' },
    { name: title },
  ]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteMetadata.siteUrl}/${path}`,
    },
    headline: title,
    datePublished: date,
    dateModified: date,
    author: [
      {
        '@type': 'Person',
        name: siteMetadata.author,
        url: siteMetadata.twitter,
        sameAs: [siteMetadata.github, siteMetadata.linkedin, 'https://www.rohithshinoj.com'],
      },
    ],
    publisher: {
      '@type': 'Organization',
      name: siteMetadata.title,
      logo: {
        '@type': 'ImageObject',
        url: `${siteMetadata.siteUrl}${siteMetadata.siteLogo}`,
      },
    },
    description: content.summary,
    image: `${siteMetadata.siteUrl}${siteMetadata.socialBanner}`,
  }

  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article>
        <Breadcrumbs items={breadcrumbs} />
        <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
          <header className="pt-6 xl:pb-6">
            <div className="space-y-1 text-center">
              <dl className="space-y-10">
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base leading-6 font-medium text-gray-600 dark:text-gray-400">
                    <time dateTime={date}>
                      {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                    </time>
                  </dd>
                </div>
              </dl>
              <div>
                <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-800 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 dark:text-gray-100">
                  {title}
                </h1>
              </div>
            </div>
          </header>
          <div className="grid-rows-[auto_1fr] divide-y divide-gray-200 pb-8 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0 dark:divide-gray-700">
            <aside className="pt-6 pb-10 xl:border-b xl:border-gray-200 xl:pt-11 xl:dark:border-gray-700">
              <dl>
                <dt className="sr-only">Authors</dt>
                <dd>
                  <ul className="flex flex-wrap justify-center gap-4 sm:space-x-12 xl:block xl:space-y-8 xl:space-x-0">
                    {hasCustomAuthor ? (
                      <li className="flex items-center space-x-2" key={customAuthorName}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="h-10 w-10 rounded-full text-gray-400"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-3.866 0-7 3.134-7 7h2a5 5 0 0 1 10 0h2c0-3.866-3.134-7-7-7z" />
                        </svg>
                        <dl className="text-sm leading-5 font-medium whitespace-nowrap">
                          <dt className="sr-only">Name</dt>
                          <dd className="text-gray-800 dark:text-gray-100">{customAuthorName}</dd>
                        </dl>
                      </li>
                    ) : (
                      authorDetails.map((author) => (
                        <li className="flex items-center space-x-2" key={author.name}>
                          {author.avatar && (
                            <Image
                              src={author.avatar}
                              width={38}
                              height={38}
                              alt="avatar"
                              className="h-10 w-10 rounded-full"
                            />
                          )}
                          <dl className="text-sm leading-5 font-medium whitespace-nowrap">
                            <dt className="sr-only">Name</dt>
                            <dd className="text-gray-800 dark:text-gray-100">{author.name}</dd>
                            <dt className="sr-only">Twitter</dt>
                            <dd>
                              {author.twitter && (
                                <Link
                                  href={author.twitter}
                                  className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                                >
                                  {author.twitter
                                    .replace('https://twitter.com/', '@')
                                    .replace('https://x.com/', '@')}
                                </Link>
                              )}
                            </dd>
                          </dl>
                        </li>
                      ))
                    )}
                  </ul>
                </dd>
              </dl>
            </aside>
            <main className="divide-y divide-gray-200 xl:col-span-3 xl:row-span-2 xl:pb-0 dark:divide-gray-700">
              <section
                className="prose dark:prose-invert max-w-none pt-10 pb-8"
                aria-labelledby="article-content"
              >
                {/* <h2 id="article-content" className="mb-4 text-2xl font-semibold"></h2> */}
                {children}
              </section>
              {/* <div className="pt-6 pb-6 text-sm text-gray-700 dark:text-gray-300">
                <Link href={discussUrl(path)} rel="nofollow">
                  Discuss on Twitter
                </Link>
                {` • `}
                <Link href={editUrl(filePath)}>View on GitHub</Link>
              </div> */}
              {siteMetadata.comments && (
                <section
                  className="pt-6 pb-6 text-center text-gray-700 dark:text-gray-300"
                  id="comment"
                  aria-labelledby="comments-heading"
                >
                  <h2 id="comments-heading" className="mb-4 text-2xl font-semibold">
                    Comments
                  </h2>
                  <Comments slug={slug} />
                </section>
              )}
            </main>
            <footer>
              <div className="divide-gray-200 text-sm leading-5 font-medium xl:col-start-1 xl:row-start-2 xl:divide-y dark:divide-gray-700">
                {tags && (
                  <section className="py-4 xl:py-8" aria-labelledby="tags-heading">
                    <h2 id="tags-heading" className="mb-4 text-2xl font-semibold">
                      Tags
                    </h2>
                    <div className="flex flex-wrap">
                      {tags.map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                    </div>
                  </section>
                )}
                {(next || prev) && (
                  <nav
                    className="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8"
                    aria-label="Article navigation"
                  >
                    {prev && prev.path && (
                      <div>
                        <h3 className="text-sm tracking-wide text-gray-600 uppercase dark:text-gray-400">
                          Previous Article
                        </h3>
                        <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <Link href={`/${prev.path}`}>{prev.title}</Link>
                        </div>
                      </div>
                    )}
                    {next && next.path && (
                      <div>
                        <h3 className="text-sm tracking-wide text-gray-600 uppercase dark:text-gray-400">
                          Next Article
                        </h3>
                        <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <Link href={`/${next.path}`}>{next.title}</Link>
                        </div>
                      </div>
                    )}
                  </nav>
                )}
              </div>
              <div className="pt-4 xl:pt-8">
                <Link
                  href={`/${basePath}`}
                  className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                  aria-label="Back to the blog"
                >
                  &larr; Back to the blog
                </Link>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}
