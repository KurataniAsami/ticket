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

  const [ticketImageKey, setTicketImageKey] = useState<string | null>(null)
  const [ticketImageUrl, setTicketImageUrl] = useState<string | null>(null)

  return (
    <div className="mt-5">
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
      />

      <div className="flex justify-center mt-5">
        <button
          type="submit"
          className="bg-pink-400 px-3 py-2 rounded text-white hover:bg-pink-500"
        >
          登録
        </button>
      </div>
    </div>
  )
}

// npm install uuid
{/* <input
  type="time"
  value={startTime}
  onChange={(e) => setStartTime(e.target.value)}
/> */}