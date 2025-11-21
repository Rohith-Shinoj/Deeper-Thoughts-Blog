import { promises as fs } from 'fs'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file = formData.get('file') as File
  const shortName = formData.get('shortName') as string

  if (!file || !shortName) {
    return NextResponse.json({ error: 'No file or shortName provided' }, { status: 400 })
  }

  const tempDir = path.join(process.cwd(), '.tmp', shortName)
  await fs.mkdir(tempDir, { recursive: true })

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const filePath = path.join(tempDir, file.name)
  await fs.writeFile(filePath, buffer)

  const publicPath = `/static/images/${shortName}/${file.name}`

  return NextResponse.json({ filePath: publicPath })
}
