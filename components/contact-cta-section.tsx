"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, User, Mail, MessageSquare, Clock, RotateCcw, Target } from "lucide-react"
import { FreeEditModal } from "@/components/free-edit-modal"

export function ContactCTASection() {
  const [isVisible, setIsVisible] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formData)
    setFormData({ name: "", email: "", message: "" })
    alert("Thank you! We'll get back to you within 24 hours.")
  }

  const clientBrands = ["YouTube", "TikTok", "Instagram", "UGC Brands", "Shopify", "Meta"]

  const openModal = () => {
    setIsModalOpen(true)
    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden"
  }

  const closeModal = () => {
    setIsModalOpen(false)
    // Restore body scroll when modal is closed
    document.body.style.overflow = "unset"
  }

  return (
    <>
      <section id="contact" ref={sectionRef} className="py-20 px-4" style={{ backgroundColor: "#1D1616" }}>
        <div className="container mx-auto max-w-4xl">
          {/* Brand Identity */}
          <div
            className={`text-center mb-12 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="mb-8 elevation-2 inline-block p-6 rounded-full">
              <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: "#EEEEEE" }}>
                MediaPiles
              </h1>
              <p className="text-xl md:text-2xl font-light italic font-calligraphy" style={{ color: "#EEEEEE" }}>
                agency
              </p>
            </div>
          </div>

          {/* Client Badge Bar */}
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "0.2s" }}
          >
            <p className="text-sm mb-4" style={{ color: "rgba(238, 238, 238, 0.7)" }}>
              Trusted by creators working with
            </p>
            <div className="flex flex-wrap justify-center items-center gap-6">
              {clientBrands.map((brand, index) => (
                <div
                  key={brand}
                  className="px-4 py-2 rounded-full text-sm font-medium hover:bg-[#8E1616]/20 transition-colors elevation-1 hover-lift"
                  style={{
                    backgroundColor: "rgba(142, 22, 22, 0.1)",
                    color: "#EEEEEE",
                    animationDelay: `${index * 0.1}s`,
                    animation: isVisible ? "fadeInScale 0.6s ease-out forwards" : "none",
                  }}
                >
                  {brand}
                </div>
              ))}
            </div>
          </div>

          {/* Emotional Hook */}
          <div
            className={`text-center mb-12 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "0.4s" }}
          >
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 font-heading elevation-3 p-6 rounded-2xl"
              style={{
                color: "#EEEEEE",
                background: "linear-gradient(to bottom, rgba(142, 22, 22, 0.1), rgba(29, 22, 22, 0.05))",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
              }}
            >
              You don't just need a video editor.{" "}
              <span className="relative">
                You need a{" "}
                <span className="relative inline-block">
                  <span style={{ color: "#D84040" }}>story</span>
                  <div
                    className="absolute bottom-0 left-0 w-full h-1 animate-pulse"
                    style={{ backgroundColor: "#D84040" }}
                  ></div>
                </span>{" "}
                that{" "}
                <span className="relative inline-block">
                  <span style={{ color: "#D84040" }}>sells</span>
                  <div
                    className="absolute bottom-0 left-0 w-full h-1 animate-pulse animation-delay-500"
                    style={{ backgroundColor: "#D84040" }}
                  ></div>
                </span>
                .
              </span>
            </h2>
          </div>

          {/* Value Proposition */}
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "0.6s" }}
          >
            <p
              className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto glass-effect-light p-6 rounded-xl elevation-2"
              style={{ color: "#EEEEEE" }}
            >
              You're not hiring someone to cut clips — you're hiring a partner to transform raw footage into{" "}
              <strong>scroll-stopping content</strong>. At MediaPiles, we craft emotionally gripping shorts,
              high-converting ads, and cinematic edits that get thousands of likes, views, and saves — without you
              lifting a finger.
            </p>
          </div>

          {/* CTA Button */}
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "0.8s" }}
          >
            <Button
              onClick={openModal}
              size="lg"
              className="text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group button-3d"
              style={{
                backgroundColor: "#D84040",
                color: "#EEEEEE",
                boxShadow: "0 10px 30px rgba(216, 64, 64, 0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 15px 40px rgba(216, 64, 64, 0.6)"
                e.currentTarget.style.backgroundColor = "#C73535"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(216, 64, 64, 0.3)"
                e.currentTarget.style.backgroundColor = "#D84040"
              }}
            >
              Get Your First Video Edited – FREE
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Button>
          </div>

          {/* Contact Form */}
          <div
            className={`rounded-2xl p-8 md:p-12 mb-16 transition-all duration-1000 elevation-4 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{
              background: "linear-gradient(to bottom right, rgba(142, 22, 22, 0.2), rgba(29, 22, 22, 0.1))",
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
              borderLeft: "1px solid rgba(255, 255, 255, 0.1)",
              transitionDelay: "1s",
              boxShadow: "0 15px 35px rgba(0, 0, 0, 0.3)",
            }}
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: "#EEEEEE" }}>
                Let's Get Started
              </h3>
              <p style={{ color: "rgba(238, 238, 238, 0.7)" }}>
                Tell us what you need – we'll take care of the editing
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <User
                    className="absolute left-3 top-1/2 transform -translate-y-1/2"
                    size={20}
                    style={{ color: "rgba(238, 238, 238, 0.4)" }}
                  />
                  <Input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="pl-12 py-6 text-lg rounded-lg elevation-1 hover-lift"
                    style={{
                      backgroundColor: "rgba(142, 22, 22, 0.1)",
                      borderColor: "rgba(216, 64, 64, 0.3)",
                      color: "#EEEEEE",
                    }}
                  />
                </div>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 transform -translate-y-1/2"
                    size={20}
                    style={{ color: "rgba(238, 238, 238, 0.4)" }}
                  />
                  <Input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="pl-12 py-6 text-lg rounded-lg elevation-1 hover-lift"
                    style={{
                      backgroundColor: "rgba(142, 22, 22, 0.1)",
                      borderColor: "rgba(216, 64, 64, 0.3)",
                      color: "#EEEEEE",
                    }}
                  />
                </div>
              </div>
              <div className="relative">
                <MessageSquare
                  className="absolute left-3 top-4"
                  size={20}
                  style={{ color: "rgba(238, 238, 238, 0.4)" }}
                />
                <Textarea
                  name="message"
                  placeholder="Tell us about your project..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="pl-12 py-4 text-lg rounded-lg min-h-[120px] elevation-1 hover-lift"
                  style={{
                    backgroundColor: "rgba(142, 22, 22, 0.1)",
                    borderColor: "rgba(216, 64, 64, 0.3)",
                    color: "#EEEEEE",
                  }}
                />
              </div>
              <div className="text-center">
                <Button
                  type="submit"
                  size="lg"
                  className="text-lg px-12 py-6 rounded-lg w-full md:w-auto button-3d"
                  style={{ backgroundColor: "#D84040", color: "#EEEEEE" }}
                >
                  Start With A Free Strategy Call
                </Button>
              </div>
            </form>
          </div>

          {/* Trust & Guarantee */}
          <div
            className={`transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "1.2s" }}
          >
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 text-center">
              <div
                className="flex items-center gap-3 rounded-full px-6 py-3 shadow-md elevation-2 hover-lift"
                style={{
                  backgroundColor: "rgba(142, 22, 22, 0.1)",
                  borderTop: "1px solid rgba(255, 255, 255, 0.05)",
                  borderLeft: "1px solid rgba(255, 255, 255, 0.05)",
                }}
              >
                <Clock style={{ color: "#D84040" }} size={20} />
                <span style={{ color: "#EEEEEE" }} className="font-medium">
                  48-Hour Turnaround
                </span>
              </div>
              <div
                className="flex items-center gap-3 rounded-full px-6 py-3 shadow-md elevation-2 hover-lift"
                style={{
                  backgroundColor: "rgba(142, 22, 22, 0.1)",
                  borderTop: "1px solid rgba(255, 255, 255, 0.05)",
                  borderLeft: "1px solid rgba(255, 255, 255, 0.05)",
                }}
              >
                <RotateCcw style={{ color: "#D84040" }} size={20} />
                <span style={{ color: "#EEEEEE" }} className="font-medium">
                  Unlimited Revisions
                </span>
              </div>
              <div
                className="flex items-center gap-3 rounded-full px-6 py-3 shadow-md elevation-2 hover-lift"
                style={{
                  backgroundColor: "rgba(142, 22, 22, 0.1)",
                  borderTop: "1px solid rgba(255, 255, 255, 0.05)",
                  borderLeft: "1px solid rgba(255, 255, 255, 0.05)",
                }}
              >
                <Target style={{ color: "#D84040" }} size={20} />
                <span style={{ color: "#EEEEEE" }} className="font-medium">
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
