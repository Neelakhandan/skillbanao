import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()
  const { fullName, phone, email } = body

  if (!fullName || !phone || !email) {
    return NextResponse.json({ error: 'Required fields missing' }, { status: 400 })
  }

  const endpoint = process.env.LEADS_ENDPOINT
  if (!endpoint) {
    return NextResponse.json({ error: 'Endpoint not configured' }, { status: 500 })
  }

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...body, type: 'mentor' }),
  })

  const text = await res.text().catch(() => '(no body)')
  console.log('[mentor-apply] Apps Script status:', res.status, '| body:', text.slice(0, 200))

  return NextResponse.json({ success: true })
}
