"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

const ScrollRevealText = ({ isScrolled }: { isScrolled: boolean }) => {
    return (
        <div className="relative h-8 md:h-12 flex items-center">
            {/* 
               Invisible spacer to ensure the container always takes the width of the longest text.
               This prevents layout shifting when switching between strings.
            */}
            <div className="invisible opacity-0 h-full flex items-center text-sm md:text-xl font-bold tracking-widest uppercase whitespace-nowrap px-1 select-none">
                Saves 10,000 Hours
            </div>

            {/* Content Container */}
            <div className="absolute inset-0 flex items-center">
                <AnimatePresence mode="wait" initial={false}>
                    {!isScrolled ? (
                        <motion.div
                            key="brand"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="absolute left-0 text-sm md:text-xl font-bold tracking-widest text-black uppercase whitespace-nowrap"
                        >
                            Mediapiles
                        </motion.div>
                    ) : (
                        <motion.div
                            key="slogan"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="absolute left-0 text-sm md:text-xl font-bold tracking-widest text-[#D4AF37] uppercase whitespace-nowrap"
                        >
                            Saves 10,000 Hours
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

export const HeroReveal = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
    const [isScrolled, setIsScrolled] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    // Track mouse position relative to the full-screen container
    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return
        const rect = containerRef.current.getBoundingClientRect()
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        })
    }

    // Handle scroll trigger
    useEffect(() => {
        const handleScroll = () => {
            // Lowered threshold to 20px for quicker response, or keep 50
            if (window.scrollY > 30) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <div
            ref={containerRef}
            className="relative w-full h-screen bg-white overflow-hidden"
            onMouseMove={handleMouseMove}
        >

            {/* Text Positioned Left Center */}
            <div className="absolute left-8 md:left-12 top-1/2 -translate-y-1/2 z-30 pointer-events-auto mix-blend-multiply">
                <ScrollRevealText isScrolled={isScrolled} />
            </div>

            {/* 
         LAYER 1 (Bottom): Sharp Image 
         Visible when the Top Layer is masked (erased)
      */}
            <div className="absolute inset-x-0 bottom-0 z-0 flex items-end justify-center pointer-events-none select-none">
                <img
                    src="/hero/portrait-sharp.png"
                    alt="Sharp Portrait Base"
                    className="h-[80vh] w-auto max-w-full object-contain object-bottom"
                    draggable={false}
                />
            </div>

            {/* 
         LAYER 2 (Top): Blurred Image 
         Default visible layer. 
         The mask is applied to this CONTAINER (full screen), so coordinates match mousePos 1:1.
      */}
            <div
                className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-center pointer-events-none select-none"
                style={{
                    // Mask Logic:
                    // Center (at mouse) -> Transparent (alpha 0) -> Reveal bottom layer
                    // Edge -> Black (alpha 1) -> Show this blurred layer
                    maskImage: `radial-gradient(circle 250px at ${mousePos.x}px ${mousePos.y}px, transparent 10%, black 100%)`,
                    WebkitMaskImage: `radial-gradient(circle 250px at ${mousePos.x}px ${mousePos.y}px, transparent 10%, black 100%)`,
                }}
            >
                <img
                    src="/hero/portrait-blurred.png"
                    alt="Blurred Silhouette Overlay"
                    className="h-[80vh] w-auto max-w-full object-contain object-bottom"
                    draggable={false}
                />
            </div>

            {/* 
          VIGNETTE / FEATHERED BORDER OVERLAY 
      */}
            <div className="absolute inset-0 z-20 pointer-events-none">
                {/* Radial for overall softness */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_farthest-side_at_center_bottom,transparent_50%,white_100%)]" />

                {/* Strong bottom fade to ensure the bottom edge is soft */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent" />
            </div>

        </div>
    )
}
