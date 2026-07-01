// アーティスト一覧
'use client'

import Link from "next/link"
import { useEffect, useState } from "react"
import { ArtistIndexResponse } from "../api/artist/route"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import ArtistImage from "../components/ArtistImage"

export default function ArtistListPage() {
  // await prisma.artistでartistとしているため["artist"]
  const [artists, setArtists] = useState<ArtistIndexResponse["artists"]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const res = await fetch(`/api/artist`)
        const data = await res.json()
        setArtists(data.artists)
      } catch(error) {
        setError(error instanceof Error ? error.message: 'アーティスト情報が取得できませんでした。')
      } finally {
        setLoading(false)
      }
    }

    fetchArtists()
  },[])

  return(
    <div>
      <p>アーティスト一覧</p>
      <div>
        {artists.map((artist) => (
        <Card
          key={artist.id}
          className="
          w-[360px] h-[250px] bg-slate-900 border border-slate-800
          hover:bg-slate-800
        ">
          <CardContent>
            <Link href={`/artist/${artist.id}`}>
              <div className="flex flex-col justify-center items-center text-white text-xl">
                <div className="flex gap-3">
                  {/* 上記でmapして1件分のartistを持っているのでartistを渡す */}
                  <ArtistImage
                    imageUrl={artist.imageUrl}
                    artist={[artist.name]}
                  />
                </div>
                  {artist.name}
              </div>
            </Link>
          </CardContent>
        </Card>
        ))}
      </div>
    </div>
  )
}