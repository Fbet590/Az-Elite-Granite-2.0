"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, ArrowLeft, Check, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

type FormData = {
  space: string
  fullName: string
  email: string
  phone: string
}

const TOTAL_STEPS = 4

export function MultiStepForm() {
  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState<"forward" | "backward">("forward")
  const [isAnimating, setIsAnimating] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    space: "",
    fullName: "",
    email: "",
    phone: "",
  })
  const containerRef = useRef<HTMLDivElement>(null)

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (step < TOTAL_STEPS && !isAnimating) {
      setDirection("forward")
      setIsAnimating(true)
      setTimeout(() => {
        setStep(step + 1)
        setIsAnimating(false)
      }, 300)
    }
  }

  const prevStep = () => {
    if (step > 1 && !isAnimating) {
      setDirection("backward")
      setIsAnimating(true)
      setTimeout(() => {
        setStep(step - 1)
        setIsAnimating(false)
      }, 300)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    try {
      const submitData = {
        projectType: "$4500 Quartz Package Inquiry",
        space: formData.space === "kitchen" ? "Kitchen" : formData.space === "bathroom" ? "Bathroom(s)" : "Outdoor / Bar Area",
        budget: "$4,500 Package",
        budgetFlexibility: "N/A - Fixed Package",
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
      }

      const response = await fetch("/api/submit-lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      })

      const result = await response.json()
      
      if (result.success) {
        // Track Facebook Lead event
        if (typeof window !== 'undefined' && (window as typeof window & { fbq?: (...args: unknown[]) => void }).fbq) {
          (window as typeof window & { fbq: (...args: unknown[]) => void }).fbq('track', 'Lead', {
            content_name: 'Countertop Estimate Request',
            content_category: submitData.space,
            value: submitData.budget,
            currency: 'USD'
          })
        }
        setIsComplete(true)
      } else {
        console.error("Submission failed:", result.error)
        // Track Facebook Lead event even on API error since form was submitted
        if (typeof window !== 'undefined' && (window as typeof window & { fbq?: (...args: unknown[]) => void }).fbq) {
          (window as typeof window & { fbq: (...args: unknown[]) => void }).fbq('track', 'Lead', {
            content_name: 'Countertop Estimate Request',
            content_category: submitData.space,
            value: submitData.budget,
            currency: 'USD'
          })
        }
        setIsComplete(true)
      }
    } catch (error) {
      console.error("Form submission error:", error)
      // Track Facebook Lead event even on error since user attempted submission
      if (typeof window !== 'undefined' && (window as typeof window & { fbq?: (...args: unknown[]) => void }).fbq) {
        (window as typeof window & { fbq: (...args: unknown[]) => void }).fbq('track', 'Lead', {
          content_name: 'Countertop Estimate Request'
        })
      }
      // Show success anyway to not frustrate user
      setIsComplete(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.space !== ""
      case 2:
        return formData.fullName.trim() !== ""
      case 3:
        return formData.email.trim() !== "" && formData.email.includes("@")
      case 4:
        return formData.phone.trim() !== ""
      default:
        return false
    }
  }

  // Auto-advance after selection for multiple choice questions
  const handleOptionSelect = (field: keyof FormData, value: string) => {
    updateField(field, value)
    // Auto-advance after a brief delay for visual feedback
    setTimeout(() => {
      if (step < TOTAL_STEPS) {
        nextStep()
      }
    }, 400)
  }

  const OptionButton = ({
    label,
    value,
    selected,
    onClick,
    icon,
  }: {
    label: string
    value: string
    selected: boolean
    onClick: () => void
    icon?: React.ReactNode
  }) => (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full p-5 text-left border-2 rounded-xl transition-all duration-300 transform",
        "hover:scale-[1.02] active:scale-[0.98]",
        selected
          ? "border-stone-500 bg-stone-100 shadow-md"
          : "border-stone-300 bg-white hover:border-stone-400 hover:bg-stone-50"
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {icon && (
            <div className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center transition-colors",
              selected ? "bg-stone-800 text-white" : "bg-stone-100 text-stone-500"
            )}>
              {icon}
            </div>
          )}
          <span className="font-medium text-stone-800">{label}</span>
        </div>
        <div className={cn(
          "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300",
          selected 
            ? "border-stone-800 bg-stone-800 scale-100" 
            : "border-stone-300 scale-90"
        )}>
          {selected && <Check className="w-4 h-4 text-white" />}
        </div>
      </div>
    </button>
  )

  const getSlideAnimation = () => {
    if (isAnimating) {
      return direction === "forward" 
        ? "animate-slide-out-left" 
        : "animate-slide-out-right"
    }
    return direction === "forward" 
      ? "animate-slide-in-right" 
      : "animate-slide-in-left"
  }

  if (isComplete) {
    return (
      <div className="relative bg-white border-2 border-stone-300 rounded-2xl shadow-2xl p-8 md:p-10 text-center">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-6 animate-bounce-in">
            <Check className="w-10 h-10 text-stone-800" />
          </div>
          <h3 className="font-serif text-2xl font-medium text-stone-900 mb-3">
            Thank You, {formData.fullName.split(" ")[0]}!
          </h3>
          <p className="text-stone-600 leading-relaxed">
            We&apos;ve received your request. Our team will contact you within 24 hours to schedule your free consultation.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative bg-white border-2 border-stone-300 rounded-2xl shadow-2xl overflow-hidden">
      {/* Subtle top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-stone-300 via-stone-400 to-stone-300" />
      
      {/* Header with headline */}
      <div className="relative border-b border-stone-100 px-6 py-6 bg-stone-50">
        <h2 className="text-[1.875rem] md:text-[1.875rem] font-bold text-stone-900 text-center mb-2 tracking-wide">
          Get our $4500 Quartz Package
        </h2>
        <p className="text-stone-700 text-center text-xl md:text-xl">
          Flat Pricing. Most homes qualify for this package! Lets find out!
        </p>
      </div>
      
      {/* Progress bar section */}
      <div className="relative px-6 py-4 border-b border-stone-100">
        <div className="flex items-center justify-between text-sm mb-3">
          <span className="font-medium text-stone-700 tracking-wide">Free Estimate</span>
          <span className="text-stone-500">Step {step} of {TOTAL_STEPS}</span>
        </div>
        {/* Progress dots */}
        <div className="flex items-center gap-2">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-1.5 rounded-full transition-all duration-500",
                i < step 
                  ? "bg-stone-800 flex-1" 
                  : i === step - 1 
                    ? "bg-stone-300 flex-1" 
                    : "bg-stone-200 flex-1"
              )}
            />
          ))}
        </div>
      </div>

      {/* Form content */}
      <div ref={containerRef} className="relative p-6 md:p-8 min-h-[300px] overflow-hidden bg-white">
        <div className={cn("transition-all duration-300", getSlideAnimation())}>
          {/* Step 1: Space */}
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <h3 className="font-serif text-[1.625rem] md:text-2xl font-medium text-stone-900 mb-2">
                  What space needs countertops?
                </h3>
                <p className="text-stone-500 text-sm">
                  Select the area where you need countertops installed
                </p>
              </div>
              <div className="space-y-3">
                <OptionButton
                  label="Kitchen"
                  value="kitchen"
                  selected={formData.space === "kitchen"}
                  onClick={() => handleOptionSelect("space", "kitchen")}
                  icon={<span className="text-lg">🍳</span>}
                />
                <OptionButton
                  label="Bathroom(s)"
                  value="bathroom"
                  selected={formData.space === "bathroom"}
                  onClick={() => handleOptionSelect("space", "bathroom")}
                  icon={<span className="text-lg">🚿</span>}
                />
                <OptionButton
                  label="Outdoor / Bar Area"
                  value="outdoor"
                  selected={formData.space === "outdoor"}
                  onClick={() => handleOptionSelect("space", "outdoor")}
                  icon={<span className="text-lg">☀️</span>}
                />
              </div>
            </div>
          )}

          {/* Step 2: Full Name */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <h3 className="font-serif text-xl md:text-2xl font-medium text-stone-900 mb-2">
                  What&apos;s your full name?
                </h3>
                <p className="text-stone-500 text-sm">
                  We&apos;ll use this to personalize your consultation
                </p>
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => updateField("fullName", e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && canProceed() && nextStep()}
                  placeholder="Enter your full name"
                  className="w-full px-5 py-4 bg-stone-50 border-2 border-stone-300 rounded-xl focus:outline-none focus:border-stone-500 focus:ring-2 focus:ring-stone-200 text-stone-900 text-lg transition-all duration-200 placeholder:text-stone-400"
                  autoFocus
                />
              </div>
            </div>
          )}

          {/* Step 3: Email */}
          {step === 3 && (
            <div className="space-y-5">
              <div>
                <h3 className="font-serif text-xl md:text-2xl font-medium text-stone-900 mb-2">
                  What&apos;s your email address?
                </h3>
                <p className="text-stone-500 text-sm">
                  We&apos;ll send your estimate details here
                </p>
              </div>
              <div className="relative">
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && canProceed() && nextStep()}
                  placeholder="your@email.com"
                  className="w-full px-5 py-4 bg-stone-50 border-2 border-stone-300 rounded-xl focus:outline-none focus:border-stone-500 focus:ring-2 focus:ring-stone-200 text-stone-900 text-lg transition-all duration-200 placeholder:text-stone-400"
                  autoFocus
                />
              </div>
            </div>
          )}

          {/* Step 4: Phone */}
          {step === 4 && (
            <div className="space-y-5">
              <div>
                <h3 className="font-serif text-xl md:text-2xl font-medium text-stone-900 mb-2">
                  What&apos;s your phone number?
                </h3>
                <p className="text-stone-500 text-sm">
                  Our team will call to schedule your free consultation
                </p>
              </div>
              <div className="relative">
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && canProceed() && handleSubmit()}
                  placeholder="(555) 123-4567"
                  className="w-full px-5 py-4 bg-stone-50 border-2 border-stone-300 rounded-xl focus:outline-none focus:border-stone-500 focus:ring-2 focus:ring-stone-200 text-stone-900 text-lg transition-all duration-200 placeholder:text-stone-400"
                  autoFocus
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="relative px-6 md:px-8 pb-6 md:pb-8 bg-white">
        <div className="flex justify-between pt-4 border-t border-stone-100">
          {step > 1 ? (
            <Button
              type="button"
              variant="ghost"
              onClick={prevStep}
              disabled={isAnimating}
              className="px-4 text-stone-500 hover:text-stone-800 hover:bg-stone-100"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          ) : (
            <div />
          )}

          {step < TOTAL_STEPS ? (
            <Button
              type="button"
              onClick={nextStep}
              disabled={!canProceed() || isAnimating}
              className="px-6 bg-stone-900 text-white hover:bg-stone-800 disabled:opacity-50 shadow-lg transition-all duration-200 font-medium"
            >
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={!canProceed() || isSubmitting}
              className="px-6 bg-stone-900 text-white hover:bg-stone-800 disabled:opacity-50 shadow-lg transition-all duration-200 font-medium"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Get My Free Estimate
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
