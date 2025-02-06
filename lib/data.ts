export type ColdRoom = {
  id: string
  name: string
  location: string
  temperature: number
  targetTemp: number
  humidity: number
  capacity: number
  status: 'normal' | 'warning' | 'critical'
  lastUpdated: string
}

// Initial mock data
const initialColdRooms: ColdRoom[] = [
  {
    id: 'nakuru',
    name: 'Nakuru',
    location: 'Nakuru County',
    temperature: -18.5,
    targetTemp: -18.0,
    humidity: 85,
    capacity: 75,
    status: 'normal',
    lastUpdated: '2 mins ago'
  },
  {
    id: 'kisumu',
    name: 'Kisumu',
    location: 'Kisumu County',
    temperature: -16.8,
    targetTemp: -18.0,
    humidity: 82,
    capacity: 90,
    status: 'warning',
    lastUpdated: '5 mins ago'
  },
  {
    id: 'eldoret',
    name: 'Eldoret',
    location: 'Uasin Gishu County',
    temperature: -19.2,
    targetTemp: -18.0,
    humidity: 88,
    capacity: 60,
    status: 'normal',
    lastUpdated: '1 min ago'
  },
  {
    id: 'mombasa',
    name: 'Mombasa',
    location: 'Mombasa County',
    temperature: -15.5,
    targetTemp: -18.0,
    humidity: 78,
    capacity: 95,
    status: 'critical',
    lastUpdated: '10 mins ago'
  },
  {
    id: 'nairobi',
    name: 'Nairobi',
    location: 'Nairobi County',
    temperature: -17.8,
    targetTemp: -18.0,
    humidity: 86,
    capacity: 85,
    status: 'normal',
    lastUpdated: '3 mins ago'
  }
]

// Mutable copy for the mock API
export let coldRooms = [...initialColdRooms]

// Reset data to initial state
export function resetColdRooms() {
  coldRooms = [...initialColdRooms]
}

// Update a cold room's data
export function updateColdRoom(id: string, updates: Partial<ColdRoom>): ColdRoom | undefined {
  const index = coldRooms.findIndex(room => room.id === id)
  if (index === -1) return undefined

  const updatedRoom = {
    ...coldRooms[index],
    ...updates,
    lastUpdated: 'Just now'
  }

  // Update status based on temperature difference
  const tempDiff = Math.abs(updatedRoom.temperature - updatedRoom.targetTemp)
  updatedRoom.status = 
    tempDiff <= 0.5 ? 'normal' :
    tempDiff <= 2 ? 'warning' : 'critical'

  coldRooms[index] = updatedRoom
  return updatedRoom
}

export function getStatusColor(status: ColdRoom['status']) {
  switch (status) {
    case 'normal':
      return 'text-green-500'
    case 'warning':
      return 'text-yellow-500'
    case 'critical':
      return 'text-red-500'
    default:
      return ''
  }
}

export function getTemperatureColor(current: number, target: number) {
  const diff = Math.abs(current - target)
  if (diff <= 0.5) return 'text-green-500'
  if (diff <= 2) return 'text-yellow-500'
  return 'text-red-500'
}

export function formatTemperature(temp: number) {
  return `${temp.toFixed(1)}°C`
} 