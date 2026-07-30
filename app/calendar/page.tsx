'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import { EventList, MemoryImage } from "../types/event"
import { EventFormProps } from "../types/event"
import { Calendar } from "../components/Calendar"
import CreateEventModal from "../components/CreateEventModal"
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

  const [eventTitle, setEventTitle] = useState('')
  const [artist, setArtist] = useState<string[]>([""])

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
{/* ここはどうする？、　専用型を作成した所 */}
        <CreateEventModal
          artist={artist}
          setArtist={setArtist}

          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}

          eventTitle={eventTitle}
          setEventTitle={setEventTitle}
          place={place}
          setPlace={setPlace}
          eventDate={eventDate}
          setEventDate={setEventDate}
          rating={rating}
          setRating={setRating}
          note={note}
          setNote={setNote}
          songList={songList}
          setSongList={setSongList}

          ticketImageKey={ticketImageKey}
          setTicketImageKey={setTicketImageKey}
          ticketImageUrl={ticketImageUrl}
          setTicketImageUrl={setTicketImageUrl}

          memoryImageKey={memoryImageKey}
          setMemoryImageKey={setMemoryImageKey}
          memoryImageUrl={memoryImageUrl}
          setMemoryImageUrl={setMemoryImageUrl}

          memoryImages={memoryImages}
          setMemoryImages={setMemoryImages}
          isMemoryDeleteOpen={isMemoryDeleteOpen}
          setIsMemoryDeleteOpen={setIsMemoryDeleteOpen}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
    </div>
  )
}
