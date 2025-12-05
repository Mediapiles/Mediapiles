"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useInView } from "framer-motion"

export default function CustomPlanBuilder() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      ref={ref}
      className="py-20 bg-gradient-to-br from-dark to-accent/10 overflow-hidden"
      id="custom-plan"
    >
      <div className="container mx-auto px-4 max-w-5xl">

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-black text-light text-center mb-8"
        >
          Build Your <span className="text-cta">Custom Plan</span>
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
          className="text-light/70 text-center max-w-2xl mx-auto mb-12 text-lg"
        >
          Choose the exact services you need — we tailor everything to your vision and budget.
        </motion.p>

        {/* Box Container */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35, duration: 0.8, ease: "easeOut" }}
          className="bg-dark/60 border border-accent/20 rounded-2xl p-10 shadow-lg"
        >
          {/* Example content inside */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.55, duration: 0.7 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="p-6 rounded-xl bg-accent/10 border border-accent/20">
              <h3 className="text-xl font-bold text-light mb-2">Video Editing</h3>
              <p className="text-light/60 text-sm">Short-form, long-form, highlights & more</p>
            </div>

            <div className="p-6 rounded-xl bg-accent/10 border border-accent/20">
              <h3 className="text-xl font-bold text-light mb-2">Thumbnail Design</h3>
              <p className="text-light/60 text-sm">CTR-boosted, scroll-stopping thumbnails</p>
            </div>

            <div className="p-6 rounded-xl bg-accent/10 border border-accent/20">
              <h3 className="text-xl font-bold text-light mb-2">Motion Graphics</h3>
              <p className="text-light/60 text-sm">Transitions, animations, subtitles, effects</p>
            </div>

            <div className="p-6 rounded-xl bg-accent/10 border border-accent/20">
              <h3 className="text-xl font-bold text-light mb-2">Custom Packages</h3>
              <p className="text-light/60 text-sm">Build a plan tailored to your goals</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
