import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, Mail, Shield, Thermometer, Users, Wrench } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your cold room settings and preferences</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Thermometer className="h-5 w-5" />
              <CardTitle>Temperature Settings</CardTitle>
            </div>
            <CardDescription>Configure temperature thresholds and alerts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Default Target Temperature</span>
              <Badge>-18°C</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Alert Threshold</span>
              <Badge variant="secondary">±2°C</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Critical Alert Threshold</span>
              <Badge variant="destructive">±4°C</Badge>
            </div>
            <Button className="w-full">Adjust Thresholds</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              <CardTitle>Notifications</CardTitle>
            </div>
            <CardDescription>Manage your notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Temperature Alerts</span>
              <Badge>Enabled</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Maintenance Reminders</span>
              <Badge>Enabled</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Weekly Reports</span>
              <Badge variant="secondary">Disabled</Badge>
            </div>
            <Button className="w-full">Configure Notifications</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <CardTitle>User Management</CardTitle>
            </div>
            <CardDescription>Manage user access and permissions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Active Users</span>
              <Badge>5</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Pending Invites</span>
              <Badge variant="secondary">2</Badge>
            </div>
            <Button className="w-full">Manage Users</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Wrench className="h-5 w-5" />
              <CardTitle>Maintenance</CardTitle>
            </div>
            <CardDescription>Configure maintenance schedules</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Auto-Schedule</span>
              <Badge>Enabled</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Next Maintenance</span>
              <Badge variant="secondary">2d 14h</Badge>
            </div>
            <Button className="w-full">View Schedule</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              <CardTitle>Reports & Alerts</CardTitle>
            </div>
            <CardDescription>Configure automated reports and alerts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Daily Summary</span>
              <Badge>08:00 AM</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Weekly Report</span>
              <Badge variant="secondary">Monday</Badge>
            </div>
            <Button className="w-full">Configure Reports</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              <CardTitle>Security</CardTitle>
            </div>
            <CardDescription>Manage security settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Two-Factor Auth</span>
              <Badge variant="secondary">Disabled</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">API Access</span>
              <Badge>Enabled</Badge>
            </div>
            <Button className="w-full">Security Settings</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 