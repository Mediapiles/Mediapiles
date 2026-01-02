"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

interface ScrollAnimationProps {
  children: ReactNode
  threshold?: number
  delay?: number
  className?: string
  animation?: "fade-in" | "fade-in-up" | "fade-in-down" | "fade-in-scale" | "slide-in"
}

export function ScrollAnimation({
  children,
  threshold = 0.1,
  delay = 0,
  className = "",
  animation = "fade-in-up",
}: ScrollAnimationProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible(true)
            }, delay)
          }
        })
      },
      { threshold },
    )

    const element = ref.current
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [threshold, delay])

  const getAnimationClass = () => {
    switch (animation) {
      case "fade-in":
        return "opacity-0 transition-opacity duration-1000"
      case "fade-in-up":
        return "opacity-0 translate-y-10 transition-all duration-1000"
      case "fade-in-down":
        return "opacity-0 -translate-y-10 transition-all duration-1000"
      case "fade-in-scale":
        return "opacity-0 scale-95 transition-all duration-1000"
      case "slide-in":
        return "opacity-0 -translate-x-10 transition-all duration-1000"
      default:
        return "opacity-0 translate-y-10 transition-all duration-1000"
    }
  }

  return (
    <div
      ref={ref}
      className={`${getAnimationClass()} ${
        isVisible ? "opacity-100 translate-y-0 translate-x-0 scale-100" : ""
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
