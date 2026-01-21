"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Pause, Volume2, VolumeX, Users, Eye, Clock } from "lucide-react"

// --- Data ---

const VIDEOS = [
  {
    id: 1,
    title: "Viral Reels Edit",
    subtitle: "Short Form Content",
    src: "/Entepenures.mp4",
    metrics: {
      followers: { value: "+24K", label: "Followers gained", percentage: 95, color: "#ef4444" }, // Red/Orange
      views: { value: "850K", label: "Total views", percentage: 88, color: "#3b82f6" }, // Blue
      retention: { value: "78%", label: "Avg. watch time", percentage: 92, color: "#a855f7" } // Purple
    }
  },
  {
    id: 2,
    title: "Podcast Highlights",
    subtitle: "Social Clips",
    src: "/Podcast.mp4",
    metrics: {
      followers: { value: "+12K", label: "Followers gained", percentage: 80, color: "#f97316" }, // Orange
      views: { value: "420K", label: "Total views", percentage: 75, color: "#0ea5e9" }, // Sky
      retention: { value: "65%", label: "Avg. watch time", percentage: 85, color: "#d946ef" } // Fuchsia
    }
  },
  {
    id: 3,
    title: "Luxury Property Tour",
    subtitle: "Brand Storytelling",
    src: "/Real estate.mp4",
    metrics: {
      followers: { value: "+5.5K", label: "Followers gained", percentage: 70, color: "#ef4444" },
      views: { value: "1.2M", label: "Total views", percentage: 98, color: "#3b82f6" },
      retention: { value: "82%", label: "Avg. watch time", percentage: 90, color: "#a855f7" }
    }
  },
  {
    id: 4,
    title: "Dynamic Motion",
    subtitle: "Visual Effects",
    src: "/trendy motion graphics.mp4",
    metrics: {
      followers: { value: "+18K", label: "Followers gained", percentage: 92, color: "#f97316" },
      views: { value: "600K", label: "Total views", percentage: 82, color: "#0ea5e9" },
      retention: { value: "88%", label: "Avg. watch time", percentage: 94, color: "#d946ef" }
    }
  },
]

// --- Components ---

function MainPlayer({ video }: { video: typeof VIDEOS[0] }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)

  useEffect(() => {
    const el = videoRef.current
    if (!el) return

    el.currentTime = 0
    el.muted = true
    setIsMuted(true)

    const playPromise = el.play()
    if (playPromise !== undefined) {
      playPromise.then(() => setIsPlaying(true)).catch(() => setIsPlaying(false))
    }
  }, [video.id])

  const togglePlay = () => {
    if (!videoRef.current) return
    if (videoRef.current.paused) {
      videoRef.current.play()
      setIsPlaying(true)
    } else {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }

  const toggleMute = () => {
    if (!videoRef.current) return
    videoRef.current.muted = !videoRef.current.muted
    setIsMuted(videoRef.current.muted)
  }

  return (
    <div className="relative w-full h-full bg-black group rounded-2xl overflow-hidden shadow-lg">
      <video
        ref={videoRef}
        src={video.src}
        className="w-full h-full object-cover"
        playsInline
        muted={isMuted}
        loop
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10 pointer-events-none" />

      {/* Info & Controls */}
      <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
        <div>
          <h3 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: '"Geist Sans", sans-serif' }}>
            {video.title}
          </h3>
          <p className="text-white/80 text-sm font-medium">
            {video.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleMute}
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10 transition-all"
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
          <button
            onClick={togglePlay}
            className="p-3 rounded-full bg-white text-black hover:scale-105 transition-all shadow-glow"
          >
            {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
          </button>
        </div>
      </div>
    </div>
  )
}

