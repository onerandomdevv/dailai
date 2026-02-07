import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'DialAI - Offline AI Assistant for Africa',
  description: 'AI-powered USSD assistant for health, translation & guidance. No internet required.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">{children}</body>
    </html>
  )
}
