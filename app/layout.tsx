// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";

// Load Inter for headings & UI elements (weight 500, 600, 700, 800)
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["500", "600", "700", "800"],
});

// Load Poppins for body text (weight 300, 400, 500, 600)
const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "Mediapiles",
  description: "Creative video editing and media solutions.",
  icons: {
    icon: "/favicon (2).ico",
  },
  openGraph: {
    title: "Mediapiles",
    description: "Creative video editing and media solutions.",
    images: ["/logo.png"],
    type: "website",
    url: "https://your-website-url.com", // ✅ Trimmed extra space
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light" style={{ colorScheme: "light" }}>
      <body
        className={`${inter.variable} ${poppins.variable} font-sans`}
        suppressHydrationWarning // Optional: avoids hydration mismatch in dev
      >
        {children}
      </body>
    </html>
  );
}