'use client'

import { useEffect, useState } from "react"
import { EventList } from "../types/event"
import Link from "next/link"
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import YearSelect from "../components/YearSelect";
import MonthSelect from "../components/MonthSelect";
import { useParams, useRouter } from "next/navigation";

export default function UpcomingEventsList() {
  const [events, setEvents] = useState<EventList[]>([])
  const { year, month } = useParams<{ year: string, month: string }>()
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const getComingEvent = async () => {
      const res = await fetch(`/api/upcomingEvents`)
      const data = await res.json()
      setEvents(data.events)
      setLoading(false)
    }

    getComingEvent()
  },[])


  if(loading) return <p>Loding...</p>
  if(!events) return <p>対象の講演がありません</p>

  return (
    <div>
      <div className="flex justify-end mt-5 mr-5 text-white">
        <YearSelect
          value={year}
          onChange={(selectYear) => 
            router.push(`/upcomingEvents/schedule/${selectYear}`)
          }
        />
        <MonthSelect
          value={month}
          onChange={(value) => {
            router.push(`/upcomingEvents/schedule/${year}/${value}`)
          }}
        />
      </div>
      
      <div className="flex flex-col mt-5">
        {events.map((event) => (
          <Link
            key={event.id}
            href={`/event/${event.id}`}
          >
            <div className=" mb-5 border border-white">
              <div className="flex w-full px-3 py-1 bg-white text-black font-bold">
                <CalendarMonthIcon/>
                <p className="ml-1">
                  {new Date(event.eventDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "2-digit",
                  })}
                </p>

                <div className="ml-auto">
                  {new Date(event.eventDate).toLocaleDateString("en-US", {
                    weekday: "long",
                  })}
                </div>
              </div>

              <div className="m-2 flex gap-10">
                <div className="flex flex-col">
                  {event.artist.map((eArtist) => (
                    <span
                      key={eArtist.id}
                      className="block text-gray-300"
                    >
                      {eArtist.name}
                    </span>
                  ))}
                </div>
                
                <p>{event.eventTitle}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}