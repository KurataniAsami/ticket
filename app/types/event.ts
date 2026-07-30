import type { Dispatch, SetStateAction } from "react"

// 一覧表示の型
export type EventList = {
  id: number
  eventTitle?: string
  eventDate: string       // フロントで使うからstring
  ticketImageKey?: string

    artist: {
      id: number
      name: string
      imageUrl?: string | null
    }[]

    place: {
      id: number
      name: string
    }
}

// 一覧表示（APIの型をセット）
export type EventIndexResponse = {
  events: EventList[]
}

// 詳細（表示）の型
export type EventDetail = {
  id: number
  eventTitle?: string
  eventDate: string       
  ticketImageKey?: string
  memoryImageKey?: string[]
  note?: string
  songList?: string
  rating?: number

  artist: {
    id: number
    name: string
    imageUrl?: string | null
  }[]

  eventImages:{
    id: number
    url: string
    comment: string
  }[]

  place: {
    id: number
    name: string
  }
}

// 詳細（APIの型をセット）
export type EventShowResponse = {
  event: EventDetail
}

export type MemoryImage = {
  id: number
  key: string   // DB保存用
  url: string   // 画面表示用
  comment?: string | null
}

// 作成フォームに入力するpropsの型
export type EventFormProps = {
  eventTitle: string
  setEventTitle: Dispatch<SetStateAction<string>>

  artist: string[]
  setArtist: Dispatch<SetStateAction<string[]>>

  place: string
  setPlace: Dispatch<SetStateAction<string>>

  eventDate: string
  setEventDate: Dispatch<SetStateAction<string>>

  rating: number
  setRating: Dispatch<SetStateAction<number>>

  note: string
  setNote: Dispatch<SetStateAction<string>>

  songList: string
  setSongList: Dispatch<SetStateAction<string>>

  ticketImageKey: string | null
  setTicketImageKey: Dispatch<SetStateAction<string | null>>

  ticketImageUrl: string | null
  setTicketImageUrl: Dispatch<SetStateAction<string | null>>

  memoryImageKey: string[]
  setMemoryImageKey: Dispatch<SetStateAction<string[]>>

  memoryImageUrl: string[]
  setMemoryImageUrl: Dispatch<SetStateAction<string[]>>

  memoryImages: MemoryImage[]
  setMemoryImages: Dispatch<SetStateAction<MemoryImage[]>>
}