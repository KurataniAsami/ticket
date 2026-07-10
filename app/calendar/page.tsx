'use client'

import { useEffect, useState } from "react"
import { Calendar } from "../components/Calendar"
import { EventList } from "../types/event"
import { Card,CardContent } from "@/components/ui/card"

export type EventProps = {
  events: EventList[]
}

export default function CalendarPage() {
  const [events, setEvents] = useState<EventList[]>([])
  const [loadins, setLoading] = useState(true)

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
  return (
    <div className="my-5 mr-5">
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

// UpcomingEvents