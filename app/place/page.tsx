'use client'

import {
  Card,
  CardContent,
} from "@/components/ui/card"
import Link from "next/link"
import { useEffect, useState } from "react"
import { PlaceIndexResponse } from "../api/place/route"
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function PlaceListPage() {
  const [place, setPlace] = useState<PlaceIndexResponse["place"]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const res = await fetch(`/api/place`)
        const data = await res.json()
        setPlace(data.place)
      } catch(error) {
        setError(error instanceof Error ? error.message: '会場のデータが取得できませんでした')
      } finally {
        setLoading(false)
      }
    }

    fetchPlace()
  },[])

  return (
    <div>
      <p className="text-xl my-3">会場一覧</p>
      <div>
        {place.map((place) => (
          <Link
            href={`/place/${place.id}`}
            key={place.id}
          >
            <Card
            className="w-[320px] bg-gray-900 mb-3"
            >
              <CardContent className="flex flex-col">
                <div className="flex items-center gap-2 text-white">
                  <LocationOnIcon/>
                  {place.name}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}