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
      <p className="m-3">
        {new Date(event.eventDate).toLocaleDateString("ja-JP")}
      </p>

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
          <p className="text-xl">{event.title}</p>
          <p className="text-xl">{event.artist}</p>
          <p className="text-xl">{event.place.name}</p>
        </div>
      </div>
      
    </div>
  )
}