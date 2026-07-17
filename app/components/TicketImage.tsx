import Image from "next/image"

type Props = {
  url: string
  width: number
  height: number
  onClick?: () => void   // modal
}

export default function TicketImage({
    url,
    width = 200,
    height = 200,
    onClick   // modal
  }: Props) {
  if (!url) return null

  return (
    <div>
        <Image
          src={url}
          alt="チケット画像"
          width={width}
          height={height}

          // modal
          onClick={onClick}  
          className="cursor-pointer"
        />
      </div>
  )
}
