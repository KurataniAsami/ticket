'use client'

import { useState } from "react"
import EventForm from "./EventForm"
import { useEventFormContext } from "@/contexts/EventFormContext"
import { EventFormProvider } from "../providers/EventFormProvider"
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog"

type EventCreateModalProps = {
  selectedImage: string | null
  setSelectedImage: React.Dispatch<React.SetStateAction<string | null>>

  isMemoryDeleteOpen: boolean
  setIsMemoryDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>

  textColor?: string   // modal
  SubmitButton?: boolean   // 作成ページのみボタン表示
  editMessage?: string  // editページのみ、テキスト挿入
  ShowCommentForm?: boolean
  CloseButton? : boolean
  onClose: () => void
  open: boolean
}

export default function CreateEventModal({
  open,
  onClose,
  isMemoryDeleteOpen,
  setIsMemoryDeleteOpen,
}: EventCreateModalProps) {

  const {
    memoryImages,
    setMemoryImages,
  } = useEventFormContext()

  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <div>
      <Dialog
        open={open}
        onOpenChange={onClose}
      >
        <DialogContent
          className="max-h-[90vh] overflow-y-auto bg-gray-800"
        >
          <DialogHeader className="text-gray-400">
            <EventFormProvider>
              <EventForm
                textColor="text-white"
                memoryImages={memoryImages}
                setMemoryImages={setMemoryImages}
                isMemoryDeleteOpen={isMemoryDeleteOpen}
                setIsMemoryDeleteOpen={setIsMemoryDeleteOpen}
                SubmitButton={true}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
              />
            </EventFormProvider>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}