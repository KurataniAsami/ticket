'use client'

import { useEffect, useState } from "react";
import Link from "next/link";
import { EventList } from "./types/event";
import EventItempage from "./components/EventItem";
import AddIcon from '@mui/icons-material/Add';

export default function Home() {
  const [events, setEvents] = useState<EventList[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getAllEvent = async () => {
      // 3件表示して、「続きを見る」を押したら10件ずつ追加する場合
      // /api/event?limit=3&offset10
      const res = await fetch(`/api/event`)
      const data = await res.json()
      setEvents(data.events)
      setLoading(false)
    }

    getAllEvent()
  },[])

  if(loading) return <p>Loading...</p>
  if(!events) return <p>講演がありません</p>

  return (
    <div>
      <div className="flex justify-end mr-5 mt-5">
        <Link
          href={`/event/new`}
          className="flex items-center text-gray-800 bg-pink-400 rounded-xl px-5 py-2 hover:bg-pink-500"  
        >
          <AddIcon className="w-5 h-5"/>
          新規ライブを追加
        </Link>
      </div>

      <div className="flex flex-col">
        <p className="text-2xl mt-5 ml-5">最近参戦したライブ</p>
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
  );
}
