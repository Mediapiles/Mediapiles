"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Mail, MessageSquare, User } from "lucide-react"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const result = await res.json()

      if (res.ok) {
        setSubmitted(true)
        setFormData({ name: "", email: "", message: "" })
      } else {
        console.error("API Error:", result)
        alert(`Failed to send message: ${result.error?.message || result.error || "Unknown error"}`)
      }
    } catch (error) {
      console.error("Submission error", error)
      alert("An unexpected error occurred. Please check the console.")
    }
  }

  return (
    <section id="contact" className="py-24 bg-white text-black">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-gray-500 uppercase bg-gray-100 rounded-full">
            Contact
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4" style={{ fontFamily: '"Geist Sans", sans-serif' }}>
            Let's Start Your Project
          </h2>
          <p className="text-gray-500 text-lg">
            Ready to elevate your content? Fill out the form below and we'll get back to you within 24 hours.
          </p>
        </div>

        <div className="bg-white p-2">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-semibold text-gray-900">
                    Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      id="name"
                      type="text"
                      name="name"
                      required
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg text-black placeholder:text-gray-400 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-semibold text-gray-900">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      id="email"
                      type="email"
                      name="email"
                      required
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg text-black placeholder:text-gray-400 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-semibold text-gray-900">
                  Project Details
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-4 text-gray-400" size={18} />
                  <textarea
                    id="message"
                    name="message"
                    required
                    placeholder="Tell us about your goals, timeline, and budget..."
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg text-black placeholder:text-gray-400 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-all resize-y min-h-[120px]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white font-bold text-lg py-4 rounded-lg hover:bg-gray-900 transition-colors shadow-lg flex items-center justify-center gap-2 group"
              >
                Send Message
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <ArrowRight size={32} className="-rotate-45" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
              <p className="text-gray-500">
                Thanks for reaching out. We'll be in touch shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-8 text-sm font-semibold text-black underline underline-offset-4 hover:text-gray-600"
              >
                Send another message
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}

