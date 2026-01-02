"use client"

import { useState, useEffect, useRef } from "react"
import { Menu, X } from "lucide-react"

type NavBarProps = {
  scrollY?: number
  activeSection?: string
}

export function NavBar({ scrollY = 0, activeSection = "home" }: NavBarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [hoveredSection, setHoveredSection] = useState<string | null>(null)
  const navRef = useRef<HTMLDivElement>(null)

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setIsMobileMenuOpen(false)
  }

  const navigationItems = [
    { name: "Home", id: "home" },
    { name: "Services", id: "services" },
    { name: "Work", id: "portfolio" },
    { name: "Clients", id: "clients" },
    { name: "Contact", id: "contact" },
  ]

  // Glass effect: more opaque when scrolled
  const navbarOpacity = Math.min(0.95, 0.8 + scrollY / 300)
  const isScrolled = scrollY > 20

  return (
    <>
      {/* ================= GLASS-MORPHISM NAVBAR ================= */}
      <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[9999]">
        <div
          className="rounded-full px-6 py-3 flex items-center space-x-6 shadow-lg backdrop-blur-md transition-all duration-500"
          style={{
            backgroundColor: `rgba(0, 0, 0, ${navbarOpacity})`,
            border: isScrolled ? '1px solid rgba(255,255,255,0.1)' : 'none',
          }}
          ref={navRef}
        >
          {/* LOGO */}
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-105">
            <span className="text-black text-xs font-bold">MP</span>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center relative">
            {navigationItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.id)}
                onMouseEnter={() => setHoveredSection(item.id)}
                onMouseLeave={() => setHoveredSection(null)}
                className={`nav-item relative px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-300
                  ${activeSection === item.id || hoveredSection === item.id
                    ? 'text-white'
                    : 'text-gray-300 hover:text-white'
                  }`}
                aria-label={`Go to ${item.name}`}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* CTA BUTTON */}
          <button
            onClick={() => scrollToSection("contact")}
            className={`ml-auto text-sm font-semibold px-4 py-1.5 rounded-full transition-all duration-300 ease-out
              ${activeSection === "contact"
                ? "bg-red-500 text-white"
                : "bg-white text-black hover:bg-gray-200"
              }
              hover:scale-[1.03] hover:shadow-md active:scale-[0.98]`}
          >
            Get in Touch
          </button>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden text-white ml-4 transition-transform duration-300 hover:rotate-90"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </nav>

      {/* ================= MOBILE MENU ================= */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[10000] bg-black/95 backdrop-blur-sm text-white flex flex-col pt-16 px-6">
          <div className="flex justify-between items-center mb-8">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-black text-xs font-bold">MP</span>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white transition-transform hover:rotate-90"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex flex-col space-y-5">
            {navigationItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.id)}
                className={`text-xl font-medium rounded-lg px-4 py-3 text-left transition-all
                  ${activeSection === item.id
                    ? 'bg-red-500 text-white'
                    : 'hover:bg-white hover:text-black'
                  }`}
              >
                {item.name}
              </button>
            ))}

            <button
              onClick={() => scrollToSection("contact")}
              className="mt-6 bg-white text-black text-sm font-semibold px-6 py-2.5 rounded-full self-start
                         transition-all hover:bg-gray-200 hover:scale-[1.02]"
            >
              Get in Touch
            </button>
          </div>
        </div>
      )}

      {/* 👇 SVG FILTER FOR LIQUID DISTORTION (FE-TURBULENCE) */}
      <svg width="0" height="0" className="hidden">
        <defs>
          <filter id="turbulence-displacement" x="0" y="0" width="100%" height="100%">
            <feTurbulence type="turbulence" baseFrequency="0.05" numOctaves="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
    </>
  )
}