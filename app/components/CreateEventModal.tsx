import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog"
import CreateEventForm from "./CreateEventForm"

type EventCreateModalProps = {
  open: boolean
  onClose: () => void
}

export default function CreateEventModal({
  open,
  onClose,
}: EventCreateModalProps) {
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
              <CreateEventForm
                textColor="text-white"
              />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}