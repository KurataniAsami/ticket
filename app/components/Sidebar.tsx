import Link from "next/link"
import { SidebarData } from "./SidebarData"
import SidebarIcon from "./SidebarIcon"

export default function Sidebar() {
  return (
    <div className="min-h-screen border-r border-gray-800 m-5 pr-5">
      <div>
        <SidebarIcon/>
      </div>
      <ul className="h-auto mt-5">
        {SidebarData.map((value, key) => (
          <li
            key={key}
            className="w-full h-[50px]"
          >
            <Link
              href={value.link}
              className="
                flex items-center gap-3 cursor-pointer px-4 py-3 rounded-xl
                 hover:bg-gray-600"
                //  px-4 py-3 rounded-xlでホバーの範囲を拡大
            >
              <div>{value.icon}</div>
              <div>{value.title}</div>
            </Link>

          </li>
        ))}
      </ul>
    </div>
  )
}