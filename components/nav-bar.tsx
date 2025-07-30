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
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)

    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 800)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearTimeout(timer)
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
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
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-black/80 backdrop-blur-md shadow-md py-3"
            : "bg-transparent py-5"
        } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <button
            onClick={() => scrollToSection("home")}
            className={`text-2xl font-bold tracking-tight transition-all font-heading ${
              isScrolled ? "text-white" : "text-white/80"
            }`}
          >
            MEDIAPILES
          </button>

          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.id)}
                className={`transition-colors duration-300 relative group ${
                  isScrolled
                    ? "text-white font-semibold"
                    : "text-white/70 font-normal"
                }`}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
            <Button
              onClick={() => scrollToSection("contact")}
              className="bg-white text-black hover:bg-white/90 button-3d"
            >
              Get in Touch
            </Button>
          </div>

          <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex flex-col">
          <div className="container mx-auto px-4 py-5 flex justify-between items-center">
            <button
              onClick={() => scrollToSection("home")}
              className="text-white text-2xl font-bold tracking-tight"
            >
              MEDIAPILES
            </button>
            <button className="text-white" onClick={() => setIsMobileMenuOpen(false)}>
              <X size={24} />
            </button>
          </div>

          <div className="flex flex-col items-center justify-center flex-1 space-y-8">
            {navigationItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.id)}
                className="text-white text-2xl hover:text-white/80 transition-all"
              >
                {item.name}
              </button>
            ))}
            <Button
              onClick={() => scrollToSection("contact")}
              className="bg-white text-black hover:bg-white/90 mt-4 button-3d"
            >
              Get in Touch
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
