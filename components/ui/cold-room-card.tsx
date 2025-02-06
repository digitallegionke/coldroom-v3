"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ColdRoom, getStatusColor, getTemperatureColor, formatTemperature } from "@/lib/data"
import { Thermometer, Droplets, Box, RefreshCcw, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface ColdRoomCardProps {
  data: ColdRoom
  onUpdate?: () => void
  isUpdating?: boolean
}

export function ColdRoomCard({ data, onUpdate, isUpdating }: ColdRoomCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card 
      className={cn(
        "relative w-full transition-all duration-300",
        isHovered ? "shadow-lg scale-[1.02] bg-accent/10" : "hover:shadow-md"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isUpdating && (
        <div className="absolute inset-0 bg-background/50 backdrop-blur-sm rounded-xl flex items-center justify-center z-50">
          <RefreshCcw className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold group-hover:text-primary">{data.name}</CardTitle>
            <CardDescription>{data.location}</CardDescription>
          </div>
          <Badge 
            variant={data.status === 'normal' ? 'secondary' : 
                    data.status === 'warning' ? 'default' : 'destructive'}
            className="transition-transform duration-300"
          >
            {data.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Thermometer className="h-4 w-4" />
              <span>Temperature</span>
            </div>
            <p className={cn(
              "text-xl font-bold transition-colors duration-300",
              getTemperatureColor(data.temperature, data.targetTemp)
            )}>
              {formatTemperature(data.temperature)}
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Droplets className="h-4 w-4" />
              <span>Humidity</span>
            </div>
            <p className="text-xl font-bold">
              {data.humidity}%
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Box className="h-4 w-4" />
              <span>Capacity</span>
            </div>
            <p className="text-xl font-bold">
              {data.capacity}%
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Storage Usage</span>
            <span className="font-medium">{data.capacity}%</span>
          </div>
          <Progress 
            value={data.capacity} 
            className={cn(
              "h-2 transition-all duration-300",
              isHovered ? "h-3" : "h-2"
            )} 
          />
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Last Updated: {data.lastUpdated}</span>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                onUpdate?.()
              }}
              disabled={isUpdating}
              className="relative overflow-hidden group"
            >
              <span className={cn(
                "inline-flex items-center gap-2 transition-transform duration-300",
                isHovered ? "translate-x-0" : "translate-x-2"
              )}>
                Update
                <RefreshCcw className={cn(
                  "h-4 w-4 transition-all duration-300",
                  isHovered ? "rotate-180" : "rotate-0"
                )} />
              </span>
            </Button>
            <ChevronRight className={cn(
              "h-5 w-5 text-muted-foreground transition-transform duration-300",
              isHovered ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
            )} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 