function MetricCard({
  icon: Icon,
  value,
  label,
  percentage,
  color
}: {
  icon: any,
  value: string,
  label: string,
  percentage: number,
  color: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white border border-gray-100 rounded-2xl p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] flex flex-col justify-between h-full hover:shadow-lg transition-shadow"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="p-2.5 rounded-xl bg-gray-50 text-gray-900">
          <Icon size={20} />
        </div>
        <span className="text-xs font-semibold px-2 py-1 rounded-full bg-gray-50 text-gray-600">
          {percentage}%
        </span>
      </div>

      <div>
        <h4 className="text-2xl font-bold text-gray-900 tracking-tight mb-1">{value}</h4>
        <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{label}</p>
      </div>

      <div className="mt-4 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  )
}

// --- Main Section ---

export function PortfolioSection() {
  const [activeVideo, setActiveVideo] = useState(VIDEOS[0])

  return (
    <section id="portfolio" className="py-24 bg-white text-[#0f0f0f] overflow-hidden relative">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-gray-900 uppercase bg-gray-100 rounded-full border border-gray-200">
              Selected Projects
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight" style={{ fontFamily: '"Geist Sans", sans-serif' }}>
              Our Work
            </h2>
          </div>
          <p className="text-gray-500 max-w-sm text-sm md:text-base leading-relaxed">
            From viral Reels to cinematic brand storytelling, we create content that converts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

          {/* LEFT COLUMN (60%) */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            {/* Main Video Player */}
            <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl bg-gray-100">
              <MainPlayer video={activeVideo} />
            </div>

            {/* Metrics Row (Bottom Row) */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
                Project Impact
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <MetricCard
                  icon={Users}
                  value={activeVideo.metrics.followers.value}
                  label={activeVideo.metrics.followers.label}
                  percentage={activeVideo.metrics.followers.percentage}
                  color={activeVideo.metrics.followers.color}
                />
                <MetricCard
                  icon={Eye}
                  value={activeVideo.metrics.views.value}
                  label={activeVideo.metrics.views.label}
                  percentage={activeVideo.metrics.views.percentage}
                  color={activeVideo.metrics.views.color}
                />
                <MetricCard
                  icon={Clock}
                  value={activeVideo.metrics.retention.value}
                  label={activeVideo.metrics.retention.label}
                  percentage={activeVideo.metrics.retention.percentage}
                  color={activeVideo.metrics.retention.color}
                />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN (40%) - Thumbnail List */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {VIDEOS.map((video) => (
              <button
                key={video.id}
                onClick={() => setActiveVideo(video)}
                className={`group p-3 rounded-2xl transition-all duration-300 border text-left flex items-center gap-4 ${activeVideo.id === video.id
                  ? "bg-gray-50 border-gray-200 shadow-inner"
                  : "bg-white border-transparent hover:bg-gray-50 hover:border-gray-100"
                  }`}
              >
                {/* Thumbnail */}
                <div className="relative w-28 aspect-video rounded-xl overflow-hidden bg-gray-200 flex-shrink-0 shadow-sm">
                  <video
                    src={video.src}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                    muted
                    playsInline
                  />
                  {/* Play Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Play size={12} className="text-white" fill="white" />
                    </div>
                  </div>
                </div>

                {/* Text Info */}
                <div className="flex-1 min-w-0">
                  <h4 className={`text-base font-bold truncate transition-colors ${activeVideo.id === video.id ? "text-black" : "text-gray-900"
                    }`}>
                    {video.title}
                  </h4>
                  <p className="text-xs text-gray-500 font-medium truncate mt-1">
                    {video.subtitle}
                  </p>
                </div>

                {/* Active Arrow */}
                {activeVideo.id === video.id && (
                  <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white shadow-lg transform translate-x-1">
                    <Play size={12} fill="white" />
                  </div>
                )}
              </button>
            ))}

            {/* CTA Box */}
            <div className="mt-4 p-8 rounded-3xl bg-black text-white text-center relative overflow-hidden group cursor-pointer" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black opacity-50" />
              <div className="relative z-10">
                <h4 className="text-xl font-bold mb-2">Ready to scale?</h4>
                <p className="text-white/60 text-sm mb-4">Let's create content that performs.</p>
                <span className="inline-block px-6 py-2 rounded-full bg-white text-black text-sm font-bold hover:scale-105 transition-transform">
                  Book a Call
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}