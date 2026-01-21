"use client"

import { Users, PenTool, Megaphone, Search, Mail, ArrowRight } from "lucide-react"

const SERVICES = [
  {
    icon: Users,
    title: "Social Media Management",
    description: "Full-service management for Instagram, TikTok, LinkedIn, and Facebook to grow your community."
  },
  {
    icon: PenTool,
    title: "Content Marketing",
    description: "Strategic blog posts, newsletters, and case studies that establish authority and drive organic traffic."
  },
  {
    icon: Megaphone,
    title: "Paid Advertising",
    description: "High-ROI campaigns on Google, Meta, and LinkedIn designed to scale your lead generation."
  },
  {
    icon: Search,
    title: "SEO & Visibility",
    description: "On-page optimization and backlink strategies to dominate search rankings locally and globally."
  },
  {
    icon: Mail,
    title: "Email Marketing",
    description: "Automated workflows and retention campaigns that turn subscribers into loyal customers."
  }
]

export function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-white text-black">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-gray-500 uppercase bg-gray-100 rounded-full">
              Our Expertise
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4" style={{ fontFamily: '"Geist Sans", sans-serif' }}>
              Comprehensive Digital Growth
            </h2>
            <p className="text-xl text-gray-500 leading-relaxed">
              We provide the core pillars needed to scale your brand in the modern digital landscape.
            </p>
          </div>

          <button
            onClick={() => document.getElementById("plan-builder")?.scrollIntoView({ behavior: "smooth" })}
            className="group flex items-center gap-2 text-sm font-bold border-b border-black pb-1 hover:text-gray-600 hover:border-gray-600 transition-colors"
          >
            Build Your Custom Plan
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl border border-gray-100 bg-white hover:border-black hover:shadow-xl transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center mb-6 group-hover:bg-black group-hover:text-white transition-colors">
                <service.icon size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-gray-500 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}

          {/* CTA Card */}
          <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col justify-center items-start hover:bg-gray-100 transition-colors">
            <h3 className="text-xl font-bold mb-3">Need something specific?</h3>
            <p className="text-gray-500 mb-6">
              We tailor our services to your unique goals. Let's discuss a custom strategy.
            </p>
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="font-bold underline underline-offset-4 hover:text-gray-600 transition-colors"
            >
              Contact Support
            </button>
          </div>

        </div>

      </div>
    </section>
  )
}
