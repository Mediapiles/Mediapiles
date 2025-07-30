"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDownIcon } from "lucide-react"

export function TextOverlay() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500)
    return () => clearTimeout(timer)
  }, [])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div
      className={`absolute inset-0 z-50 flex flex-col items-center justify-end pb-12 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 pointer-events-auto">
        <Button
          onClick={() => scrollToSection("services")}
          size="lg"
          className="bg-white text-black hover:bg-white/90 text-base px-8 py-6 rounded-md"
        >
          Explore Our Services
        </Button>
        <Button
          onClick={() => scrollToSection("contact")}
          variant="outline"
          size="lg"
          className="bg-transparent border-white text-white hover:bg-white/10 text-base px-8 py-6 rounded-md"
        >
          Get in Touch
        </Button>
      </div>

      {/* Arrow */}
      <div className="animate-bounce pointer-events-auto">
        <button
          onClick={() => scrollToSection("services")}
          className="text-white/80 hover:text-white p-2 rounded-full bg-black/20 backdrop-blur-sm transition"
          aria-label="Scroll down"
        >
          <ArrowDownIcon size={24} />
        </button>
      </div>
    </div>
  )
}
