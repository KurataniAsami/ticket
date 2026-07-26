import Image from 'next/image';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import {
  Card,
  CardContent,
} from "@/components/ui/card"

type Props = {
  url: string
  comment?: string | null
  memoryImageUrl?: string[]
  width: number
  height: number
  onClick?: () => void
  cardWidth?: string   // 詳細ページのみ大きさ変える
  ShowComment?: boolean  // 作成ページと詳細ページのみ、画像コメント表示
}

export default function MemoryImageCard({
    url,
    comment,
    width = 200,
    height = 200,
    onClick,
    cardWidth = "w-auto",
    ShowComment   // 作成ページと詳細ページのみ、画像コメント表示
  }:Props) {

  return (
    <Card
      className={`${cardWidth} bg-gray-900 my-2`}
    >
      <CardContent className="flex flex-col">
        <Image
          src={url}
          alt={comment ?? "思い出の画像"}
          width={width}
          height={height}
          className="rounded"
          onClick={onClick}
        />
        
        {ShowComment && (
          <div className="flex items-center gap-2">
          <ChatBubbleIcon
            className="mt-3 text-white"
          />
          <p className="mt-2 text-white">{comment}</p>
        </div>
        )}
      </CardContent>
    </Card>
  )
}

