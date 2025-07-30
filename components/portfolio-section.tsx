"use client"

import { Play, Pause, Volume2, VolumeX } from "lucide-react"
import { useRef, useState } from "react"

export function PortfolioSection() {
  return (
    <section id="portfolio" className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold mb-8 text-center">My Work</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <VideoCard title="Entrepreneurs" src="/Entepenures.mp4" />
          <VideoCard title="Podcast" src="/podcast.mp4" />
          <VideoCard title="Real Estate" src="/Real estate.mp4" />
          <VideoCard title="Trendy Motion" src="/trendy motion graphics.mp4" />
        </div>
      </div>
    </section>
  )
}

function VideoCard({ title, src }: { title: string; src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [ended, setEnded] = useState(false)

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (ended) {
      video.currentTime = 0
      video.play()
      setEnded(false)
      setIsPlaying(true)
    } else if (video.paused) {
      video.play()
      setIsPlaying(true)
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return
    video.muted = !video.muted
    setIsMuted(video.muted)
  }

  const handleEnded = () => {
    setEnded(true)
    setIsPlaying(false)
  }

  return (
    <div className="group relative aspect-[9/16] rounded-xl overflow-hidden bg-black shadow-md">
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-cover"
        muted={isMuted}
        playsInline
        preload="metadata"
        onEnded={handleEnded}
      />

      {/* Hover controls */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 translate-y-10 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-in-out z-10 flex gap-3 items-center bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-md">
        <button onClick={togglePlay} className="text-white hover:scale-110 transition">
          {ended ? (
            // Replay Icon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582M4 9a8 8 0 108 8V9.582A7.97 7.97 0 004 9z" />
            </svg>
          ) : isPlaying ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5" />
          )}
        </button>
        <button onClick={toggleMute} className="text-white hover:scale-110 transition">
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
      </div>

      {/* Title Overlay */}
      <div className="absolute bottom-0 w-full bg-black/60 text-white text-sm text-center py-2">
        {title}
      </div>
    </div>
  )
}
