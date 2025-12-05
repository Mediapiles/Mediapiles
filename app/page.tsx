"use client"

import CustomPlanBuilder from "@/components/CustomPlanBuilder";
import { useEffect, useState, useRef } from "react"
import { FullscreenSlideshow } from "@/components/fullscreen-slideshow"
import { TextOverlay } from "@/components/text-overlay"
import { NavBar } from "@/components/nav-bar"
import { ServicesSection } from "@/components/services-section"
import { PortfolioSection } from "@/components/portfolio-section"
import { ClientsSection } from "@/components/clients-section"
import { ContactCTASection } from "@/components/contact-cta-section"
import { Footer } from "@/components/footer"

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [scrollOpacity, setScrollOpacity] = useState(1)
  const heroSectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsLoaded(true)

    const handleScroll = () => {
      if (!heroSectionRef.current) return
      const heroHeight = heroSectionRef.current.offsetHeight
      const scrollPosition = window.scrollY
      const newOpacity = Math.max(0, 1 - scrollPosition / (heroHeight * 0.4))
      setScrollOpacity(newOpacity)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className={`${isLoaded ? "animate-fade-in" : "opacity-0"}`}>
      {/* Navbar */}
      <NavBar />

      {/* Hero Section */}
      <section
        id="home"
        ref={heroSectionRef}
        className="relative h-screen overflow-hidden bg-black"
      >
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source src="/intro.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Buttons and Arrow */}
        <TextOverlay />
      </section>

      {/* Main Sections */}
      <ServicesSection />
      <PortfolioSection />
      <ClientsSection />
      <ContactCTASection />
      <Footer />
      <CustomPlanBuilder />
    </div>
  )
}
