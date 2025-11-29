import { NextRequest, NextResponse } from 'next/server'
import { Octokit } from 'octokit'
import { promises as fs } from 'fs'
import path from 'path'
import matter from 'gray-matter'
import siteMetadata from '@/data/siteMetadata'

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })
const owner = siteMetadata.siteRepo.split('/')[0]
const repo = siteMetadata.siteRepo.split('/')[1]

function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export async function POST(req: NextRequest) {
  const { mdx, githubUsername, shortName } = await req.json()

  if (!mdx || !shortName) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const { data: frontmatter } = matter(mdx)
  const title = frontmatter.title || `new-article-${Date.now()}`
  const slug = slugify(title)
  const mdxFileName = `${slug}.mdx`
  const branchName = `add-article/${slug}-${Date.now()}`

  const tempImagePath = path.join(process.cwd(), '.tmp', shortName)
  const finalImagePath = path.join(process.cwd(), 'public', 'static', 'images', shortName)

  try {
    await fs.access(tempImagePath)
    try {
      await fs.rename(tempImagePath, finalImagePath)
    } catch (error) {
      console.error('Failed to move images:', error)
      return NextResponse.json({ error: 'Failed to move images' }, { status: 500 })
    }
  } catch (error) {
    // If tempImagePath does not exist, do nothing.
  }

  const mdxPath = `data/blog/${mdxFileName}`

  try {
    const mainBranch = await octokit.rest.repos.getBranch({
      owner,
      repo,
      branch: 'main',
    })
    const sha = mainBranch.data.commit.sha

    const newBranch = await octokit.rest.git.createRef({
      owner,
      repo,
      ref: `refs/heads/${branchName}`,
      sha,
    })

    const files: {
      path: string
      mode: '100644'
      type: 'blob'
      content: string
    }[] = []
    // MDX file
    files.push({
      path: mdxPath,
      mode: '100644',
      type: 'blob',
      content: mdx,
    })

    // Image files
    try {
      const imageFiles = await fs.readdir(finalImagePath)
      for (const imageFile of imageFiles) {
        const imageContent = await fs.readFile(path.join(finalImagePath, imageFile), {
          encoding: 'base64',
        })
        files.push({
          path: `public/static/images/${shortName}/${imageFile}`,
          mode: '100644',
          type: 'blob',
          content: imageContent,
        })
      }
    } catch (error) {
      // Ignore if no images
    }

    const tree = await octokit.rest.git.createTree({
      owner,
      repo,
      base_tree: sha,
      tree: files,
    })

    const commitMessage = `feat: add article '${title}'${githubUsername ? ` by ${githubUsername}` : ''}`
    const newCommit = await octokit.rest.git.createCommit({
      owner,
      repo,
      message: commitMessage,
      tree: tree.data.sha,
      parents: [sha],
    })

    await octokit.rest.git.updateRef({
      owner,
      repo,
      ref: `heads/${branchName}`,
      sha: newCommit.data.sha,
    })

    const pr = await octokit.rest.pulls.create({
      owner,
      repo,
      title: `New article: ${title}`,
      head: branchName,
      base: 'main',
      body: `This PR adds a new article: "${title}"`,
    })

    return NextResponse.json({ prUrl: pr.data.html_url })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to create Pull Request' }, { status: 500 })
  }
}
