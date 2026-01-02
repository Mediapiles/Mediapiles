"use client"

import type React from "react"

import { useEffect } from "react"

export function FontProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Add Inter font
    const interLink = document.createElement("link")
    interLink.href = "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
    interLink.rel = "stylesheet"
    document.head.appendChild(interLink)

    // Add Poppins font
    const poppinsLink = document.createElement("link")
    poppinsLink.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
    poppinsLink.rel = "stylesheet"
    document.head.appendChild(poppinsLink)

    return () => {
      document.head.removeChild(interLink)
      document.head.removeChild(poppinsLink)
    }
  }, [])

  return <>{children}</>
}
