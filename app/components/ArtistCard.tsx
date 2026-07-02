import Link from "next/link";
import ArtistImage from "./ArtistImage";
import { Card, CardContent } from "@/components/ui/card";

type Artist = {
  id: number
  name: string
  imageUrl: string | null
}

type Props = {
  artist: Artist
}

export default function ArtistCard({ artist }: Props) {
  return (
    <div>
      <Card
        className="
          w-[360px] h-[250px] bg-slate-900 border border-slate-800
        hover:bg-slate-800
      ">
        <CardContent>
          <Link href={`/artist/${artist.id}`}>
            <div className="flex flex-col justify-center items-center text-white text-xl">
              <div className="flex gap-3">
                {/* 上記でmapして1件分のartistを持っているのでartistを渡す */}
                <ArtistImage
                  imageUrl={artist.imageUrl}
                  artist={[artist.name]}
                />
              </div>
              {artist.name}
            </div>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}