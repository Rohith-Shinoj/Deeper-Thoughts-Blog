'use client'

import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import Image from '@/components/Image'
import { useEffect, useRef } from 'react'
import { useState } from 'react'
import SocialIcon from '@/components/social-icons'

const MAX_DISPLAY = 6

interface Post {
  slug: string
  date: string
  title: string
  summary?: string
  authors?: string[]
  tags: string[]
  thumbnail?: string
}

export default function Home({ posts, startIndex = 0 }: { posts: Post[]; startIndex?: number }) {
  const [selectedTag, setSelectedTag] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [showAddArticle, setShowAddArticle] = useState(false)
  const [visibleCount, setVisibleCount] = useState(Math.min(3, posts.length))
  const sentinelRef = useRef<HTMLDivElement | null>(null)
  const [newArticle, setNewArticle] = useState({
    title: '',
    summary: '',
    tags: '',
    date: new Date().toISOString().split('T')[0],
  })

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

  const handleAddArticle = () => {
    console.log('New article:', newArticle)
    setNewArticle({
      title: '',
      summary: '',
      tags: '',
      date: new Date().toISOString().split('T')[0],
    })
    setShowAddArticle(false)
  }

  useEffect(() => {
    if (!sentinelRef.current) return
    const el = sentinelRef.current
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((c) => Math.min(c + 3, Math.min(MAX_DISPLAY, filteredPosts.length)))
        }
      },
      { rootMargin: '200px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [filteredPosts.length])

  const totalPages = Math.ceil(posts.length / MAX_DISPLAY)
  const currentPage = Math.floor(startIndex / MAX_DISPLAY) + 1

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <section className="space-y-2 pt-1 pb-4 md:space-y-5">
          <div className="space-y-4">
            <h1 className="text-lg leading-7 font-bold tracking-tight text-gray-800 sm:text-xl sm:leading-10 md:text-2xl md:leading-14 dark:text-gray-100">
              Welcome to the DeeperThoughts blog!
            </h1>
            <p className="text-gray-1000 text-base dark:text-gray-300">
              I'm Rohith, a Research Scientist at the Centre for Development of Telematics (C-DOT),
              and a deep learning enthusiast with a passion for peeling back the layers of
              multimodal machine learning systems. This blog is intended to make recent advances
              easier to grasp, and is an open invitation to think deeper, explore further, and stay
              curious about the evolving landscapes of AI.
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
            <p> </p>
          </div>
        </section>

        {/* Filter and Search Section */}
        <section className="pt-4 pb-6">
          <div className="space-y-4">
            {/* Filter and Add Article Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowAddArticle(true)}
                  className="bg-primary-500 hover:bg-primary-600 flex items-center gap-2 rounded-lg px-4 py-2 text-white transition-colors"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  <span className="text-sm font-medium">Add Article</span>
                </button>

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

              <div className="flex items-center gap-4">
                <SocialIcon kind="github" href={siteMetadata.github} size={5} />
                <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={5} />
                <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={7} />
                <SocialIcon kind="link" href={'https://www.rohithshinoj.com'} size={8} />
              </div>
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

            {/* Tag Filter Buttons
            {showSearch && (
              <div className="flex flex-wrap gap-2 mb-4">
                <button
                  onClick={() => setSelectedTag('')}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedTag === ''
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  All Topics
                </button>
                {allTags.map((tag: string) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(selectedTag === tag ? '' : tag)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedTag === tag
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )} */}

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
        </section>

        {showAddArticle && (
          <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
            <div className="mx-4 w-full max-w-lg rounded-lg bg-white p-6 dark:bg-gray-800">
              <div className="text-center">
                <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                  Have an idea you'd like to share?
                </h3>
                <div className="mb-6 space-y-3 text-left text-gray-700 dark:text-gray-300">
                  <p>
                    Hey there! If you'd like to contribute an article, here's how to get started:
                  </p>
                  <ol className="ml-4 list-inside list-decimal space-y-2">
                    <li>
                      Head over to the{' '}
                      <a
                        href="https://github.com/Rohith-Shinoj/Deeper-Thoughts-Blog"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-500 hover:text-primary-600 underline"
                      >
                        GitHub repo
                      </a>
                    </li>
                    <li>
                      Add your content into the template at{' '}
                      <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">
                        /data/template.mdx
                      </code>
                    </li>
                    <li>
                      Update the frontmatter at the top with your details:
                      <ul className="mt-1 ml-6 list-inside list-disc space-y-1 text-sm">
                        <li>Your article title, author, date, and summary</li>
                        <li>Add relevant tags</li>
                        <li>Include any cool images you want to use</li>
                      </ul>
                    </li>
                    <li>Write your article in Markdown (feel free to get creative!)</li>
                    <li>
                      Commit and push your work with a pull request at{' '}
                      <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">/data/blog</code>!
                    </li>
                  </ol>
                </div>
                <button
                  onClick={() => setShowAddArticle(false)}
                  className="bg-primary-500 hover:bg-primary-600 rounded-md px-6 py-2 text-white transition-colors"
                >
                  Sounds great! 👍
                </button>
              </div>
            </div>
          </div>
        )}

        <section aria-labelledby="latest-posts-heading">
          <h2 id="latest-posts-heading" className="sr-only">
            Latest Blog Posts
          </h2>

          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {!posts.length && 'No posts found.'}
            {filteredPosts
              .slice(startIndex, startIndex + Math.min(visibleCount, MAX_DISPLAY))
              .map((post) => {
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
          <div ref={sentinelRef} />
        </section>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="text-base leading-6 font-medium">
          <div className="grid grid-cols-3 items-center py-6">
            <div />
            <div className="flex items-center gap-2 justify-self-center">
              {currentPage > 1 && (
                <Link
                  href={currentPage - 1 === 1 ? `/` : `/page/${currentPage - 1}`}
                  className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                  aria-label="Previous page"
                >
                  &larr; Prev
                </Link>
              )}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <Link
                  key={p}
                  href={p === 1 ? `/` : `/page/${p}`}
                  className={`${
                    p === currentPage
                      ? 'font-bold text-gray-900 dark:text-gray-100'
                      : 'text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'
                  } px-2`}
                  aria-label={`Go to page ${p}`}
                >
                  {p}
                </Link>
              ))}
              {currentPage < totalPages && (
                <Link
                  href={`/page/${currentPage + 1}`}
                  className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                  aria-label="Next page"
                >
                  Next &rarr;
                </Link>
              )}
            </div>
            <div className="justify-self-end">
              <Link
                href="/blog"
                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                aria-label="All posts"
              >
                All Posts &rarr;
              </Link>
            </div>
          </div>
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
