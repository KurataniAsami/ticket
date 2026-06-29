import { useEffect, useState } from "react";
import { SpotifyArtist } from "../types/artist";
import Image from "next/image";

type Props = {
  artist: string[]
}

export default function ArtistImage({ artist }: Props) {
  const [artists, setArtists] = useState<SpotifyArtist[]>([])
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(false);

  // propsで渡されたデータ（アーティスト）を取り出す
  useEffect(() => {
      if(!artist) return
  
      const getArtistImage = async () => {
      try {
        const artists = await Promise.all(
          artist.map(async (artistName) => {
            const response = await fetch(
              `/api/spotify/artist?artist=${encodeURIComponent(artistName)}`
            )
  
            return response.json()
          })
        )
  
        setArtists(artists)
      } catch (error) {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
      getArtistImage()
    },[artist])

  // アーティストが配列 
  return (
    <div className="flex gap-3">
      {artists.map((artistData) => (
        <div key={artistData.spotifyUrl}>
          {artistData.imageUrl && (
            <Image
              src={artistData.imageUrl}
              alt={artistData.name}
              width={100}
              height={100}
              className="rounded-full"
            />
          )}
        </div>
      ))}
    </div>
  )
}

// 画像サイズはpropsでそれぞれ変える