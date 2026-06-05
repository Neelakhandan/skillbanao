import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const CONTENT_DIR = path.join(process.cwd(), 'content')

export function getContent<T>(filename: string): T {
  const filePath = path.join(CONTENT_DIR, filename)
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data } = matter(raw)
  return data as T
}

export function getContentWithBody(filename: string): { data: Record<string, unknown>; content: string } {
  const filePath = path.join(CONTENT_DIR, filename)
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  return { data, content }
}
