"use client"

import React, { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Check,
  ChevronDown,
  ChevronUp,
  Users,
  Megaphone,
  Layout,
  Mail,
  Video,
  Film,
  Zap,
  PenTool,
  Search,
  X
} from "lucide-react"

import { BookingModal } from "@/components/booking-modal"

// --- Config & Data ---

const SERVICE_PILLARS = [
  { id: "social", label: "Social Media Management", desc: "Full-service Instagram, TikTok, LinkedIn, FB", cost: 200, icon: Users },
  { id: "content", label: "Content Marketing", desc: "Blogs, newsletters, case studies", cost: 250, icon: PenTool },
  { id: "ads", label: "Paid Advertising", desc: "Google, Meta, LinkedIn ads for ROI", cost: 300, icon: Megaphone },
  { id: "seo", label: "SEO & Visibility", desc: "On-page SEO, backlinks, local ranking", cost: 150, icon: Search },
  { id: "email", label: "Email Marketing", desc: "Automated workflows, lead magnets", cost: 100, icon: Mail },
]

const VIDEO_OPTIONS = [
  { id: "short", label: "Short-Form Video", desc: "TikTok / Reels / Shorts", cost: 100, icon: Zap },
  { id: "long", label: "Long-Form Content", desc: "YouTube & Webinars", cost: 200, icon: Video },
  { id: "ad_creative", label: "Performance Ad Creative", desc: "High-conversion ads", cost: 150, icon: Layout },
  { id: "brand", label: "Brand & Testimonial Clips", desc: "Interviews & Showcases", cost: 50, icon: Film },
]

const TIERS = [
  { id: "maintenance", label: "Maintenance", desc: "1-2 videos/mo + 2 posts/wk", cost: 0 },
  { id: "growth", label: "Growth", desc: "4-8 videos/mo + 4-5 posts/wk", cost: 150 },
  { id: "dominance", label: "Dominance", desc: "12+ videos/mo + Daily posting", cost: 400 },
]

const ADD_ONS = [
  { id: "strategy", label: "Dedicated Strategy Sessions", cost: 75 },
  { id: "analytics", label: "Performance Analytics", cost: 30 },
  { id: "community", label: "Community Management", cost: 50 },
  { id: "competitor", label: "Competitor Tracking", cost: 40 },
]

// --- Utils ---

const formatCurrency = (val: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val)

