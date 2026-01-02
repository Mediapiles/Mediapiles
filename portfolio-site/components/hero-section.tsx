"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    setIsVisible(true)

    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToWork = () => {
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video/Image with Overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
          opacity: Math.max(0, 1 - scrollY / 800),
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"></div>
        <div className="absolute inset-0 bg-dark/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-light mb-6 text-shadow">
            Editing That
            <span className="block text-cta">Converts.</span>
          </h1>
        </div>

        <div
          className={`transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <p className="text-xl md:text-2xl text-light/90 mb-12 max-w-3xl mx-auto text-shadow">
            Shorts. Reels. YouTube. We cut your content to make it viral.
          </p>
        </div>

        <div
          className={`transition-all duration-1000 delay-600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <Button
            onClick={scrollToWork}
            size="lg"
            className="bg-cta hover:bg-cta/90 text-light text-lg px-8 py-6 rounded-xl font-semibold btn-glow"
          >
            Explore Our Work
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="text-light/60" size={32} />
      </div>
    </section>
  )
}
