import Image from 'next/image';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import CloseIcon from '@mui/icons-material/Close';
import MemoryDeleteModal from './MemoryDeleteModal';

type Props = {
  url: string
  comment?: string | null
  setComment?: React.Dispatch<React.SetStateAction<string>>
  onCommentChange?: (value: string) => void
  memoryImageUrl?: string[]
  width: number
  height: number
  textColor?: string
  onClick?: () => void
  cardWidth?: string   // 詳細ページのみ大きさ変える
  ShowCommentForm?: boolean  // 作成ページと詳細ページのみ、画像コメント表示
  CommnetText?: boolean
  CloseButton: boolean
}

export default function MemoryImageCard({
    url,
    comment,
    onCommentChange,
    width = 200,
    height = 200,
    onClick,
    textColor,
    ShowCommentForm,
    CommnetText,
    cardWidth = "w-auto",
    CloseButton
  }:Props) {

  return (
    <Card
      className={`${cardWidth} bg-gray-900 my-2`}
    >
      <CardContent className="flex flex-col">
        
        {CloseButton && (
          <div>
            <div className='flex justify-end'>
              <CloseIcon
                className='text-red-500'
                onClick = {() => setIsMemoryDeletOpen(true)}  
              />
            </div>

            <MemoryDeleteModal
              open={isMemoryDeleteOpen}
              onDelete={handleMemoryDelete}
            />
          </div>
        )}
        
        
        <Image
          src={url}
          alt={comment ?? "思い出の画像"}
          width={width}
          height={height}
          className="rounded"
          onClick={onClick}
        />
        
        {ShowCommentForm && (
          <div className="flex flex-col gap-2">
            <div className='flex items-center gap-1'>
            <ChatBubbleIcon
              className="mt-3 text-white"
            />
            <label className={`text-gray-400 text-sm mt-2 ${textColor}`}>
              コメント<span className="text-gray-300 ml-1">(任意)</span>
            </label>
            </div>

            <textarea
              value={comment ?? ""}
              onChange={(e) => onCommentChange?.(e.target.value)}
              placeholder="コメントを入力（任意）"
              className={`bg-slate-900 border border-gray-600 rounded p-1.5 text-white
                focus:outline focus:outline-green-400
              `}
            />
          </div>
        )}

        {CommnetText && (
          <div>
            <ChatBubbleIcon
              className="mt-3 text-white"
            />
          <p className="mt-2 text-white">{comment ?? ""}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

