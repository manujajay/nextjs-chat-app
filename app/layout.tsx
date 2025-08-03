import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Next.js Chat App - Demo',
  description: 'A modern chat interface demo built with Next.js, TypeScript, and OpenAI API. Perfect for learning or as a starting point for your own projects.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen bg-white">
          {children}
        </div>
      </body>
    </html>
  )
} 