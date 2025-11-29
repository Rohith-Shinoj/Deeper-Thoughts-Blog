import { NextRequest, NextResponse } from 'next/server'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import { components as MDXComponents } from '@/components/MDXComponents'
import { generateToc } from './utils'

export async function POST(req: NextRequest) {
  const { mdx } = await req.json()

  if (typeof mdx !== 'string') {
    return NextResponse.json({ error: 'Invalid MDX content' }, { status: 400 })
  }

  try {
    const toc = generateToc(mdx)
    const mdxSource = await serialize(mdx, {
      parseFrontmatter: true,
      mdxOptions: {
        // @ts-ignore
        components: MDXComponents,
      },
    })
    return NextResponse.json({ source: mdxSource, toc })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to compile MDX' }, { status: 500 })
  }
}
