'use client'

import Image from 'next/image'
import { useState, useRef } from 'react'

interface UploadedImage {
  path: string
  name: string
}

export default function NewArticleSidebar({ mdxContent }: { mdxContent: string }) {
  const [githubUsername, setGithubUsername] = useState('')
  const [shortName, setShortName] = useState('')
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file || !shortName) {
      alert('Please provide an article short name first.')
      return
    }

    setIsUploading(true)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('shortName', shortName)

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        if (data.filePath) {
          setUploadedImages([...uploadedImages, { path: data.filePath, name: file.name }])
        } else {
          alert('Image upload succeeded, but no filePath was returned from the server.')
        }
      } else {
        const errorData = await response.json().catch(() => ({})) // Try to get error details
        alert(`Image upload failed: ${errorData.error || response.statusText}`)
      }
    } catch (error) {
      alert(`An error occurred while uploading the image: ${error.message}`)
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemoveImage = (pathToRemove: string) => {
    setUploadedImages(uploadedImages.filter((image) => image.path !== pathToRemove))
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert('Copied to clipboard!')
  }

  const handleSubmit = async () => {
    if (!githubUsername || !shortName) {
      alert('Please fill in all required fields.')
      return
    }

    const response = await fetch('/api/submit-pr', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mdx: mdxContent,
        githubUsername,
        shortName,
      }),
    })

    if (response.ok) {
      const { prUrl } = await response.json()
      alert(`Pull request created successfully! ${prUrl}`)
    } else {
      alert('Failed to create pull request.')
    }
  }

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">Article Details</h2>
      <div className="mb-4">
        <label
          htmlFor="githubUsername"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          GitHub Username (required)
        </label>
        <input
          type="text"
          id="githubUsername"
          value={githubUsername}
          onChange={(e) => setGithubUsername(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:border-gray-600 dark:bg-gray-700"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="shortName"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Article Short Name (required)
        </label>
        <input
          type="text"
          id="shortName"
          value={shortName}
          onChange={(e) => setShortName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:border-gray-600 dark:bg-gray-700"
        />
        <p className="mt-2 text-sm text-gray-500">
          Used as the directory for images. E.g., "my-new-article".
        </p>
      </div>
      <div className="mb-4">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          className="hidden"
          accept="image/*"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={!shortName || isUploading}
          className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isUploading ? 'Uploading...' : 'Upload Image'}
        </button>
      </div>
      <div>
        <h3 className="mb-2 text-lg font-bold">Uploaded Images</h3>
        <p className="mb-2 text-sm text-gray-500">
          Image previews are shown below. The final URL will be active after the PR is merged.
        </p>
        {uploadedImages.map((image, index) => (
          <div key={index} className="relative mb-2">
            <button
              onClick={() => handleRemoveImage(image.path)}
              className="absolute top-1 right-1 z-10 rounded-full bg-red-500 p-1 text-xs text-white"
              aria-label="Remove image"
            >
              X
            </button>
            <p className="text-sm">
              <Image
                src={image.path}
                alt={image.name}
                width={200}
                height={200}
                className="w-full"
              />
            </p>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">{image.name}</p>
              <button
                onClick={() => copyToClipboard(`![alt text]("${image.path}")`)}
                className="text-sm text-blue-500 hover:underline"
              >
                Copy Markdown
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <button
          onClick={handleSubmit}
          className="w-full rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
        >
          Submit Pull Request
        </button>
      </div>
    </div>
  )
}
