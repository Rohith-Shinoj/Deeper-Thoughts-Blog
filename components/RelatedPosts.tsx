import Link from '@/components/Link'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'

interface RelatedPostsProps {
  currentPost: CoreContent<Blog>
  allPosts: CoreContent<Blog>[]
  maxPosts?: number
}

export default function RelatedPosts({ currentPost, allPosts, maxPosts = 3 }: RelatedPostsProps) {
  // Find related posts based on tags and title similarity
  const relatedPosts = allPosts
    .filter((post) => post.slug !== currentPost.slug)
    .map((post) => {
      // Calculate similarity score based on shared tags
      const sharedTags = currentPost.tags?.filter((tag) => post.tags?.includes(tag)) || []
      const similarityScore = sharedTags.length

      return {
        ...post,
        similarityScore,
        sharedTags,
      }
    })
    .filter((post) => post.similarityScore > 0)
    .sort((a, b) => b.similarityScore - a.similarityScore)
    .slice(0, maxPosts)

  if (relatedPosts.length === 0) {
    return null
  }

  return (
    <section
      className="mt-8 border-t border-gray-200 pt-8 dark:border-gray-700"
      aria-labelledby="related-posts-heading"
    >
      <h2
        id="related-posts-heading"
        className="mb-4 text-xl font-bold text-gray-900 dark:text-gray-100"
      >
        Related Articles
      </h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {relatedPosts.map((post) => (
          <article
            key={post.slug}
            className="rounded-lg border border-gray-200 p-4 dark:border-gray-700"
          >
            <h3 className="mb-2 text-lg font-semibold">
              <Link
                href={`/blog/${post.slug}`}
                className="hover:text-primary-500 dark:hover:text-primary-400 text-gray-900 dark:text-gray-100"
              >
                {post.title}
              </Link>
            </h3>
            <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
              {post.summary?.substring(0, 120)}...
            </p>
            <div className="flex flex-wrap gap-1">
              {post.sharedTags?.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 rounded px-2 py-1 text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