const CompactAccordion = ({
  title,
  children,
  isOpen,
  onToggle,
  summary
}: {
  title: string,
  children: React.ReactNode,
  isOpen: boolean,
  onToggle: () => void,
  summary?: string
}) => {
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors text-left"
      >
        <div>
          <h4 className={`font-bold text-gray-900 ${isOpen ? 'text-black' : ''}`}>{title}</h4>
          {summary && !isOpen && <p className="text-xs text-green-600 mt-1 font-medium">{summary}</p>}
        </div>
        {isOpen ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 bg-gray-50/50">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// --- Main Component ---

export default function CustomPlanBuilder() {
  const sectionRef = useRef<HTMLElement>(null)

  // State
  const [isExpanded, setIsExpanded] = useState(false)
  const [openSection, setOpenSection] = useState<string | null>("services")
  const [showBookingModal, setShowBookingModal] = useState(false)

  const [budget, setBudget] = useState<number>(500)
  const [budgetError, setBudgetError] = useState<string | null>(null)

  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [selectedVideos, setSelectedVideos] = useState<string[]>([])
  const [frequency, setFrequency] = useState<string>("maintenance")
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([])

  const [commitment, setCommitment] = useState<string>("monthly")
  const [onboarding, setOnboarding] = useState<string>("standard")

  const [calculationResult, setCalculationResult] = useState<{
    basePrice: number
    finalPrice: number
    discountApplied: boolean
    message: string
  } | null>(null)

  // Handlers

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value) || 0
    setBudget(val)
    if (val < 100) setBudgetError("Minimum budget is $100")
    else if (val > 10000) setBudgetError("Maximum budget is $10,000")
    else setBudgetError(null)
  }

  const toggleSelect = (list: string[], setList: (l: string[]) => void, id: string) => {
    if (list.includes(id)) {
      setList(list.filter(item => item !== id))
    } else {
      setList([...list, id])
    }
  }

  const toggleAccordion = (section: string) => {
    setOpenSection(openSection === section ? null : section)
  }

  const calculatePlan = () => {
    let base = 0
    base += SERVICE_PILLARS.filter(s => selectedServices.includes(s.id)).reduce((acc, curr) => acc + curr.cost, 0)
    base += VIDEO_OPTIONS.filter(v => selectedVideos.includes(v.id)).reduce((acc, curr) => acc + curr.cost, 0)
    const tier = TIERS.find(t => t.id === frequency)
    if (tier) base += tier.cost
    base += ADD_ONS.filter(a => selectedAddOns.includes(a.id)).reduce((acc, curr) => acc + curr.cost, 0)
    if (onboarding === "express") base += 50

    // Logic: If Base > Budget, Final = Budget * 0.9 (10% discount from Budget cap)
    // Else Final = Base
    // Min $100

    let final = base
    let isDiscounted = false
    let msg = `Your custom plan: ${formatCurrency(final)}/month`

    if (base > budget) {
      final = budget * 0.9
      isDiscounted = true
      msg = "We’ve optimized your plan to fit your budget with a 10% discount!"
    }

    if (final < 100) final = 100

    setCalculationResult({
      basePrice: base,
      finalPrice: final,
      discountApplied: isDiscounted,
      message: msg
    })
  }

  // Get full list of selected item names for the modal
  const getSelectedNames = () => {
    const s = SERVICE_PILLARS.filter(i => selectedServices.includes(i.id)).map(i => i.label)
    const v = VIDEO_OPTIONS.filter(i => selectedVideos.includes(i.id)).map(i => i.label)
    const a = ADD_ONS.filter(i => selectedAddOns.includes(i.id)).map(i => i.label)
    const t = TIERS.find(i => i.id === frequency)?.label
    return [...s, ...v, ...a, t ? `Tier: ${t}` : ""].filter(Boolean) as string[]
  }

  // Summaries for Accordion Headers
  const getServiceSummary = () => selectedServices.length > 0 ? `${selectedServices.length} Selected` : ""
  const getVideoSummary = () => selectedVideos.length > 0 ? `${selectedVideos.length} Selected` : ""
  const getTierSummary = () => TIERS.find(t => t.id === frequency)?.label
  const getAddOnSummary = () => selectedAddOns.length > 0 ? `${selectedAddOns.length} Add-ons` : ""

  return (
    <section ref={sectionRef} id="plan-builder" className="py-24 bg-white text-[#0f0f0f]">
      <div className="container mx-auto px-4 md:px-6 max-w-2xl">

        {/* Header (Always Visible) */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-6" style={{ fontFamily: '"Geist Sans", sans-serif' }}>
            Build Your Perfect Plan
          </h2>

          {/* Collapsed State: Input + Button */}
          {!isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 max-w-md mx-auto"
            >
              <div className="mb-4 text-left">
                <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">
                  Your Monthly Budget
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                  <input
                    type="number"
                    min="100"
                    max="10000"
                    value={budget}
                    onChange={handleBudgetChange}
                    className={`w-full pl-8 pr-4 py-3 text-lg font-bold border rounded-xl outline-none transition-all ${budgetError ? "border-red-300 bg-red-50 text-red-600" : "border-gray-200 focus:border-black"
                      }`}
                    placeholder="500"
                  />
                </div>
                {budgetError && <p className="text-red-500 text-xs mt-1 font-medium">{budgetError}</p>}
              </div>
              <button
                onClick={() => setIsExpanded(true)}
                className="w-full bg-black text-white font-bold py-3 rounded-xl hover:bg-gray-800 transition-colors shadow-lg"
              >
                Build My Plan
              </button>
            </motion.div>
          )}
        </div>

        {/* Expanded Modal/Dropdown Panel */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0, scale: 0.95 }}
              animate={{ opacity: 1, height: "auto", scale: 1 }}
              exit={{ opacity: 0, height: 0, scale: 0.95 }}
              className="relative z-20"
            >
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden relative">
                {/* Close Button */}
                <button
                  onClick={() => setIsExpanded(false)}
                  className="absolute top-4 right-4 p-2 text-gray-400 hover:text-black z-10 bg-white/50 backdrop-blur-sm rounded-full"
                >
                  <X size={20} />
                </button>

                {/* Budget Re-Input (Top of Panel) */}
                <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                  <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide text-center">
                    Confirm Monthly Budget
                  </label>
                  <div className="relative max-w-[200px] mx-auto">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-lg">$</span>
                    <input
                      type="number"
                      value={budget}
                      onChange={handleBudgetChange}
                      className="w-full pl-8 pr-4 py-2 text-xl font-bold text-center bg-white border border-gray-200 rounded-lg outline-none focus:border-black"
                    />
                  </div>
                </div>

                {/* 1. Core Services Accordion */}
                <CompactAccordion title="Core Services" summary={getServiceSummary()} isOpen={openSection === "services"} onToggle={() => toggleAccordion("services")}>
                  <div className="grid grid-cols-1 gap-3">
                    {SERVICE_PILLARS.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => toggleSelect(selectedServices, setSelectedServices, s.id)}
                        className={`flex items-center gap-4 p-3 rounded-xl border transition-all text-left group ${selectedServices.includes(s.id) ? "border-black bg-gray-100" : "border-gray-200 hover:border-gray-300 bg-white"
                          }`}
                      >
                        <div className={`p-2 rounded-lg ${selectedServices.includes(s.id) ? "bg-black text-white" : "bg-gray-100 text-gray-500"}`}>
                          <s.icon size={18} />
                        </div>
                        <div>
                          <h5 className="font-bold text-sm text-gray-900">{s.label}</h5>
                          <p className="text-xs text-gray-500">{s.desc}</p>
                        </div>
                        {selectedServices.includes(s.id) && <Check size={16} className="ml-auto text-black" />}
                      </button>
                    ))}
                  </div>
                </CompactAccordion>

                {/* 2. Video Production Accordion */}
                <CompactAccordion title="Video Production" summary={getVideoSummary()} isOpen={openSection === "videos"} onToggle={() => toggleAccordion("videos")}>
                  <div className="grid grid-cols-1 gap-3">
                    {VIDEO_OPTIONS.map((v) => (
                      <button
                        key={v.id}
                        onClick={() => toggleSelect(selectedVideos, setSelectedVideos, v.id)}
                        className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${selectedVideos.includes(v.id) ? "border-green-500 bg-green-50" : "border-gray-200 hover:border-gray-300 bg-white"
                          }`}
                      >
                        <div className={`p-1.5 rounded ${selectedVideos.includes(v.id) ? "text-green-600" : "text-gray-400"}`}>
                          <v.icon size={18} />
                        </div>
                        <span className={`text-sm font-bold ${selectedVideos.includes(v.id) ? "text-green-900" : "text-gray-700"}`}>
                          {v.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </CompactAccordion>

                {/* 3. Frequency Accordion */}
                <CompactAccordion title="Frequency Tier" summary={getTierSummary()} isOpen={openSection === "tiers"} onToggle={() => toggleAccordion("tiers")}>
                  <div className="space-y-2">
                    {TIERS.map((t) => (
                      <label key={t.id} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer hover:bg-gray-50 ${frequency === t.id ? "border-purple-500 bg-purple-50" : "border-gray-200"}`}>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${frequency === t.id ? "border-purple-500" : "border-gray-300"}`}>
                          {frequency === t.id && <div className="w-2.5 h-2.5 rounded-full bg-purple-500" />}
                        </div>
                        <div>
                          <h5 className="font-bold text-sm text-gray-900">{t.label}</h5>
                          <p className="text-xs text-gray-500">{t.desc}</p>
                        </div>
                        <input
                          type="radio"
                          name="frequency"
                          value={t.id}
                          checked={frequency === t.id}
                          onChange={() => setFrequency(t.id)}
                          className="hidden"
                        />
                      </label>
                    ))}
                  </div>
                </CompactAccordion>

                {/* 4. Add-ons & Admin Accordion */}
                <CompactAccordion title="Add-ons & Details" summary={getAddOnSummary()} isOpen={openSection === "addons"} onToggle={() => toggleAccordion("addons")}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase">Extras</label>
                      {ADD_ONS.map((a) => (
                        <button
                          key={a.id}
                          onClick={() => toggleSelect(selectedAddOns, setSelectedAddOns, a.id)}
                          className="flex items-center gap-3 w-full text-left py-2 px-1 hover:bg-gray-50 rounded"
                        >
                          <div className={`w-4 h-4 border rounded flex items-center justify-center ${selectedAddOns.includes(a.id) ? "bg-black border-black text-white" : "border-gray-300"}`}>
                            {selectedAddOns.includes(a.id) && <Check size={10} />}
                          </div>
                          <span className="text-sm font-medium text-gray-700">{a.label}</span>
                        </button>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-200">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1">Commitment</label>
                        <select value={commitment} onChange={(e) => setCommitment(e.target.value)} className="w-full p-2 bg-white border border-gray-200 rounded-lg text-sm outline-none">
                          <option value="monthly">Month-to-Month</option>
                          <option value="6month">6-Month (10% off)</option>
                          <option value="annual">Annual (20% off)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1">Onboarding</label>
                        <select value={onboarding} onChange={(e) => setOnboarding(e.target.value)} className="w-full p-2 bg-white border border-gray-200 rounded-lg text-sm outline-none">
                          <option value="standard">Standard (10-14d)</option>
                          <option value="express">Express (3-5d)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </CompactAccordion>

                {/* Results Footer */}
                <div className="p-6 bg-gray-50 border-t border-gray-100">
                  {!calculationResult ? (
                    <button
                      onClick={calculatePlan}
                      disabled={!selectedServices.length}
                      className="w-full bg-black text-white font-bold py-3 rounded-xl shadow-lg hover:bg-gray-800 disabled:opacity-50 transition-all"
                    >
                      Calculate Price
                    </button>
                  ) : (
                    <div className="text-center">
                      <h4 className="text-sm text-gray-500 font-medium mb-1">Your Optimized Plan</h4>
                      <div className="text-4xl font-black text-green-600 mb-2">
                        {formatCurrency(calculationResult.finalPrice)}
                        <span className="text-base text-gray-400 font-normal ml-1">/mo</span>
                      </div>
                      <p className="text-xs text-gray-600 mb-4 px-4 py-2 bg-green-50 rounded-lg inline-block border border-green-100">
                        {calculationResult.message}
                      </p>
                      <div className="flex gap-3 justify-center">
                        <button onClick={() => setCalculationResult(null)} className="px-4 py-2 text-sm text-gray-500 hover:text-black">Edit</button>
                        <button
                          onClick={() => setShowBookingModal(true)}
                          className="px-6 py-2 bg-black text-white rounded-lg text-sm font-bold shadow hover:bg-gray-800"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <BookingModal
          isOpen={showBookingModal}
          onClose={() => setShowBookingModal(false)}
          data={{
            finalPrice: calculationResult ? formatCurrency(calculationResult.finalPrice) : "$0",
            selectedServices: getSelectedNames()
          }}
        />

      </div>
    </section>
  )
}
