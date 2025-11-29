import matter from 'gray-matter'

function getEmptyValue(value: unknown): unknown {
  if (Array.isArray(value)) {
    return []
  }
  if (typeof value === 'boolean') {
    return false
  }
  if (typeof value === 'number') {
    return 0
  }
  return ''
}

export function generateFrontmatterTemplate(fileContent: string): string {
  const { data: frontmatter } = matter(fileContent)

  const newFrontmatter = Object.keys(frontmatter).reduce(
    (acc, key) => {
      acc[key] = getEmptyValue(frontmatter[key])
      return acc
    },
    {} as { [key: string]: unknown }
  )

  // We need to manually construct the frontmatter string to preserve comments and ordering
  // gray-matter stringify doesn't preserve comments
  const { content } = matter(fileContent)
  const oldFrontmatterString = content.split('---')[1]

  const { content: fileBody } = matter(fileContent)
  const newFrontmatterString = oldFrontmatterString
    .split('\n')
    .map((line) => {
      const [key] = line.split(':')
      if (key && Object.prototype.hasOwnProperty.call(newFrontmatter, key.trim())) {
        const newKey = key.trim()
        const newValue = newFrontmatter[newKey]
        if (Array.isArray(newValue)) {
          return `${newKey}: []`
        }
        return `${newKey}:`
      }
      return line
    })
    .join('\n')

  return `---\n${newFrontmatterString}\n---${fileBody}`
}
