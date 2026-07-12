'use client'

import { ChangeEvent, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/app/libs/supabase"
import { v4 as uuidv4 } from 'uuid'  // ticketImageKeyを一意に作成

import { CreateEventRequestBody } from "@/app/api/event/route"

import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarRateIcon from '@mui/icons-material/StarRate';
import TicketImage from "@/app/components/TicketImage"

import AddIcon from '@mui/icons-material/Add';

export default function CreateEventForm() {
  const router = useRouter()

  const [eventTitle, setEventTitle] = useState('')

  const [artist, setArtist] = useState<string[]>([""])  // 配列なので<string[]>

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

  // アーティスト追加
  const addArtistField = () => {
    if (artist.length >= 3) return
    setArtist((prev) => [...prev, ""])
  }

  return (
    <div className="mt-5">
      <p className="text-xl text-center">ライブ記録を追加</p>

      <div className="flex justify-center mt-3">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="text-gray-400 text-sm mb-1">
              日時<span className="text-red-500 ml-1">(必須)</span>
            </label>
            <input
              type="date"   // dateにすると自動的にカレンダーを表示してくれる
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              className="bg-slate-900 border border-gray-600 rounded p-1.5 focus:outline focus:outline-green-400"
            />
          </div>

          <div className="flex flex-col mt-5">
            <label className="text-gray-400 text-sm mb-1">
              アーティスト<span className="text-red-500 ml-1">(必須)</span>
            </label>
            {artist.map((value, index) => (
              <input
                key={index}
                type="text"
                value={value}
                // value={artistInput}   // input用のstate
                // onChange={(e) => setArtistInput(e.target.value)}
                onChange={(e) => {
                  const newArtist = [...artist]
                  newArtist[index] = e.target.value
                  setArtist(newArtist)
                }}
                placeholder="例: The Band"
                className="bg-slate-900 border border-gray-600 rounded p-1.5 focus:outline focus:outline-green-400"
              />
            ))}
            
            {artist.length < 3 && (
              <button
                type="button"
                onClick={addArtistField}
                className="w-50 flex items-center gap-1 bg-slate-900 border border-gray-600 rounded p-1.5 mt-2"
              >
                <AddIcon/>
                アーティストを追加
              </button>
            )}
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
              className="bg-slate-900 border border-gray-600 rounded p-1.5 focus:outline focus:outline-green-400"
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
              className="bg-slate-900 border border-gray-600 rounded p-1.5 focus:outline focus:outline-green-400"
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
                  className="text-gray-400"
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
              className="bg-slate-900 border border-gray-600 rounded w-100 p-1.5 focus:outline focus:outline-green-400"
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
              className="bg-slate-900 border border-gray-600 rounded p-1.5 focus:outline focus:outline-green-400"
            />
          </div>

          <div className="flex flex-col mt-5">
            <label
              htmlFor="ticketImageKey"
              className="text-gray-400 text-sm mb-1"
            >
              チケット画像
            </label>
            <input
              type="file"
              onChange={handleTicketImage}
              accept="image/*"
              className="bg-slate-900 border border-gray-600 rounded p-1.5 focus:outline focus:outline-green-400"
            />
            {/* 大きさ調整 */}
            <div className="mx-auto mt-3">
              <TicketImage url={ticketImageUrl ?? ""} />
            </div>
          </div>

          {/* 思い出画像 */}

          <div className="flex justify-center mt-5">
            <button
              type="submit"
              className="bg-pink-400 px-3 py-2 rounded hover:bg-pink-500"
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
{/* <input
  type="time"
  value={startTime}
  onChange={(e) => setStartTime(e.target.value)}
/> */}