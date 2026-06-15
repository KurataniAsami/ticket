import Link from "next/link";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="">
        <div className="flex justify-center gap-5 bg-gray-200 py-3">
          <Link href={"./"}>全て</Link>  
          <Link href={"./"}>アーティスト / 会場別</Link>  
          <Link href={"./"}>カレンダー</Link>  
        </div>      
        {children}
      </body>
    </html>
  );
}
