"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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
      {/* Global Scrollbar Hide */}
      <style jsx global>{`
        ::-webkit-scrollbar {
          display: none;
        }
        html {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* ================= MINIMAL PILL NAVBAR ================= */}
      <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[9999]">
        <div className="bg-black text-white rounded-full px-6 py-3 flex items-center space-x-6 shadow-lg">

          {/* LEFT ICON / LOGO PLACEHOLDER */}
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <span className="text-black text-xs font-bold">MP</span>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center space-x-5">
            {navigationItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.id)}
                className="text-sm font-medium hover:text-gray-300 transition"
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* CTA BUTTON — RIGHT SIDE */}
          <button
            onClick={() => scrollToSection("contact")}
            className="ml-auto bg-white text-black text-sm font-semibold px-4 py-1.5 rounded-full hover:bg-gray-100 transition"
          >
            Get in Touch
          </button>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden text-white ml-4"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={20} />
          </button>
        </div>
      </nav>

      {/* ================= MOBILE MENU ================= */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[10000] bg-black text-white flex flex-col pt-16 px-6">
          <div className="flex justify-between items-center mb-8">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-black text-xs font-bold">MP</span>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex flex-col space-y-6">
            {navigationItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.id)}
                className="text-xl font-medium hover:text-gray-300 transition"
              >
                {item.name}
              </button>
            ))}

            <button
              onClick={() => scrollToSection("contact")}
              className="mt-6 bg-white text-black text-sm font-semibold px-6 py-2 rounded-full self-start hover:bg-gray-100 transition"
            >
              Get in Touch
            </button>
          </div>
        </div>
      )}
    </>
  )
}