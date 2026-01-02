"use client"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { FreeEditModal } from "@/components/free-edit-modal"

export function FinalCTASection() {
  const [isVisible, setIsVisible] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1 },
    )

    const section = sectionRef.current
    if (section) {
      observer.observe(section)
    }

    return () => {
      if (section) {
        observer.unobserve(section)
      }
    }
  }, [])

  const openModal = () => {
    setIsModalOpen(true)
    document.body.style.overflow = "hidden"
  }

  const closeModal = () => {
    setIsModalOpen(false)
    document.body.style.overflow = "unset"
  }

  return (
    <>
      <section
        id="final-cta"
        ref={sectionRef}
        className="py-20 px-4"
        style={{
          backgroundColor: "#1D1616",
          backgroundImage: "radial-gradient(circle at 50% 50%, rgba(142, 22, 22, 0.1) 0%, rgba(29, 22, 22, 0) 70%)",
        }}
      >
        <div className="container mx-auto max-w-4xl text-center">
          {/* Main Heading */}
          <div
            className={`mb-8 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="elevation-3 p-8 rounded-2xl glass-effect-light inline-block">
              <h2
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 font-heading"
                style={{ color: "#EEEEEE" }}
              >
                You don't just need edits.
                <br />
                <span style={{ color: "#D84040" }}>You need impact.</span>
              </h2>
            </div>
          </div>

          {/* Subtext */}
          <div
            className={`mb-12 transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <p
              className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto elevation-2 p-6 rounded-xl"
              style={{
                color: "#EEEEEE",
                background: "linear-gradient(to bottom, rgba(142, 22, 22, 0.1), rgba(29, 22, 22, 0.05))",
              }}
            >
              Get professional, scroll-stopping videos tailored for your brand — short-form or long-form. Starting with
              your first edit, free.
            </p>
          </div>

          {/* CTA Button */}
          <div
            className={`mb-12 transition-all duration-1000 delay-600 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <Button
              onClick={openModal}
              size="lg"
              className="text-lg px-12 py-6 rounded-2xl font-bold transition-all duration-300 group shadow-lg hover:shadow-2xl transform hover:scale-105 button-3d"
              style={{
                backgroundColor: "#D84040",
                color: "#EEEEEE",
                boxShadow: "0 10px 30px rgba(216, 64, 64, 0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 15px 50px rgba(216, 64, 64, 0.6)"
                e.currentTarget.style.backgroundColor = "#C73535"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(216, 64, 64, 0.3)"
                e.currentTarget.style.backgroundColor = "#D84040"
              }}
            >
              Get Your First Video Edited – Free
              <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" size={20} />
            </Button>
          </div>

          {/* Trust Badge Strip */}
          <div
            className={`transition-all duration-1000 delay-900 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-8 text-center">
              <div className="flex items-center gap-2 elevation-1 px-4 py-2 rounded-full hover-lift glass-effect-light">
                <span className="text-lg">✅</span>
                <span className="text-sm font-medium" style={{ color: "rgba(238, 238, 238, 0.7)" }}>
                  48-Hour Turnaround
                </span>
              </div>
              <div className="hidden md:block w-px h-4" style={{ backgroundColor: "rgba(238, 238, 238, 0.3)" }}></div>
              <div className="flex items-center gap-2 elevation-1 px-4 py-2 rounded-full hover-lift glass-effect-light">
                <span className="text-lg">✂️</span>
                <span className="text-sm font-medium" style={{ color: "rgba(238, 238, 238, 0.7)" }}>
                  Unlimited Revisions
                </span>
              </div>
              <div className="hidden md:block w-px h-4" style={{ backgroundColor: "rgba(238, 238, 238, 0.3)" }}></div>
              <div className="flex items-center gap-2 elevation-1 px-4 py-2 rounded-full hover-lift glass-effect-light">
                <span className="text-lg">🎯</span>
                <span className="text-sm font-medium" style={{ color: "rgba(238, 238, 238, 0.7)" }}>
                  100% Satisfaction Guarantee
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      <FreeEditModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  )
}
