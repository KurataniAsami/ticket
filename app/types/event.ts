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