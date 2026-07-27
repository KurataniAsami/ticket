import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

type Props = {
  open: boolean
  onClose: () => void
  onDelete: () => void
}

export default function MemoryDeleteModal({
  open,
  onClose,
  onDelete,
}: Props) {

  return (
    <AlertDialog
      open={open}
      onOpenChange={onClose}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            アルバムを削除しますか？
          </AlertDialogTitle>

          <AlertDialogDescription>
            削除したアルバムは元に戻せません。
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>
            キャンセル
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={onDelete}
          >
            削除
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}



