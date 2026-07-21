import { prisma } from "@/app/libs/prisma";
import { EventDetail } from "@/app/types/event";
import { NextRequest, NextResponse } from "next/server";

export type EventShowResponse = {
  event: EventDetail
}

export const GET = async (
  request: NextRequest,
  // ① URLから取得されるので必ずstringになる
  { params }: { params: Promise<{ id: string }>},
) => {
  const { id } = await params

  try {
    const event = await prisma.event.findUnique({
      where: {
        // ② DBにデータを渡すのにstringだと取得できない, スキーマでIntで定義しているから数値に変換する
        id: parseInt(id),
      },
      include: {
        place: true,
        artist: true,
        eventImages: true,
      },
    })
    
    if(!event) {
      return NextResponse.json(
        { message: 'イベントが見つかりません'},
        { status: 404 }
      )
    }

    return NextResponse.json({ event }, { status: 200 })
  } catch(error) {
    if(error instanceof Error )
      return NextResponse.json({ message: error.message }, { status: 400 })
  }
}

// イベント更新
export type UpdateEventRequestBody = {
  eventTitle?: string
  place: string
  eventDate: string
  rating?: number
  note?: string
  songList?: string
  ticketImageKey?: string | null
  memoryImageKey?: string[] | null   // 配列
  artist: string[]
}

export const PUT = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  const { id } = await params

  const {
    eventTitle,
    eventDate,
    ticketImageKey,
    memoryImageKey,
    note,
    songList,
    rating,
    artist,
    place,
  }: UpdateEventRequestBody = await request.json()

  try {
    const artistRecords = await Promise.all(
      artist.map((name) =>
        prisma.artist.upsert({
          where: { name },
          create: { name },
          update: {},
        })
      )
    )

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
    const event = await prisma.event.update({
      where: {
        id: parseInt(id),
      },

      data: {
      eventTitle,
      eventDate: new Date(eventDate),
      ticketImageKey,
      note,
      songList,
      rating,
      placeId: placeData.id,

      // 別カラム
      artist: {
      set: artistRecords.map((artist) => ({
        id: artist.id,
      })),
      },

      eventImages: {
      create: (memoryImageKey ?? []).map((key) => ({
        url: key,
      })),
    },
    },
  })
  return NextResponse.json({ message: '成功しました'}, { status: 200 })
} catch(error) {
  if(error instanceof Error) 
    return NextResponse.json({ message: error.message }, { status: 400 })
  }
}

// DELETE
export const DELETE = async (
  _request: NextRequest,
  { params } : { params: Promise<{ id: string }>},
) => {
  const { id } = await params

  try {
    await prisma.event.delete({
      where: {
        id: parseInt(id),
      },
    })

    await prisma.eventImage.deleteMany({
      where: {
        eventId: parseInt(id),
      },
    })

    return NextResponse.json({ messege: '削除成功'}, { status: 200 })
  } catch(error) {
    if(error instanceof Error) 
      NextResponse.json({ message: error.message }, { status: 400 })
  }
}