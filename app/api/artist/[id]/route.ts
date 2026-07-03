import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/libs/prisma";

export type ArtistShowResponse = {
  artist: {
    id: number    
    name: string
    imageUrl: string | null
    _count: {
      events: number
    }
  }
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

        //　初参戦の日（一番古い日付）を取得
        events: {
          include: {
            event: true,
          },
          orderBy: {
            event: {
              eventDate: "asc"
            },
          },
          take: 1
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
      .map((eventArtist) => eventArtist.event.rating)
      .filter((rating): rating is number => rating != null)

    const averageRating = 
      ratings.length > 0
        ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length : null

    // 初参戦の日
    // [0]で配列の先頭、?はライブがない時のために?がつく、 
    // ?? nullはeventがない時nullを返す
    const firstLiveDate = 
      artist.events[0]?.event.eventDate ?? null

    return NextResponse.json({
        // stateが3種類必要 
        artist,
        firstLiveDate,
        averageRating,
      },
      { status: 200 })
  } catch(error) {
    if(error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 })
    }
  }
}