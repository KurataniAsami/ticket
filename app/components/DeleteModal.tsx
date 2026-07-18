'use client'

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

export default function DeleteModal({
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
            イベントを削除しますか？
          </AlertDialogTitle>

          <AlertDialogDescription>
            削除したイベントは元に戻せません。
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



