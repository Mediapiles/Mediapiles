import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward } from "lucide-react"
import { useRef, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

// Video Data
const VIDEOS = [
  { id: 1, title: "Entrepreneurs", src: "/Entepenures.mp4", category: "Business" },
  { id: 2, title: "Podcast", src: "/Podcast.mp4", category: "Media" },
  { id: 3, title: "Real Estate", src: "/Real estate.mp4", category: "Property" },
  { id: 4, title: "Trendy Motion", src: "/trendy motion graphics.mp4", category: "Motion" },
]

// Thumbnail Component
function VideoThumbnail({ 
  video, 
  isActive, 
  onClick 
}: { 
  video: typeof VIDEOS[0]
  isActive: boolean
  onClick: () => void 
}) {
  const thumbnailRef = useRef<HTMLVideoElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const videoEl = thumbnailRef.current
    if (!videoEl) return

    if (isHovered) {
      videoEl.currentTime = 0
      videoEl.play().catch(() => {})
    } else {
      videoEl.pause()
    }
  }, [isHovered])

  return (
    <motion.div
      className="relative cursor-pointer rounded-xl overflow-hidden"
      style={{
        border: isActive ? '2px solid #00C828' : '1px solid rgba(0, 200, 40, 0.15)',
        backgroundColor: '#FFFFFF',
        boxShadow: isActive 
          ? '0 8px 24px rgba(0, 200, 40, 0.25)' 
          : '0 2px 8px rgba(0, 0, 0, 0.04)',
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ 
        scale: 1.05,
        y: -4,
        boxShadow: '0 12px 28px rgba(0, 200, 40, 0.2)',
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 25,
        mass: 0.5
      }}
    >
      <div className="aspect-[9/16] relative">
        <video
          ref={thumbnailRef}
          src={video.src}
          className="w-full h-full object-cover"
          muted
          playsInline
          preload="metadata"
        />
        
        {/* Overlay gradient */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent 50%)',
          }}
        />

        {/* Play icon when not active */}
        {!isActive && (
          <motion.div 
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0.7 }}
            animate={{ opacity: isHovered ? 1 : 0.7 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div 
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'rgba(0, 200, 40, 0.95)' }}
              animate={{ 
                scale: isHovered ? 1.15 : 1,
              }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 20
              }}
            >
              <Play className="w-6 h-6 text-white ml-0.5" fill="white" />
            </motion.div>
          </motion.div>
        )}

        {/* Active indicator */}
        {isActive && (
          <motion.div
            className="absolute top-2 right-2 px-2.5 py-1 rounded-full text-xs font-semibold"
            style={{
              backgroundColor: '#00C828',
              color: '#FFFFFF',
              fontFamily: 'Poppins, sans-serif',
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            NOW PLAYING
          </motion.div>
        )}

        {/* Title */}
        <div className="absolute bottom-0 left-0 right-0 p-2.5">
          <p 
            className="text-white font-semibold text-xs truncate"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            {video.title}
          </p>
          <p 
            className="text-white/60 text-[10px]"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            {video.category}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

// Main Player Component
function MainPlayer({ video }: { video: typeof VIDEOS[0] }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [showControls, setShowControls] = useState(true)

  useEffect(() => {
    const videoEl = videoRef.current
    if (!videoEl) return

    // Reset and play new video
    videoEl.currentTime = 0
    videoEl.muted = true
    setIsMuted(true)
    setIsPlaying(false)
    setCurrentTime(0)
    
    // Auto play muted for 3 seconds
    videoEl.play().then(() => {
      setIsPlaying(true)
      setTimeout(() => {
        if (videoEl) {
          videoEl.pause()
          setIsPlaying(false)
        }
      }, 3000)
    }).catch(() => {})

  }, [video.id])

  useEffect(() => {
    const videoEl = videoRef.current
    if (!videoEl) return

    const updateTime = () => setCurrentTime(videoEl.currentTime)
    const updateDuration = () => {
      if (videoEl.duration && !isNaN(videoEl.duration)) {
        setDuration(videoEl.duration)
      }
    }
    
    videoEl.addEventListener('timeupdate', updateTime)
    videoEl.addEventListener('loadedmetadata', updateDuration)
    videoEl.addEventListener('durationchange', updateDuration)
    
    if (videoEl.duration && !isNaN(videoEl.duration)) {
      setDuration(videoEl.duration)
    }
    
    return () => {
      videoEl.removeEventListener('timeupdate', updateTime)
      videoEl.removeEventListener('loadedmetadata', updateDuration)
      videoEl.removeEventListener('durationchange', updateDuration)
    }
  }, [video.id])

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation()
    const videoEl = videoRef.current
    if (!videoEl) return

    if (videoEl.paused) {
      videoEl.play()
      setIsPlaying(true)
    } else {
      videoEl.pause()
      setIsPlaying(false)
    }
  }

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation()
    const videoEl = videoRef.current
    if (!videoEl) return
    
    videoEl.muted = !videoEl.muted
    setIsMuted(videoEl.muted)
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const videoEl = videoRef.current
    if (!videoEl || !duration) return
    
    const time = parseFloat(e.target.value)
    videoEl.currentTime = time
    setCurrentTime(time)
  }

  const skipTime = (seconds: number) => {
    const videoEl = videoRef.current
    if (!videoEl || !duration) return
    
    const newTime = Math.max(0, Math.min(duration, videoEl.currentTime + seconds))
    videoEl.currentTime = newTime
    setCurrentTime(newTime)
  }

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div 
      className="relative rounded-2xl overflow-hidden"
      style={{
        border: '2px solid rgba(0, 200, 40, 0.2)',
        backgroundColor: '#000000',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
      }}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(true)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={video.id}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="aspect-[9/16]"
        >
          <video
            ref={videoRef}
            src={video.src}
            className="w-full h-full object-cover"
            playsInline
            preload="metadata"
          />
        </motion.div>
      </AnimatePresence>

      {/* Controls Overlay */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 p-5"
        style={{
          background: 'linear-gradient(to top, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.7) 60%, transparent 100%)',
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showControls ? 1 : 0, y: showControls ? 0 : 20 }}
        transition={{ duration: 0.2 }}
      >
        {/* Progress Bar */}
        <div className="mb-4">
          <input
            type="range"
            min="0"
            max={duration || 100}
            step="0.1"
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1 rounded-full outline-none cursor-pointer appearance-none"
            style={{
              background: `linear-gradient(to right, #00C828 0%, #00C828 ${(currentTime / (duration || 1)) * 100}%, rgba(255,255,255,0.2) ${(currentTime / (duration || 1)) * 100}%, rgba(255,255,255,0.2) 100%)`,
            }}
          />
          <div className="flex justify-between text-white/80 text-xs mt-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <style jsx>{`
          input[type="range"]::-webkit-slider-thumb {
            appearance: none;
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background: #00C828;
            cursor: pointer;
            border: 2px solid white;
            transition: transform 0.2s ease;
          }
          input[type="range"]::-webkit-slider-thumb:hover {
            transform: scale(1.2);
          }
          input[type="range"]::-moz-range-thumb {
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background: #00C828;
            cursor: pointer;
            border: 2px solid white;
            transition: transform 0.2s ease;
          }
          input[type="range"]::-moz-range-thumb:hover {
            transform: scale(1.2);
          }
        `}</style>

        {/* Control Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.button
              onClick={togglePlay}
              className="w-11 h-11 rounded-full flex items-center justify-center transition-colors"
              style={{ backgroundColor: '#00C828' }}
              whileHover={{ scale: 1.1, backgroundColor: '#00A020' }}
              whileTap={{ scale: 0.95 }}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-white" fill="white" />
              ) : (
                <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
              )}
            </motion.button>

            <motion.button
              onClick={(e) => { e.stopPropagation(); skipTime(-10) }}
              className="text-white/80 hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <SkipBack className="w-5 h-5" />
            </motion.button>

            <motion.button
              onClick={(e) => { e.stopPropagation(); skipTime(10) }}
              className="text-white/80 hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <SkipForward className="w-5 h-5" />
            </motion.button>

            <motion.button
              onClick={toggleMute}
              className="text-white/80 hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </motion.button>
          </div>

          <div className="text-white text-right">
            <h3 
              className="font-bold text-base leading-tight"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              {video.title}
            </h3>
            <p 
              className="text-xs text-white/60"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              {video.category}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// Main Section
export function PortfolioSection() {
  const [selectedVideo, setSelectedVideo] = useState(VIDEOS[0])
  const sectionRef = useRef(null)

  return (
    <section 
      ref={sectionRef}
      id="portfolio" 
      className="py-20 relative overflow-hidden"
      style={{ backgroundColor: '#FAFAFA' }}
    >
      {/* Animated Background Blurs */}
      <motion.div
        className="absolute top-20 right-10 rounded-full pointer-events-none"
        style={{
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(0, 200, 40, 0.06) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
        animate={{
          x: [0, -60, 0],
          y: [0, 40, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 left-10 rounded-full pointer-events-none"
        style={{
          width: '450px',
          height: '450px',
          background: 'radial-gradient(circle, rgba(0, 200, 40, 0.08) 0%, transparent 70%)',
          filter: 'blur(110px)',
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, -50, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container mx-auto max-w-7xl px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div 
            className="inline-block mb-3 px-4 py-2 rounded-full text-sm font-medium"
            style={{ 
              backgroundColor: 'rgba(0, 200, 40, 0.1)',
              color: '#00A020',
              fontFamily: 'Poppins, sans-serif'
            }}
            whileHover={{ scale: 1.05 }}
          >
            OUR PORTFOLIO
          </motion.div>
          <h2 
            className="text-5xl md:text-6xl font-bold mb-5"
            style={{ 
              fontFamily: 'Poppins, sans-serif',
              color: '#1A1A1A',
              letterSpacing: '-0.02em'
            }}
          >
            Featured Work
          </h2>
          <p 
            className="text-lg max-w-2xl mx-auto"
            style={{ 
              fontFamily: 'Poppins, sans-serif',
              color: '#4A4A4A',
              lineHeight: '1.7'
            }}
          >
            Select any video to preview our creative excellence and professional production quality
          </p>
        </motion.div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Video Grid */}
          <motion.div 
            className="lg:col-span-5"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="grid grid-cols-2 gap-4">
              {VIDEOS.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                >
                  <VideoThumbnail
                    video={video}
                    isActive={selectedVideo.id === video.id}
                    onClick={() => setSelectedVideo(video)}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Main Player */}
          <motion.div 
            className="lg:col-span-7 flex justify-center"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="w-full max-w-md">
              <MainPlayer video={selectedVideo} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}