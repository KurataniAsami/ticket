import { prisma } from "@/app/libs/prisma";
import { EventList } from "@/app/types/event";
import { NextResponse } from "next/server";

export type UpcomingIndexResponse = {
  events: EventList[]
}

export const GET = async () => {
  try {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const events = await prisma.event.findMany({
      where: {
        eventDate: {
          gte: today,   // 今日以降を取得
        },
      },
      include: {
        artist: true,
      }
    })

    return NextResponse.json({ events }, { status: 200 })
  } catch(error) {
    if(error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 400 })
  }
}