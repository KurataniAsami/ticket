import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/libs/prisma";
import { EventList } from "@/app/types/event";

export type ArtistShowResponse = {
  artist: {
    id: number    
    name: string
    imageUrl: string | null
    _count: {
      events: number
    }
  }
  events: EventList[]
  firstLiveDate: string | null
  averegeRating: number | null
}

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params

  try {
    const artist = await prisma.artist.findUnique({
      where: {
        id: parseInt(id),
      },

      // ライブ参戦数をカウント
      include: {
        _count: {
          select: {
            events: true,
          },
        },

        // 全件取得（過去の参戦歴）
        events: {
          include: {
            artist: true,
            place: true,
          },
          orderBy: {
            eventDate: "asc",
          },
        }
      },
    })

    if(!artist) {
      return NextResponse.json(
        { message: 'アーティストが見つかりません'},
        { status: 404 }
      )
    }

    // 5段階評価の平均
    const ratings = artist.events
      .map((eventArtist) => eventArtist.rating)
      .filter((rating): rating is number => rating != null)

    const averageRating = 
      ratings.length > 0
        ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length : null

    // 初参戦の日
    // [0]で配列の先頭、?はライブがない時のために?がつく、 
    // ?? nullはeventがない時nullを返す
    const firstLiveDate = 
      artist.events[0]?.eventDate ?? null

    return NextResponse.json({
      // stateが3種類必要 
      artist,
      events: artist.events,  // 参戦歴のデータ、 stateにセット
      firstLiveDate,   // stateにセット
      averageRating,   // stateにセット
    },
    { status: 200 })
  } catch(error) {
    if(error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 })
    }
  }
}