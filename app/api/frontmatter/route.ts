import { promises as fs } from 'fs'
import path from 'path'
import { generateFrontmatterTemplate } from '@/lib/frontmatter'
import { NextResponse } from 'next/server'

export async function GET() {
  const postsDirectory = path.join(process.cwd(), 'data/blog')
  const filePath = path.join(postsDirectory, '_template.mdx')
  const fileContents = await fs.readFile(filePath, 'utf8')

  return NextResponse.json({ template: fileContents })
}
