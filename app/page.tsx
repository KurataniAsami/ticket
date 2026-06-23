'use client'

import { useEffect, useState } from "react";
import { EventList } from "./types/event";
import { EventIndexResponse } from "./types/event";
import EventItempage from "./components/EventItem";

export default function Home() {
  const [events, setEvents] = useState<EventList[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getAllEvent = async () => {
      // 3件表示して、「続きを見る」を押したら10件ずつ追加する場合
      // /api/event?limit=3&offset10
      const res = await fetch(`/api/event`)
      const data = await res.json() as EventIndexResponse
      setEvents(data.events)
      setLoading(false)
    }

    getAllEvent()
  },[])

  if(loading) return <p>Loading...</p>
  if(!events) return <p>講演がありません</p>

  return (
    <div>
      {events.map((event) => (
        <EventItempage
          key={event.id}
          event={event}
        />
      ))}
    </div>
  );
}
