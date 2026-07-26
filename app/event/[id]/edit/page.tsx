'use client'

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { UpdateEventRequestBody } from "@/app/api/event/[id]/route"
import { EventDetail, MemoryImage } from "@/app/types/event"
import EventForm from "@/app/components/EventForm"
import DeleteModal from "@/app/components/DeleteModal"
import { supabase } from "@/app/libs/supabase"


export default function EditEventPage() {
  const router = useRouter()
  const { id } = useParams<{ id: string }>()

  const [event, setEvent] = useState<EventDetail | null>(null)
  
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

  // 配列
  const [memoryImageKey, setMemoryImageKey] = useState<string[]>([])
  const [memoryImageUrl, setMemoryImageUrl] = useState<string[]>([])  // 表示用のURL
  const [memoryImages, setMemoryImages] = useState<MemoryImage[]>([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // モーダル
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const [selectedImage, setSelectedImage] = useState<string | null>(null)

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
      url: publicUrl,
      comment: image.comment,
    }
  })

  setMemoryImages(images)
  // setMemoryImageUrl(images.map((image) => image.url))
  }, [event])

  // 更新処理
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    const body: UpdateEventRequestBody = {
      eventTitle,
      artist,
      place,
      eventDate,
      rating,
      note,
      songList,
      ticketImageKey,
      memoryImageKey
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
      <p className="text-xl text-center text-white">ライブ記録を編集</p>

      {/* propsでstateを渡して既存のフォームデータを反映させる */}
      <EventForm
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
        editMessage="新しい写真を追加"  // editページのみ、テキスト挿入
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        ShowComment={true}
      />

      <div className="flex justify-center gap-5 my-5">
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-pink-400 px-3 py-2 rounded text-white hover:bg-pink-500"
        >
          保存
        </button>

        <button
          onClick={() => setIsDeleteOpen(true)}
          className="px-3 py-2 rounded border border-red-600 text-red-600"
          >
          削除
        </button>

        <DeleteModal
          open={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
          onDelete={handleDelete}
        />
      </div>
    </div>
  )
}
