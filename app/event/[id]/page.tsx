'use client'

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { EventDetail } from "@/app/types/event"
import { SpotifyArtist } from "@/app/types/artist";

import StarRating from "@/app/components/Stars";
import EventImageCard from "@/app/components/EventImageCard";
import ArtistImage from "@/app/components/ArtistImage";

import ArticleIcon from '@mui/icons-material/Article';
import MicIcon from '@mui/icons-material/Mic';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CreateIcon from '@mui/icons-material/Create';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const params = useParams()

  const [event, setEvent] = useState<EventDetail | null>(null)
  const [artist, setArtist] = useState<SpotifyArtist[]>([])
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(false);

  

  useEffect(() => {
    const getEvent = async () => {
      try {
        const response = await fetch(`/api/event/${id}`)

        const data = await response.json()
        setEvent(data.event)
      } catch(error) {
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    getEvent()
  },[id])

  // spotify APIからアーティスト画像を取得
  useEffect(() => {
    if(!event?.artist) return  

    const getArtistImage = async () => {
    try {
      const artists = await Promise.all(
        event.artist.map(async (eArtist) => {
          const response = await fetch(
            `/api/spotify/artist?artist=${encodeURIComponent(eArtist.artist.name)}`
          )

          return response.json()
        })
      )

      setArtist(artists)
    } catch (error) {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

    getArtistImage()
  },[event])
  

  if(loading) return <p>Loading...</p>
  if(!event) return <p>イベントがありません</p>
  if(error) return <p>エラーが発生しました</p>

  return (
    <div>
      <div className="flex justify-center items-center gap-5 mt-5 mb-3 pb-3">
        {/* <EventImageCard/> 思い出画像これから */} 
        <div>
          {/* {event.ticketImageKey && (
            <Image
              src={event.ticketImageKey}
              alt="チケット画像"
              width={40}
              height={20}
            />
            )} */}
        </div>
      </div>

      <div className="flex flex-col">

        {/* 1段目、タイトルと５段階評価 */}
        <div className="flex justify-center mb-2">
          <div className="flex w-[500px]">
            <div className="w-[300px] flex items-center gap-1">
              <ArticleIcon />
              <p className="text-2xl font-bold">{event.eventTitle}</p>
            </div>

            <div>
              <StarRating score={event.rating ?? 0} />
            </div>
          </div>
        </div>

        {/* 2段目、日付と場所 */}
        <div className="flex justify-center">
          <div className="flex w-[500px]">
            <div className="w-[300px] flex items-center gap-1 text-gray-300">
              <CalendarMonthIcon />
              <p>{new Date(event.eventDate).toLocaleDateString("ja-JP")}</p>
            </div>

            <div className="flex items-center gap-1 text-gray-300">
              <LocationOnIcon />
              <p>{event.place.name}</p>
            </div>
          </div>
        </div>

        {/* 3段目 */}
        <div className="flex justify-center mt-3">
          <div className="flex w-[500px]">
            <div className="w-[300px] flex items-center gap-1 text-gray-300">
              <MicIcon/>
              <p className="text-green-400">アーティスト</p>
            </div>
          </div>
        </div>

        {/* 4段目、 アーティスト名 */}
        <div className="flex justify-center mt-4">
          <div className="flex flex-col w-[500px] gap-5">
            <div className="flex flex-col gap-1">
              {event.artist.map((eArtist) => (
                <span key={eArtist.artist.id}>
                  {eArtist.artist.name}
                </span>
              ))}
            </div>

            {/* 5段目、 アーティスト画像 */}
            <div className="flex gap-3">
                <ArtistImage
                  artist={event.artist.map((eArtist) => eArtist.artist.name)}
                />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center flex-col items-center mb-7">
        <div className="items-center w-120 my-5">
          <div className="flex gap-2">
            <CreateIcon/>
            <p className="w-30 mb-2">メモ</p>
          </div>
          <p className="text-xl">{event.note}</p>
        </div>

        <div className="items-center w-120 mb-4">
          <div className="flex gap-2">
            <PlaylistPlayIcon/>
            <p className="w-30 text-pink-400 mb-2">セットリスト</p>
          </div>
          <p className="text-xl">{event.songList}</p>
        </div>

        {/* ギャラリー */}
        <div className="flex items-start w-120 mb-4 flex-col">
          <div className="w-30 mb-3">
            <CameraAltIcon/>
          </div>
          
          <div className="flex gap-3">
            {event.eventImages?.map((image) => (
              <EventImageCard
                key={image.id}
                url={image.url}
                comment={image.comment}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
// 画像添付　import CameraAltIcon from '@mui/icons-material/CameraAlt';
// note import ModeEditIcon from '@mui/icons-material/ModeEdit';
// 評価機能（★５段階）、実装検討, フォームはカメラアイコン
// 画像クリックで拡大表示