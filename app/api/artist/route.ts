import { prisma } from "@/app/libs/prisma"
import { NextResponse } from "next/server"

export type ArtistIndexResponse = {
  artists: {   // レスポンスの部分のartistsにあわせる
    id: number    
    name: string
    imageUrl: string | null
  }[]
}

export const GET = async () => {
  try {
    const artists = await prisma.artist.findMany({
      select: {
        id: true,
        name: true,
        imageUrl: true
      },
    })

    return NextResponse.json({ artists }, { status: 200 })
  } catch(error) {
    if(error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 400 })
  }
}