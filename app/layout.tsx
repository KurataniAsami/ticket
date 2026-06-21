import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import Sidebar from "./components/Sidebar";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={cn("font-sans", geist.variable)}>
      <body className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}
