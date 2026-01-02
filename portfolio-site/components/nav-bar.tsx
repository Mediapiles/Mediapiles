// src/app/page.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { NavBar } from './components/NavBar';
import { ServicesSection } from "@/components/services-section";
import { PortfolioSection } from "@/components/portfolio-section";
import { ClientsSection } from "@/components/clients-section";
import { ContactCTASection } from "@/components/contact-cta-section";
import { Footer } from "@/components/footer";
// Add other imports if needed

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollOpacity, setScrollOpacity] = useState(1);
  const heroSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoaded(true);

    const handleScroll = () => {
      if (!heroSectionRef.current) return;
      const heroHeight = heroSectionRef.current.offsetHeight;
      const scrollPosition = window.scrollY;
      const newOpacity = Math.max(0, 1 - scrollPosition / (heroHeight * 0.4));
      setScrollOpacity(newOpacity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`${isLoaded ? "animate-fade-in" : "opacity-0"}`}>
      <NavBar />

      <section
        id="home"
        ref={heroSectionRef}
        className="relative h-screen overflow-hidden bg-black"
      >
        {/* Optional: Add a placeholder image if you don't have Comp.mp4 yet */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black z-0" />
        
        <div className="absolute bottom-6 left-0 right-0 flex justify-center pointer-events-none">
          <p 
            className="text-red-500 text-sm md:text-base font-sans tracking-wide pointer-events-auto"
            style={{ 
              textShadow: '0 0 8px rgba(255,0,0,0.5)',
              animation: 'pulse 2s ease-in-out infinite'
            }}
          >
            Scroll down for More details
          </p>
        </div>
      </section>

      <ServicesSection />
      <PortfolioSection />
      <ClientsSection />
      <ContactCTASection />
      <Footer />
    </div>
  );
}