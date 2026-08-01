'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import { EventList, MemoryImage } from "../types/event"
import { EventFormProps } from "../types/event"
import { Calendar } from "../components/Calendar"
import CreateEventModal from "../components/CreateEventModal"
import { EventFormProvider } from "../providers/EventFormProvider"
import { Card,CardContent } from "@/components/ui/card"

// EventFormProps &で専用の型と追加のpropsを使用できる
export type EventProps = EventFormProps & {
  events: EventList[]

  artist: string[]
  setArtist: React.Dispatch<React.SetStateAction<string[]>>

  memoryImages: MemoryImage[]
  setMemoryImages: React.Dispatch<React.SetStateAction<MemoryImage[]>>

  selectedImage: string | null
  setSelectedImage: React.Dispatch<React.SetStateAction<string | null>>

  isMemoryDeleteOpen: boolean
  setIsMemoryDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CalendarPage({
}:EventFormProps) {
  const [events, setEvents] = useState<EventList[]>([])
  const [loadins, setLoading] = useState(true)

  const [isModalOpen, setIsModalOpen] = useState(false)

  const [isMemoryDeleteOpen, setIsMemoryDeleteOpen] = useState(false)

  const [selectedImage, setSelectedImage] = useState<string | null>(null)

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
            <EventFormProvider>
              <Calendar
                events={events} 
                onDateClick={() => setIsModalOpen(true)}
              />
            </EventFormProvider>
          </CardContent>
        </Card>

        <EventFormProvider>
          <CreateEventModal
            isMemoryDeleteOpen={isMemoryDeleteOpen}
            setIsMemoryDeleteOpen={setIsMemoryDeleteOpen}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </EventFormProvider>
    </div>
  )
}

