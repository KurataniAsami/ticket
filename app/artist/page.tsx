// アーティスト一覧
'use client'

import Link from "next/link"
import { useEffect, useState } from "react"
import { ArtistIndexResponse } from "../api/artist/route"
import ArtistCard from "../components/ArtistCard"

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
      <p className="text-xl my-3">アーティスト一覧</p>
      <div className="flex flex-wrap gap-3">
        {artists.map((artist) => (
          <Link
            href={`/api/artist/${artist.id}`}
            key={artist.id}  
          >
            <div>
              <ArtistCard
                artist={artist}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}