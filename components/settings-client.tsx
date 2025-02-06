"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, RefreshCw } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ColdRoom } from "@/lib/data"

type Settings = {
  id: string
  name: string
  targetTemp: number
  minTemp: number
  maxTemp: number
  minHumidity: number
  maxHumidity: number
  alertThreshold: number
  maintenanceInterval: number
}

export function SettingsClient() {
  const [settings, setSettings] = useState<Settings[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchSettings()
  }, [])

  async function fetchSettings() {
    try {
      setLoading(true)
      const response = await fetch('/api/cold-rooms')
      if (!response.ok) throw new Error('Failed to fetch settings')
      const rooms: ColdRoom[] = await response.json()
      
      // Convert cold rooms data to settings format
      const settingsData: Settings[] = rooms.map(room => ({
        id: room.id,
        name: room.name,
        targetTemp: room.targetTemp,
        minTemp: room.targetTemp - 2,
        maxTemp: room.targetTemp + 2,
        minHumidity: 75,
        maxHumidity: 90,
        alertThreshold: 1.5,
        maintenanceInterval: 30,
      }))
      
      setSettings(settingsData)
      setError(null)
    } catch (err) {
      setError('Failed to load settings. Please try again later.')
      console.error('Error fetching settings:', err)
    } finally {
      setLoading(false)
    }
  }

  async function handleSave(setting: Settings) {
    try {
      setSaving(true)
      const response = await fetch('/api/cold-rooms', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: setting.id,
          targetTemp: setting.targetTemp,
        }),
      })

      if (!response.ok) throw new Error('Failed to update settings')
      
      // Refresh settings after save
      await fetchSettings()
    } catch (err) {
      setError('Failed to save settings. Please try again.')
      console.error('Error saving settings:', err)
    } finally {
      setSaving(false)
    }
  }

  function handleInputChange(id: string, field: keyof Settings, value: number) {
    setSettings(prev =>
      prev.map(setting =>
        setting.id === id
          ? { ...setting, [field]: value }
          : setting
      )
    )
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((n) => (
          <Card key={n}>
            <CardHeader>
              <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="h-10 bg-gray-200 rounded animate-pulse" />
                <div className="h-10 bg-gray-200 rounded animate-pulse" />
              </div>
            </CardContent>
          </Card>
        ))}
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
        <Button onClick={fetchSettings} variant="outline" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Try Again
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Configure parameters and thresholds for your cold storage facilities
        </p>
      </div>

      <div className="space-y-4">
        {settings.map((setting) => (
          <Card key={setting.id}>
            <CardHeader>
              <CardTitle>{setting.name}</CardTitle>
              <CardDescription>Configure operational parameters</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Target Temperature (°C)</label>
                  <input
                    type="number"
                    value={setting.targetTemp}
                    onChange={(e) => {
                      const value = e.target.value
                      if (value === '') return // Allow empty input while typing
                      const num = parseFloat(value)
                      if (!isNaN(num)) {
                        handleInputChange(setting.id, 'targetTemp', num)
                      }
                    }}
                    className="w-full p-2 border rounded"
                    step="0.1"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Temperature Range (°C)</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={setting.minTemp}
                      onChange={(e) => {
                        const value = e.target.value
                        if (value === '') return
                        const num = parseFloat(value)
                        if (!isNaN(num)) {
                          handleInputChange(setting.id, 'minTemp', num)
                        }
                      }}
                      className="w-full p-2 border rounded"
                      step="0.1"
                    />
                    <span className="flex items-center">to</span>
                    <input
                      type="number"
                      value={setting.maxTemp}
                      onChange={(e) => {
                        const value = e.target.value
                        if (value === '') return
                        const num = parseFloat(value)
                        if (!isNaN(num)) {
                          handleInputChange(setting.id, 'maxTemp', num)
                        }
                      }}
                      className="w-full p-2 border rounded"
                      step="0.1"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Humidity Range (%)</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={setting.minHumidity}
                      onChange={(e) => {
                        const value = e.target.value
                        if (value === '') return
                        const num = parseInt(value)
                        if (!isNaN(num)) {
                          handleInputChange(setting.id, 'minHumidity', num)
                        }
                      }}
                      className="w-full p-2 border rounded"
                    />
                    <span className="flex items-center">to</span>
                    <input
                      type="number"
                      value={setting.maxHumidity}
                      onChange={(e) => {
                        const value = e.target.value
                        if (value === '') return
                        const num = parseInt(value)
                        if (!isNaN(num)) {
                          handleInputChange(setting.id, 'maxHumidity', num)
                        }
                      }}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Alert Threshold (°C)</label>
                  <input
                    type="number"
                    value={setting.alertThreshold}
                    onChange={(e) => {
                      const value = e.target.value
                      if (value === '') return
                      const num = parseFloat(value)
                      if (!isNaN(num)) {
                        handleInputChange(setting.id, 'alertThreshold', num)
                      }
                    }}
                    className="w-full p-2 border rounded"
                    step="0.1"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Maintenance Interval (days)</label>
                  <input
                    type="number"
                    value={setting.maintenanceInterval}
                    onChange={(e) => {
                      const value = e.target.value
                      if (value === '') return
                      const num = parseInt(value)
                      if (!isNaN(num)) {
                        handleInputChange(setting.id, 'maintenanceInterval', num)
                      }
                    }}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="md:col-span-2">
                  <Button
                    onClick={() => handleSave(setting)}
                    disabled={saving}
                    className="w-full md:w-auto"
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}