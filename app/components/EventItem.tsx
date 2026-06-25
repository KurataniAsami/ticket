import Image from "next/image";
import Link from "next/link";

import { EventList } from "../types/event";

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {
  Card,
  CardContent,
} from "@/components/ui/card"


type Props = {
  event: EventList
}

export default function EventItempage({ event }: Props) {
  return (
    <div className="m-5">
      <Card className="
        w-[360px] h-[250px] bg-slate-900 border border-slate-800
        hover:bg-slate-800
      ">
        <CardContent>
      <Link href={`/event/${event.id}`}>
        
      <div className="flex flex-col justify-center items-center gap-5 mt-3 pb-3">

        {/* 画像はnullも許容しているため普通に書くとエラーになる。 */}
        {/* そのため {event.ticketImage && ( ~で画像がある場合だけ表示する */}
        {event.ticketImage && (
          <Image
            src={event.ticketImage}
            alt="チケット画像"
            width={40}
            height={20}
          />
        )}
        
        <div className="flex gap-3">
          <div className="flex flex-col items-center border border-gray-600 rounded-xl px-3 py-2">
            <CalendarMonthIcon
              className="text-white"
            />
            {/* 型がDateの物はそのまま表示するとエラーになるのでtoLocaleDateStringで変換する */}
            <p className="text-white text-xl mt-1">
              {new Date(event.eventDate).toLocaleDateString("ja-JP",{
                month: "numeric",
                day: "numeric",
              })}
            </p>
          </div>

        <div className="flex flex-col">
          <div className="flex gap-2">
            <p className="text-xl text-white font-bold">{event.title}</p>
          </div>

          <div className="flex gap-2 items-center">
            <p className="text-gray-300 mt-1 ml-1">{event.artist}</p>
          </div>

          <div className="flex gap-2 items-center">
            <LocationOnIcon 
              className="text-gray-400"
            />
            <p className="text-gray-300">{event.place.name}</p>
          </div>
        </div>
          
          
        </div>
      </div>
      </Link>
      </CardContent>
      </Card>
    </div>
  )
}
