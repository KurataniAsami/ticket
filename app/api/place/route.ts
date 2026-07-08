import { prisma } from "@/app/libs/prisma";
import { NextResponse } from "next/server";

export type PlaceIndexResponse = {
  place: {
    id: number
    name: string
  }[]
}

export const GET = async () => {
  try {
    // 会場は１つのライブにつき１つだが、いくつかのライブデータがあって複数返るからfindMany
    const place = await prisma.place.findMany({
      select: {
        id: true,
        name: true
      },
    })

    return NextResponse.json({ place }, { status: 200 })
  } catch(error) {
    if(error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 400 })
  }
}