import { prisma } from "@/app/libs/prisma"
import { EventList } from "@/app/types/event"
import { NextResponse } from "next/server"

export type EventIndexResponse = {
  event: EventList[]
}

export const GET = async () => {
  try {
    const events = await prisma.event.findMany({
      include: {
        place: true
      },
      orderBy: {
        eventDate: 'desc'
      }
    })

    return NextResponse.json({
      events,
    }, { status: 200 })
  } catch(error) {
    if(error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 400 })
  }
}