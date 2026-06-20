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
      }
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
