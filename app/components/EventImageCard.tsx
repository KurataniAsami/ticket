import Image from 'next/image';

import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import {
  Card,
  CardContent,
} from "@/components/ui/card"

type Props = {
  url: string
  comment?: string | null
}

export default function EventImageCard({ url, comment }:Props) {
  return (
    <Card
      className="w-[320px] bg-gray-900"
    >
      <CardContent className="flex flex-col">
        <Image
          src={url}
          alt={comment ?? "思い出の画像"}
          width={300}
          height={200}
          className="rounded"
        />
        <div className="flex items-center gap-2">
          <ChatBubbleIcon
            className="mt-3 text-white"
          />
          <p className="mt-2 text-white">{comment}</p>
        </div>
      </CardContent>
    </Card>
  )
}

