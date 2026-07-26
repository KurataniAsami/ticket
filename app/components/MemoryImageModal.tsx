'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog"
import MemoryImageCard from "./MemoryImageCard"

type MemoryImageModalProps = {
  open: boolean
  onClose: () => void
  selectedImage: string | null
  ShowComment: boolean
}

export default function MemoryImageModal({
  open,
  onClose,
  selectedImage,
  ShowComment
}: MemoryImageModalProps) {
  
  return (
    <div>
      <Dialog
        open={open}
        onOpenChange={onClose}
      >
        <DialogContent
          className="max-h-[90vh]   overflow-hidden overflow-y-auto bg-gray-900"
        >
          <div className="flex flex-wrap gap-4 justify-center">
            {selectedImage && (
              <MemoryImageCard
                url={selectedImage}
                width={300}
                height={300}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}