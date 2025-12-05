"use client"

import { useEffect, useState, useRef } from "react"

export default function CustomPlanBuilder() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  // Reveal animation trigger
  useEffect(() => {
    if (!sectionRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.2 }
    )

    observer.observe(sectionRef.current)

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current)
    }
  }, [])

  // Parallax scroll
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const parallaxOffset = scrollY * 0.15 // soften parallax speed

  const cards = [
    {
      title: "Video Editing",
      desc: "Short-form, long-form, reels, highlights & more.",
      delay: 300,
    },
    {
      title: "Thumbnail Design",
      desc: "Scroll-stopping, CTR-boosted custom thumbnails.",
      delay: 500,
    },
    {
      title: "Motion Graphics",
      desc: "Subtitles, effects, transitions, animations & more.",
      delay: 700,
    },
    {
      title: "Custom Packages",
      desc: "Build a plan tailored to your exact needs.",
      delay: 900,
    },
  ]

  return (
    <section
      id="custom-plan"
      ref={sectionRef}
      className="relative py-24 bg-gradient-to-br from-dark to-accent/10 overflow-hidden"
      style={{
        transform: `translateY(${parallaxOffset}px)`,
        transition: "transform 0.2s linear",
      }}
    >
      <div className="container mx-auto px-4 max-w-5xl">
        <h2
          className={`text-4xl md:text-5xl font-black text-light text-center mb-6 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          Build Your <span className="text-cta">Custom Plan</span>
        </h2>

        <p
          className={`text-light/70 text-center max-w-2xl mx-auto mb-14 text-lg transition-all duration-1000 delay-150 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          Choose exactly what you need. We’ll tailor your plan to your goals.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cards.map((card, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl bg-accent/10 border border-accent/20 shadow-lg transition-all duration-700 hover:shadow-[0_0_25px_5px_rgba(255,255,255,0.2)] hover:border-white/40 hover:scale-[1.03] cursor-pointer"
              style={{
                transitionDelay: `${card.delay}ms`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible
                  ? "translateY(0) scale(1)"
                  : "translateY(40px) scale(0.85)",
              }}
            >
              <h3 className="text-2xl font-bold text-light mb-3">{card.title}</h3>
              <p className="text-light/70 text-sm leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
