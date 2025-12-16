"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40)

    window.addEventListener("scroll", handleScroll)
    const timer = setTimeout(() => setIsVisible(true), 300)

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
          transition-all duration-500
          ${isScrolled
            ? "backdrop-blur-xl border-b border-[#00ff33]/20 py-1.5"
            : "backdrop-blur-md py-2"}
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"}
        `}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* LOGO */}
          <button
            onClick={() => scrollToSection("home")}
            className="group flex items-center"
          >
            <Image
              src="/Logo.png"
              alt="Mediapiles Logo"
              width={140}
              height={44}
              priority
              className="transition-transform duration-300 group-hover:scale-105"
            />
          </button>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.id)}
                className="relative text-white/80 hover:text-white transition font-medium group"
              >
                {item.name}
                <span
                  className="
                    absolute left-0 -bottom-1 h-[2px] w-full
                    bg-[#00ff33]
                    opacity-0 scale-x-0 origin-left
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
                rounded-full px-5 py-2 text-sm font-semibold
                transition-all duration-300
                hover:shadow-[0_0_30px_rgba(0,255,51,0.9)]
                hover:-translate-y-[1px]
                active:scale-95
              "
            >
              Get in Touch
            </Button>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={22} />
          </button>
        </div>
      </nav>

      {/* ================= MOBILE MENU ================= */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[10000] backdrop-blur-xl bg-[#001c0e]/85 flex flex-col">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <Image
              src="/Logo.png"
              alt="Mediapiles Logo"
              width={120}
              height={38}
              priority
            />

            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white hover:text-[#00ff33]"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center space-y-8">
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
                mt-4 bg-[#00ff33] text-[#001c0e]
                rounded-full px-7 py-3 font-semibold
                transition-all duration-300
                hover:shadow-[0_0_40px_rgba(0,255,51,1)]
                active:scale-95
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
