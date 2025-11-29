import { extractTocHeadings } from 'pliny/mdx-plugins/index.js'

export const generateToc = (mdx: string) => {
  const toc = extractTocHeadings(mdx)
  return toc
}
