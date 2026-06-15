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

// 一覧表示
export type EventIndexResponse = {
  events: EventList[]
}