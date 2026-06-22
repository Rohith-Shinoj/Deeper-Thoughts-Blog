import { allBlogs } from '../.contentlayer/generated/index.mjs'
import { sortPosts } from 'pliny/utils/contentlayer.js'
import fs from 'fs'

async function generateBlogManifest() {
  const posts = allBlogs.filter((p) => p.slug !== '_template' && !p.draft)
  const sortedPosts = sortPosts(posts)

  const manifest = sortedPosts.map((post) => {
    return {
      slug: post.slug,
      title: post.title,
      date: post.date,
      summary: post.summary,
      tags: post.tags,
    }
  })

  fs.writeFileSync('./app/blog-manifest.json', JSON.stringify(manifest, null, 2))
  console.log('Blog manifest generated successfully.')
}

generateBlogManifest()
