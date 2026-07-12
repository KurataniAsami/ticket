// 今年度の過去のライブ一覧へリダイレクト
import { redirect } from "next/navigation";

export default function HistoryPage() {
  // 現在の年を取得して currentYear に代入する
  const currentYear = new Date().getFullYear()

  redirect(`/event/history/${currentYear}`)
}
