"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export function ClientsSection() {
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

    const section = document.getElementById("clients")
    if (section) {
      observer.observe(section)
      return () => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(section)
      }
    }

    return undefined
  }, [])

  const clientLogos = [
    "/clients/client-1.jpeg",
    "/clients/client-2.jpg",
    "/clients/client-3.png",
    "/clients/client-4.jpg",
    "/clients/client-5.jpg",
    "/clients/client-6.jpg",
  ]

  const projectImages = [
    {
      id: 1,
      title: "Brand Product Showcase",
      client: "Skinszeal",
      image: "/videos/brand.jpg",
    },
    {
      id: 2,
      title: "Cinematic Ad Cut",
      client: "Rs Store",
      image: "/videos/cinematic cut.jfif",
    },
    {
      id: 3,
      title: "Explainer Video Recap",
      client: "Ahmaddesigns",
      image: "/videos/a.jpg",
    },
  ]

  return (
    // UPDATED BG COLOR for contrast (Light gradient for black text)
    <section id="clients" className="py-20 bg-gradient-to-br from-gray-100 to-white">
      <div className="container mx-auto px-4">
        {/* Title */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* UPDATED H2 TEXT COLOR to black */}
          <h2 className="text-4xl md:text-6xl font-black text-black mb-4">Our Clients</h2>
          {/* UPDATED P TEXT COLOR to black/70 */}
          <p className="text-xl text-black/70">Trusted by brands that demand excellence</p>
        </div>

        {/* Client Logos */}
        <div
          className={`flex flex-wrap justify-center items-center gap-8 mb-20 transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {clientLogos.map((src, index) => (
            <div
              key={index}
              className={`transition-all duration-700 ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
              }`}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
            >
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden shadow-lg">
                <Image
                  src={src}
                  alt={`Client ${index + 1}`}
                  width={96}
                  height={96}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Featured Project Images */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projectImages.map((project, index) => (
            <div
              key={project.id}
              className={`group cursor-pointer transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${900 + index * 100}ms` }}
            >
              {/* NOTE: hover-glow HAS BEEN REMOVED */}
              <div className="bg-gradient-to-br from-accent/20 to-cta/20 rounded-2xl overflow-hidden hover-scale">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  {/* Keep dark gradient overlay for text readability on images */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    {/* Project text colors retained as light for contrast against the image/dark overlay */}
                    <h3 className="text-light font-bold text-lg mb-2">{project.title}</h3>
                    <p className="text-light/80 text-sm">{project.client}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}