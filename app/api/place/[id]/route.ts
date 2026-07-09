import { prisma } from "@/app/libs/prisma";
import { NextRequest, NextResponse } from "next/server";


export const GET = async (
  request: NextRequest,
  { params } : { params: Promise<{ id: string }>}
) => {
  const { id } = await params

  try {
    const events = await prisma.event.findMany({
      where: {
        placeId: Number(id)
      },
      include: {
        artist: true,
        place: true
      }
    })
    return NextResponse.json({ events }, { status: 200 })
  } catch(error) {
    if(error instanceof Error) {
      return NextResponse.json({ message: error.message}, { status: 400 })
    }
  }
  
}