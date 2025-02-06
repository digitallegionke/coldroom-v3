"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Page() {
  const router = useRouter()

  useEffect(() => {
    // Check if user has completed onboarding
    const hasCompletedOnboarding = localStorage.getItem("hasCompletedOnboarding")
    
    if (!hasCompletedOnboarding) {
      router.push("/onboarding")
    } else {
      router.push("/dashboard")
    }
  }, [router])

  return null
}