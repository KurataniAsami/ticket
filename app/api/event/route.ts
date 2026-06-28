import { prisma } from "@/app/libs/prisma"
import { EventList } from "@/app/types/event"
import { NextRequest, NextResponse } from "next/server"

export type EventIndexResponse = {
  events: EventList[]
}

// POSTの型
export type CreateEventRequestBody = {
  eventTitle?: string
  artist: string[]
  place: string
  eventDate: string
  rating?: number
  note?: string
  songList?: string
  comment?: string[]
  ticketImageKey?: string
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
    // リクエストの内容がおかしいのは400
  }
}

// POST
export const POST = async (request: NextRequest) => {
  try {
    const body : CreateEventRequestBody = await request.json()

    const { eventTitle, artist, place, eventDate, rating, note, songList, ticketImageKey } = body

    // 同じplaceがなければ作成(同一の会場でもレコードが重複しないようにする)
    let placeData = await prisma.place.findFirst({
      where: {
        name: place,
      },
    })

    if(!placeData) {
      placeData = await prisma.place.create({
        data: {
          name: place,
        }
      })
    }

    if(!placeData) {
      throw new Error("会場が存在しません")
    }

    const eventData = await prisma.event.create({
      data: {
        eventTitle: eventTitle,
        artist: artist,  //　配列
        eventDate: new Date(eventDate),
        rating: rating,
        note: note,
        songList: songList,
        placeId: placeData.id,
        ticketImageKey: ticketImageKey
      },
    })
    return NextResponse.json({
      id: eventData.id
    })
  } catch(error) {
    if(error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 })
    }
  }
}