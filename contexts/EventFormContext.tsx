"use client"

import { MemoryImage } from "@/app/types/event"
import { createContext, useContext } from "react"
import type { Dispatch, SetStateAction } from "react"

export type EventFormContextType = {
  eventTitle: string
  setEventTitle: Dispatch<SetStateAction<string>>

  artist: string[]
  setArtist: Dispatch<SetStateAction<string[]>>

  place: string
  setPlace: Dispatch<SetStateAction<string>>

  eventDate: string
  setEventDate: Dispatch<SetStateAction<string>>

  rating: number
  setRating: Dispatch<SetStateAction<number>>

  note: string
  setNote: Dispatch<SetStateAction<string>>

  songList: string
  setSongList: Dispatch<SetStateAction<string>>

  ticketImageKey: string | null
  setTicketImageKey: Dispatch<SetStateAction<string | null>>

  ticketImageUrl: string | null
  setTicketImageUrl: Dispatch<SetStateAction<string | null>>

  memoryImageKey: string[]
  setMemoryImageKey: Dispatch<SetStateAction<string[]>>

  memoryImageUrl: string[]
  setMemoryImageUrl: Dispatch<SetStateAction<string[]>>

  memoryImages: MemoryImage[]
  setMemoryImages: Dispatch<SetStateAction<MemoryImage[]>>
}

const EventFormContext = createContext<EventFormContextType | null>(null)

export function useEventFormContext() {
  const context = useContext(EventFormContext)

  if (!context) {
    throw new Error("useEventFormContextはProviderの中で使用する必要があります")
  }

  return context
}

export default EventFormContext