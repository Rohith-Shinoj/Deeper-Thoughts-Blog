import Main from './Main'
import manifest from './blog-manifest.json'

export default async function Page() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const posts = manifest as any
  return (
    <>
      <main>
        <h1 className="sr-only">Deeper Thoughts – AI and Deep Learning Blog</h1>
        <Main posts={posts} />
      </main>
    </>
  )
}
