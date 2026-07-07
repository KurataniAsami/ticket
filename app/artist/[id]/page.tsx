'use client'

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

import { ArtistShowResponse } from "@/app/api/artist/[id]/route"

import ArtistImage from "@/app/components/ArtistImage"
import EventItempage from "@/app/components/EventItem"

import ArticleIcon from '@mui/icons-material/Article';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import StarRateIcon from '@mui/icons-material/StarRate';
import RestoreIcon from '@mui/icons-material/Restore';


export default function ArtistDetailPage() {
  const [artist, setArtist] = useState<ArtistShowResponse["artist"] | null>(null)
  const [firstLiveDate, setFirstLivedate] = useState<ArtistShowResponse["firstLiveDate"]>(null)
  const [averageRating, setAverageRating] = useState<ArtistShowResponse["averegeRating"]>(null)
  const [events, setEvents] = useState<ArtistShowResponse["events"]>([])  // 参戦履歴で使用
  const { id } = useParams<{ id: string }>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const getArtist = async () => {
      try {
        const response = await fetch(`/api/artist/${id}`)
        const data = await response.json()
        setArtist(data.artist)
        setFirstLivedate(data.firstLiveDate)
        setAverageRating(data.averageRating)
        setEvents(data.events)
      } catch (error) {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    getArtist()
  },[id])

  if(!artist) return <p>アーティストが見つかりません</p>

  return (
    <div>
      <div className="ml-5 mt-5">
        <div className="flex gap-3">
          {/* 上記でmapして1件分のartistを持っているのでartistを渡す */}
          <ArtistImage
            imageUrl={artist.imageUrl}
            artist={[artist.name]}
            rounded={false}
            width={300}
            height={300}
          />
        </div>
        <div className="text-3xl mt-3">
          {artist.name}
        </div>

        <div className="flex flex-col gap-2 mt-3">
          <div className="flex w-[300px]">
            <div className="flex w-[220px] gap-2 text-gray-300">
              <ArticleIcon />
              <p>ライブ数</p>
            </div>

            <div className="w-[350px] text-right">
              <p className="text-green-400 text-xl">{artist._count.events}回</p>
            </div>
          </div>

          <div className="flex w-[300px]">
            <div className="flex w-[220px] gap-2 text-gray-300">
              <CalendarMonthIcon />
              <p>初参戦</p>
            </div>

            <div className="w-[350px] text-right text-xl">
              <p>
                {firstLiveDate
                  ? new Date(firstLiveDate).toLocaleDateString("ja-Jp")
                  : "-"   // 日付の登録がなければ-で表示される
                }
              </p>
            </div>
          </div>

          <div className="flex w-[300px]">
            <div className="flex w-[220px] gap-2 text-gray-300">
              <StarRateIcon/>
              <p>評価の平均</p>
            </div>

            <div className="w-[350px] text-right text-xl">
              <p className="text-pink-400">
                {averageRating !== null
                   ? averageRating.toFixed(1)
                  : "-"
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 過去の参戦歴 */}
      <div className="mt-5 ml-5">
        <div className="flex items-center gap-2 text-xl">
          <div className="text-pink-400"><RestoreIcon/></div>
          <p>過去の参戦歴</p>
        </div>

        <div className="flex flex-wrap">
          {events.map((event) => (
            <EventItempage
              key={event.id}
              event={event}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// コンポーネントにProps?