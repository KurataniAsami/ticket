import Image from "next/image";
import { EventList } from "../types/event";
import { EventIndexResponse } from "../types/event";

type Props = {
  event: EventList
}

export default function EventItempage({ event }: Props) {
  return (
    <div>
      {/* 型がDateの物はそのまま表示するとエラーになるのでtoLocaleDateStringで変換する */}
      <p className="text-gray-600">
        {new Date(event.eventDate).toLocaleDateString("ja-JP")}
      </p>
    <div className="flex justify-center items-center gap-5 border-b border-b-gray-300 mt-3 pb-3">

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
      
      <div>
        <p className="text-xl">{event.title}</p>
        <p className="text-gray-600">{event.artist}</p>
      </div>
    </div>
    </div>
  )
}
