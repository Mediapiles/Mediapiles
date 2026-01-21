"use client"

import { useState, useEffect, useRef } from "react"
import { Menu, X } from "lucide-react"

type NavBarProps = {
  scrollY?: number
  activeSection?: string
}

export function NavBar({ scrollY = 0, activeSection = "home" }: NavBarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
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
      {/* ================= RAUL DRONCA-STYLE NAVBAR ================= */}
      <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[9999]">
        <div
          className="nav-wrap relative flex items-center space-x-6 py-3 px-6 rounded-full border border-gray-700"
          style={{
            background: 'linear-gradient(0deg, #141414, #242424)',
            boxShadow: 'inset 10px 0 10px rgba(0,0,0,0.8)',
            fontFamily: 'Geist Sans, sans-serif'
          }}
          ref={navRef}
        >
          {/* Active Bubble */}
          <div
            className="bubble active"
            style={{
              position: 'absolute',
              top: 'anchor(top)',
              right: 'anchor(right)',
              bottom: 'anchor(bottom)',
              left: 'anchor(left)',
              borderRadius: '500px',
              background: 'linear-gradient(180deg, #f2f2f2, #b3b3b3)',
              boxShadow: 'inset 0 2px 7px #fff',
              zIndex: 2,
              transition: 'all 0.2s ease',
            }}
          />

          {/* Hover Bubble */}
          <div
            className="bubble hover"
            style={{
              position: 'absolute',
              top: 'anchor(top)',
              right: 'anchor(right)',
              bottom: 'anchor(bottom)',
              left: 'anchor(left)',
              borderRadius: '500px',
              background: 'linear-gradient(180deg, #3f3f3f, #212121)',
              boxShadow: 'inset 0 2px 7px rgba(255,255,255,0.16)',
              zIndex: 1,
              transition: 'all 0.2s ease',
            }}
          />

          {/* Navigation Links */}
          <nav className="nav flex items-center space-x-1">
            {navigationItems.map((item) => (
              <a
                key={item.name}
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(item.id)
                }}
                className={`relative px-5 py-4 text-sm font-medium transition-colors ${
                  activeSection === item.id ? 'text-black' : 'text-white hover:text-white/80'
                }`}
                style={{
                  textDecoration: 'none',
                  display: 'inline-block',
                  padding: '20px 50px',
                  color: activeSection === item.id ? '#000' : '#fff',
                  fontWeight: 500,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  zIndex: 10,
                  position: 'relative',
                  display: 'inline-block',
                  padding: '20px 50px',
                }}
                // Add anchor-name for CSS positioning
                style={{
                  ...({
                    anchorName: activeSection === item.id ? '--active' : undefined,
                  }),
                }}
                onMouseEnter={() => {
                  // Optional: add hover state if needed
                }}
                onMouseLeave={() => {}}
              >
                {item.name}
              </a>
            ))}
          </nav>
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
                    ? 'bg-white text-black'
                    : 'text-white hover:bg-white hover:text-black'
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
    </>
  )
}