'use client'

import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import Image from '@/components/Image'
import { useState } from 'react'

const MAX_DISPLAY = 10

interface Post {
  slug: string
  date: string
  title: string
  summary?: string
  tags: string[]
  thumbnail?: string
}

export default function Home({ posts }: { posts: Post[] }) {
  const [selectedTag, setSelectedTag] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearch, setShowSearch] = useState(false)

  const allTags = [...new Set(posts.flatMap((post) => post.tags || []))] as string[]

  const filteredPosts = posts.filter((post) => {
    const matchesTag = !selectedTag || (post.tags && post.tags.includes(selectedTag))
    const matchesSearch =
      !searchQuery ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.tags && post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())))

    return matchesTag && matchesSearch
  })

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <section className="space-y-2 pt-1 pb-4 md:space-y-5">
          <div className="space-y-4">
            <h1 className="text-lg leading-7 font-bold tracking-tight text-gray-800 sm:text-xl sm:leading-10 md:text-2xl md:leading-14 dark:text-gray-100">
              Welcome to DeeperThoughts – A blog that bridges the gap between code and cognition.
            </h1>
            <p className="text-gray-1000 text-base dark:text-gray-300">
              I'm Rohith Shinoj Kumar, a Research Engineer at the Centre for Development of
              Telematics (C-DOT), and a deep learning enthusiast with a passion for peeling back the
              layers of multimodal machine learning systems. This blog is intended to make recent
              advances easier to grasp, and is an open invitation to think deeper, explore further,
              and stay curious about the evolving landscapes of AI.
            </p>
            <p className="text-gray-1000 text-base dark:text-gray-300">
              Enjoyed what you read? I'd love to hear your thoughts—feel free drop a comment on any
              article. For updates on new posts,{' '}
              <a
                href="#newsletter"
                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 underline"
              >
                Subscribe
              </a>{' '}
              to the newsletter and get the latest straight to your inbox 📬.
            </p>
            <p></p>
          </div>
        </section>

        <section aria-labelledby="latest-posts-heading">
          <div className="pt-6 pb-4">
            <div className="space-y-4">
              {/* Filter Icon Button */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowSearch(!showSearch)}
                  className="hover:text-primary-600 dark:hover:text-primary-400 flex items-center gap-2 px-3 py-2 text-gray-700 transition-colors dark:text-gray-300"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                    />
                  </svg>
                  <span className="text-sm font-medium">Filter</span>
                </button>

                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Showing {filteredPosts.length} of {posts.length} posts
                </p>
              </div>

              {/* Search Input - Only shown when filter is clicked */}
              {showSearch && (
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Search posts by title, content, or tags..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="focus:ring-primary-500 w-full max-w-md rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
                  />
                </div>
              )}

              {/* Active Filters Display */}
              {(selectedTag || searchQuery) && (
                <div className="mb-4 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <span>Active filters:</span>
                  {selectedTag && (
                    <span className="bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 rounded-full px-2 py-1">
                      Topic: {selectedTag}
                    </span>
                  )}
                  {searchQuery && (
                    <span className="rounded-full bg-blue-100 px-2 py-1 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      Search: "{searchQuery}"
                    </span>
                  )}
                  <button
                    onClick={() => {
                      setSelectedTag('')
                      setSearchQuery('')
                    }}
                    className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 underline"
                  >
                    Clear all
                  </button>
                </div>
              )}
            </div>
          </div>

          <h2 id="latest-posts-heading" className="sr-only">
            Latest Blog Posts
          </h2>

          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {!posts.length && 'No posts found.'}
            {filteredPosts.slice(0, MAX_DISPLAY).map((post) => {
              const { slug, date, title, summary, tags, thumbnail } = post
              return (
                <li key={slug} className="py-12">
                  <article>
                    <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                      <dl>
                        <dt className="sr-only">Published on</dt>
                        <dd className="text-base leading-6 font-medium text-gray-700 dark:text-gray-400">
                          <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                        </dd>
                        {/* Thumbnail image under the date, from frontmatter */}
                        {thumbnail && (
                          <div className="mt-4 mb-2">
                            <Image
                              src={thumbnail}
                              alt={title}
                              width={320}
                              height={180}
                              className="h-50 w-50 rounded-lg border border-gray-700 object-cover"
                              priority={false}
                            />
                          </div>
                        )}
                      </dl>
                      <div className="space-y-5 xl:col-span-3">
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-2xl leading-8 font-bold tracking-tight">
                              <Link
                                href={`/blog/${slug}`}
                                className="text-gray-800 dark:text-gray-100"
                              >
                                {title}
                              </Link>
                            </h3>
                            <div className="flex flex-wrap">
                              {tags.map((tag) => (
                                <Tag key={tag} text={tag} />
                              ))}
                            </div>
                          </div>
                          <div className="prose max-w-none text-gray-900 dark:text-gray-400">
                            {summary}
                          </div>
                        </div>
                        <div className="text-base leading-6 font-medium">
                          <Link
                            href={`/blog/${slug}`}
                            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                            aria-label={`Read more: "${title}"`}
                          >
                            Read more &rarr;
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                </li>
              )
            })}
          </ul>
        </section>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base leading-6 font-medium">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="All posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
      {siteMetadata.newsletter?.provider && (
        <section aria-labelledby="newsletter">
          <h2 id="newsletter" className="sr-only">
            Newsletter Subscription
          </h2>
          <div className="flex items-center justify-center pt-4">
            <NewsletterForm />
          </div>
        </section>
      )}
    </>
  )
}
