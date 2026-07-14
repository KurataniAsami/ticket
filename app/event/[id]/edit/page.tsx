'use client'

import { ChangeEvent, useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { UpdateEventRequestBody } from "@/app/api/event/[id]/route"
import TicketImage from "@/app/components/TicketImage"
import CreateEventForm from "@/app/components/CreateEventForm"

export default function EditEventPage() {
  const router = useRouter()
  const { id } = useParams<{ id: string }>()

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
  // 存在しない値がある時はstringを使う

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  //  編集フォームに既存データを読み込む処理（GET）
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`/api/event/${id}`)
        const data = await res.json()
        const event = data.event

        setEventTitle(data.eventTitle)
        setArtist(data.artist)
        setPlace(data.place)
        setEventDate(data.eventDate)
        setRating(data.rating)
        setNote(data.note)
        setSongList(data.songList)
      } catch(error) {
        setError(error instanceof Error ? error.message: '既存データの取得に失敗しました')
      } finally {
        setLoading(false)
      }
    };
    fetchEvent()
  },[id])

  // 更新処理
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    const body: UpdateEventRequestBody = {
      eventTitle,
      // artist,
      // place,
      eventDate,
      rating,
      note,
      songList
    }

    try {
      const res = await fetch(`/api/event/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
      router.push('/event/${id}')
    } catch(error) {
      setError(error instanceof Error ? error.message: '更新に失敗')
    }
  }

  if(loading) return <p>loading...</p>

  return (
    <div className="mt-5 min-w-0">
        <p className="text-xl text-center text-white">ライブ記録を編集</p>
      <CreateEventForm/>
    </div>
  )
}
