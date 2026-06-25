'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CreateEventRequestBody } from "@/app/api/event/route"

export default function EventCreatePage() {
  const router = useRouter()

  const [eventTitle, setEventTitle] = useState('')

  const [artist, setArtist] = useState<string[]>([])  // 配列なので<string[]>
  const [artistInput, setArtistInput] = useState("")  // inputに入力する値を保持

  const [place, setPlace] = useState<string>('')
  const [eventDate, setEventDate] = useState('')
  const [rating, setRating] = useState(0)
  const [note, setNote] = useState('')
  const [songList, setSongList] = useState('')
  const [comment, setComment] = useState<string[]>([])

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    setLoading(true)

    const body: CreateEventRequestBody = {
      eventTitle,  
      artist,
      eventDate,
      rating,
      note,
      songList,
      place
    }

    try {
      const res = await fetch(`/api/event`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })

      if(!res.ok) {
        throw new Error('登録に失敗しました')
      }

      router.push("/")
    } catch(error) {
      setError(error instanceof Error ? error.message: 'イベントを登録できませんでした')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-5">
      <p className="text-xl text-center">ライブ記録を追加</p>
      <div className="flex justify-center mt-3">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="text-gray-400 text-sm mb-1">
              ライブ/ツアー名
            </label>
            <input
              type="text"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              placeholder="例: SUMMER TOUR 2026"
              className="border border-gray-600 rounded p-1.5 focus:outline focus:outline-green-400"
            />
          </div>

          <div className="flex flex-col mt-3">
  <label className="text-gray-400 text-sm mb-1">
    開催日
  </label>

  <input
    type="date"
    value={eventDate}
    onChange={(e) => setEventDate(e.target.value)}
    className="border border-gray-600 rounded p-1.5 focus:outline focus:outline-green-400"
  />
</div>

          <div className="flex flex-col mt-3">
            <label className="text-gray-400 text-sm mb-1">アーティスト</label>
            <input
              type="text"
              value={artistInput}   // input用のstate
              onChange={(e) => setArtistInput(e.target.value)}
              placeholder="例: The Band"
              className="border border-gray-600 rounded p-1.5 focus:outline focus:outline-green-400"
            />
          </div>
          {/* クリックしたらinputが増える */}

          {/* <div>
            <label>日付</label>
            <input
              type="text"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              placeholder="例: SUMMER TOUR 2026"
            />
          </div> */}

          <div className="flex flex-col mt-3">
            <label className="text-gray-400 text-sm mb-1">会場</label>
            <input
              type="text"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              placeholder="例: 幕張メッセ"
              className="border border-gray-600 rounded p-1.5 focus:outline focus:outline-green-400"
            />
          </div>

          {/* <div>
            <label>評価</label>
            <input
              type="text"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              placeholder="例: SUMMER TOUR 2026"
            />
          </div> */}

          <div className="flex flex-col mt-3">
            <label className="text-gray-400 text-sm mb-1">メモ・感想</label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="会場のメモやその日の出来事など（任意）"
              className="border border-gray-600 rounded w-80 p-1.5 focus:outline focus:outline-green-400"
            />
          </div>

          <div  className="flex flex-col mt-3">
            <label className="text-gray-400 text-sm mb-1">セットリスト</label>
            <input
              type="text"
              value={songList}
              onChange={(e) => setSongList(e.target.value)}
              placeholder="セットリストを入力（任意）"
              className="border border-gray-600 rounded p-1.5 focus:outline focus:outline-green-400"
            />
          </div>

          <div className="flex justify-center mt-5">
            <button
              type="submit"
              className="bg-pink-400 px-3 py-2 rounded hover:bg-pink-500"
              onClick={() => {
                // inputのstateのテキストをartistの配列に追加する
                setArtist([...artist, artistInput])
                setArtistInput("")
              }}
            >
              登録
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}