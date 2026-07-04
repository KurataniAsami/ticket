'use client'

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { EventList } from "@/app/types/event";
import EventItem from "@/app/components/EventItem";
import { EventIndexResponse } from "@/app/api/event/route";


export default function EventHistoryPage() {
  const { year } = useParams<{ year: string }>()
  const [events, setEvents] = useState<EventList[]>([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getYearEvent = async () => {
      try {
        const res = await fetch("/api/event?sort=asc")
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

  // 年月のチェック
  // const yearNum = parseInt(year);
  // const monthNum = parseInt(month);

  // エラーハンドリング
  // isNaN(yearNum) → yearNumが数字じゃなかったらtrue
  // if(isNaN(yearNum) || isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
  // if(isNaN(yearNum)) {
  //   return (
  //     notFound()
  //   )
  // }

  // const monthNames = [
  //   "1月",
  //   "2月",
  //   "3月",
  //   "4月",
  //   "5月",
  //   "6月",
  //   "7月",
  //   "8月",
  //   "9月",
  //   "10月",
  //   "11月",
  //   "12月",
  // ];


  return (
    <>
    <div className="max-w-4xl mx-auto">
      {/* <h1>{year}年{monthNames}のアーカイブ</h1> */}
      <h1>{year}年のライブ</h1>
    </div>

    {events.length > 0 ? (
      <div className="space-y-3">
        {events.map((event) => (
          <div key={event.id}>
            <EventItem
              event={event}
            />
          </div>
        ))}
      </div>
    ):(
      <div>
        <h2>記事が見つかりませんでした</h2>
        <p>「{year}年」の記事はまだありません</p>
      </div>
    )}
  </>
  )
}

// APIの設定はなし

// サイドバーのリンク設定
// セレクトボタンで月を選択