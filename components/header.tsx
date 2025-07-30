"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"

export function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 flex items-center justify-between p-4 bg-transparent z-10">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-blue-500 rounded"></div>
        <div className="w-6 h-6 border border-white/30 rounded-full"></div>
      </div>

      <div className="text-white/70">Untitled</div>

      <div className="flex items-center gap-2">
        {isLoggedIn ? (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-800 font-medium">
              A
            </div>
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-800 font-medium">
              J
            </div>
          </div>
        ) : (
          <>
            <Button variant="outline" className="text-white border-white/30 bg-white/5 hover:bg-white/10 text-xs">
              Log in or create account
            </Button>
            <Button className="bg-white text-black hover:bg-white/90 text-xs">Continue with Google</Button>
          </>
        )}
      </div>
    </header>
  )
}
