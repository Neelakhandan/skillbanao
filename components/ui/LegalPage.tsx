import ReactMarkdown from 'react-markdown'

interface LegalPageProps {
  title: string
  lastUpdated: string
  content: string
}

export function LegalPage({ title, lastUpdated, content }: LegalPageProps) {
  return (
    <main className="min-h-screen" style={{ background: 'var(--color-bg-dark)' }}>
      {/* Header */}
      <div
        className="border-b py-14 md:py-20"
        style={{
          background: 'var(--color-bg-card)',
          borderColor: 'var(--color-border)',
        }}
      >
        <div className="container mx-auto px-4 md:px-8 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--color-text-muted)' }}>
            Last updated: {lastUpdated}
          </p>
          <h1
            className="text-3xl md:text-4xl font-bold"
            style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-heading)' }}
          >
            {title}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-8 max-w-3xl py-14 md:py-20">
        <div className="prose prose-slate max-w-none" style={{ color: 'var(--color-text-secondary)' }}>
          <ReactMarkdown
            components={{
              h2: ({ children }) => (
                <h2
                  className="text-xl font-bold mt-10 mb-4 pb-2 border-b"
                  style={{
                    color: 'var(--color-text-primary)',
                    fontFamily: 'var(--font-heading)',
                    borderColor: 'var(--color-border)',
                  }}
                >
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3
                  className="text-base font-semibold mt-6 mb-2"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="space-y-2 mb-4 pl-1">{children}</ul>
              ),
              li: ({ children }) => (
                <li className="flex items-start gap-2.5 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  <span
                    className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: 'var(--color-primary)' }}
                  />
                  <span>{children}</span>
                </li>
              ),
              ol: ({ children }) => (
                <ol className="space-y-2 mb-4 list-decimal pl-5">{children}</ol>
              ),
              strong: ({ children }) => (
                <strong style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>{children}</strong>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  style={{ color: 'var(--color-primary)' }}
                  className="underline underline-offset-2"
                >
                  {children}
                </a>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </main>
  )
}
