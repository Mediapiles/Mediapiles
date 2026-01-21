"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const CLIENTS = [
  "/clients/client-1.jpeg",
  "/clients/client-2.jpg",
  "/clients/client-3.png",
  "/clients/client-4.jpg",
  "/clients/client-5.jpg",
  "/clients/client-6.jpg",
]

export function ClientsSection() {
  return (
    <section id="clients" className="py-24 bg-white text-black overflow-hidden">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4" style={{ fontFamily: '"Geist Sans", sans-serif' }}>
              Trusted by Brands
            </h2>
            <p className="text-base md:text-lg text-gray-500">
              From startups to global agencies — we help brands grow through motion design and strategic content.
            </p>
          </motion.div>
        </div>

        {/* Logo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 justify-items-center">
          {CLIENTS.map((logo, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                scale: 0.8,
                rotate: index % 2 === 0 ? -5 : 5
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
                rotate: 0
              }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.34, 1.56, 0.64, 1] // Spring-like cubic bezier
              }}
              className="w-full max-w-[280px] h-[180px] bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-gray-100 flex items-center justify-center p-8 hover:shadow-md transition-shadow relative group"
            >
              <div className="relative w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500 opacity-80 group-hover:opacity-100">
                <Image
                  src={logo}
                  alt={`Client Logo ${index + 1}`}
                  fill
                  className="object-contain"
                />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}