"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import { ColdRoom, formatTemperature } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { X } from "lucide-react"

interface ColdRoomModalProps {
  coldRoom: ColdRoom | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ColdRoomModal({ coldRoom, open, onOpenChange }: ColdRoomModalProps) {
  if (!coldRoom) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold">{coldRoom.name} Coldroom Details</DialogTitle>
            <DialogClose asChild>
              <Button variant="ghost" size="icon">
                <X className="h-4 w-4" />
              </Button>
            </DialogClose>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-6">
          {/* Status Overview */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Status Overview</h3>
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-sm text-muted-foreground">Temperature</span>
                <p className="text-2xl font-bold">{formatTemperature(coldRoom.temperature)}</p>
              </div>
              <div className="space-y-1">
                <span className="text-sm text-muted-foreground">Capacity Usage</span>
                <p className="text-2xl font-bold">{coldRoom.capacity}%</p>
                <Progress value={coldRoom.capacity} className="h-2" />
              </div>
              <div className="space-y-1">
                <span className="text-sm text-muted-foreground">Last Checked</span>
                <p className="font-medium">{coldRoom.lastChecked}</p>
              </div>
            </div>
          </div>

          {/* Critical Items */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Critical Items</h3>
            <div className="space-y-2">
              {coldRoom.criticalItems.map((item, index) => (
                <div
                  key={index}
                  className="p-4 bg-red-50 rounded-lg flex justify-between items-center"
                >
                  <div>
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">{item.quantity}</p>
                  </div>
                  <p className="text-red-600">Expires in {item.expiresIn} days</p>
                </div>
              ))}
            </div>
          </div>

          {/* Today's Incoming */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Today's Incoming</h3>
            <div className="space-y-2">
              {coldRoom.incomingItems.map((item, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium">{item.item}</h4>
                  <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                  <p className="text-sm text-muted-foreground">Farmer: {item.source}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Today's Outgoing */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Today's Outgoing</h3>
            <div className="space-y-2">
              {coldRoom.outgoingItems.map((item, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium">{item.item}</h4>
                  <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                  <p className="text-sm text-muted-foreground">Client: {item.source}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Pickups */}
          <div className="col-span-2 space-y-4">
            <h3 className="text-lg font-semibold">Upcoming Pickups</h3>
            <div className="border rounded-lg">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-2 text-left">Date</th>
                    <th className="px-4 py-2 text-left">Item</th>
                    <th className="px-4 py-2 text-left">Quantity</th>
                    <th className="px-4 py-2 text-left">Client</th>
                  </tr>
                </thead>
                <tbody>
                  {coldRoom.upcomingPickups.map((pickup, index) => (
                    <tr key={index} className="border-b last:border-0">
                      <td className="px-4 py-2">{pickup.date}</td>
                      <td className="px-4 py-2">{pickup.item}</td>
                      <td className="px-4 py-2">{pickup.quantity}</td>
                      <td className="px-4 py-2">{pickup.client}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}