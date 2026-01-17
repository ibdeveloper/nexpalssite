import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
    shortcut: '/icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" href="/icon.png" />
        <link rel="apple-touch-icon" href="/icon.png" />
      </head>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
