import { DashboardClient } from "@/components/dashboard-client"

export default function Page() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Cold Room Dashboard</h1>
      <DashboardClient />
    </div>
  )
}

