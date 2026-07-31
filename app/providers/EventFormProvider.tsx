'use client'

import EventFormContext from "@/contexts/EventFormContext"
import { useState } from "react"
import { MemoryImage } from "../types/event"

export function EventFormProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [eventTitle, setEventTitle] = useState("")
  const [artist, setArtist] = useState<string[]>([""])

  const [place, setPlace] = useState<string>('')
  const [eventDate, setEventDate] = useState('')
  const [rating, setRating] = useState(0)
  const [note, setNote] = useState('')
  const [songList, setSongList] = useState('')

  const [ticketImageKey, setTicketImageKey] = useState<string | null>(null)
  const [ticketImageUrl, setTicketImageUrl] = useState<string | null>(null)

  // 配列
  const [memoryImageKey, setMemoryImageKey] = useState<string[]>([])
  const [memoryImageUrl, setMemoryImageUrl] = useState<string[]>([])  // 表示用のURL
  const [memoryImages, setMemoryImages] = useState<MemoryImage[]>([]) // コメントも含む

  return (
    <EventFormContext.Provider
      value={{
        eventTitle,
        setEventTitle,
        place,
        setPlace,
        eventDate,
        setEventDate,
        rating,
        setRating,
        note,
        setNote,
        songList,
        setSongList,
        artist,
        setArtist,
        ticketImageKey,
        setTicketImageKey,
        memoryImageKey,
        setMemoryImageKey,
        ticketImageUrl,
        setTicketImageUrl,
        memoryImageUrl,
        setMemoryImageUrl,
        memoryImages,  
        setMemoryImages,
      }}
    >
      {children}
    </EventFormContext.Provider>
  )
}