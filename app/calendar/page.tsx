'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import { EventList } from "../types/event"
import { Calendar } from "../components/Calendar"
import CreateEventModal from "../components/CreateEventModal"
import { Card,CardContent } from "@/components/ui/card"

export type EventProps = {
  events: EventList[]
}

export default function CalendarPage() {
  const [events, setEvents] = useState<EventList[]>([])
  const [loadins, setLoading] = useState(true)

  const [isModalOpen, setIsModalOpen] = useState(false)

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
      

        <Card className="flex-1 bg-gray-900 text-white">
          <CardContent>
            <Calendar
              events={events} 
              onDateClick={() => setIsModalOpen(true)}
            />
          </CardContent>
        </Card>

        <CreateEventModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />

    </div>
  )
}
