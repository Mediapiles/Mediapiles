"use client"

import { useState, useEffect } from "react"
import { Play } from "lucide-react"
import Image from "next/image"

export function WorkSection() {
  const [activeVideo, setActiveVideo] = useState(0)
  const [isHovering, setIsHovering] = useState(false)

  const videos = [
    {
      id: 1,
      title: "Stranger Things",
      platform: "Netflix",
      thumbnail: "/placeholder.svg?height=600&width=800&text=Stranger+Things",
      duration: "0:21",
      type: "TV Show",
      episodes: [
        { id: 1, title: "Chapter One", duration: "45:30" },
        { id: 2, title: "Chapter Two", duration: "47:15" },
        { id: 3, title: "Chapter Three", duration: "48:20" },
        { id: 4, title: "Chapter Four", duration: "49:05" },
      ]
    },
    {
      id: 2,
      title: "You",
      platform: "Netflix",
      thumbnail: "/placeholder.svg?height=600&width=800&text=You",
      duration: "0:21",
      type: "TV Show",
      episodes: [
        { id: 1, title: "Pilot", duration: "44:10" },
        { id: 2, title: "The Last Time I Saw You", duration: "45:25" },
        { id: 3, title: "The End of the Beginning", duration: "46:00" },
        { id: 4, title: "The Next Chapter", duration: "47:30" },
      ]
    },
    {
      id: 3,
      title: "Viral TikTok Dance",
      platform: "TikTok",
      thumbnail: "/placeholder.svg?height=600&width=800&text=TikTok+Dance",
      duration: "0:15",
      type: "Short Form",
      episodes: []
    },
    {
      id: 4,
      title: "Product Launch",
      platform: "YouTube",
      thumbnail: "/placeholder.svg?height=600&width=800&text=Product+Launch",
      duration: "2:15",
      type: "Advertisement",
      episodes: []
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveVideo((prev) => (prev + 1) % videos.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section 
      id="work" 
      className="py-20 bg-white relative overflow-hidden"
      style={{ fontFamily: 'Poppins, sans-serif' }}
    >
      {/* Background Gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #FFF95B 0%, #FF930F 100%)',
          filter: 'blur(100px)',
          opacity: 0.1,
          zIndex: -1
        }}
      />

      {/* Section Title */}
      <div className="container mx-auto px-4 text-center mb-16">
        <h2 
          className="text-4xl md:text-5xl font-black text-[#1a1a1a] mb-4"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Featured Work
        </h2>
        <p 
          className="text-xl text-gray-600 max-w-2xl mx-auto"
          style={{ lineHeight: '1.6' }}
        >
          Content that stops the scroll and drives results — crafted for impact, not just views.
        </p>
      </div>

      {/* Circular Video Carousel */}
      <div className="relative max-w-7xl mx-auto px-4">
        {/* Centered Main Video Player */}
        <div 
          className={`relative mx-auto rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 ${
            isHovering ? 'scale-105' : 'scale-100'
          }`}
          style={{
            width: '100%',
            maxWidth: '800px',
            aspectRatio: '16 / 9',
            backgroundColor: '#111',
            cursor: 'pointer',
            transformOrigin: 'center'
          }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Video Thumbnail */}
          <Image
            src={videos[activeVideo].thumbnail}
            alt={videos[activeVideo].title}
            fill
            className="object-cover"
          />
          
          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-6 transition-transform hover:scale-110">
              <Play size={48} className="text-white" />
            </div>
          </div>

          {/* Video Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
            <h3 className="text-2xl font-bold text-white mb-2">{videos[activeVideo].title}</h3>
            <div className="flex items-center gap-4 text-sm text-gray-300 mb-4">
              <span>{videos[activeVideo].platform}</span>
              <span>•</span>
              <span>{videos[activeVideo].type}</span>
              <span>•</span>
              <span>{videos[activeVideo].duration}</span>
            </div>
            
            {/* Episode List (if available) */}
            {videos[activeVideo].episodes.length > 0 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {videos[activeVideo].episodes.map((ep, idx) => (
                  <div 
                    key={ep.id}
                    className="flex-shrink-0 bg-white/10 rounded-lg px-3 py-2 text-xs text-white cursor-pointer hover:bg-white/20 transition-colors"
                  >
                    Ep {idx + 1}: {ep.title.split(' ')[0]} ({ep.duration})
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Circular Thumbnails (optional) */}
        <div className="mt-12 flex justify-center gap-4">
          {videos.map((video, index) => (
            <button
              key={video.id}
              onClick={() => setActiveVideo(index)}
              className={`w-16 h-16 rounded-full overflow-hidden border-2 transition-all duration-300 ${
                activeVideo === index 
                  ? 'border-white scale-110' 
                  : 'border-white/30 hover:border-white/60 hover:scale-105'
              }`}
            >
              <Image
                src={video.thumbnail}
                alt={video.title}
                width={64}
                height={64}
                className="object-cover w-full h-full"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}