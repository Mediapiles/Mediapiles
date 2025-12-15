"use client"

import React, { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { BarChart2, Palette, Zap } from "lucide-react"

// --- Framer Motion Configuration (FIXED and Final) ---

// 1. Define the custom transition for smooth motion, taken from the ArtworkCard.tsx.
const smoothTransition = {
  duration: 0.8,
  ease: [0.32, 0.72, 0, 1] as [number, number, number, number], 
};

// 2. Define the container variants for staggered children
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// 3. Define the item variants and APPLY the transition object directly
const itemVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: smoothTransition, 
  },
};
// -----------------------------------

export function ServicesSection() {
  const sectionRef = useRef(null);
  // useInView triggers the 'visible' state when the section enters the viewport
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 }); 

  // Custom style for the glass frame effect
  const cardGlassStyle: React.CSSProperties = {
    // Border changed from 'white' to a semi-transparent Neon Green
    border: '1px solid rgba(0, 255, 51, 0.2)', 
    // Background color remains a light, transparent tone for the glass effect
    backgroundColor: 'rgba(255, 255, 255, 0.05)', 
    backdropFilter: 'blur(5px)',
  };

  // Define the Neon Green shadow for cards
  const neonShadow = "0 10px 30px rgba(0, 255, 51, 0.15), 0 0 15px rgba(0, 255, 51, 0.1)";

  return (
    // UPDATED: Background color changed to #001C0E
    <motion.section 
      id="services" 
      ref={sectionRef}
      className="py-20 px-4" 
      style={{ backgroundColor: "#001C0E" }}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"} // Animate when section is in view
    >
      <div className="container mx-auto max-w-6xl">

        {/* Header - Uses motion.h1 and the itemVariants */}
        <motion.h1
          className="font-serif text-4xl md:text-5xl font-bold text-center mb-16 text-white"
          variants={itemVariants}
        >
          Our Creative Promise
        </motion.h1>

        {/* Cards Grid - Uses motion.div, allowing stagger to work on children */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
          variants={containerVariants} // This container facilitates the stagger
        >
          
          {/* Card 1 - Motion Graphics Mastery */}
          <motion.div
            className="group relative overflow-hidden rounded-2xl p-8 shadow-2xl" 
            style={cardGlassStyle}
            variants={itemVariants} // Apply entry animation
            whileHover={{ y: -5, boxShadow: neonShadow }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }} // Apply smooth hover physics
          >
            {/* Glassmorphism frame element */}
            <div 
              className="absolute inset-0 rounded-2xl border border-[#00FF33]/20 bg-[#00FF33]/5 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 opacity-0" 
            />

            <div className="relative z-10">
              <Zap size={32} className="mb-4 text-[#00FF33]" />
              <h2 className="text-2xl font-serif font-bold mb-4 text-white">Motion Graphics Mastery</h2>
              <p className="text-white/70 leading-relaxed">
                Editors with over <strong>2+ years</strong> of hands-on experience in dynamic motion design, title animations,
                and impactful visual storytelling using Adobe After Effects.
              </p>
            </div>
          </motion.div>

          {/* Card 2 - Cinematic Versatility */}
          <motion.div
            className="group relative overflow-hidden rounded-2xl p-8 shadow-2xl"
            style={cardGlassStyle}
            variants={itemVariants}
            whileHover={{ y: -5, boxShadow: neonShadow }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {/* Glassmorphism frame element */}
            <div 
              className="absolute inset-0 rounded-2xl border border-[#00FF33]/20 bg-[#00FF33]/5 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 opacity-0" 
            />
            
            <div className="relative z-10">
              <Palette size={32} className="mb-4 text-[#00FF33]" />
              <h2 className="text-2xl font-serif font-bold mb-4 text-white">Cinematic Versatility</h2>
              <p className="text-white/70 leading-relaxed">
                Proficiency in multiple editing styles like <strong>cinematic cuts, podcast edits,</strong> and social-first content,
                perfectly optimized for fast engagement and retention.
              </p>
            </div>
          </motion.div>

          {/* Card 3 - Retention Strategy (FIXED) */}
          <motion.div
            className="group relative overflow-hidden rounded-2xl p-8 shadow-2xl"
            style={cardGlassStyle}
            variants={itemVariants}
            whileHover={{ y: -5, boxShadow: neonShadow }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {/* Glassmorphism frame element */}
            <div 
              className="absolute inset-0 rounded-2xl border border-[#00FF33]/20 bg-[#00FF33]/5 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 opacity-0" 
            />
            
            <div className="relative z-10">
              {/* Icon is now on its own line */}
              <BarChart2 size={32} className="mb-4 text-[#00FF33]" />
              {/* Heading is now placed correctly */}
              <h2 className="text-2xl font-serif font-bold mb-4 text-white">Retention Strategy</h2>
              <p className="text-white/70 leading-relaxed">
                We don’t just cut clips — we craft videos designed for <strong>viewer retention</strong>, holding
                attention from the first frame to the last scroll stop.
              </p>
            </div>
          </motion.div>

          {/* Card 4 - Scroll-Stopping Hooks (FIXED) */}
          <motion.div
            className="group relative overflow-hidden rounded-2xl p-8 shadow-2xl"
            style={cardGlassStyle}
            variants={itemVariants}
            whileHover={{ y: -5, boxShadow: neonShadow }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {/* Glassmorphism frame element */}
            <div 
              className="absolute inset-0 rounded-2xl border border-[#00FF33]/20 bg-[#00FF33]/5 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 opacity-0" 
            />
            
            <div className="relative z-10">
              {/* Icon is now on its own line */}
              <Palette size={32} className="mb-4 text-[#00FF33]" />
              {/* Heading is now placed correctly */}
              <h2 className="text-2xl font-serif font-bold mb-4 text-white">Scroll-Stopping Hooks</h2>
              <p className="text-white/70 leading-relaxed">
                Modern design techniques, scroll-stopping transitions, and storytelling hooks that make your content
                impossible to ignore.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Supporting text */}
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={itemVariants}
        >
          <p className="text-white/80 text-lg leading-relaxed font-serif italic">
            "Every project we touch is engineered to capture attention and convert views into results — whether you're
            building your brand, growing a podcast, or launching scroll-worthy reels."
          </p>
        </motion.div>
      </div>
    </motion.section>
  )
}