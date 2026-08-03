'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import EventForm from "./EventForm"
import { useEventFormContext } from "@/contexts/EventFormContext"
import { CreateEventRequestBody } from "@/app/api/event/route"
import { EventFormData } from "../types/event"

export default function EventCreateContent() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  // 思い出画像削除モーダル
  const [isMemoryDeleteOpen, setIsMemoryDeleteOpen] = useState(false)

  const router = useRouter()

  const {
    eventTitle,
    artist,
    place,
    eventDate,
    rating,
    note,
    songList,
    ticketImageKey,
    memoryImageKey,
    memoryImages,
    setMemoryImages,
  } = useEventFormContext()

  // 作成処理
  const handleCreateSubmit = async (
    data: EventFormData   // 型
  ) => {
 console.log("送信データ:", data)
    const body: CreateEventRequestBody = {
      eventTitle: data.eventTitle,
      artist: data.artist,
      place: data.place,
      eventDate: data.eventDate,
      rating: data.rating,
      note: data.note,
      songList: data.songList,
      ticketImageKey: data.ticketImageKey,
      memoryImageKey: data.memoryImageKey,
      memoryImages: data.memoryImages
    }

    try {
      const res = await fetch("/api/event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      })

      router.push("/")
    } catch(error) {
      setError(error instanceof Error ? error.message: 'イベントを登録できませんでした')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-5">

      <p className="text-xl text-center text-white">
        ライブ記録を追加
      </p>
      <EventForm
        onSubmit={handleCreateSubmit}
        SubmitButton={true}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        isMemoryDeleteOpen={isMemoryDeleteOpen}
        setIsMemoryDeleteOpen={setIsMemoryDeleteOpen}
        memoryImages={memoryImages}
        setMemoryImages={setMemoryImages}
      />
    </div>
  )
}
  

  