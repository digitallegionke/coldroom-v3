"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronRight, ChevronLeft, LayoutDashboard, RefreshCw, AlertCircle, Settings } from "lucide-react"

const steps = [
  {
    title: "Welcome to Cold Room Tracker",
    description: "Let's take a quick tour of the main features to help you get started.",
    icon: LayoutDashboard,
  },
  {
    title: "Monitor Cold Rooms",
    description: "View real-time temperature, humidity, and capacity data for all your cold rooms. Status indicators show normal (green), warning (yellow), or critical (red) conditions.",
    icon: AlertCircle,
  },
  {
    title: "Real-time Updates",
    description: "Each cold room card has an update button to fetch the latest data. You can also use 'Refresh All' to update all rooms at once.",
    icon: RefreshCw,
  },
  {
    title: "Customize Settings",
    description: "Visit the Settings page to configure temperature thresholds, notification preferences, and manage your cold room details.",
    icon: Settings,
  },
]

export function OnboardingModal() {
  const [open, setOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    // Check if user has completed onboarding
    const hasCompletedOnboarding = localStorage.getItem("hasCompletedOnboarding")
    if (!hasCompletedOnboarding && localStorage.getItem("isAuthenticated")) {
      setOpen(true)
    }
  }, [])

  const handleNext = () => {
    if (currentStep === steps.length - 1) {
      // Mark onboarding as complete
      localStorage.setItem("hasCompletedOnboarding", "true")
      setOpen(false)
    } else {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1)
  }

  const handleSkip = () => {
    localStorage.setItem("hasCompletedOnboarding", "true")
    setOpen(false)
  }

  const CurrentIcon = steps[currentStep].icon

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle>
          {steps[currentStep].title}
        </DialogTitle>
        <DialogDescription>
          {steps[currentStep].description}
        </DialogDescription>
        <div className="flex flex-col items-center gap-6 py-6">
          <CurrentIcon className="h-12 w-12 text-blue-500" />
          
          <div className="text-center space-y-2">
            <h2 className="text-lg font-semibold">{steps[currentStep].title}</h2>
            <p className="text-sm text-gray-600">{steps[currentStep].description}</p>
          </div>

          {/* Progress dots */}
          <div className="flex gap-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full ${
                  index === currentStep ? "bg-blue-500" : "bg-gray-200"
                }`}
              />
            ))}
          </div>

          <div className="flex justify-between w-full mt-4">
            <div className="flex gap-2">
              {currentStep > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrevious}
                  className="gap-1"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Back
                </Button>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSkip}
              >
                Skip
              </Button>
              <Button
                size="sm"
                onClick={handleNext}
                className="gap-1"
              >
                {currentStep === steps.length - 1 ? "Get Started" : "Next"}
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}