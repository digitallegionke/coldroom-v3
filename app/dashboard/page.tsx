import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, Bell, Calendar, Snowflake, ThermometerSnowflake, Warehouse } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col space-y-6 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Cold Room Dashboard</h1>
          <p className="text-muted-foreground">Monitor and manage your cold storage facilities</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Bell className="h-4 w-4" />
          Notifications
        </Button>
      </div>

      <Alert variant="destructive" className="w-full">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Temperature Alert</AlertTitle>
        <AlertDescription>Cold Room #2 temperature is above threshold. Current: -12°C (Target: -18°C)</AlertDescription>
      </Alert>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Average Temperature</CardTitle>
            <ThermometerSnowflake className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-18.5°C</div>
            <p className="text-xs text-muted-foreground">Optimal range: -20°C to -16°C</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Capacity</CardTitle>
            <Warehouse className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <Progress value={78} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Active Cold Rooms</CardTitle>
            <Snowflake className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4/5</div>
            <p className="text-xs text-muted-foreground">1 room in maintenance</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Next Maintenance</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2d 14h</div>
            <p className="text-xs text-muted-foreground">Cold Room #3 scheduled</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="temperature">Temperature</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Cold Room #{i + 1}
                    <Badge variant={i === 1 ? "destructive" : "secondary"}>{i === 1 ? "Alert" : "Normal"}</Badge>
                  </CardTitle>
                  <CardDescription>Last updated: 2 mins ago</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Temperature</span>
                    <span className="font-medium">{-18 + i}°C</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Humidity</span>
                    <span className="font-medium">{85 - i}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Capacity</span>
                    <span className="font-medium">{70 + i}%</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="temperature" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Temperature Trends</CardTitle>
                <CardDescription>24-hour temperature variation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center border rounded">
                  [Temperature Graph Placeholder]
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Temperature Controls</CardTitle>
                <CardDescription>Adjust temperature settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Cold Room #{i + 1}</span>
                      <Badge variant={i === 1 ? "destructive" : "secondary"}>
                        {i === 1 ? "-12°C" : "-18°C"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4">
                      <Button variant="outline" size="sm">-</Button>
                      <div className="flex-1">
                        <Progress value={i === 1 ? 70 : 90} />
                      </div>
                      <Button variant="outline" size="sm">+</Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Target: -18°C | Range: -20°C to -16°C
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Temperature Alerts</CardTitle>
                <CardDescription>Recent temperature-related notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      room: "Cold Room #2",
                      alert: "Temperature above threshold",
                      time: "2 hours ago",
                      severity: "high"
                    },
                    {
                      room: "Cold Room #1",
                      alert: "Temperature fluctuation detected",
                      time: "5 hours ago",
                      severity: "medium"
                    },
                    {
                      room: "Cold Room #4",
                      alert: "Returned to normal range",
                      time: "6 hours ago",
                      severity: "low"
                    }
                  ].map((alert, i) => (
                    <div key={i} className="flex items-center justify-between p-2 border rounded">
                      <div className="flex items-center gap-4">
                        <Badge variant={
                          alert.severity === "high" ? "destructive" :
                          alert.severity === "medium" ? "default" :
                          "secondary"
                        }>
                          {alert.severity}
                        </Badge>
                        <div>
                          <p className="font-medium">{alert.room}</p>
                          <p className="text-sm text-muted-foreground">{alert.alert}</p>
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">{alert.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="inventory" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Storage Overview</CardTitle>
                <CardDescription>Current storage utilization by cold room</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Cold Room #{i + 1}</span>
                        <span className="text-sm text-muted-foreground">{70 + i}% Full</span>
                      </div>
                      <Progress value={70 + i} />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Used: {(70 + i) * 0.8}t</span>
                        <span>Available: {80 - ((70 + i) * 0.8)}t</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest inventory movements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      type: "IN",
                      room: "Cold Room #1",
                      amount: "2.5t",
                      time: "1 hour ago"
                    },
                    {
                      type: "OUT",
                      room: "Cold Room #3",
                      amount: "1.8t",
                      time: "3 hours ago"
                    },
                    {
                      type: "IN",
                      room: "Cold Room #2",
                      amount: "3.2t",
                      time: "5 hours ago"
                    }
                  ].map((activity, i) => (
                    <div key={i} className="flex items-center justify-between p-2 border rounded">
                      <div className="flex items-center gap-4">
                        <Badge variant={activity.type === "IN" ? "default" : "secondary"}>
                          {activity.type}
                        </Badge>
                        <div>
                          <p className="font-medium">{activity.room}</p>
                          <p className="text-sm text-muted-foreground">{activity.amount}</p>
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common inventory operations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full" variant="outline">
                  Record New Entry
                </Button>
                <Button className="w-full" variant="outline">
                  Record Withdrawal
                </Button>
                <Button className="w-full" variant="outline">
                  Generate Inventory Report
                </Button>
                <Button className="w-full" variant="outline">
                  Schedule Stock Check
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="maintenance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Maintenance Schedule</CardTitle>
                <CardDescription>Upcoming and ongoing maintenance activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      room: "Cold Room #3",
                      type: "Scheduled",
                      date: "In 2 days",
                      description: "Regular maintenance and inspection"
                    },
                    {
                      room: "Cold Room #1",
                      type: "Ongoing",
                      date: "Started 1 day ago",
                      description: "Compressor replacement"
                    },
                    {
                      room: "Cold Room #4",
                      type: "Scheduled",
                      date: "In 5 days",
                      description: "Temperature sensor calibration"
                    }
                  ].map((maintenance, i) => (
                    <div key={i} className="flex items-center justify-between p-4 border rounded">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{maintenance.room}</span>
                          <Badge variant={maintenance.type === "Ongoing" ? "default" : "secondary"}>
                            {maintenance.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{maintenance.description}</p>
                        <p className="text-sm font-medium">{maintenance.date}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Maintenance History</CardTitle>
                <CardDescription>Recent maintenance records</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      room: "Cold Room #2",
                      date: "1 week ago",
                      type: "Regular Maintenance"
                    },
                    {
                      room: "Cold Room #4",
                      date: "2 weeks ago",
                      type: "Emergency Repair"
                    },
                    {
                      room: "Cold Room #1",
                      date: "3 weeks ago",
                      type: "Regular Maintenance"
                    }
                  ].map((record, i) => (
                    <div key={i} className="flex items-center justify-between p-2 border rounded">
                      <div>
                        <p className="font-medium">{record.room}</p>
                        <p className="text-sm text-muted-foreground">{record.type}</p>
                      </div>
                      <span className="text-sm text-muted-foreground">{record.date}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Maintenance Actions</CardTitle>
                <CardDescription>Quick maintenance operations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full" variant="outline">
                  Schedule Maintenance
                </Button>
                <Button className="w-full" variant="outline">
                  Report Issue
                </Button>
                <Button className="w-full" variant="outline">
                  View Maintenance Logs
                </Button>
                <Button className="w-full" variant="outline">
                  Update Maintenance Status
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

