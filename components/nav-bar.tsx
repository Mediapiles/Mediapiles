"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40)
    }

    window.addEventListener("scroll", handleScroll)

    const timer = setTimeout(() => setIsVisible(true), 400)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearTimeout(timer)
    }
  }, [])

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

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav
        className={`
          fixed top-0 left-0 right-0 z-[9999]
          pointer-events-auto
          transition-all duration-500
          ${
            isScrolled
              ? "backdrop-blur-xl border-b border-[#00ff33]/20 py-3"
              : "backdrop-blur-md py-5"
          }
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"}
        `}
        style={{
          backgroundColor: "transparent",
        }}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("home")}
            className="text-white text-2xl font-extrabold tracking-tight hover:opacity-80 transition"
          >
            MEDIAPILES
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10">
            {navigationItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.id)}
                className="relative text-white/80 hover:text-white transition font-medium group"
              >
                {item.name}

                {/* Neon underline */}
                <span
                  className="
                    pointer-events-none
                    absolute left-0 -bottom-1 h-[2px] w-full
                    bg-[#00ff33]
                    opacity-0 scale-x-0
                    origin-left
                    transition-all duration-300
                    group-hover:opacity-100 group-hover:scale-x-100
                    shadow-[0_0_10px_#00ff33]
                  "
                />
              </button>
            ))}

            {/* CTA BUTTON */}
            <Button
              onClick={() => scrollToSection("contact")}
              className="
                bg-[#00ff33] text-[#001c0e]
                rounded-full px-6 py-2 font-semibold
                transition-all duration-300
                hover:shadow-[0_0_35px_rgba(0,255,51,0.95)]
                hover:-translate-y-[1px]
                active:scale-95
                active:shadow-[0_0_60px_rgba(0,255,51,1)]
              "
            >
              Get in Touch
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white z-[10000]"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={26} />
          </button>
        </div>
      </nav>

      {/* ================= MOBILE MENU ================= */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[10000] backdrop-blur-xl bg-[#001c0e]/80 flex flex-col">
          <div className="container mx-auto px-4 py-5 flex items-center justify-between">
            <button
              onClick={() => scrollToSection("home")}
              className="text-white text-2xl font-bold"
            >
              MEDIAPILES
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white hover:text-[#00ff33] transition"
            >
              <X size={26} />
            </button>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center space-y-10">
            {navigationItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.id)}
                className="text-2xl text-white/80 hover:text-[#00ff33] transition"
              >
                {item.name}
              </button>
            ))}

            <Button
              onClick={() => scrollToSection("contact")}
              className="
                mt-6 bg-[#00ff33] text-[#001c0e]
                rounded-full px-8 py-3 font-semibold
                transition-all duration-300
                hover:shadow-[0_0_45px_rgba(0,255,51,1)]
                active:scale-95
                active:shadow-[0_0_70px_rgba(0,255,51,1)]
              "
            >
              Get in Touch
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
