"use client"

import { Play, Pause, Volume2, VolumeX } from "lucide-react"
import { useRef, useState, useEffect } from "react"

// Define the custom Replay Icon
const ReplayIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20C7.58 20 4 16.42 4 12C4 10.23 4.5 8.57 5.37 7.15L7.75 9.53L10.5 7.5L7.5 4.5L5.47 6.88C4.54 8.28 4 10.05 4 12C4 15.31 6.69 18 10 18H14.5C15.05 18 15.5 17.55 15.5 17C15.5 16.45 15.05 16 14.5 16H10C7.79 16 6 14.21 6 12C6 9.79 7.79 8 10 8H14C15.66 8 17 9.34 17 11C17 12.66 15.66 14 14 14H10C9.45 14 9 14.45 9 15C9 15.55 9.45 16 10 16H14C16.21 16 18 14.21 18 12C18 9.79 16.21 8 14 8H10C8.34 8 7 9.34 7 11C7 12.66 8.34 14 10 14H14Z" fill="currentColor"/>
        <path d="M13.5 10L10.5 12L13.5 14V10Z" fill="white" opacity="0"/>
    </svg>
);

// --- START: VideoCard Definition (MUST BE BEFORE PortfolioSection) ---
function VideoCard({ title, src }: { title: string; src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [ended, setEnded] = useState(false)

  // Autoplay on scroll (when video is visible)
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {})
            setIsPlaying(true)
          } else {
            video.pause()
            setIsPlaying(false)
          }
        })
      },
      { threshold: 0.8 }
    )

    observer.observe(video)
    return () => observer.unobserve(video)
  }, [])

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
    <div className="group relative aspect-[9/16] rounded-xl overflow-hidden bg-black shadow-2xl hover:shadow-glow-md">
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-cover"
        muted={isMuted}
        playsInline
        preload="metadata"
        onEnded={handleEnded}
      />

      {/* Hover controls (Using a darker background for better visibility on dark track) */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 translate-y-10 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-in-out z-10 flex gap-3 items-center bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-lg">
        <button onClick={togglePlay} className="text-white hover:scale-110 transition">
          {ended ? (
            <ReplayIcon className="w-5 h-5" style={{ color: "white" }}/>
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
// --- END: VideoCard Definition ---


// Define the core video list. We will duplicate this list for the loop effect.
const CORE_VIDEOS = [
  { title: "Entrepreneurs", src: "/Entepenures.mp4" },
  { title: "Podcast", src: "/Podcast.mp4" },
  { title: "Real Estate", src: "/Real estate.mp4" },
  { title: "Trendy Motion", src: "/trendy motion graphics.mp4" },
]

// Duplicate the array 3 times to create enough content for seamless scrolling
const LOOP_VIDEOS = [...CORE_VIDEOS, ...CORE_VIDEOS, ...CORE_VIDEOS]

// --- START: PortfolioSection Definition ---
export function PortfolioSection() {
  const [isPaused, setIsPaused] = useState(false);
  
  const ANIMATION_DURATION = CORE_VIDEOS.length * 5; // e.g., 4 videos * 5s = 20s cycle

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  return (
    <section
  id="portfolio"
  className="py-20 overflow-hidden"
  style={{ backgroundColor: "#001C0E" }}
>
      
      {/* CSS for the continuous scroll animation */}
      <style jsx global>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 3)); 
          }
        }
        
        .scrolling-container {
          animation: scroll ${ANIMATION_DURATION}s linear infinite;
        }
        .scrolling-container.is-paused {
            animation-play-state: paused;
        }
      `}</style>
      
      <div className="container mx-auto max-w-6xl px-4">
        <h2 className="font-serif text-4xl md:text-5xl font-bold mb-8 text-center text-white">
          Featured Work
        </h2>
      </div>

      {/* Scrolling Portfolio Track */}
      <div 
        className="relative w-full"
        onMouseEnter={handleMouseEnter} // Pause animation on hover
        onMouseLeave={handleMouseLeave} // Resume animation on mouse leave
      >
        <div 
          className={`scrolling-container flex space-x-6 min-w-max px-4 md:px-0 ${isPaused ? 'is-paused' : ''}`}
        >
          {LOOP_VIDEOS.map((video, index) => (
            <div 
              key={index}
              className="flex-shrink-0 w-64 aspect-[9/16]" 
            >
              {/* This is the line that caused the error, now VideoCard is defined above */}
              <VideoCard 
                title={video.title} 
                src={video.src} 
              />
            </div>
          ))}
        </div>
      </div>
      
    </section>
  )
}