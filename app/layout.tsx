// app/layout.tsx
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Mediapiles",
  description: "Creative video editing and media solutions.",
  icons: {
    icon: "/favicon (1).ico", // Place favicon.ico inside the /public folder
  },
  openGraph: {
    title: "Mediapiles",
    description: "Creative video editing and media solutions.",
    images: ["/logo.png"], // Optional: Place logo.png inside the /public folder
    type: "website",
    url: "https://your-website-url.com", // Optional: Update with your site URL
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="light" style={{ colorScheme: "light" }}>
      <head />
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}