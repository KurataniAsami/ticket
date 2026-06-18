'use client'

import { EventDetail } from "@/app/types/event"
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const params = useParams()

  const [event, setEvent] = useState<EventDetail | null>(null)
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

  if(loading) return <p>Loading...</p>
  if(!event) return <p>イベントがありません</p>
  console.log(event)
  if(error) return <p>エラーが発生しました</p>

  return (
    <div>
      

      <div className="flex justify-center items-center gap-5  mt-3 pb-3">
        {event.ticketImage && (
          <Image
            src={event.ticketImage}
            alt="チケット画像"
            width={200}
            height={20}
        />
        )}
      </div>
        
      <div className="flex justify-center">
        <div className="flex-col">
          {/* import ArticleIcon from '@mui/icons-material/Article'; */}
          <p className="text-2xl">{event.artist}</p>
          <p className=" text-gray-600">{event.title}</p>
          <p>
            {new Date(event.eventDate).toLocaleDateString("ja-JP")}
          </p>
          {/* import MicIcon from '@mui/icons-material/Mic'; */}
          {/* import MusicNoteIcon from '@mui/icons-material/MusicNote'; */} 
          
          {/* import FestivalIcon from '@mui/icons-material/Festival'; */}
          <p className="text-xl">{event.place.name}</p>

          <div className="border-b border-b-gray-600"></div>
          <p>参戦記録</p>
          <p className="text-xl">{event.note}</p>

          {event.memoryImage && (
          <Image
            src={event.memoryImage}
            alt="チケット画像"
            width={200}
            height={20}
        />
        )}
        </div>
      </div>
      
    </div>
  )
}
// 画像添付　import CameraAltIcon from '@mui/icons-material/CameraAlt';
// note import ModeEditIcon from '@mui/icons-material/ModeEdit';
// 評価機能（★５段階）、実装検討