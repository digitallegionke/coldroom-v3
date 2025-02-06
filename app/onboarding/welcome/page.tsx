"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { LayoutDashboard } from "lucide-react"

export default function WelcomePage() {
  const router = useRouter()

  const handleNext = () => {
    router.push("/onboarding/monitor")
  }

  const handleSkip = () => {
    localStorage.setItem("hasCompletedOnboarding", "true")
    router.push("/login")
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <div className="w-full max-w-lg space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Cold Room Tracker</h1>
          <p className="text-muted-foreground">Monitor and manage your cold rooms efficiently</p>
        </div>

        <div className="bg-card rounded-lg shadow-lg p-8 space-y-6">
          <LayoutDashboard className="h-12 w-12 text-blue-500 mx-auto" />
          
          <div className="text-center space-y-2">
            <h2 className="text-xl font-semibold">Welcome to Cold Room Tracker</h2>
            <p className="text-muted-foreground">
              Let's take a quick tour of the main features to help you get started.
            </p>
          </div>

          <div className="flex justify-between pt-4">
            <div />
            <div className="flex gap-2">
              <Button
                variant="ghost"
                onClick={handleSkip}
              >
                Skip Tour
              </Button>
              <Button
                onClick={handleNext}
                className="gap-1"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-2">
          <div className="h-2 w-2 rounded-full bg-blue-500" />
          <div className="h-2 w-2 rounded-full bg-gray-200" />
          <div className="h-2 w-2 rounded-full bg-gray-200" />
          <div className="h-2 w-2 rounded-full bg-gray-200" />
        </div>
      </div>
    </div>
  )
}