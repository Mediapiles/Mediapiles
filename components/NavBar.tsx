"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-dark/95 backdrop-blur-md py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="text-2xl font-black text-light">MEDIAPILES</div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {["Work", "Clients", "Reviews", "Contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-light/80 hover:text-cta transition-colors font-medium"
              >
                {item}
              </button>
            ))}
            <Button
              onClick={() => scrollToSection("contact")}
              className="bg-cta hover:bg-cta/90 text-light font-semibold"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-light" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-dark z-40 md:hidden">
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            {["Work", "Clients", "Reviews", "Contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-light text-2xl font-medium hover:text-cta transition-colors"
              >
                {item}
              </button>
            ))}
            <Button
              onClick={() => scrollToSection("contact")}
              size="lg"
              className="bg-cta hover:bg-cta/90 text-light font-semibold"
            >
              Get Started
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
