'use client'

import { ChangeEvent, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/app/libs/supabase"
import { v4 as uuidv4 } from 'uuid'  // ticketImageKeyを一意に作成

import { CreateEventRequestBody } from "@/app/api/event/route"

import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarRateIcon from '@mui/icons-material/StarRate';
import TicketImage from "@/app/components/TicketImage"

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
  const [comment, setComment] = useState<string[]>([])  // 思い出画像につける

  const [ticketImageKey, setTicketImageKey] = useState<string | null>(null)
  const [ticketImageUrl, setTicketImageUrl] = useState<string | null>(null)
  // 存在しない値がある時はstringを使う

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
      place,
      ticketImageKey: ticketImageKey ?? undefined   // 画像なしの場合はnullで保存
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

  // チケット画像のアップロード
  const handleTicketImage = async (
    event: ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    if (!event.target.files || event.target.files.length == 0) {
      return
    }

    const file = event.target.files[0]

    const filePath = `private/${uuidv4()}` // ticketImageKeyにあるStrage内のファイルキー

    // Supabaseに画像をアップロード
    const { data, error } = await supabase.storage
      .from('ticket_image')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      })

    if(error) {
      alert(error.message)
      return
    }

    // data.pathに、画像固有のkeyが入っているので、stateに格納する
    setTicketImageKey(data.path)
  }

  useEffect(() => {
    if(!ticketImageKey) return

    const fetcher = async () => {
      const {
        data: { publicUrl },
      } = await supabase.storage
        .from('ticket_image')
        .getPublicUrl(ticketImageKey)

      setTicketImageUrl(publicUrl)
    }

    fetcher()
  },[ticketImageKey])

  return (
    <div className="mt-5">
      <p className="text-xl text-center">ライブ記録を追加</p>

      <div className="flex justify-center mt-3">
        <form onSubmit={handleSubmit}>
        
        <TicketImage url={ticketImageUrl ?? ""} />

          <div className="flex flex-col">
            <label className="text-gray-400 text-sm mb-1">
              日時<span className="text-red-500 ml-1">(必須)</span>
            </label>
{/* カレンダーの色を訂正 */}
            <input
              type="date"   // dateにすると自動的にカレンダーを表示してくれる
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              className="border border-gray-600 rounded p-1.5 focus:outline focus:outline-green-400"
            />
          </div>

          <div className="flex flex-col mt-5">
            <label className="text-gray-400 text-sm mb-1">
              アーティスト<span className="text-red-500 ml-1">(必須)</span>
            </label>
            <input
              type="text"
              value={artistInput}   // input用のstate
              onChange={(e) => setArtistInput(e.target.value)}
              placeholder="例: The Band"
              className="border border-gray-600 rounded p-1.5 focus:outline focus:outline-green-400"
            />
          </div>
          {/* クリックしたらinputが増える */}

          <div className="flex flex-col mt-5">
            <label className="text-gray-400 text-sm mb-1">
              会場<span className="text-red-500 ml-1">(必須)</span>
            </label>
            <input
              type="text"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              placeholder="例: 幕張メッセ"
              className="border border-gray-600 rounded p-1.5 focus:outline focus:outline-green-400"
            />
          </div>

          <div className="flex flex-col mt-5">
            <label className="text-gray-400 text-sm mb-1">
              ライブ/ツアー名<span className="text-gray-300 ml-2">(任意)</span>
            </label>
            <input
              type="text"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              placeholder="例: SUMMER TOUR 2026"
              className="border border-gray-600 rounded p-1.5 focus:outline focus:outline-green-400"
            />
          </div>

          <div className="flex flex-col mt-5">
            <label className="text-gray-400 text-sm mb-1">
              評価<span className="text-gray-300 ml-2">(任意)</span>
            </label>
            <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
              >
                {/* starがrating以下なら塗りつぶす */}
                {star <= rating ? (
                  <StarRateIcon className="text-yellow-400" />
                ) : (
                  <StarBorderIcon />
                )}
              </button>
            ))}
            </div>
          </div>

          <div className="flex flex-col mt-5">
            <label className="text-gray-400 text-sm mb-1">
              メモ・感想<span className="text-gray-300 ml-2">(任意)</span>
            </label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="会場のメモやその日の出来事など（任意）"
              className="border border-gray-600 rounded w-80 p-1.5 focus:outline focus:outline-green-400"
            />
          </div>

          <div  className="flex flex-col mt-5">
            <label className="text-gray-400 text-sm mb-1">
              セットリスト<span className="text-gray-300 ml-2">(任意)</span>
            </label>
            <input
              type="text"
              value={songList}
              onChange={(e) => setSongList(e.target.value)}
              placeholder="セットリストを入力（任意）"
              className="border border-gray-600 rounded p-1.5 focus:outline focus:outline-green-400"
            />
          </div>

          <div>
            <label
              htmlFor="ticketImageKey"
            >
              チケット画像
            </label>
            <input
              type="file"
              onChange={handleTicketImage}
              accept="image/*"
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

// npm install uuid