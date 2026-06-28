import { prisma } from "@/app/libs/prisma";
import { request } from "http";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url)

  const artist = searchParams.get("artist")

  if(!artist) {
    return NextResponse.json(
      { error: 'アーティストが見つかりません'},
      { status: 400 }
    )
  }

  // アクセストークン取得
  const tokenResponse = await fetch(
    "https://accounts.spotify.com/api/token",
    {
      method: "POST",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(
            `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
          ).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    }
  )

  const tokenData = await tokenResponse.json()

  // artistを検索してDBに保存？
  const searchResponse = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(
      artist
    )}&type=artist&limit=3`,
    {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    }
  )

  const searchData = await searchResponse.json()

  const artistData = searchData.artists.items[0]

  return NextResponse.json({
    name: artistData.name,
    imageUrl: artistData.images?.[0]?.url ?? null,
    spotifyUrl: artistData.external_urls.spotify,
  })
}