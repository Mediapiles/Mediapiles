"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowRight,
  User,
  Mail,
  MessageSquare,
  Clock,
  RotateCcw,
  Headphones,
} from "lucide-react"

export function ContactSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

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

    const section = document.getElementById("contact")
    if (section) observer.observe(section)
    return () => section && observer.unobserve(section)
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formData)
    setFormData({ name: "", email: "", message: "" })
    setSubmitted(true)
  }

  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-br from-dark to-accent/10"
    >
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Main Headline */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl md:text-6xl font-black text-light mb-6 text-shadow">
            You don't just need edits.
            <span className="block text-cta">You need impact.</span>
          </h2>
          <p className="text-xl text-light/80 mb-12 max-w-3xl mx-auto">
            Get professional, scroll-stopping videos tailored for your brand.
            Starting at zero.
          </p>
          <Button
            size="lg"
            className="bg-cta hover:bg-cta/90 text-light text-xl px-12 py-6 rounded-xl font-bold btn-glow animate-glow"
          >
            Get Your First Edit Free
            <ArrowRight className="ml-2" size={24} />
          </Button>
        </div>

        {/* Contact Form OR Success Message */}
        <div
          className={`bg-gradient-to-br from-accent/20 to-cta/20 rounded-3xl p-8 md:p-12 mb-16 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-light mb-2">
              Let's Create Something Viral
            </h3>
            <p className="text-light/70">
              Tell us about your project and we'll make it happen
            </p>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-light/40" size={20} />
                  <Input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="pl-12 py-6 text-lg bg-dark/50 border-accent/30 text-light placeholder:text-light/40 focus:border-cta rounded-xl"
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-light/40" size={20} />
                  <Input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="pl-12 py-6 text-lg bg-dark/50 border-accent/30 text-light placeholder:text-light/40 focus:border-cta rounded-xl"
                  />
                </div>
              </div>
              <div className="relative">
                <MessageSquare className="absolute left-4 top-4 text-light/40" size={20} />
                <Textarea
                  name="message"
                  placeholder="Tell us about your project, goals, and vision..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="pl-12 py-4 text-lg bg-dark/50 border-accent/30 text-light placeholder:text-light/40 focus:border-cta rounded-xl min-h-[120px]"
                />
              </div>
              <div className="text-center">
                <Button
                  type="submit"
                  size="lg"
                  className="bg-cta hover:bg-cta/90 text-light text-lg px-12 py-6 rounded-xl w-full md:w-auto font-semibold btn-glow"
                >
                  Start Your Project
                </Button>
              </div>
            </form>
          ) : (
            <div className="text-center transition-opacity duration-700 opacity-100 p-6">
              <div className="text-5xl mb-4 text-green-400 animate-bounce">✅</div>
              <h3 className="text-2xl font-bold text-light">Thank you!</h3>
              <p className="text-light/70 mt-2">
                We've received your message and will get back to you shortly.
              </p>
            </div>
          )}
        </div>

        {/* Trust Badges */}
        <div
          className={`transition-all duration-1000 delay-600 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 text-center">
            <div className="flex items-center gap-3 bg-gradient-to-r from-accent/20 to-cta/20 rounded-full px-6 py-4 hover-scale">
              <Clock className="text-cta" size={24} />
              <span className="text-light font-semibold">✅ 48-Hour Delivery</span>
            </div>
            <div className="flex items-center gap-3 bg-gradient-to-r from-accent/20 to-cta/20 rounded-full px-6 py-4 hover-scale">
              <RotateCcw className="text-cta" size={24} />
              <span className="text-light font-semibold">✂️ Unlimited Revisions</span>
            </div>
            <div className="flex items-center gap-3 bg-gradient-to-r from-accent/20 to-cta/20 rounded-full px-6 py-4 hover-scale">
              <Headphones className="text-cta" size={24} />
              <span className="text-light font-semibold">💬 Dedicated Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
