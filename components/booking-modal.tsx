"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Check } from "lucide-react"

type BookingModalProps = {
    isOpen: boolean
    onClose: () => void
    data: {
        finalPrice: string
        selectedServices: string[]
    }
}

export const BookingModal = ({ isOpen, onClose, data }: BookingModalProps) => {
    const [step, setStep] = useState<"form" | "success">("form")
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        notes: ""
    })

    // Scroll Lock Effect
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }
        return () => {
            document.body.style.overflow = "unset"
        }
    }, [isOpen])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            // Call the API endpoint
            const res = await fetch("/api/send-quote", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    notes: formData.notes,
                    price: data.finalPrice,
                    services: data.selectedServices
                })
            })

            const result = await res.json()

            if (res.ok) {
                setStep("success")
            } else {
                console.error("API Error:", result)
                alert(`Failed to send email: ${result.error?.message || result.error || "Unknown error"}`)
                // Do not setStep("success") so the user can retry
            }
        } catch (error) {
            console.error("Submission error", error)
            alert("An unexpected error occurred. Please check the console.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-black z-10 rounded-full hover:bg-gray-100 transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <div className="p-8">
                            {step === "form" ? (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="text-center space-y-2">
                                        <h3 className="text-2xl font-bold text-gray-900 tracking-tight">Finalize Your Plan</h3>
                                        <p className="text-sm text-gray-500">
                                            You're just one step away from saving 10,000 hours.
                                        </p>
                                    </div>

                                    {/* Summary Box */}
                                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex justify-between items-center">
                                        <div>
                                            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Estimated Price</p>
                                            <p className="text-2xl font-black text-green-600">{data.finalPrice}<span className="text-sm text-gray-400 font-normal">/mo</span></p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Includes</p>
                                            <p className="text-sm font-bold text-gray-900">{data.selectedServices.length} Services</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
                                            <input
                                                required
                                                type="text"
                                                placeholder="John Doe"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-black transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
                                            <input
                                                required
                                                type="email"
                                                placeholder="john@example.com"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-black transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-1">Notes (Optional)</label>
                                            <textarea
                                                rows={3}
                                                placeholder="Any specific requirements?"
                                                value={formData.notes}
                                                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-black transition-colors resize-none"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full bg-black text-white font-bold py-4 rounded-xl shadow-lg hover:bg-gray-800 disabled:opacity-70 transition-all flex items-center justify-center gap-2"
                                    >
                                        {isLoading ? (
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            "Done"
                                        )}
                                    </button>
                                </form>
                            ) : (
                                <div className="text-center py-8 space-y-6">
                                    {/* Success Animation */}
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                        className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600"
                                    >
                                        <Check size={40} strokeWidth={3} />
                                    </motion.div>

                                    <div className="space-y-2">
                                        <h3 className="text-2xl font-bold text-gray-900">Thanks for choosing us!</h3>
                                        <p className="text-gray-500">
                                            We'll contact you soon at <span className="font-semibold text-gray-900">{formData.email}</span>
                                        </p>
                                    </div>

                                    {/* Price Recap */}
                                    <div className="inline-block bg-gray-50 rounded-lg px-6 py-3 border border-gray-100">
                                        <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-1">Final Plan Quote</p>
                                        <p className="text-3xl font-black text-gray-900">{data.finalPrice}<span className="text-base font-normal text-gray-400">/mo</span></p>
                                    </div>

                                    <p className="text-xs text-gray-400">A copy of this quote has been sent to your email.</p>

                                    <button
                                        onClick={onClose}
                                        className="w-full bg-gray-100 text-gray-900 font-bold py-3 rounded-xl hover:bg-gray-200 transition-colors"
                                    >
                                        Close
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
