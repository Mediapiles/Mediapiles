"use client"

import { useEffect, useState } from "react"
import { Play } from "lucide-react"
import Image from "next/image"

export function WorkSection() {
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

    const section = document.getElementById("work")
    if (section) observer.observe(section)

    return () => {
      if (section) observer.unobserve(section)
    }
  }, [])

  const shortFormVideos = [
    {
      id: 1,
      title: "Viral TikTok Dance",
      platform: "TikTok",
      thumbnail: "/placeholder.svg?height=400&width=300",
      duration: "0:15",
    },
    {
      id: 2,
      title: "Instagram Reel",
      platform: "Instagram",
      thumbnail: "/placeholder.svg?height=400&width=300",
      duration: "0:30",
    },
    {
      id: 3,
      title: "YouTube Short",
      platform: "YouTube",
      thumbnail: "/placeholder.svg?height=400&width=300",
      duration: "0:45",
    },
    {
      id: 4,
      title: "Product Showcase",
      platform: "Instagram",
      thumbnail: "/placeholder.svg?height=400&width=300",
      duration: "0:25",
    },
  ]

  const longFormVideos = [
    {
      id: 1,
      title: "Brand Documentary",
      type: "YouTube",
      thumbnail: "/placeholder.svg?height=300&width=500",
      duration: "5:30",
    },
    {
      id: 2,
      title: "Product Launch",
      type: "Advertisement",
      thumbnail: "/placeholder.svg?height=300&width=500",
      duration: "2:15",
    },
    {
      id: 3,
      title: "Tutorial Series",
      type: "Educational",
      thumbnail: "/placeholder.svg?height=300&width=500",
      duration: "8:20",
    },
    {
      id: 4,
      title: "Client Testimonial",
      type: "UGC Content",
      thumbnail: "/placeholder.svg?height=300&width=500",
      duration: "3:45",
    },
  ]

  return (
    <section id="work" className="py-20 bg-dark">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl font-black text-[#1a1a1a] drop-shadow-sm">Our Clients</h2>
          <p className="text-xl text-light/70">Content that stops the scroll and drives results</p>
        </div>

        {/* Short Form Section */}
        <div className="mb-20">
          <div
            className={`text-center mb-12 transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h3 className="text-3xl md:text-4xl font-bold text-cta mb-3">SHORT FORM</h3>
            <p className="text-lg text-light/70">TikTok • Instagram • YouTube Shorts</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {shortFormVideos.map((video, index) => (
              <div
                key={video.id}
                className={`group cursor-pointer transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                <div className="relative bg-gradient-to-br from-accent/20 to-cta/20 rounded-2xl overflow-hidden hover-scale hover-glow">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-cta rounded-full p-4">
                        <Play size={24} className="text-light ml-1" />
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 bg-dark/80 text-light text-sm px-3 py-1 rounded-full">
                      {video.duration}
                    </div>
                    <div className="absolute top-4 left-4 bg-cta text-light text-sm px-3 py-1 rounded-full font-medium">
                      {video.platform}
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-light text-sm">{video.title}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Long Form Section */}
        <div>
          <div
            className={`text-center mb-12 transition-all duration-1000 delay-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h3 className="text-3xl md:text-4xl font-bold text-cta mb-3">LONG FORM</h3>
            <p className="text-lg text-light/70">YouTube • Advertisements • Documentaries</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {longFormVideos.map((video, index) => (
              <div
                key={video.id}
                className={`group cursor-pointer transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${800 + index * 100}ms` }}
              >
                <div className="relative bg-gradient-to-br from-accent/20 to-cta/20 rounded-2xl overflow-hidden hover-scale hover-glow">
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-cta rounded-full p-6">
                        <Play size={32} className="text-light ml-1" />
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 bg-dark/80 text-light text-sm px-3 py-1 rounded-full">
                      {video.duration}
                    </div>
                    <div className="absolute top-4 left-4 bg-cta text-light text-sm px-3 py-1 rounded-full font-medium">
                      {video.type}
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="font-bold text-light text-lg mb-2">{video.title}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
