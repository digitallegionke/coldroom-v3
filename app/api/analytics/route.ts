import { coldRooms } from "@/lib/data"
import { NextResponse } from "next/server"

// Mock historical data generation
function generateHistoricalData(days: number) {
  const data = []
  const now = new Date()
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    
    const dayData = {
      date: date.toISOString().split('T')[0],
      averageTemp: -18 + (Math.random() * 2 - 1),
      totalAlerts: Math.floor(Math.random() * 5),
      avgCapacity: 70 + Math.floor(Math.random() * 20),
      efficiency: 90 + Math.floor(Math.random() * 8),
    }
    data.push(dayData)
  }
  
  return data
}

// Mock room-specific data
function generateRoomData() {
  return coldRooms.map(room => ({
    id: room.id,
    name: room.name,
    weeklyData: Array.from({ length: 7 }, (_, i) => ({
      day: i,
      temperature: room.targetTemp + (Math.random() * 2 - 1),
      capacity: 60 + Math.floor(Math.random() * 30),
      efficiency: 85 + Math.floor(Math.random() * 10),
    }))
  }))
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const metric = searchParams.get('metric')
  const period = searchParams.get('period') || '7' // Default to 7 days
  
  const days = parseInt(period)
  
  const analyticsData = {
    summary: {
      averageTemp: coldRooms.reduce((acc, room) => acc + room.temperature, 0) / coldRooms.length,
      tempFluctuation: 0.8,
      alertCount: coldRooms.filter(room => room.status !== 'normal').length,
      optimalRangeTime: 98,
      totalCapacity: coldRooms.reduce((acc, room) => acc + room.capacity, 0) / coldRooms.length,
      dailyOperations: 24,
      peakUsageTime: '10:00',
      inventoryTurnover: 3.2,
      energyEfficiency: 92,
      maintenanceScore: 95,
      costPerUnit: 0.42,
      uptime: 99.9,
    },
    historical: generateHistoricalData(days),
    rooms: generateRoomData(),
  }
  
  return NextResponse.json(analyticsData)
}