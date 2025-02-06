"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Settings } from "lucide-react"

export default function SettingsPage() {
  const router = useRouter()

  const handleBack = () => {
    router.push("/onboarding/updates")
  }

  const handleGetStarted = () => {
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
          <Settings className="h-12 w-12 text-blue-500 mx-auto" />
          
          <div className="text-center space-y-2">
            <h2 className="text-xl font-semibold">Customize Settings</h2>
            <p className="text-muted-foreground">
              Visit the Settings page to configure temperature thresholds, 
              notification preferences, and manage your cold room details.
            </p>
          </div>

          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={handleBack}
              className="gap-1"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>
            <Button
              onClick={handleGetStarted}
              className="gap-1"
            >
              Get Started
            </Button>
          </div>
        </div>

        <div className="flex justify-center gap-2">
          <div className="h-2 w-2 rounded-full bg-gray-200" />
          <div className="h-2 w-2 rounded-full bg-gray-200" />
          <div className="h-2 w-2 rounded-full bg-gray-200" />
          <div className="h-2 w-2 rounded-full bg-blue-500" />
        </div>
      </div>
    </div>
  )
}