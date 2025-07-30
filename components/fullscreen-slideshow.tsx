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

interface FullscreenSlideshowProps {
  slides: Slide[]
  scrollOpacity: number
}

export function FullscreenSlideshow({ slides, scrollOpacity }: FullscreenSlideshowProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [nextSlideIndex, setNextSlideIndex] = useState(1)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const slideshowRef = useRef<HTMLDivElement>(null)

  // Set up the slideshow rotation
  useEffect(() => {
    const interval = setInterval(() => {
      // Start transition
      setIsTransitioning(true)

      // Prepare the next slide index
      const nextIndex = (currentSlideIndex + 1) % slides.length
      setNextSlideIndex(nextIndex)

      // After transition completes, update current slide
      const transitionTimeout = setTimeout(() => {
        setCurrentSlideIndex(nextIndex)
        setIsTransitioning(false)
      }, 1500) // Match this with the CSS transition duration

      return () => clearTimeout(transitionTimeout)
    }, 7000) // Change slide every 7 seconds

    return () => clearInterval(interval)
  }, [currentSlideIndex, slides.length])

  // Handle video playback
  useEffect(() => {
    // Play the current video if it's a video slide
    if (slides[currentSlideIndex]?.type === "video") {
      const videoElement = videoRefs.current[currentSlideIndex]
      if (videoElement) {
        videoElement.currentTime = 0
        const playPromise = videoElement.play()
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.warn("Video playback failed:", error.message)
          })
        }
      }
    }
  }, [currentSlideIndex, slides])

  return (
    <div
      ref={slideshowRef}
      className="fixed inset-0 w-full h-full transition-opacity duration-700"
      style={{ opacity: scrollOpacity }}
    >
      {/* Render all slides but only show current and next during transition */}
      {slides.map((slide, index) => {
        const isActive = index === currentSlideIndex
        const isNext = index === nextSlideIndex && isTransitioning

        return (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1500 ${
              isActive ? "opacity-100 z-10" : isNext ? "opacity-0 z-20" : "opacity-0 z-0"
            }`}
            style={{
              opacity: isNext ? 0 : isActive ? 1 : 0,
              transition: "opacity 1.5s ease-in-out",
            }}
          >
            {slide.type === "image" ? (
              <div className="relative w-full h-full">
                <Image
                  src={slide.src || "/placeholder.svg"}
                  alt={slide.alt || "Slideshow image"}
                  fill
                  priority={index <= 1} // Prioritize loading first two images
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40" /> {/* Overlay for better text readability */}
              </div>
            ) : (
              <div className="relative w-full h-full">
                {/* Fallback background for when video fails to load */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black" />
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => {
                    console.warn("Video failed to load, using fallback background")
                    // Hide the video element on error
                    e.currentTarget.style.display = "none"
                  }}
                >
                  <source src={slide.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 bg-black/50" /> {/* Darker overlay for videos */}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
