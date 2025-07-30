"use client"

import { useEffect, useState } from "react"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { BarChart2, CheckCircle, Palette } from "lucide-react"

export default function WhatWeArePromising() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Trigger fade-in animation after component mounts
    setIsLoaded(true)
  }, [])

  return (
    <div className={`min-h-screen bg-white flex flex-col ${isLoaded ? "animate-fade-in" : "opacity-0"}`}>
      <NavBar />

      <main className="flex-grow">
        <section className="pt-32 pb-20 px-4">
          <div className="container mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-16 text-black">WHAT ARE WE PROMISING?</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {/* Card 1 - VIDEO Editor */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h2 className="text-2xl font-bold mb-6 text-black">VIDEO Editor</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">After-effects</h3>
                    <p className="text-gray-600">Editors editing in after effects for more then 2+years.</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">Premiere Pro</h3>
                    <p className="text-gray-600">Editors proficent in Premiere pro editing styles like, Cineamtic or podcast editng.</p>
                  </div>
                </div>
              </div>

              {/* Card 2 - Graphic */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 flex items-center justify-center">
                <div className="relative w-48 h-48 bg-gray-100 rounded-full flex items-center justify-center">
                  <CheckCircle size={64} className="text-black absolute" />
                  <div className="absolute w-full h-full">
                    {/* Abstract lines */}
                    <div className="absolute top-1/4 left-1/2 w-16 h-1 bg-gray-300 rounded-full transform -translate-x-1/2 rotate-45"></div>
                    <div className="absolute top-1/3 left-1/2 w-24 h-1 bg-gray-300 rounded-full transform -translate-x-1/2 rotate-12"></div>
                    <div className="absolute top-2/3 left-1/2 w-20 h-1 bg-gray-300 rounded-full transform -translate-x-1/2 -rotate-30"></div>
                    <div className="absolute top-1/2 left-1/2 w-16 h-1 bg-gray-300 rounded-full transform -translate-x-1/2 -rotate-60"></div>
                  </div>
                </div>
              </div>

              {/* Card 3 - Retention */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 bg-gray-100 rounded-full">
                    <BarChart2 size={24} className="text-black" />
                  </div>
                  <h2 className="text-2xl font-bold text-black">Retention</h2>
                </div>
                <p className="text-gray-600">Videos doesn't get views from just clicking but the main factors is retention means how videos are editid.e</p>
              </div>

              {/* Card 4 - EDITING Styles */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 bg-gray-100 rounded-full">
                    <Palette size={24} className="text-black" />
                  </div>
                  <h2 className="text-2xl font-bold text-black">EDITING Styles</h2>
                </div>
                <p className="text-gray-600">I use professional in after effects with more explanation style</p>
              </div>
            </div>

            {/* Supporting text */}
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-gray-600">
                You're able to master every single important feature in Premiere Pro and all the advanced tricks the
                pros use to transform your video into an experience that's completely in-demand, as every chunk of new
                video content you touch turns into thousands of likes, clicks, and shares.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
