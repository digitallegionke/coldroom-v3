import type { Metadata } from "next"
import { Barlow } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BarChart3, Home, Settings, Thermometer } from "lucide-react"

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-barlow",
})

export const metadata: Metadata = {
  title: "Cold Room Tracker",
  description: "Monitor and manage your cold storage facilities",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn(barlow.className, "bg-background")}>
        <div className="flex min-h-screen flex-col md:flex-row">
          {/* Sidebar - Hidden on mobile */}
          <aside className="hidden md:flex w-64 border-r bg-muted/40 p-4 flex-col">
            <div className="flex items-center gap-2 pb-4 mb-4 border-b">
              <Thermometer className="h-6 w-6" />
              <span className="font-bold">Cold Room Tracker</span>
            </div>
            <nav className="space-y-2">
              <Button variant="ghost" className="w-full justify-start gap-2" asChild>
                <Link href="/dashboard">
                  <Home className="h-4 w-4" />
                  Dashboard
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2" asChild>
                <Link href="/analytics">
                  <BarChart3 className="h-4 w-4" />
                  Analytics
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2" asChild>
                <Link href="/settings">
                  <Settings className="h-4 w-4" />
                  Settings
                </Link>
              </Button>
            </nav>
          </aside>

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            <main className="flex-1 p-4">{children}</main>

            {/* Bottom Navigation Bar - Visible only on mobile */}
            <nav className="md:hidden flex items-center justify-around border-t bg-background p-3">
              <Link href="/dashboard" className="flex flex-col items-center gap-1 text-sm text-muted-foreground">
                <Home className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>
              <Link href="/analytics" className="flex flex-col items-center gap-1 text-sm text-muted-foreground">
                <BarChart3 className="h-5 w-5" />
                <span>Analytics</span>
              </Link>
              <Link href="/settings" className="flex flex-col items-center gap-1 text-sm text-muted-foreground">
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </Link>
            </nav>
          </div>
        </div>
      </body>
    </html>
  )
} 