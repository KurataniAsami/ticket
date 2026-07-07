import { EventList } from "../types/event";

// アーティスト別のライブを取得する
// アーティストが複数存在する可能性があるので[], fillterで複数抽出
// toLowerCase: 文字列をすべて小文字に変換するメソッド
// export function getEventsByArtist(artist: string):EventList[] {
//   return event.filter((e) => e.artist.toLowerCase() === artist.toLowerCase())
// }

// 年のライブ情報を取得する、戻り値はEventList[]
// month.padStart(2,"0")は文字列monthを左側から0で埋めて2桁にするメソッド, 1月→01
// export async function getEventsByYearMonth(year: string, month: string):EventList[] {
//   const events: EventList[] = await res.json()

//   // 2025/08...OK
//   // 2025/8...OKにしたい
//   // 0埋めする
//   // yearと結合 2025-01のような文字列を作る
//   // post.date.substring(0,7)はdateの最初の7文字を切り出している
//   // yearMonth と一致するものだけを filter で抽出
//   const yearMonth = `${year} - ${month.padStart(2,"0")}`;

//   const monthEvents = events.filter((event) => {
//     return event.eventDate.startsWith(yearMonth)
//   })
// }

