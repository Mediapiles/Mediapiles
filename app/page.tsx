"use client"

import { useEffect, useState, useRef } from "react"
import { NavBar } from "@/components/nav-bar"
import { ServicesSection } from "@/components/services-section"
import { PortfolioSection } from "@/components/portfolio-section"
import { ClientsSection } from "@/components/clients-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import CustomPlanBuilder from "@/components/CustomPlanBuilder"
import { HeroReveal } from "@/components/hero-reveal"

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [activeSection, setActiveSection] = useState("home")

  const heroSectionRef = useRef<HTMLDivElement>(null)
  const servicesRef = useRef<HTMLDivElement>(null)
  const portfolioRef = useRef<HTMLDivElement>(null)
  const clientsRef = useRef<HTMLDivElement>(null)
  const planBuilderRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsLoaded(true)

    const sections = [
      { id: "home", ref: heroSectionRef },
      { id: "services", ref: servicesRef },
      { id: "portfolio", ref: portfolioRef },
      { id: "clients", ref: clientsRef },
      { id: "plan-builder", ref: planBuilderRef },
      { id: "contact", ref: contactRef },
    ]

    const handleScroll = () => {
      // Use center of viewport to determine active section for more accurate "alignment"
      const scrollPos = window.scrollY + window.innerHeight * 0.45

      setScrollY(window.scrollY)

      for (const section of sections) {
        const el = section.ref.current
        if (el) {
          const { offsetTop, offsetHeight } = el
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className={`min-h-screen bg-white ${isLoaded ? "opacity-100 transition-opacity duration-700" : "opacity-0"}`}>
      <NavBar scrollY={scrollY} activeSection={activeSection} />

      <div id="home" ref={heroSectionRef}>
        <HeroReveal />
      </div>

      <div ref={servicesRef} id="services">
        <ServicesSection />
      </div>

      <div ref={portfolioRef} id="portfolio">
        <PortfolioSection />
      </div>

      <div ref={clientsRef} id="clients">
        <ClientsSection />
      </div>

      <div id="plan-builder" ref={planBuilderRef}>
        <CustomPlanBuilder />
      </div>

      <div ref={contactRef} id="contact">
        <ContactSection />
      </div>

      <Footer />
    </div>
  )
}