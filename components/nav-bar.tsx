"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

type NavBarProps = {
  scrollY?: number
  activeSection?: string
}

export function NavBar({ scrollY = 0, activeSection = "home" }: NavBarProps) {
  const [activeTab, setActiveTab] = useState("Home")
  const [hoveredTab, setHoveredTab] = useState<string | null>(null)

  const tabs = [
    { name: "Home", id: "home" },
    { name: "Services", id: "services" },
    { name: "Portfolio", id: "portfolio" },
    { name: "Plan Builder", id: "plan-builder" },
    { name: "Contact", id: "contact" },
  ]

  useEffect(() => {
    const currentTab = tabs.find((t) => t.id === activeSection)
    if (currentTab) {
      setActiveTab(currentTab.name)
    }
  }, [activeSection])

  const handleTabClick = (name: string, id: string) => {
    setActiveTab(name)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="fixed top-8 inset-x-0 z-50 px-8 md:px-12 flex items-center justify-center pointer-events-none">

      {/* Centered Tabs */}
      <div className="pointer-events-auto flex items-center gap-0 sm:gap-1 rounded-[500px] border border-[#3f3f3f] bg-gradient-to-b from-[#141414] to-[#242424] p-1 shadow-[inset_10px_0_20px_rgba(0,0,0,0.5)] overflow-hidden">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => handleTabClick(tab.name, tab.id)}
            onMouseEnter={() => setHoveredTab(tab.name)}
            onMouseLeave={() => setHoveredTab(null)}
            className="relative px-3 py-1.5 md:px-4 md:py-2 text-[11px] md:text-[13px] font-medium transition-colors duration-300 antialiased outline-none whitespace-nowrap flex-shrink-0"
            style={{
              fontFamily: '"Geist Sans", "Inter", sans-serif',
            }}
          >
            {/* Active Indicator (Light Bubble) */}
            {activeTab === tab.name && (
              <motion.div
                layoutId="active-pill"
                className="absolute inset-0 rounded-full bg-gradient-to-b from-[#f2f2f2] to-[#b3b3b3] shadow-[inset_0_2px_7px_#fff]"
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 24,
                  mass: 0.8,
                }}
              />
            )}

            {/* Hover Indicator (Dark Bubble) - Behind Active */}
            {hoveredTab === tab.name && activeTab !== tab.name && (
              <motion.div
                layoutId="hover-pill"
                className="absolute inset-0 rounded-full bg-gradient-to-b from-[#3f3f3f] to-[#212121] shadow-[inset_0_2px_7px_#ffffff29]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              />
            )}

            {/* Text Layer */}
            <span
              className={`relative z-10 transition-colors duration-200 ${activeTab === tab.name ? "text-black" : "text-white"
                }`}
            >
              {tab.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
