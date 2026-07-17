import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog"
import TicketImage from "./TicketImage"

type ImageModalProps = {
  open: boolean
  onClose: () => void
  ticketImageUrl: string | null
}

export default function ImageModal({
  open,
  onClose,
  ticketImageUrl,
}: ImageModalProps) {

  return (
    <div>
      <Dialog
        open={open}
        onOpenChange={onClose}
      >
        <DialogContent
          className="max-h-[90vh] pt-8  overflow-hidden overflow-y-auto bg-gray-800"
        >
          <div className="flex justify-center items-center">
            <TicketImage
              url={ticketImageUrl ?? ""}
              width={300}
              height={300}
            />
          </div>
          <DialogHeader className="text-gray-400">
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}