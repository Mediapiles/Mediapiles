"use client"

import React, { useRef, useState, useEffect, useMemo } from "react"
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

// --- Configuration ---
const FRAME_COUNT = 192
// Base path for the image sequence. 
// Uses the user's specific folder and naming convention
const FILENAME_PREFIX = "/New folder/_MConverter.eu_A_smooth_cinematic_1080p_202601221408-"
const FILENAME_EXTENSION = ".jpg"

export function EditingStyleScroll() {
    const containerRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [loadProgress, setLoadProgress] = useState(0)

    // Store loaded images in a ref to avoid re-renders
    const imagesRef = useRef<HTMLImageElement[]>([])

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    })

    // --- 1. Load Images ---
    useEffect(() => {
        let isMounted = true
        const loadImages = async () => {
            const loaded: HTMLImageElement[] = []
            let loadedCount = 0

            for (let i = 1; i <= FRAME_COUNT; i++) {
                const img = new Image()
                img.src = `${FILENAME_PREFIX}${i}${FILENAME_EXTENSION}`

                await new Promise<void>((resolve) => {
                    img.onload = () => {
                        loadedCount++
                        if (isMounted) setLoadProgress(Math.round((loadedCount / FRAME_COUNT) * 100))
                        resolve()
                    }
                    img.onerror = () => {
                        console.warn(`Failed to load frame ${i}`)
                        resolve()
                    }
                })
                loaded.push(img)
            }

            if (isMounted) {
                imagesRef.current = loaded
                setIsLoading(false)
            }
        }

        loadImages()
        return () => { isMounted = false }
    }, [])

    // --- 2. Canvas Drawing Logic ---
    const renderFrame = useMemo(() => {
        return (index: number) => {
            const canvas = canvasRef.current
            if (!canvas || !imagesRef.current.length) return

            const ctx = canvas.getContext("2d")
            if (!ctx) return

            const img = imagesRef.current[index]
            // Check naturalWidth to ensure image is valid
            if (!img || !img.complete || img.naturalWidth === 0) return

            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // "Cover" Fit Logic with slight Zoom Out (0.95x) to reveal edges
            const zoomFactor = 0.95
            const scale = Math.max(canvas.width / img.width, canvas.height / img.height) * zoomFactor
            const w = img.width * scale
            const h = img.height * scale
            const x = (canvas.width - w) / 2
            const y = (canvas.height - h) / 2

            ctx.drawImage(img, x, y, w, h)
        }
    }, [])

    // --- 3. Handle Resize ---
    useEffect(() => {
        const handleResize = () => {
            const canvas = canvasRef.current
            if (canvas) {
                const dpr = window.devicePixelRatio || 1
                // Use window inner dimensions to ensure full coverage
                const width = window.innerWidth
                const height = window.innerHeight

                // Set physical pixel size
                canvas.width = width * dpr
                canvas.height = height * dpr

                // Ensure CSS fills the container
                canvas.style.width = "100%"
                canvas.style.height = "100%"

                // Note: We do NOT use ctx.scale(dpr, dpr) here.
                // We draw using the physical pixel dimensions in renderFrame for max clarity.

                // Redraw current frame
                const currentProgress = scrollYProgress.get()
                const maxIndex = imagesRef.current.length - 1
                if (maxIndex < 0) return

                const frameIndex = Math.min(Math.floor(currentProgress * maxIndex), maxIndex)
                renderFrame(Math.max(0, frameIndex))
            }
        }

        window.addEventListener("resize", handleResize)
        if (!isLoading) handleResize()

        return () => window.removeEventListener("resize", handleResize)
    }, [renderFrame, scrollYProgress, isLoading])

    // --- 4. Scroll Sync ---
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (isLoading || imagesRef.current.length === 0) return

        const maxIndex = imagesRef.current.length - 1
        const frameIndex = Math.min(Math.floor(latest * maxIndex), maxIndex)

        requestAnimationFrame(() => renderFrame(frameIndex))
    })

    // Fallback initial draw
    useEffect(() => {
        if (!isLoading) {
            window.dispatchEvent(new Event('resize'))
        }
    }, [isLoading])


    return (
        <div ref={containerRef} className="relative h-[300vh] bg-white">

            {/* Sticky Canvas Container */}
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-white">

                {/* Loader */}
                <AnimatePresence>
                    {isLoading && (
                        <motion.div
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white"
                        >
                            <div className="h-10 w-10 border-4 border-gray-100 border-t-black rounded-full animate-spin mb-4" />
                            <p className="text-sm font-medium tracking-widest text-gray-500 uppercase">
                                Loading Experience... {loadProgress}%
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>

                <canvas
                    ref={canvasRef}
                    className="block w-full h-full object-cover"
                    style={{ width: "100%", height: "100%" }}
                />

                {/* Text Overlays Removed as requested */}

            </div>
        </div>
    )
}
