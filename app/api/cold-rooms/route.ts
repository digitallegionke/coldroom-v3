import { NextResponse } from 'next/server'
import { coldRooms, updateColdRoom } from '@/lib/data'

export async function GET() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  return NextResponse.json(coldRooms)
}

export async function PUT(request: Request) {
  const body = await request.json()
  const { id, ...updates } = body

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))

  const updatedRoom = updateColdRoom(id, updates)
  if (!updatedRoom) {
    return new NextResponse('Cold room not found', { status: 404 })
  }

  return NextResponse.json(updatedRoom)
} 