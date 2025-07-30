"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"

interface Slide {
  type: "image" | "video"
  src: string
  alt?: string
  heading: string
  subheading: string
  tagline: string
}

interface EnhancedSlideshowProps {
  slides: Slide[]
}

export function EnhancedSlideshow({ slides }: EnhancedSlideshowProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  // Sample video URLs that actually work (you can replace these with your own)
  const workingVideoSources = [
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  ]

  // Enhanced slides with working video sources
  const enhancedSlides = slides.map((slide, index) => {
    if (slide.type === "video") {
      return {
        ...slide,
        src: workingVideoSources[index % workingVideoSources.length] || slide.src,
      }
    }
    return slide
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true)

      setTimeout(() => {
        setCurrentSlideIndex((prev) => (prev + 1) % enhancedSlides.length)
        setIsTransitioning(false)
      }, 1000)
    }, 6000)

    return () => clearInterval(interval)
  }, [enhancedSlides.length])

  // Handle video playback
  useEffect(() => {
    const currentSlide = enhancedSlides[currentSlideIndex]
    if (currentSlide.type === "video") {
      const videoElement = videoRefs.current[currentSlideIndex]
      if (videoElement) {
        videoElement.currentTime = 0
        videoElement.play().catch((error) => {
          console.warn("Video playback failed:", error.message)
        })
      }
    }
  }, [currentSlideIndex, enhancedSlides])

  return (
    <div className="fixed inset-0 w-full h-full">
      {enhancedSlides.map((slide, index) => {
        const isActive = index === currentSlideIndex

        return (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
              isActive ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {slide.type === "image" ? (
              <div className="relative w-full h-full">
                <Image
                  src={slide.src || "/placeholder.svg"}
                  alt={slide.alt || "Slideshow image"}
                  fill
                  priority={index <= 1}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
              </div>
            ) : (
              <div className="relative w-full h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black" />

                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  src={slide.src}
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => {
                    console.warn("Video failed to load")
                    e.currentTarget.style.display = "none"
                  }}
                  onLoadedData={() => {
                    const videoElement = videoRefs.current[index]
                    if (videoElement) {
                      videoElement.style.display = "block"
                    }
                  }}
                />

                <div className="absolute inset-0 bg-black/50" />
              </div>
            )}

            <div
              className={`absolute inset-0 flex flex-col items-center justify-center text-white z-30 px-4 ${
                isActive ? "animate-text-fade-in" : ""
              }`}
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-center mb-4 tracking-tight">
                {slide.heading}
              </h1>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-light text-center mb-4">{slide.subheading}</h2>
              <p className="text-base md:text-lg lg:text-xl text-center max-w-2xl opacity-90">{slide.tagline}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
