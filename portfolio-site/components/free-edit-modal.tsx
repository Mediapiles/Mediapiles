"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { X, Check, Loader2, User, Mail, AtSign } from "lucide-react"
import { submitForm } from "@/app/actions/submit-form"

interface FreeEditModalProps {
  isOpen: boolean
  onClose: () => void
}

export function FreeEditModal({ isOpen, onClose }: FreeEditModalProps) {
  const [formData, setFormData] = useState({
    clientName: "",
    channelName: "",
    clientEmail: "",
    contentType: "",
    creativeFredom: false, // Note: Typo 'creativeFredom' retained for consistency
    vision: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")

  // State to control animation visibility inside the modal
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false)
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleContentTypeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, contentType: value }))
  }

  const handleCreativeFreedomChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, creativeFredom: checked, vision: checked ? "" : prev.vision }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.contentType) {
      setSubmitError("Please select a content type (Short Form or Long Form).")
      return
    }

    setIsSubmitting(true)
    setSubmitError("")

    try {
      const result = await submitForm(formData)

      if (result.success) {
        setIsSubmitted(true)
        // Trigger the success animation state shortly after submission
        setTimeout(() => setShowSuccessAnimation(true), 100); 

        // Reset form and close modal after 5 seconds
        setTimeout(() => {
          // Cleanup states
          setIsSubmitted(false)
          setIsSubmitting(false)
          setShowSuccessAnimation(false);
          setFormData({
            clientName: "",
            channelName: "",
            clientEmail: "",
            contentType: "",
            creativeFredom: false,
            vision: "",
          })
          onClose()
        }, 5000)
      } else {
        setSubmitError(result.error || "Something went wrong. Please try again.")
        setIsSubmitting(false)
      }
    } catch (error) {
      setSubmitError("Network error. Please check your connection and try again.")
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (!isSubmitted && !isSubmitting) {
      onClose()
      setTimeout(() => {
        setFormData({
          clientName: "",
          channelName: "",
          clientEmail: "",
          contentType: "",
          creativeFredom: false,
          vision: "",
        })
        setSubmitError("")
      }, 300)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      
      {/* 1. ANIMATION STYLES (Moved from SuccessAnimation component) */}
      <style jsx global>{`
        @keyframes scaleIn {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.2);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        @keyframes drawCheck {
          0% {
            stroke-dashoffset: 100;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
        @keyframes ripple {
          0% {
            transform: scale(0.8);
            opacity: 1;
          }
          100% {
            transform: scale(2.5);
            opacity: 0;
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-scaleIn {
          animation: scaleIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .animate-drawCheck {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          animation: drawCheck 0.8s ease-out 0.3s forwards;
        }
        .animate-ripple {
          animation: ripple 1s ease-out forwards;
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>
      
      {/* Backdrop */}
      <div
        className="absolute inset-0 glass-effect-dark backdrop-blur-md transition-opacity duration-300"
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        className="relative rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border elevation-5 animate-fadeIn"
        style={{
          backgroundColor: "#1D1616",
          borderColor: "rgba(216, 64, 64, 0.2)",
          transform: "translateY(0)",
          animation: "fadeInUp 0.5s ease-out forwards",
        }}
      >
        {/* Close Button */}
        {!isSubmitted && !isSubmitting && (
          <button
            onClick={handleClose}
            className="absolute top-6 right-6 transition-colors z-10 hover-lift"
            style={{ color: "rgba(238, 238, 238, 0.6)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#D84040")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(238, 238, 238, 0.6)")}
          >
            <X size={24} />
          </button>
        )}

        <div className="p-8">
          {/* Default Form State */}
          {!isSubmitted && !isSubmitting ? (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-2 font-heading" style={{ color: "#EEEEEE" }}>
                  🎬 Get Your First Video Edited – Free!
                </h2>
                <p className="text-sm" style={{ color: "rgba(238, 238, 238, 0.7)" }}>
                  Fill out the form below and we'll get started on your project
                </p>
              </div>

              {/* Error Message */}
              {submitError && (
                <div
                  className="mb-6 p-4 rounded-xl border elevation-1"
                  style={{
                    backgroundColor: "rgba(220, 38, 38, 0.1)",
                    borderColor: "rgba(220, 38, 38, 0.3)",
                    color: "#EEEEEE",
                  }}
                >
                  <p className="text-sm">{submitError}</p>
                </div>
              )}

              {/* Form Content */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* ... (Client Name, Channel Name, Email, Content Type, Edit Style Preference fields here) ... */}
                {/* Client Name */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "#EEEEEE" }}>
                    Client Name
                  </label>
                  <div className="relative">
                    <User
                      className="absolute left-3 top-1/2 transform -translate-y-1/2"
                      size={20}
                      style={{ color: "rgba(238, 238, 238, 0.4)" }}
                    />
                    <Input
                      type="text"
                      name="clientName"
                      value={formData.clientName}
                      onChange={handleInputChange}
                      required
                      className="pl-12 w-full rounded-xl border focus:ring-2 transition-all elevation-1"
                      style={{
                        backgroundColor: "#2A1F1F",
                        borderColor: "rgba(142, 22, 22, 0.3)",
                        color: "#EEEEEE",
                        fontFamily: '"Poppins", "Helvetica Neue", sans-serif',
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#D84040"
                        e.target.style.boxShadow = "0 0 0 2px rgba(216, 64, 64, 0.2)"
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "rgba(142, 22, 22, 0.3)"
                        e.target.style.boxShadow = "none"
                      }}
                      placeholder="Enter your name"
                    />
                  </div>
                </div>

                {/* Channel Name */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "#EEEEEE" }}>
                    Channel Name
                  </label>
                  <div className="relative">
                    <AtSign
                      className="absolute left-3 top-1/2 transform -translate-y-1/2"
                      size={20}
                      style={{ color: "rgba(238, 238, 238, 0.4)" }}
                    />
                    <Input
                      type="text"
                      name="channelName"
                      value={formData.channelName}
                      onChange={handleInputChange}
                      required
                      className="pl-12 w-full rounded-xl border focus:ring-2 transition-all elevation-1"
                      style={{
                        backgroundColor: "#2A1F1F",
                        borderColor: "rgba(142, 22, 22, 0.3)",
                        color: "#EEEEEE",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#D84040"
                        e.target.style.boxShadow = "0 0 0 2px rgba(216, 64, 64, 0.2)"
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "rgba(142, 22, 22, 0.3)"
                        e.target.style.boxShadow = "none"
                      }}
                      placeholder="Enter your channel name"
                    />
                  </div>
                </div>

                {/* Client Email */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "#EEEEEE" }}>
                    Client Email
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute left-3 top-1/2 transform -translate-y-1/2"
                      size={20}
                      style={{ color: "rgba(238, 238, 238, 0.4)" }}
                    />
                    <Input
                      type="email"
                      name="clientEmail"
                      value={formData.clientEmail}
                      onChange={handleInputChange}
                      required
                      className="pl-12 w-full rounded-xl border focus:ring-2 transition-all elevation-1"
                      style={{
                        backgroundColor: "#2A1F1F",
                        borderColor: "rgba(142, 22, 22, 0.3)",
                        color: "#EEEEEE",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#D84040"
                        e.target.style.boxShadow = "0 0 0 2px rgba(216, 64, 64, 0.2)"
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "rgba(142, 22, 22, 0.3)"
                        e.target.style.boxShadow = "none"
                      }}
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                {/* Content Type - Radio Buttons */}
                <div>
                  <label className="block text-sm font-medium mb-3" style={{ color: "#EEEEEE" }}>
                    Choose Content Type
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="contentType"
                        value="short-form"
                        checked={formData.contentType === "short-form"}
                        onChange={(e) => handleContentTypeChange(e.target.value)}
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center transition-all ${
                          formData.contentType === "short-form"
                            ? "border-[#D84040] bg-[#D84040] elevation-1"
                            : "border-[#EEEEEE]/40 hover:border-[#D84040]/50"
                        }`}
                      >
                        {formData.contentType === "short-form" && (
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#EEEEEE" }}></div>
                        )}
                      </div>
                      <span style={{ color: "#EEEEEE" }}>Short Form</span>
                    </label>

                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="contentType"
                        value="long-form"
                        checked={formData.contentType === "long-form"}
                        onChange={(e) => handleContentTypeChange(e.target.value)}
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center transition-all ${
                          formData.contentType === "long-form"
                            ? "border-[#D84040] bg-[#D84040] elevation-1"
                            : "border-[#EEEEEE]/40 hover:border-[#D84040]/50"
                        }`}
                      >
                        {formData.contentType === "long-form" && (
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#EEEEEE" }}></div>
                        )}
                      </div>
                      <span style={{ color: "#EEEEEE" }}>Long Form</span>
                    </label>
                  </div>
                </div>

                {/* Edit Style Preference */}
                <div>
                  <label className="block text-sm font-medium mb-3" style={{ color: "#EEEEEE" }}>
                    Edit Style Preference
                  </label>
                  <div className="space-y-4">
                    <label className="flex items-start cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.creativeFredom}
                        onChange={(e) => handleCreativeFreedomChange(e.target.checked)}
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 rounded border-2 mr-3 mt-0.5 flex items-center justify-center transition-all ${
                          formData.creativeFredom
                            ? "bg-[#D84040] border-[#D84040] elevation-1"
                            : "border-[#EEEEEE]/40 hover:border-[#D84040]/50"
                        }`}
                      >
                        {formData.creativeFredom && <Check size={14} style={{ color: "#EEEEEE" }} />}
                      </div>
                      <span style={{ color: "#EEEEEE" }}>Give editor full creative freedom</span>
                    </label>

                    {!formData.creativeFredom && (
                      <div className="animate-fadeIn">
                        <label className="block text-sm font-medium mb-2" style={{ color: "#EEEEEE" }}>
                          Describe Your Vision
                        </label>
                        <Textarea
                          name="vision"
                          value={formData.vision}
                          onChange={handleInputChange}
                          required={!formData.creativeFredom}
                          className="w-full rounded-xl border transition-all min-h-[100px] elevation-1"
                          style={{
                            backgroundColor: "#2A1F1F",
                            borderColor: "rgba(142, 22, 22, 0.3)",
                            color: "#EEEEEE",
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = "#D84040"
                            e.target.style.boxShadow = "0 0 0 2px rgba(216, 64, 64, 0.2)"
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = "rgba(142, 22, 22, 0.3)"
                            e.target.style.boxShadow = "none"
                          }}
                          placeholder="Tell us about your editing style, mood, pace, and any specific requirements..."
                        />
                      </div>
                    )}
                  </div>
                </div>


                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full font-semibold py-4 rounded-xl transition-all duration-300 hover:shadow-lg button-3d"
                  style={{
                    backgroundColor: "#D84040",
                    color: "#EEEEEE",
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.backgroundColor = "#C73535"
                      e.currentTarget.style.boxShadow = "0 0 20px rgba(216, 64, 64, 0.4)"
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.backgroundColor = "#D84040"
                      e.currentTarget.style.boxShadow = "none"
                    }
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Your Request"
                  )}
                </Button>
              </form>
            </>
          ) : isSubmitting ? (
            /* Loading State */
            <div className="text-center py-12">
              <div className="mb-6">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto elevation-3"
                  style={{ backgroundColor: "#D84040" }}
                >
                  <Loader2 size={40} style={{ color: "#EEEEEE" }} className="animate-spin" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: "#EEEEEE" }}>
                Processing Your Request...
              </h3>
              <p className="text-lg" style={{ color: "rgba(238, 238, 238, 0.8)" }}>
                Please wait while we save your information.
              </p>
            </div>
          ) : (
            /* 2. SUCCESS ANIMATION STATE (Integrated) */
            <div className="text-center py-12 max-w-md mx-auto">
              <div className="mb-6 relative">
                {/* Ripple Effect */}
                {showSuccessAnimation && (
                  <>
                    <div
                      className="absolute inset-0 rounded-full animate-ripple"
                      style={{
                        backgroundColor: "#D84040",
                        top: "50%",
                        left: "50%",
                        width: "80px",
                        height: "80px",
                        marginLeft: "-40px",
                        marginTop: "-40px",
                        zIndex: 0,
                      }}
                    />
                    <div
                      className="absolute inset-0 rounded-full animate-ripple"
                      style={{
                        backgroundColor: "#D84040",
                        top: "50%",
                        left: "50%",
                        width: "80px",
                        height: "80px",
                        marginLeft: "-40px",
                        marginTop: "-40px",
                        zIndex: 0,
                        animationDelay: "0.2s",
                      }}
                    />
                  </>
                )}
                {/* Main Circle with Checkmark */}
                <div
                  className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto relative ${
                    showSuccessAnimation ? "animate-scaleIn" : ""
                  }`}
                  style={{
                    backgroundColor: "#D84040",
                    boxShadow: "0 10px 40px rgba(216, 64, 64, 0.4), 0 0 0 8px rgba(216, 64, 64, 0.1)",
                    zIndex: 1,
                  }}
                >
                  {/* SVG Checkmark with draw animation */}
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      className={showSuccessAnimation ? "animate-drawCheck" : ""}
                      d="M5 13l4 4L19 7"
                      stroke="#EEEEEE"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              {/* Success Message */}
              <h3
                className={`text-2xl font-bold mb-4 ${showSuccessAnimation ? "animate-fadeInUp" : "opacity-0"}`}
                style={{
                  color: "#EEEEEE",
                  animationDelay: "0.5s",
                }}
              >
                ✅ Your order has been submitted successfully!
              </h3>
              <p
                className={`text-lg mb-2 ${showSuccessAnimation ? "animate-fadeInUp" : "opacity-0"}`}
                style={{
                  color: "rgba(238, 238, 238, 0.9)",
                  animationDelay: "0.7s",
                }}
              >
                We'll reach out in 24 hours.
              </p>
              <p
                className={`text-lg font-semibold ${showSuccessAnimation ? "animate-fadeInUp" : "opacity-0"}`}
                style={{
                  color: "#D84040",
                  animationDelay: "0.9s",
                }}
              >
                Get ready to elevate your content.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}