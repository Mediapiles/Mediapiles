"use client"

import { useEffect, useState } from "react"
import { Star, Quote } from "lucide-react"

export function ReviewsSection() {
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

    const section = document.getElementById("reviews")
    if (section) observer.observe(section)
    return () => section && observer.unobserve(section)
  }, [])

  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      company: "TechCorp Solutions",
      rating: 5,
      review:
        "MediaPiles transformed our brand video into something extraordinary. The attention to detail and creative vision exceeded all expectations.",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 2,
      name: "Michael Chen",
      company: "Creative Studio",
      rating: 5,
      review:
        "Professional, timely, and incredibly talented. Our YouTube series has never looked better. ROI increased by 300%.",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      company: "Fashion Brand Co.",
      rating: 5,
      review:
        "Every frame is perfectly crafted. MediaPiles doesn't just edit videos - they create experiences that convert.",
      avatar: "/placeholder.svg?height=60&width=60",
    },
  ]

  return (
    <section id="reviews" className="py-20 bg-dark">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl md:text-6xl font-black text-light mb-4">What Clients Say</h2>
          <p className="text-xl text-light/70">Real results from real partnerships</p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {reviews.map((review, index) => (
            <div
              key={review.id}
              className={`transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              <div className="bg-gradient-to-br from-accent/20 to-cta/20 rounded-2xl p-8 hover-scale hover-glow h-full">
                <div className="flex items-center mb-6">
                  <Quote size={24} className="text-cta mr-3" />
                  <div className="flex">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={16} className="text-cta fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-light/90 mb-6 leading-relaxed italic text-lg">"{review.review}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 gradient-accent rounded-full mr-4 flex items-center justify-center">
                    <div className="w-8 h-8 bg-light/20 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-light">{review.name}</h4>
                    <p className="text-light/60 text-sm">{review.company}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Overall Rating */}
        <div
          className={`text-center transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="bg-gradient-to-br from-accent/20 to-cta/20 rounded-2xl p-8 inline-block">
            <div className="flex items-center justify-center mb-4">
              <div className="flex mr-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={24} className="text-cta fill-current" />
                ))}
              </div>
              <span className="text-3xl font-bold text-light">5.0</span>
            </div>
            <p className="text-light/70">Based on 50+ client reviews</p>
          </div>
        </div>
      </div>
    </section>
  )
}
