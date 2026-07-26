'use client'

import { useState } from "react"
import EventForm from "./EventForm"
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog"

type EventCreateModalProps = {
  open: boolean
  onClose: () => void
}

export default function CreateEventModal({
  open,
  onClose,
}: EventCreateModalProps) {

  const [eventTitle, setEventTitle] = useState('')
    const [artist, setArtist] = useState<string[]>([""])
  
    const [place, setPlace] = useState<string>('')
    const [eventDate, setEventDate] = useState('')
    const [rating, setRating] = useState(0)
    const [note, setNote] = useState('')
    const [songList, setSongList] = useState('')
    const [comment, setComment] = useState<string[]>([])  
  
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
              />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}