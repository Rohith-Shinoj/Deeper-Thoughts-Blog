'use client'

import { useState } from 'react'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import MDXComponents from './MDXComponents'

export default function MdxEditor({
  content,
  setContent,
}: {
  content: string
  setContent: (content: string) => void
}) {
  const [isPreview, setIsPreview] = useState(false)
  const [previewContent, setPreviewContent] = useState<MDXRemoteSerializeResult | null>(null)

  const handlePreview = async () => {
    const response = await fetch('/api/preview', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mdx: content }),
    })

    if (response.ok) {
      const { source } = await response.json()
      setPreviewContent(source)
      setIsPreview(true)
    } else {
      alert('Failed to generate preview.')
    }
  }

  return (
    <div>
      <div className="mb-2 flex justify-end">
        <button
          onClick={() => setIsPreview(false)}
          className={`rounded-l-md px-4 py-2 text-sm font-medium ${!isPreview ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-600'}`}
        >
          Editor
        </button>
        <button
          onClick={handlePreview}
          className={`rounded-r-md px-4 py-2 text-sm font-medium ${isPreview ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-600'}`}
        >
          Preview
        </button>
      </div>
      {isPreview && previewContent ? (
        <div className="prose dark:prose-dark max-w-none">
          <MDXRemote {...previewContent} components={MDXComponents} />
        </div>
      ) : (
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="h-full w-full rounded-md border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700"
        />
      )}
    </div>
  )
}
