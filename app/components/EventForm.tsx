'use client'

import { ChangeEvent, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/app/libs/supabase"
import { v4 as uuidv4 } from 'uuid'  // ticketImageKeyを一意に作成

import { CreateEventRequestBody } from "@/app/api/event/route"
import { MemoryImage } from "../types/event"

import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarRateIcon from '@mui/icons-material/StarRate';
import TicketImage from "@/app/components/TicketImage"
import TicketImageModal from "./TicketImageModal"

import AddIcon from '@mui/icons-material/Add';
import MemoryImageCard from "./MemoryImageCard"
import MemoryImageModal from "./MemoryImageModal"
import MemoryDeleteModal from "./MemoryDeleteModal"

type EventFormProps = {
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

  // 選択した思い出画像のみモーダル
  selectedImage: string | null
  setSelectedImage: React.Dispatch<React.SetStateAction<string | null>>

  isMemoryDeleteOpen: boolean
  setIsMemoryDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>

  textColor?: string   // modal
  SubmitButton?: boolean   // 作成ページのみボタン表示
  editMessage?: string  // editページのみ、テキスト挿入
  ShowCommentForm?: boolean
  CloseButton? : boolean
  onDelete?: () => void
}

export default function EventForm({
  eventTitle,
  setEventTitle,
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
  memoryImageKey,
  setMemoryImageKey,
  ticketImageUrl,
  setTicketImageUrl,
  setMemoryImageUrl,
  memoryImages,  
  setMemoryImages,
  selectedImage,
  setSelectedImage,
  textColor = "text-white",  // modal
  SubmitButton,   // 作成ページのみボタン表示
  editMessage,  // editページのみ、テキスト挿入
}: EventFormProps) {
  const router = useRouter()

  // page.tsxの方からstateを受け取っているのでstateは削除
  

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // モーダル
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false)
  const [isMemoryModalOpen, setIsMemoryModalOpen] = useState(false)

  // 思い出画像の削除モーダル
  const [isMemoryDeleteOpen, setIsMemoryDeleteOpen] = useState(false)
  const [deleteImageId, setDeleteImageId] = useState<number | null>(null)

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
      ticketImageKey: ticketImageKey ?? undefined,   // 画像なしの場合はnullで保存
      memoryImageKey: memoryImageKey,
      memoryImages  // コメント
    }

    try {
      const res = await fetch(`/api/event`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })

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
      error instanceof Error
      return
    }

    // data.pathに、画像固有のkeyが入っているので、stateに格納する
    setTicketImageKey(data.path)  // newにある
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

  // 思い出画像のアップロード(配列)
  const handleMemoryImage = async (
    event: ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    if (!event.target.files || event.target.files.length == 0) {
      return
    }

    const file = event.target.files[0]

    const filePath = `private/${uuidv4()}` // ticketImageKeyにあるStrage内のファイルキー

    // Supabaseに画像をアップロード
    const { data, error } = await supabase.storage
      .from('memory_image')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      })

    if(error) {
      error instanceof Error
      return
    }

    const {
      data: { publicUrl },
    } = supabase.storage
      .from('memory_image')
      .getPublicUrl(data.path)

    // data.pathに、画像固有のkeyが入っているので、stateに格納する
    setMemoryImageKey((prev) => [...prev, data.path])

    // コメント保存
    setMemoryImages((prev) => [
      ...prev,
      {
        id: Date.now(),
        key: data.path,
        url: publicUrl,   // storageのキーを保存する
        comment: "",
      },
    ])
  }

  useEffect(() => {
    if (memoryImageKey.length === 0) return

    const urls = memoryImageKey.map((key) => {
      const {
        data: { publicUrl },
      } = supabase.storage
        .from('memory_image')
        .getPublicUrl(key)

      return publicUrl
    })

    setMemoryImageUrl(urls)
  }, [memoryImageKey])

  // アーティスト追加
  const addArtistField = () => {
    if (artist.length >= 3) return
    setArtist((prev) => [...prev, ""])
  }

  // コメント
  const handleCommentChange = (
  id: number,
  comment: string
  ) => {
  setMemoryImages((prev) =>
    prev.map((image) =>
      image.id === id
        ? { ...image, comment }
        : image
    )
  )
  }

  // 思い出画像（コメント）も削除
  const handleDeleteClick = (id: number) => {
    setDeleteImageId(id)
    setIsMemoryDeleteOpen(true)
  }

  // 削除確定
  const handleMemoryDelete = () => {
    if (deleteImageId === null) return

    setMemoryImages((prev) =>
      prev.filter((image) => image.id !== deleteImageId)
    )

    // 削除完了後、初期状態に戻す（モーダル閉じる）
    setIsMemoryDeleteOpen(false)
    setDeleteImageId(null)
  }

  return (
    <div className="mt-5 min-w-0 mr-5">
      <div className="flex justify-center mt-3">
        <form onSubmit={handleSubmit}
          className="w-full max-w-xl min-w-0"
        >
          <div className="flex flex-col">
            <label className={`text-gray-400 text-sm mb-1 ${textColor}`}>
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
            <label className={`text-gray-400 text-sm mb-1 ${textColor}`}>
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
                className="flex items-center gap-1 bg-slate-900 border border-gray-600 rounded p-1.5 mt-2"
              >
                <AddIcon/>
                アーティストを追加
              </button>
            )}
          </div>

          <div className="flex flex-col mt-5">
            <label className={`text-gray-400 text-sm mb-1 ${textColor}`}>
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
            <label className={`text-gray-400 text-sm mb-1 ${textColor}`}>
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
            <label className={`text-gray-400 text-sm mb-1 ${textColor}`}>
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
            <label className={`text-gray-400 text-sm mb-1 ${textColor}`}>
              メモ・感想<span className="text-gray-300 ml-2">(任意)</span>
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="会場のメモやその日の出来事など（任意）"
              className="bg-slate-900 border border-gray-600 rounded p-1.5 focus:outline focus:outline-green-400"
            />
          </div>

          <div  className="flex flex-col mt-5">
            <label className={`text-gray-400 text-sm mb-1 ${textColor}`}>
              セットリスト<span className="text-gray-300 ml-2">(任意)</span>
            </label>
            <textarea
              value={songList}
              onChange={(e) => setSongList(e.target.value)}
              placeholder="セットリストを入力（任意）"
              className="bg-slate-900 border border-gray-600 rounded p-1.5 focus:outline focus:outline-green-400"
            />
          </div>

          <div className="flex flex-col mt-5">
            <label
              htmlFor="ticketImageKey"
              className={`text-gray-400 text-sm mb-1 ${textColor}`}
            >
              チケット画像(1枚のみ)
            </label>
            <input
              type="file"
              onChange={handleTicketImage}
              accept="image/*"
              className="bg-slate-900 border border-gray-600 rounded p-1.5 focus:outline focus:outline-green-400"
            />
            <div className="mx-auto mt-5">
              <TicketImage
                url={ticketImageUrl ?? ""}
                width={150}
                height={40}  
                onClick={() => setIsTicketModalOpen(true)}
              />

              <TicketImageModal
                open={isTicketModalOpen}
                onClose={() => setIsTicketModalOpen(false)}
                ticketImageUrl={ticketImageUrl}
              />
            </div>
          </div>

          {/* 思い出画像 */}
          <div className="flex flex-col mt-5">
            <label
              htmlFor="memoryImageKey"
              className={`text-gray-400 text-sm mb-1 ${textColor}`}
            >
              思い出画像
              {/* editページのみのテキスト */}
              {editMessage && (
                <div className="flex items-center gap-1 mt-2">
                  <p>{editMessage}</p>
                  <AddIcon className="text-green-400"/>
                </div>
              )}
            </label>
            <input
              type="file"
              onChange={handleMemoryImage}
              accept="image/*"
              className="bg-slate-900 border border-gray-600 rounded p-1.5 focus:outline focus:outline-green-400"
            />
           
            <div className="flex justify-center flex-wrap gap-5 mt-3">
              {memoryImages?.map((image) => (
                <div key={image.id}>
                  <MemoryImageCard
                    key={image.id}
                    url={image.url}
                    width={150}
                    height={40}  
                    comment={image.comment}
                    ShowCommentForm={true}
                    CloseButton={true}
                    onClick={() => {
                      setSelectedImage(image.url)
                      setIsMemoryModalOpen(true)
                      
                    }}

                    onCommentChange={(value) =>
                      handleCommentChange(image.id, value)
                    }

                    // inDeleteは発火場所
                    onDelete={() => handleDeleteClick(image.id)}
                  />
                </div>
              ))}

              <MemoryImageModal
                open={isMemoryModalOpen}
                onClose={() => setIsMemoryModalOpen(false)}
                selectedImage={selectedImage}
                ShowComment={true}
              />

              <MemoryDeleteModal
                open={isMemoryDeleteOpen}
                onClose={() => setIsMemoryDeleteOpen(false)}
                onDelete={handleMemoryDelete}
              />
            </div>
          </div>

          {/* propsの受け渡しはここだけ、falseのpageは何もしない */}
          {SubmitButton && (
            <div className="flex justify-center mt-5">
            <button
              type="submit"
              className="bg-pink-400 px-3 py-2 mb-5 rounded text-white hover:bg-pink-500"
            >
              登録
            </button>
          </div>
          )}
        </form>
      </div>
    </div>
  )
}

// npm install uuid