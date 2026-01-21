"use client"

import { useEffect, useState, useRef } from "react"
import { NavBar } from "@/components/nav-bar"
import { ServicesSection } from "@/components/services-section"
import { PortfolioSection } from "@/components/portfolio-section"
import { ClientsSection } from "@/components/clients-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import CustomPlanBuilder from "@/components/CustomPlanBuilder"

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
      const scrollPos = window.scrollY + 100

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
    <div className={`${isLoaded ? "animate-fade-in" : "opacity-0"}`}>
      <NavBar scrollY={scrollY} activeSection={activeSection} />

      <section
        id="home"
        ref={heroSectionRef}
        className="relative h-screen overflow-hidden bg-black"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source src="/Comp.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 text-white flex flex-col items-center">
          <span className="text-sm font-sans tracking-wider mb-2 opacity-80">Scroll</span>
          <div className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center animate-bounce-down">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
              />
            </svg>
          </div>
        </div>
      </section>

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