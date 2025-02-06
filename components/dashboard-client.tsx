"use client"

import { useEffect, useState } from "react"
import { ColdRoom } from "@/lib/data"
import { ColdRoomCard } from "@/components/ui/cold-room-card"
import { AlertCircle, RefreshCw } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

export function DashboardClient() {
  const [coldRooms, setColdRooms] = useState<ColdRoom[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [updating, setUpdating] = useState<string | null>(null)

  useEffect(() => {
    fetchColdRooms()
  }, [])

  async function fetchColdRooms() {
    try {
      setLoading(true)
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

  async function handleColdRoomClick(coldRoom: ColdRoom) {
    try {
      setUpdating(coldRoom.id)
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
    } catch (err) {
      console.error('Error updating cold room:', err)
    } finally {
      setUpdating(null)
    }
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
        <Button onClick={fetchColdRooms} variant="outline" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Try Again
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={fetchColdRooms} variant="outline" size="sm" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Refresh Data
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coldRooms.map((coldRoom) => (
          <ColdRoomCard
            key={coldRoom.id}
            data={coldRoom}
            onClick={() => !updating && handleColdRoomClick(coldRoom)}
          />
        ))}
      </div>
    </div>
  )
} 