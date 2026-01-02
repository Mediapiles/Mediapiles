import React, { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { BarChart2, Palette, Zap, Sparkles } from "lucide-react"

export function ServicesSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })

  const services = [
    {
      icon: Zap,
      title: "Motion Graphics Excellence",
      description: "Professional editors with 2+ years of specialized experience in dynamic motion design, sophisticated title animations, and compelling visual narratives.",
      details: "We deliver precision-crafted animations that enhance brand identity and elevate your content's production value to professional standards.",
      color: "#00C828"
    },
    {
      icon: Palette,
      title: "Cinematic Production",
      description: "Expert proficiency across diverse editing styles including cinematic storytelling, professional podcast production, and platform-optimized social content.",
      details: "From cinema-grade color correction to strategic social media cuts, we adapt our expertise to align with your brand vision.",
      color: "#00A020"
    },
    {
      icon: BarChart2,
      title: "Audience Retention Strategy",
      description: "Data-driven video engineering focused on viewer retention metrics, ensuring sustained attention from opening frame through completion.",
      details: "Leveraging analytics and proven methodologies, we optimize every element to maximize watch time and build loyal audiences.",
      color: "#008818"
    },
    {
      icon: Sparkles,
      title: "Conversion-Focused Content",
      description: "Advanced design methodologies, strategic transitions, and psychological engagement hooks engineered to stop scrolling behavior.",
      details: "We architect high-impact opening sequences with data-backed strategies that convert passive viewers into active participants.",
      color: "#007010"
    },
  ]

  return (
    <section 
      ref={sectionRef}
      className="py-24 px-4 relative overflow-hidden" 
      style={{ backgroundColor: "#FAFAFA" }}
    >
      {/* Animated Green Blur Effects */}
      <motion.div
        className="absolute top-20 left-10 rounded-full pointer-events-none"
        style={{
          width: '384px',
          height: '384px',
          background: 'radial-gradient(circle, rgba(0, 200, 40, 0.08) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
        animate={{
          x: [0, 60, 0],
          y: [0, 40, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 rounded-full pointer-events-none"
        style={{
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(0, 200, 40, 0.06) 0%, transparent 70%)',
          filter: 'blur(110px)',
        }}
        animate={{
          x: [0, -50, 0],
          y: [0, -60, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 1 }}
        >
          <div 
            className="inline-block mb-4 px-4 py-2 rounded-full text-sm font-medium"
            style={{ 
              backgroundColor: 'rgba(0, 200, 40, 0.1)',
              color: '#00A020',
              fontFamily: 'Poppins, sans-serif'
            }}
          >
            PROFESSIONAL SERVICES
          </div>
          <h1
            className="text-5xl md:text-6xl text-center mb-6 font-bold"
            style={{ fontFamily: 'Poppins, sans-serif', color: '#1A1A1A' }}
          >
            Elevate Your Content
          </h1>
          <p 
            className="text-xl max-w-3xl mx-auto"
            style={{ fontFamily: 'Poppins, sans-serif', color: '#4A4A4A', lineHeight: '1.6' }}
          >
            Industry-leading video production services combining technical excellence with creative innovation
          </p>
        </motion.div>

        {/* Horizontal Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={index}
                className="group relative overflow-hidden rounded-2xl p-7"
                style={{
                  border: '1px solid rgba(0, 200, 40, 0.2)', 
                  backgroundColor: 'rgba(255, 255, 255, 0.98)', 
                  backdropFilter: 'blur(12px)',
                  boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
                }}
                initial={{ opacity: 0, y: 60, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 60, scale: 0.9 }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.15,
                  ease: [0.32, 0.72, 0, 1]
                }}
                whileHover={{ 
                  y: -10,
                  scale: 1.02,
                  boxShadow: '0 12px 40px rgba(0, 200, 40, 0.12)',
                }}
              >
                {/* Hover overlay */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${service.color}08 0%, transparent 100%)`
                  }}
                />

                <div className="relative z-10">
                  <motion.div
                    className="mb-5"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon 
                      size={40} 
                      style={{ color: service.color }}
                      strokeWidth={2.2} 
                    />
                  </motion.div>
                  
                  <h2 
                    className="text-xl font-bold mb-4"
                    style={{ 
                      fontFamily: 'Poppins, sans-serif',
                      color: '#1A1A1A',
                      lineHeight: '1.3'
                    }}
                  >
                    {service.title}
                  </h2>
                  
                  <p 
                    className="leading-relaxed text-sm mb-4"
                    style={{ 
                      fontFamily: 'Poppins, sans-serif',
                      color: '#4A4A4A',
                      lineHeight: '1.6'
                    }}
                  >
                    {service.description}
                  </p>
                  
                  <p 
                    className="leading-relaxed text-xs"
                    style={{ 
                      fontFamily: 'Poppins, sans-serif',
                      color: '#6A6A6A',
                      lineHeight: '1.5'
                    }}
                  >
                    {service.details}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          className="max-w-5xl mx-auto text-center mt-24 px-8 py-12 rounded-3xl relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(0, 200, 40, 0.05) 0%, rgba(0, 200, 40, 0.02) 100%)',
            border: '1px solid rgba(0, 200, 40, 0.15)',
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <p 
            className="text-xl leading-relaxed mb-6"
            style={{ 
              fontFamily: 'Poppins, sans-serif',
              color: '#2A2A2A',
              lineHeight: '1.7'
            }}
          >
            <span className="font-semibold">Transform your vision into reality.</span> Every project receives meticulous attention to detail, combining technical precision with creative excellence.
          </p>
          <motion.button
            className="px-8 py-4 rounded-full font-semibold text-base"
            style={{
              backgroundColor: '#00C828',
              color: '#FFFFFF',
              fontFamily: 'Poppins, sans-serif',
              border: 'none',
              cursor: 'pointer'
            }}
            whileHover={{ 
              scale: 1.05,
              backgroundColor: '#00A020',
              boxShadow: '0 8px 24px rgba(0, 200, 40, 0.3)'
            }}
            whileTap={{ scale: 0.98 }}
          >
            Start Your Project
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}