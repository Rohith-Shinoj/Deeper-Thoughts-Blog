import Link from '@/components/Link'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'

interface RelatedPostsProps {
  currentPost: CoreContent<Blog>
  allPosts: CoreContent<Blog>[]
  maxPosts?: number
}

export default function RelatedPosts({ currentPost, allPosts, maxPosts = 3 }: RelatedPostsProps) {
  const relatedPosts = allPosts
    .filter((post) => post.slug !== currentPost.slug)
    .map((post) => {
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
      className="mt-4 border-t border-gray-700 pt-6 dark:border-gray-700"
      aria-labelledby="related-posts-heading"
    >
      <h2
        id="related-posts-heading"
        className="mb-8 text-xl font-bold tracking-tight text-gray-100"
      >
        Related Articles
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {relatedPosts.map((post) => (
          <article
            key={post.slug}
            className="hover:shadow-3xl hover:border-primary-500 flex min-h-[180px] flex-col gap-1 rounded-xl border border-gray-700 bg-gray-900 p-2 transition-all duration-200"
          >
            <h3 className="mb-1 text-base leading-tight font-semibold">
              <Link
                href={`/blog/${post.slug}`}
                className="hover:text-primary-400 text-gray-100 underline underline-offset-2"
              >
                {post.title}
              </Link>
            </h3>
            {/* <p className="mb-1 line-clamp-4 text-xs text-gray-400">
              {post.summary?.substring(0, 120)}...
            </p> */}
            <div className="mt-auto flex flex-wrap gap-1">
              {post.sharedTags?.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="bg-primary-900 text-primary-200 rounded px-2 py-0.5 text-[10px] font-medium"
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
