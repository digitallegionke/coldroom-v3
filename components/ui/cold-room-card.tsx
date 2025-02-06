"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ColdRoom, getStatusColor, getTemperatureColor, formatTemperature } from "@/lib/data"
import { Thermometer, Droplets, Box } from "lucide-react"

interface ColdRoomCardProps {
  data: ColdRoom
  onClick?: () => void
}

export function ColdRoomCard({ data, onClick }: ColdRoomCardProps) {
  return (
    <Card 
      className="w-full hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold">{data.name}</CardTitle>
            <CardDescription>{data.location}</CardDescription>
          </div>
          <Badge 
            variant={data.status === 'normal' ? 'secondary' : 
                    data.status === 'warning' ? 'default' : 'destructive'}
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
            <p className={`text-xl font-bold ${getTemperatureColor(data.temperature, data.targetTemp)}`}>
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
          <Progress value={data.capacity} className="h-2" />
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Last Updated</span>
          <span>{data.lastUpdated}</span>
        </div>
      </CardContent>
    </Card>
  )
} 