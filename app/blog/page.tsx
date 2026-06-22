import { genPageMetadata } from 'app/seo'
import ListLayout from '@/layouts/ListLayoutWithTags'
import manifest from '../blog-manifest.json'

const POSTS_PER_PAGE = 5

export const metadata = genPageMetadata({
  title: 'Blog',
  description:
    'Explore in-depth articles on AI, deep learning, transformers, and machine learning research. Latest insights on neural networks, attention mechanisms, and AI interpretability.',
  keywords: [
    'AI blog',
    'deep learning articles',
    'machine learning research',
    'transformer models',
    'neural networks',
    'AI tutorials',
  ],
  pathname: '/blog',
})

export default async function BlogPage(props: { searchParams: Promise<{ page: string }> }) {
  const searchParams = await props.searchParams
  const pageNumber = parseInt(searchParams.page) || 1
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const posts = manifest as any

  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return (
    <ListLayout
      posts={posts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title="All Posts"
    />
  )
}
