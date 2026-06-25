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

    const { eventTitle, artist, place, eventDate, rating, note, songList } = body

    // 同じplaceがなければ作成、テストする
    const placeData = await prisma.place.findFirst({
      where: {
        name: place,
      },
    })

    const eventData = await prisma.event.create({
      data: {
        EventTitle: eventTitle ?? "",
        artist: artist.join(" / "),  //　配列
        eventDate: new Date(eventDate),
        rating: rating ?? 0,
        note: note ?? "",
        songList: songList ?? "",
        // オプショナルの部分の表記があってるか確認
        placeId: placeData.id
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