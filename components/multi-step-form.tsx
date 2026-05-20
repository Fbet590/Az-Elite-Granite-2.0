"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, ArrowLeft, Check, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

type FormData = {
  projectType: string
  space: string
  budget: string
  flexibility: string
  fullName: string
  email: string
  phone: string
}

const TOTAL_STEPS = 7

export function MultiStepForm() {
  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState<"forward" | "backward">("forward")
  const [isAnimating, setIsAnimating] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    projectType: "",
    space: "",
    budget: "",
    flexibility: "",
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
        projectType: formData.projectType === "new" ? "New Installation" : "Replacing Old Countertops",
        space: formData.space === "kitchen" ? "Kitchen" : formData.space === "bathroom" ? "Bathroom(s)" : "Outdoor / Bar Area",
        budget: formData.budget === "5k-8k" ? "$5,000 - $8,000" : formData.budget === "10k-18k" ? "$10,000 - $18,000" : "$20,000+",
        budgetFlexibility: formData.flexibility === "flexible-premium" ? "Yes, I prefer premium quality" : formData.flexibility === "flexible-maybe" ? "Maybe, depends on the options" : "No, I have a fixed budget",
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
        return formData.projectType !== ""
      case 2:
        return formData.space !== ""
      case 3:
        return formData.budget !== ""
      case 4:
        return formData.flexibility !== ""
      case 5:
        return formData.fullName.trim() !== ""
      case 6:
        return formData.email.trim() !== "" && formData.email.includes("@")
      case 7:
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
        "hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]",
        selected
          ? "border-accent bg-accent/10 shadow-md ring-2 ring-accent/20"
          : "border-border bg-card hover:border-accent/50 hover:bg-accent/5"
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {icon && (
            <div className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center transition-colors",
              selected ? "bg-accent text-accent-foreground" : "bg-secondary text-muted-foreground"
            )}>
              {icon}
            </div>
          )}
          <span className="font-medium text-foreground">{label}</span>
        </div>
        <div className={cn(
          "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300",
          selected 
            ? "border-accent bg-accent scale-100" 
            : "border-muted-foreground/30 scale-90"
        )}>
          {selected && <Check className="w-4 h-4 text-accent-foreground" />}
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
      <div className="bg-card/95 backdrop-blur-sm border border-border rounded-2xl shadow-2xl p-8 md:p-10 text-center">
        <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6 animate-bounce-in">
          <Check className="w-10 h-10 text-accent" />
        </div>
        <h3 className="font-serif text-2xl font-medium text-foreground mb-3">
          Thank You, {formData.fullName.split(" ")[0]}!
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          We&apos;ve received your request. Our team will contact you within 24 hours to schedule your free consultation.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-card/95 backdrop-blur-sm border border-border rounded-2xl shadow-2xl overflow-hidden">
      {/* Header with progress */}
      <div className="bg-secondary/50 px-6 py-4 border-b border-border">
        <div className="flex items-center justify-between text-sm mb-3">
          <span className="font-medium text-foreground">Free Estimate</span>
          <span className="text-muted-foreground">Step {step} of {TOTAL_STEPS}</span>
        </div>
        {/* Progress dots */}
        <div className="flex items-center gap-2">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-1.5 rounded-full transition-all duration-500",
                i < step 
                  ? "bg-accent flex-1" 
                  : i === step - 1 
                    ? "bg-accent/50 flex-1" 
                    : "bg-border flex-1"
              )}
            />
          ))}
        </div>
      </div>

      {/* Form content */}
      <div ref={containerRef} className="p-6 md:p-8 min-h-[340px] relative overflow-hidden">
        <div className={cn("transition-all duration-300", getSlideAnimation())}>
          {/* Step 1: Project Type */}
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <h3 className="font-serif text-xl md:text-2xl font-medium text-foreground mb-2">
                  What type of project are you planning?
                </h3>
                <p className="text-muted-foreground text-sm">
                  Select the option that best describes your project
                </p>
              </div>
              <div className="space-y-3">
                <OptionButton
                  label="New Installation"
                  value="new"
                  selected={formData.projectType === "new"}
                  onClick={() => handleOptionSelect("projectType", "new")}
                  icon={<span className="text-lg">+</span>}
                />
                <OptionButton
                  label="Replacing Old Countertops"
                  value="replacement"
                  selected={formData.projectType === "replacement"}
                  onClick={() => handleOptionSelect("projectType", "replacement")}
                  icon={<span className="text-lg">↻</span>}
                />
              </div>
            </div>
          )}

          {/* Step 2: Space */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <h3 className="font-serif text-xl md:text-2xl font-medium text-foreground mb-2">
                  What space needs countertops?
                </h3>
                <p className="text-muted-foreground text-sm">
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

          {/* Step 3: Budget */}
          {step === 3 && (
            <div className="space-y-5">
              <div>
                <h3 className="font-serif text-xl md:text-2xl font-medium text-foreground mb-2">
                  What&apos;s your approximate budget?
                </h3>
                <p className="text-muted-foreground text-sm">
                  This helps us recommend the best options for you
                </p>
              </div>
              <div className="space-y-3">
                <OptionButton
                  label="$5,000 - $8,000"
                  value="5k-8k"
                  selected={formData.budget === "5k-8k"}
                  onClick={() => handleOptionSelect("budget", "5k-8k")}
                  icon={<span className="text-sm font-bold">$</span>}
                />
                <OptionButton
                  label="$10,000 - $18,000"
                  value="10k-18k"
                  selected={formData.budget === "10k-18k"}
                  onClick={() => handleOptionSelect("budget", "10k-18k")}
                  icon={<span className="text-sm font-bold">$$</span>}
                />
                <OptionButton
                  label="$20,000+"
                  value="20k+"
                  selected={formData.budget === "20k+"}
                  onClick={() => handleOptionSelect("budget", "20k+")}
                  icon={<span className="text-sm font-bold">$$$</span>}
                />
              </div>
            </div>
          )}

          {/* Step 4: Budget Flexibility */}
          {step === 4 && (
            <div className="space-y-5">
              <div>
                <h3 className="font-serif text-xl md:text-2xl font-medium text-foreground mb-2">
                  Are you flexible with your budget?
                </h3>
                <p className="text-muted-foreground text-sm">
                  Understanding your flexibility helps us present the right options
                </p>
              </div>
              <div className="space-y-3">
                <OptionButton
                  label="Yes, I prefer premium quality"
                  value="flexible-premium"
                  selected={formData.flexibility === "flexible-premium"}
                  onClick={() => handleOptionSelect("flexibility", "flexible-premium")}
                  icon={<span className="text-lg">★</span>}
                />
                <OptionButton
                  label="Maybe, depends on the options"
                  value="flexible-maybe"
                  selected={formData.flexibility === "flexible-maybe"}
                  onClick={() => handleOptionSelect("flexibility", "flexible-maybe")}
                  icon={<span className="text-lg">≈</span>}
                />
                <OptionButton
                  label="No, I have a fixed budget"
                  value="fixed"
                  selected={formData.flexibility === "fixed"}
                  onClick={() => handleOptionSelect("flexibility", "fixed")}
                  icon={<span className="text-lg">=</span>}
                />
              </div>
            </div>
          )}

          {/* Step 5: Full Name */}
          {step === 5 && (
            <div className="space-y-5">
              <div>
                <h3 className="font-serif text-xl md:text-2xl font-medium text-foreground mb-2">
                  What&apos;s your full name?
                </h3>
                <p className="text-muted-foreground text-sm">
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
                  className="w-full px-5 py-4 bg-background border-2 border-border rounded-xl focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 text-foreground text-lg transition-all duration-200"
                  autoFocus
                />
              </div>
            </div>
          )}

          {/* Step 6: Email */}
          {step === 6 && (
            <div className="space-y-5">
              <div>
                <h3 className="font-serif text-xl md:text-2xl font-medium text-foreground mb-2">
                  What&apos;s your email address?
                </h3>
                <p className="text-muted-foreground text-sm">
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
                  className="w-full px-5 py-4 bg-background border-2 border-border rounded-xl focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 text-foreground text-lg transition-all duration-200"
                  autoFocus
                />
              </div>
            </div>
          )}

          {/* Step 7: Phone */}
          {step === 7 && (
            <div className="space-y-5">
              <div>
                <h3 className="font-serif text-xl md:text-2xl font-medium text-foreground mb-2">
                  What&apos;s your phone number?
                </h3>
                <p className="text-muted-foreground text-sm">
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
                  className="w-full px-5 py-4 bg-background border-2 border-border rounded-xl focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 text-foreground text-lg transition-all duration-200"
                  autoFocus
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="px-6 md:px-8 pb-6 md:pb-8">
        <div className="flex justify-between pt-4 border-t border-border">
          {step > 1 ? (
            <Button
              type="button"
              variant="ghost"
              onClick={prevStep}
              disabled={isAnimating}
              className="px-4 text-muted-foreground hover:text-foreground"
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
              className="px-6 bg-accent text-accent-foreground hover:bg-accent/90 disabled:opacity-50 shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 transition-all duration-200"
            >
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={!canProceed() || isSubmitting}
              className="px-6 bg-accent text-accent-foreground hover:bg-accent/90 disabled:opacity-50 shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 transition-all duration-200"
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
