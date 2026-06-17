// 一覧表示の型
export type EventList = {
  id: number
  title?: string
  artist?: string
  eventDate: string       // フロントで使うからstring
  ticketImage?: string
    place: {
      id: number
      name: string
    }[]
}

// 一覧表示（APIの型をセット）
export type EventIndexResponse = {
  events: EventList[]
}

// 詳細（表示）の型
export type EventDetail = {
  id: number
  title?: string
  artist?: string
  eventDate: string       
  ticketImage?: string
  note?:         string
  memoryImage?:   string
    place: {
      id: number
      name: string
    }
}

// 詳細（APIの型をセット）
export type EventShowResponse = {
  event: EventDetail
}