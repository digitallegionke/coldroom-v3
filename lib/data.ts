export type CriticalItem = {
  name: string
  quantity: string
  expiresIn: number
}

export type InventoryMovement = {
  item: string
  quantity: string
  source: string // farmer or client name
}

export type PickupSchedule = {
  date: string
  item: string
  quantity: string
  client: string
}

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
  lastChecked: string
  criticalItems: CriticalItem[]
  incomingItems: InventoryMovement[]
  outgoingItems: InventoryMovement[]
  upcomingPickups: PickupSchedule[]
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
    lastUpdated: '2 mins ago',
    lastChecked: '2025-02-04 08:00',
    criticalItems: [
      { name: 'Potatoes', quantity: '200kg', expiresIn: 3 },
      { name: 'Carrots', quantity: '100kg', expiresIn: 2 }
    ],
    incomingItems: [
      { item: 'Potatoes', quantity: '1000kg', source: 'John Mutua' },
      { item: 'Carrots', quantity: '500kg', source: 'Mary Wanjiku' }
    ],
    outgoingItems: [
      { item: 'Potatoes', quantity: '300kg', source: 'Fresh Mart' },
      { item: 'Carrots', quantity: '200kg', source: 'Green Grocers' }
    ],
    upcomingPickups: [
      { date: '2025-02-05', item: 'Potatoes', quantity: '500kg', client: 'Fresh Mart' },
      { date: '2025-02-06', item: 'Carrots', quantity: '300kg', client: 'Green Grocers' }
    ]
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
    lastUpdated: '5 mins ago',
    lastChecked: '2025-02-04 07:30',
    criticalItems: [
      { name: 'Tomatoes', quantity: '150kg', expiresIn: 2 },
      { name: 'Cabbage', quantity: '200kg', expiresIn: 4 }
    ],
    incomingItems: [
      { item: 'Tomatoes', quantity: '800kg', source: 'Peter Omondi' },
      { item: 'Cabbage', quantity: '600kg', source: 'Sarah Akinyi' }
    ],
    outgoingItems: [
      { item: 'Tomatoes', quantity: '400kg', source: 'Local Market' },
      { item: 'Cabbage', quantity: '300kg', source: 'Super Fresh' }
    ],
    upcomingPickups: [
      { date: '2025-02-05', item: 'Tomatoes', quantity: '400kg', client: 'Local Market' },
      { date: '2025-02-07', item: 'Cabbage', quantity: '250kg', client: 'Super Fresh' }
    ]
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
    lastUpdated: '1 min ago',
    lastChecked: '2025-02-04 08:15',
    criticalItems: [
      { name: 'Peas', quantity: '100kg', expiresIn: 5 }
    ],
    incomingItems: [
      { item: 'Peas', quantity: '400kg', source: 'David Kiprop' }
    ],
    outgoingItems: [
      { item: 'Peas', quantity: '200kg', source: 'Fresh Foods' }
    ],
    upcomingPickups: [
      { date: '2025-02-08', item: 'Peas', quantity: '300kg', client: 'Fresh Foods' }
    ]
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
    lastUpdated: '10 mins ago',
    lastChecked: '2025-02-04 07:45',
    criticalItems: [
      { name: 'Fish', quantity: '300kg', expiresIn: 1 },
      { name: 'Shrimp', quantity: '100kg', expiresIn: 2 }
    ],
    incomingItems: [
      { item: 'Fish', quantity: '500kg', source: 'Coast Fisheries' },
      { item: 'Shrimp', quantity: '200kg', source: 'Ocean Harvest' }
    ],
    outgoingItems: [
      { item: 'Fish', quantity: '400kg', source: 'Seafood Market' },
      { item: 'Shrimp', quantity: '150kg', source: 'Restaurant Supplies' }
    ],
    upcomingPickups: [
      { date: '2025-02-05', item: 'Fish', quantity: '300kg', client: 'Seafood Market' },
      { date: '2025-02-06', item: 'Shrimp', quantity: '100kg', client: 'Restaurant Supplies' }
    ]
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
    lastUpdated: '3 mins ago',
    lastChecked: '2025-02-04 08:30',
    criticalItems: [
      { name: 'Meat', quantity: '400kg', expiresIn: 4 },
      { name: 'Dairy', quantity: '200kg', expiresIn: 3 }
    ],
    incomingItems: [
      { item: 'Meat', quantity: '800kg', source: 'Quality Meats' },
      { item: 'Dairy', quantity: '500kg', source: 'Fresh Dairy' }
    ],
    outgoingItems: [
      { item: 'Meat', quantity: '600kg', source: 'Butchery Plus' },
      { item: 'Dairy', quantity: '300kg', source: 'Supermarket Chain' }
    ],
    upcomingPickups: [
      { date: '2025-02-07', item: 'Meat', quantity: '400kg', client: 'Butchery Plus' },
      { date: '2025-02-08', item: 'Dairy', quantity: '250kg', client: 'Supermarket Chain' }
    ]
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