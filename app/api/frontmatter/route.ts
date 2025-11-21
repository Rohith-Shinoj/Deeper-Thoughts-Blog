import { promises as fs } from 'fs'
import path from 'path'
import { generateFrontmatterTemplate } from '@/lib/frontmatter'
import { NextResponse } from 'next/server'

export async function GET() {
  const postsDirectory = path.join(process.cwd(), 'data/blog')
  const filenames = await fs.readdir(postsDirectory)
  const randomFilename = filenames[Math.floor(Math.random() * filenames.length)]
  const filePath = path.join(postsDirectory, randomFilename)
  const fileContents = await fs.readFile(filePath, 'utf8')

  const template = generateFrontmatterTemplate(fileContents)

  return NextResponse.json({ template })
}
