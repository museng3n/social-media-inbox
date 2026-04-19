import type React from "react"
import type { Metadata } from "next"
import { Cairo } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const cairo = Cairo({
  subsets: ["latin", "arabic"],
  weight: ["400", "600", "700"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Messages - Social Media Inbox",
  description: "Unified inbox for Instagram and Facebook messages",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Anti-flash theme script — applies dark class before first paint */}
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            try {
              const theme = localStorage.getItem('theme');
              if (theme === 'dark') {
                document.documentElement.classList.add('dark');
              }
              const urlParams = new URLSearchParams(window.location.search);
              const urlTheme = urlParams.get('theme');
              if (urlTheme === 'dark') {
                document.documentElement.classList.add('dark');
              }
            } catch(e) {}
          })();
        ` }} />
      </head>
      <body className={`${cairo.className} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
