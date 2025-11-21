'use client'

import { useState, useEffect } from 'react'
import NewArticleSidebar from '@/components/NewArticleSidebar'
import MdxEditor from '@/components/MdxEditor'

export default function NewArticlePage() {
  const [content, setContent] = useState('')
  const [frontmatterTemplate, setFrontmatterTemplate] = useState('')

  useEffect(() => {
    async function getFrontmatter() {
      const response = await fetch('/api/frontmatter')
      const data = await response.json()
      setFrontmatterTemplate(data.template)
      setContent(data.template)
    }
    getFrontmatter()
  }, [])

  return (
    <div className="flex h-screen">
      <div className="w-2/3 p-4">
        <MdxEditor content={content} setContent={setContent} />
      </div>
      <div className="w-1/3 bg-gray-100 p-4 dark:bg-gray-800">
        <NewArticleSidebar mdxContent={content} />
      </div>
    </div>
  )
}
