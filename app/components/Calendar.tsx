'use client'

import { useRouter } from "next/navigation"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import jaLocale from "@fullcalendar/core/locales/ja"
import { EventProps } from "../calendar/page"

export const Calendar = ({ events }: EventProps)  => {
  const router = useRouter();

  const calendarEvents = events.map((event) => ({
    id: String(event.id),
    title: event.eventTitle || "no title",
    date: event.eventDate,

    // ページ遷移
    url: `event/${event.id}`,

    // カスタム
    extendedProps: {
    artist: event.artist,
  },
  }))

  return (
    <div>
      <FullCalendar
        locale={jaLocale}   
        plugins={[dayGridPlugin]}
        initialView='dayGridMonth'
        firstDay={1}  
        events={calendarEvents}   
        displayEventTime={false}   

        // ページ遷移
        eventClick={(info) => {
          router.push(`/event/${info.event.id}`)
        }}

        // カスタム
        eventContent={(info) => {
          const artist = info.event.extendedProps.artist

          return (
            <div>
              <div className="bg-pink-400 text-black p-0.5 rounded
                inline-block max-w-full truncate hover:bg-pink-500">
                {info.event.title}
              </div>
              <div className="flex flex-col">
                {artist.map((a: { id: number; name: string }) => (
                  <span key={a.id}>{a.name}</span>
                ))}
              </div>
            </div>
          )
        }}
      />
    </div>
  )
}
