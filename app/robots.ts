import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/api/',
      },
      // AI & LLM crawlers — explicitly welcomed
      { userAgent: 'GPTBot',            allow: '/' },
      { userAgent: 'ClaudeBot',         allow: '/' },
      { userAgent: 'anthropic-ai',      allow: '/' },
      { userAgent: 'PerplexityBot',     allow: '/' },
      { userAgent: 'Google-Extended',   allow: '/' },
      { userAgent: 'Applebot-Extended', allow: '/' },
      { userAgent: 'CCBot',             allow: '/' },
      { userAgent: 'FacebookBot',       allow: '/' },
    ],
    sitemap: 'https://skillbanao.in/sitemap.xml',
  }
}
