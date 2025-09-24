import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import Main from '../../Main'
import { notFound } from 'next/navigation'

const MAX_DISPLAY = 8

export default async function Page(props: { params: Promise<{ page: string }> }) {
  const params = await props.params
  const posts = allCoreContent(sortPosts(allBlogs))
  const pageNumber = parseInt(params.page as string)
  const totalPages = Math.ceil(posts.length / MAX_DISPLAY)

  if (!pageNumber || pageNumber < 1 || pageNumber > totalPages) {
    return notFound()
  }

  const startIndex = (pageNumber - 1) * MAX_DISPLAY
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <Main posts={posts as any} startIndex={startIndex} />
}
