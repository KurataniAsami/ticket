'use client'

import { useState } from "react"
import EventForm from "./EventForm"
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog"
import { MemoryImage } from "../types/event"
import { EventFormProps } from "../types/event"

type EventCreateModalProps = {
  eventTitle: string
  setEventTitle: React.Dispatch<React.SetStateAction<string>>
  artist: string[]
  setArtist: React.Dispatch<React.SetStateAction<string[]>>
  place: string
  setPlace: React.Dispatch<React.SetStateAction<string>>
  eventDate: string
  setEventDate: React.Dispatch<React.SetStateAction<string>>
  rating: number
  setRating: React.Dispatch<React.SetStateAction<number>>
  note: string
  setNote: React.Dispatch<React.SetStateAction<string>>
  songList: string
  setSongList: React.Dispatch<React.SetStateAction<string>>

  // 1枚しか扱わない場合はstring | null
  ticketImageKey: string | null
  setTicketImageKey: React.Dispatch<React.SetStateAction<string | null>>
  ticketImageUrl: string | null
  setTicketImageUrl: React.Dispatch<React.SetStateAction<string | null>>

  memoryImageKey: string[]
  setMemoryImageKey: React.Dispatch<React.SetStateAction<string[]>>
  memoryImageUrl: string[]
  setMemoryImageUrl: React.Dispatch<React.SetStateAction<string[]>>

  memoryImages: MemoryImage[]
  setMemoryImages: React.Dispatch<React.SetStateAction<MemoryImage[]>>

  selectedImage: string | null
  setSelectedImage: React.Dispatch<React.SetStateAction<string | null>>

  isMemoryDeleteOpen: boolean
  setIsMemoryDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>

  textColor?: string   // modal
  SubmitButton?: boolean   // 作成ページのみボタン表示
  editMessage?: string  // editページのみ、テキスト挿入
  ShowCommentForm?: boolean
  CloseButton? : boolean
  onClose: () => void
  open: boolean
}

export default function CreateEventModal({
  open,
  onClose,
  memoryImageKey,
  setMemoryImageKey,
  memoryImageUrl,
  setMemoryImageUrl,
  eventTitle,
  setEventTitle,
  memoryImages,
  setMemoryImages,
  isMemoryDeleteOpen,
  setIsMemoryDeleteOpen,
}: EventCreateModalProps) {

  // const [eventTitle, setEventTitle] = useState('')
  const [artist, setArtist] = useState<string[]>([""])

  const [place, setPlace] = useState<string>('')
  const [eventDate, setEventDate] = useState('')
  const [rating, setRating] = useState(0)
  const [note, setNote] = useState('')
  const [songList, setSongList] = useState('')

  const [ticketImageKey, setTicketImageKey] = useState<string | null>(null)
  const [ticketImageUrl, setTicketImageUrl] = useState<string | null>(null)


  return (
    <div>
      <Dialog
        open={open}
        onOpenChange={onClose}
      >
        <DialogContent
          className="max-h-[90vh] overflow-y-auto bg-gray-800"
        >
          <DialogHeader className="text-gray-400">
            <EventForm
              textColor="text-white"
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
              artist={artist}
              setArtist={setArtist}
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
            />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}