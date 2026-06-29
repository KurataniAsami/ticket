// アーティスト一覧
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import Link from "next/link"
import { EventList } from "../types/event"

export default function ArtistListPage() {
  return(
    <div>
      <p>アーティスト一覧</p>
      <Card className="
        w-[360px] h-[250px] bg-slate-900 border border-slate-800
        hover:bg-slate-800
      ">
        <CardContent>
          <Link href={""}>
          {/*  href={`/artist/${artist.id}`} */}
            <div className="flex flex-col justify-center items-center gap-5 mt-3 pb-3">

              {/* <TicketImage url={imageUrl} /> */}
              
              <div className="flex gap-3">
                <div className="flex flex-col">

                  <div className="flex gap-2 items-center">
                    {/* <p className="text-gray-300 mt-1 ml-1">{event.artist}</p> */}
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