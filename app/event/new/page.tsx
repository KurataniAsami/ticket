'use client'
import { useState } from "react"
import EventForm from "@/app/components/EventForm"

export default function EventCreatePage() {
  const [eventTitle, setEventTitle] = useState('')
  const [artist, setArtist] = useState<string[]>([""])

  const [place, setPlace] = useState<string>('')
  const [eventDate, setEventDate] = useState('')
  const [rating, setRating] = useState(0)
  const [note, setNote] = useState('')
  const [songList, setSongList] = useState('')
  const [comment, setComment] = useState<string[]>([])  // 思い出画像につける

  // チケット画像
  const [ticketImageKey, setTicketImageKey] = useState<string | null>(null)
  const [ticketImageUrl, setTicketImageUrl] = useState<string | null>(null)

  // 思い出画像
  const [memoryImageKey, setMemoryImageKey] = useState<string[]>([])
  const [memoryImageUrl, setMemoryImageUrl] = useState<string[]>([])

  return (
    <div className="mt-5">
      <p className="text-xl text-center text-white">ライブ記録を追加</p>
      <EventForm
        eventTitle={eventTitle}
        setEventTitle={setEventTitle}
        artist={artist}
        setArtist={setArtist}
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
        SubmitButton={true}
      />

      
    </div>
  )
}

// npm install uuid
{/* <input
  type="time"
  value={startTime}
  onChange={(e) => setStartTime(e.target.value)}
/> */}