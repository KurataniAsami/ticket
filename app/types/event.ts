// 一覧表示の型
export type EventList = {
  id: number
  title?: string
  artist?: string[]
  eventDate: string       // フロントで使うからstring
  ticketImage?: string
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
  artist?: string[]
  eventDate: string       
  ticketImage?: string
  note?:         string
  songList?: string
  rating?: number

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