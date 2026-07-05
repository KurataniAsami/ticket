// 今年度の過去のライブ一覧へリダイレクト
import { redirect } from "next/navigation";

export default function HistoryPage() {
  const currentYear = new Date().getFullYear()

  redirect(`/event/history/${currentYear}`)
}
