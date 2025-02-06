"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ColdRoom, formatTemperature, getTemperatureColor } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Thermometer, Droplets, Box, Clock, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"

interface ColdRoomModalProps {
  coldRoom: ColdRoom | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ColdRoomModal({ coldRoom, open, onOpenChange }: ColdRoomModalProps) {
  if (!coldRoom) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold">{coldRoom.name}</DialogTitle>
              <DialogDescription className="flex items-center gap-2 mt-1">
                <MapPin className="h-4 w-4" />
                {coldRoom.location}
              </DialogDescription>
            </div>
            <Badge 
              variant={coldRoom.status === 'normal' ? 'secondary' : 
                      coldRoom.status === 'warning' ? 'default' : 'destructive'}
              className="text-sm capitalize"
            >
              {coldRoom.status}
            </Badge>
          </div>
        </DialogHeader>

        <div className="grid gap-6">
          {/* Temperature Section */}
          <div className="grid gap-4">
            <h3 className="font-semibold">Temperature Monitoring</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 p-4 rounded-lg border">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Thermometer className="h-4 w-4" />
                  <span>Current Temperature</span>
                </div>
                <p className={cn(
                  "text-2xl font-bold",
                  getTemperatureColor(coldRoom.temperature, coldRoom.targetTemp)
                )}>
                  {formatTemperature(coldRoom.temperature)}
                </p>
              </div>
              <div className="space-y-2 p-4 rounded-lg border">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Thermometer className="h-4 w-4" />
                  <span>Target Temperature</span>
                </div>
                <p className="text-2xl font-bold">
                  {formatTemperature(coldRoom.targetTemp)}
                </p>
              </div>
            </div>
          </div>

          {/* Environment Section */}
          <div className="grid gap-4">
            <h3 className="font-semibold">Environment Status</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 p-4 rounded-lg border">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Droplets className="h-4 w-4" />
                  <span>Humidity Level</span>
                </div>
                <p className="text-2xl font-bold">
                  {coldRoom.humidity}%
                </p>
              </div>
              <div className="space-y-2 p-4 rounded-lg border">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Box className="h-4 w-4" />
                  <span>Storage Capacity</span>
                </div>
                <p className="text-2xl font-bold">
                  {coldRoom.capacity}%
                </p>
              </div>
            </div>
          </div>

          {/* Capacity Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Storage Usage</span>
              <span className="font-medium">{coldRoom.capacity}%</span>
            </div>
            <Progress value={coldRoom.capacity} className="h-3" />
          </div>

          {/* Last Updated */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Last Updated: {coldRoom.lastUpdated}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 