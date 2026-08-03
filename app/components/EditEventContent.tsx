'use client'

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { supabase } from "@/app/libs/supabase"

import { UpdateEventRequestBody } from "@/app/api/event/[id]/route"

import { EventDetail, EventFormData } from "@/app/types/event"
import EventForm from "@/app/components/EventForm"
import DeleteModal from "./DeleteModal"

import { useEventFormContext } from "@/contexts/EventFormContext"

export default function EditEventContent() {
  const router = useRouter()
  const { id } = useParams<{ id: string }>()

  const [event, setEvent] = useState<EventDetail | null>(null)
  
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // 削除
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  // 削除モーダル（画像）
  const [isMemoryDeleteOpen, setIsMemoryDeleteOpen] = useState(false)

  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const {
    place,
    setPlace,
    eventDate,
    setEventDate,
    rating = 0,
    setRating,
    note = '',
    setNote,
    songList = '',
    setSongList,
    artist,
    setArtist,
    ticketImageKey,
    setTicketImageKey,
    eventTitle,
    setEventTitle,
    memoryImages,
    setMemoryImages,
    memoryImageKey,
  } = useEventFormContext()

  //  編集フォームに既存データを読み込む処理（GET）
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`/api/event/${id}`)
        const data = await res.json()
        
        const event = data.event

        setEvent(event)
        // const event = data.eventとしているためevent.eventTitleになる
        setEventTitle(event.eventTitle)  
        setArtist(event.artist.map((artist: { name: string }) => artist.name))
        setPlace(event.place.name)

        // 日付の型を変換して既存データを反映させる
        setEventDate(new Date(event.eventDate).toISOString().split("T")[0])  
        setRating(event.rating)
        setNote(event.note)
        setSongList(event.songList)
        setTicketImageKey(event.ticketImageKey)
      } catch(error) {
        setError(error instanceof Error ? error.message: '既存データの取得に失敗しました')
      } finally {
        setLoading(false)
      }
    };
    fetchEvent()
  },[id])

  // 思い出画像の表示のため
  useEffect(() => {
  if (!event) return
  const images = event.eventImages.map((image) => {
    const {
      data: { publicUrl },
    } = supabase.storage
      .from("memory_image")
      .getPublicUrl(image.url)

    return {
      id: image.id,
      key: image.url,
      url: publicUrl,
      comment: image.comment,
    }
  })

  setMemoryImages(images)
  }, [event])

  // 更新処理, handleSubmitをpropsで送る
  const handleSubmit = async (data: EventFormData) => {
    const body: UpdateEventRequestBody = {
      eventTitle,
      artist,
      place,
      eventDate,
      rating,
      note,
      songList,
      ticketImageKey,
      memoryImageKey,
      memoryImages
    }
    
    try {
      const res = await fetch(`/api/event/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
      router.push(`/event/${id}`)
    } catch(error) {
      setError(error instanceof Error ? error.message: '更新に失敗')
    }
  }

  // DELETE
  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/event/${id}`,{
        method: 'DELETE'
      })

      router.push('/')
    } catch(error) {
      setError(error instanceof Error ? error.message: '削除に失敗')
    }
  }

  if(loading) return <p>loading...</p>
  
  return (
    <div className="mt-5 min-w-0">
      <p className="text-xl text-center text-white">
        ライブ記録を編集
      </p>

      <EventForm
        editMessage="新しい写真を追加"
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        ShowCommentForm={true}
        CloseButton={true}
        isMemoryDeleteOpen={isMemoryDeleteOpen}
        setIsMemoryDeleteOpen={setIsMemoryDeleteOpen}
        memoryImages={memoryImages}
        setMemoryImages={setMemoryImages}
        SubmitButton={true}
        onSubmit={handleSubmit}
      />

      <div className="flex justify-end mr-5">
        <button
          onClick={() => setIsDeleteOpen(true)}
          className="px-3 py-2 rounded border border-red-600 text-red-600"
          >
          削除
        </button>
      </div>

      <DeleteModal
        open={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onDelete={handleDelete}
      />

    </div>
  )
}