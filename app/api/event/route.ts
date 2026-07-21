import { prisma } from "@/app/libs/prisma"
import { EventList } from "@/app/types/event"
import { NextRequest, NextResponse } from "next/server"

export type EventIndexResponse = {
  events: EventList[]
}

// POSTの型
export type CreateEventRequestBody = {
  eventTitle?: string
  place: string
  eventDate: string
  rating?: number
  note?: string
  songList?: string
  comment?: string[]
  ticketImageKey?: string
  memoryImageKey?: string[]
  artist: string[]
}

export const GET = async (request: NextRequest) => {
  try {
    const sort = request.nextUrl.searchParams.get("sort") ?? "desc";

    const events = await prisma.event.findMany({
      include: {
        place: true,
        artist: true
      },

      orderBy: {
        eventDate: sort === "asc" ? "asc" : "desc",
      },
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
    const { eventTitle, place, eventDate, rating, note, songList, ticketImageKey, memoryImageKey } = body
    const { artist: artistNames = [] } = body

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

    // upsert: 同じnameがあれば更新、なければ作成
    // uniqeにしか使えない

    const artistRecords = await Promise.all(
      artistNames.map((name) =>
        prisma.artist.upsert({
          where: { name },
          create: { name },
          update: {},
        })
      )
    )

    // event作成
    const eventData = await prisma.event.create({
      data: {
        eventTitle: eventTitle,
        eventDate: new Date(eventDate),
        rating: rating,
        note: note,
        songList: songList,
        placeId: placeData.id,
        ticketImageKey: ticketImageKey,

        artist: {
          connect: artistRecords.map((artist) => ({
            id: artist.id,
          }))
        },

        eventImages: {
          create: (memoryImageKey ?? []).map((key) => ({
            url: key,
          })),
        },
        
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