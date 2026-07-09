'use client'

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import EventItempage from "@/app/components/EventItem";
import { EventList } from "@/app/types/event"
import RestoreIcon from '@mui/icons-material/Restore';

export default function PlaceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const params = useParams()

  const [events, setEvents] = useState<EventList[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const placeEvent = async () => {
      try {
        const res = await fetch(`/api/place/${id}`)
        const data = await res.json()
        setEvents(data.events)
      } catch(error) {
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    placeEvent()
  },[id])

  return (
    <div>
      <div className="flex items-center gap-2 mt-3">
        <div className="text-pink-400"><RestoreIcon/></div>
        {events.length > 0 && (
          // 配列なので配列の中身を取り出して[0]で表示しないとエラーになる
          // [0]で最初のイベントを取り出し、イベントに紐づく会場名を取得
          <h1 className="text-xl">{events[0].place.name}での過去の参戦履歴</h1>
        )}
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
  )
}