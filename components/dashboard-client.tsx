"use client"

import { useEffect, useState } from "react"
import { ColdRoom } from "@/lib/data"
import { ColdRoomCard } from "@/components/ui/cold-room-card"
import { AlertCircle, RefreshCw } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { ColdRoomModal } from "@/components/ui/cold-room-modal"
import { OnboardingModal } from "@/components/ui/onboarding-modal"

export function DashboardClient() {
  const [coldRooms, setColdRooms] = useState<ColdRoom[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [updatingRooms, setUpdatingRooms] = useState<Set<string>>(new Set())
  const [selectedRoom, setSelectedRoom] = useState<ColdRoom | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    fetchColdRooms(true) // Initial load
    // Set up periodic refresh every 30 seconds
    const interval = setInterval(() => fetchColdRooms(false), 30000)
    return () => clearInterval(interval)
  }, [])

  const handleRefresh = () => {
    fetchColdRooms(false)
  }

  async function fetchColdRooms(isInitialLoad = false) {
    try {
      if (isInitialLoad) {
        setLoading(true)
      }
      const response = await fetch('/api/cold-rooms')
      if (!response.ok) throw new Error('Failed to fetch cold rooms')
      const data = await response.json()
      setColdRooms(data)
      setError(null)
    } catch (err) {
      setError('Failed to load cold room data. Please try again later.')
      console.error('Error fetching cold rooms:', err)
    } finally {
      setLoading(false)
    }
  }

  async function handleUpdateRoom(coldRoom: ColdRoom) {
    try {
      setUpdatingRooms(prev => new Set(prev).add(coldRoom.id))
      const response = await fetch(`/api/cold-rooms`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: coldRoom.id,
          temperature: coldRoom.temperature + (Math.random() * 0.4 - 0.2), // Simulate small temperature change
        }),
      })

      if (!response.ok) throw new Error('Failed to update cold room')
      
      const updatedRoom = await response.json()
      setColdRooms(rooms => 
        rooms.map(room => 
          room.id === updatedRoom.id ? updatedRoom : room
        )
      )

      // Update selected room if it's currently displayed in modal
      if (selectedRoom?.id === updatedRoom.id) {
        setSelectedRoom(updatedRoom)
      }
    } catch (err) {
      console.error('Error updating cold room:', err)
      setError('Failed to update cold room. Please try again.')
    } finally {
      setUpdatingRooms(prev => {
        const next = new Set(prev)
        next.delete(coldRoom.id)
        return next
      })
    }
  }

  function handleCardClick(coldRoom: ColdRoom) {
    setSelectedRoom(coldRoom)
    setModalOpen(true)
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5].map((n) => (
            <div key={n} className="h-[300px] rounded-xl border bg-card text-card-foreground shadow animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <Button onClick={handleRefresh} variant="outline" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Try Again
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Active Cold Rooms</h2>
        <Button onClick={handleRefresh} variant="outline" size="sm" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Refresh All
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coldRooms.map((coldRoom) => (
          <div 
            key={coldRoom.id}
            onClick={() => handleCardClick(coldRoom)}
            className="cursor-pointer"
          >
            <ColdRoomCard
              data={coldRoom}
              onUpdate={() => handleUpdateRoom(coldRoom)}
              isUpdating={updatingRooms.has(coldRoom.id)}
            />
          </div>
        ))}
      </div>
      <ColdRoomModal
        coldRoom={selectedRoom}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
      <OnboardingModal />
    </div>
  )
} 