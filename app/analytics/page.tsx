import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function AnalyticsPage() {
  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">View detailed analytics and trends of your cold storage facilities</p>
      </div>

      <Tabs defaultValue="temperature" className="space-y-4">
        <TabsList>
          <TabsTrigger value="temperature">Temperature</TabsTrigger>
          <TabsTrigger value="usage">Usage</TabsTrigger>
          <TabsTrigger value="efficiency">Efficiency</TabsTrigger>
        </TabsList>

        <TabsContent value="temperature" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Average Temperature</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">-18.5°C</div>
                <p className="text-xs text-muted-foreground">↓ 0.5°C from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Temperature Fluctuations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">±0.8°C</div>
                <p className="text-xs text-muted-foreground">Within acceptable range</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Alert Frequency</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">↓ 2 from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Optimal Range Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">98%</div>
                <p className="text-xs text-muted-foreground">↑ 2% from last week</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Temperature Trends</CardTitle>
              <CardDescription>7-day temperature variation across all cold rooms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border rounded">
                [Temperature Graph Placeholder]
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usage" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Total Capacity Used</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">78%</div>
                <p className="text-xs text-muted-foreground">↑ 5% from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Daily Operations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">↑ 3 from yesterday</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Peak Usage Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">10 AM</div>
                <p className="text-xs text-muted-foreground">Consistent with last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Inventory Turnover</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3.2x</div>
                <p className="text-xs text-muted-foreground">Weekly average</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Usage Patterns</CardTitle>
              <CardDescription>Weekly capacity utilization by cold room</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border rounded">
                [Usage Graph Placeholder]
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="efficiency" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Energy Efficiency</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">92%</div>
                <p className="text-xs text-muted-foreground">↑ 2% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Maintenance Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">95</div>
                <p className="text-xs text-muted-foreground">Excellent condition</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Cost per Unit</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$0.42</div>
                <p className="text-xs text-muted-foreground">↓ $0.03 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Uptime</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">99.9%</div>
                <p className="text-xs text-muted-foreground">Last 30 days</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Efficiency Metrics</CardTitle>
              <CardDescription>Monthly efficiency trends and comparisons</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border rounded">
                [Efficiency Graph Placeholder]
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 