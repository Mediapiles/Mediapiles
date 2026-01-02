import type React from "react"
import { Button } from "@/components/ui/button"

interface NavigationControlsProps {
  currentPage: number
  totalPages: number
}

export function NavigationControls({ currentPage, totalPages }: NavigationControlsProps) {
  return (
    <div className="fixed bottom-4 flex items-center justify-center gap-2 w-full">
      <Button variant="outline" size="icon" className="rounded-full bg-transparent border-white/20 text-white">
        <span className="sr-only">Previous</span>
        <ChevronLeftIcon className="h-4 w-4" />
      </Button>
      <span className="text-white/70 text-sm">
        {currentPage} / {totalPages}
      </span>
      <Button variant="outline" size="icon" className="rounded-full bg-transparent border-white/20 text-white">
        <span className="sr-only">Next</span>
        <ChevronRightIcon className="h-4 w-4" />
      </Button>
    </div>
  )
}

function ChevronLeftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  )
}

function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}
