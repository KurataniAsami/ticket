'use client'

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { EventList } from "@/app/types/event";
import EventItem from "@/app/components/EventItem";
import { EventIndexResponse } from "@/app/api/event/route";
import YearSelect from "@/app/components/YearSelect";
import { useRouter } from "next/navigation";
import MonthSelect from "@/app/components/MonthSelect";

export default function YearHistoryPage() {
  const { year } = useParams<{ year: string }>()
  const [events, setEvents] = useState<EventList[]>([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  const router = useRouter()

  useEffect(() => {
    const getYearEvent = async () => {
      try {
        const res = await fetch(`/api/upcomingEvents`)
        const data: EventIndexResponse = await res.json()

        // startsWith(year) → この文字列(year)で始まるか」を判定
        // 対象の年を取得して返す
        const yearEvents = data.events.filter((event) => {
          return event.eventDate.startsWith(year)
        })
        setEvents(yearEvents)
      } catch(error) {
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    getYearEvent()
  },[year])


  if(loading) return <p>Loading...</p>
  if(error) return <p>取得に失敗しました</p>

  return (
    <>
      <div className="flex justify-end mt-5 mr-5 text-white">
        <YearSelect
          value={year}
          onChange={(selectYear) => 
            router.push(`/upcomingEvents/schedule/${selectYear}`)
          }
        />
        <MonthSelect
          value=""
          onChange={(month) => {
            router.push(`/upcomingEvents/schedule/${year}/${month}`)
          }}
        />
      </div>

      <div className="mt-5">
        {/* <h1>{year}年{monthNames}のアーカイブ</h1> */}
        <div className="text-green-400 text-3xl ml-10">{year}年</div>
      </div>

      
      {events.length > 0 ? (
        <div className="flex flex-wrap justify-center">
          {events.map((event) => (
              <EventItem
                event={event}
                key={event.id}
              />
          ))}
        </div>
      ):(
        <div>
          <h2>ライブが見つかりませんでした</h2>
          <p>「{year}年」のライブはまだありません</p>
        </div>
      )}
    </>
  )
}

// アーカイブ表示でAPIの設定はなし

// サイドバーのリンク設定
// セレクトボタンで月を選択