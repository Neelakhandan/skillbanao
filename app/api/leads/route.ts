import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { name, email, phone, type } = await req.json()

  if (!name || !phone) {
    return NextResponse.json({ error: 'Name and phone are required' }, { status: 400 })
  }
  if (type === 'curriculum' && !email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 })
  }

  const endpoint = process.env.LEADS_ENDPOINT
  if (!endpoint) {
    return NextResponse.json({ error: 'Endpoint not configured' }, { status: 500 })
  }

  // Google Apps Script processes the POST body in doPost(e) before redirecting.
  // Follow the redirect normally (302 → GET) — do NOT re-POST to the redirect URL.
  await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, phone, type }),
  })

  return NextResponse.json({ success: true })
}
