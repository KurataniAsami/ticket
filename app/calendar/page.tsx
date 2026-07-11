'use client'

import { useEffect, useState } from "react"
import { Calendar } from "../components/Calendar"
import { EventList } from "../types/event"
import { Card,CardContent } from "@/components/ui/card"
import Link from "next/link"

export type EventProps = {
  events: EventList[]
}

export default function CalendarPage() {
  const [events, setEvents] = useState<EventList[]>([])
  const [loadins, setLoading] = useState(true)

  useEffect(() => {
      const getAllEvent = async () => {
        const res = await fetch(`/api/event`)
        const data = await res.json()
        setEvents(data.events)
        setLoading(false)
      }
  
      getAllEvent()
    },[])
  return (
    <div className="my-5 mr-5">
      <div className="flex justify-between mb-5">
        <h1 className="text-xl">イベントカレンダー</h1>
        <Link
          href="/upcomingEvents"
          className="bg-green-400 text-black rounded py-1.5 px-2"
        >
          今後の予定
        </Link>
      </div>
      
      <Card className="bg-gray-900 text-white">
        <CardContent>
          <Calendar
            events={events}
          />
        </CardContent>
      </Card>
    </div>
  )
}
