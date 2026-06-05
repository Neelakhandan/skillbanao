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

  const body = JSON.stringify({ name, email, phone, type })
  const headers = { 'Content-Type': 'application/json' }

  // Step 1 — POST to Apps Script, capture redirect without following it
  const first = await fetch(endpoint, {
    method: 'POST',
    headers,
    body,
    redirect: 'manual',
  })

  // Step 2 — Google redirects the POST; re-POST to the redirect URL
  const redirectUrl = first.headers.get('location')
  if (redirectUrl) {
    await fetch(redirectUrl, { method: 'POST', headers, body })
  }

  return NextResponse.json({ success: true })
}
