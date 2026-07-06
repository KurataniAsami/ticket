import RestoreIcon from '@mui/icons-material/Restore';
import MicIcon from '@mui/icons-material/Mic';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export const SidebarData = [
  {
    title: "過去のライブ",
    icon: <RestoreIcon/>,
    link: "/event/history"
  },
  {
    title: "アーティスト一覧",
    icon: <MicIcon/>,
    link: "/artist"
  },
  {
    title: "会場一覧",
    icon: <LocationOnIcon/>,
    link: "/"
  },
  {
    title: "カレンダー",
    icon: <CalendarMonthIcon/>,
    link: "/"
  },
]

// /api/event?sort=asc