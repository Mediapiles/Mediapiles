"use client"

import { useEffect, useState } from "react"
import { BarChart2, CheckCircle, Palette } from "lucide-react"

export function ServicesSection() {
  const [isVisible, setIsVisible] = useState(false)

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

    const section = document.getElementById("services")
    if (section) {
      observer.observe(section)
    }

    return () => {
      if (section) {
        observer.unobserve(section)
      }
    }
  }, [])

  return (
    <section id="services" className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <h1
          className={`text-3xl md:text-4xl font-bold text-center mb-16 text-black transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          WHAT ARE WE PROMISING?
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Card 1 - After Effects Editor */}
          <div
            className={`bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "0.1s" }}
          >
            <h2 className="text-2xl font-bold mb-6 text-black">After Effects Editor</h2>
            <p className="text-gray-600 leading-relaxed">
              Editors with over <strong>2+ years</strong> of hands-on experience in motion design, title animations,
              and impactful visual storytelling using Adobe After Effects.
            </p>
          </div>

          {/* Card 2 - Premiere Pro Styles */}
          <div
            className={`bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "0.2s" }}
          >
            <h2 className="text-2xl font-bold mb-6 text-black">Premiere Pro Styles</h2>
            <p className="text-gray-600 leading-relaxed">
              Proficiency in multiple editing styles like <strong>cinematic cuts, podcast edits,</strong> and social-first content,
              perfectly optimized for fast engagement and retention.
            </p>
          </div>

          {/* Card 3 - Retention-Focused Editing */}
          <div
            className={`bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "0.3s" }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-gray-100 rounded-full">
                <BarChart2 size={28} className="text-black" />
              </div>
              <h2 className="text-2xl font-bold text-black">Retention Strategy</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              We don’t just cut clips — we craft videos designed for <strong>viewer retention</strong>, holding
              attention from the first frame to the last scroll stop.
            </p>
          </div>

          {/* Card 4 - Attention-Grabbing Design */}
          <div
            className={`bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "0.4s" }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-gray-100 rounded-full">
                <Palette size={28} className="text-black" />
              </div>
              <h2 className="text-2xl font-bold text-black">Visual Hooks</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Modern design techniques, scroll-stopping transitions, and storytelling hooks that make your content
              impossible to ignore.
            </p>
          </div>
        </div>

        {/* Supporting text */}
        <div
          className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "0.5s" }}
        >
          <p className="text-gray-600 text-lg leading-relaxed">
            Every project we touch is engineered to capture attention and convert views into results — whether you're
            building your brand, growing a podcast, or launching scroll-worthy reels.
          </p>
        </div>
      </div>
    </section>
  )
}

