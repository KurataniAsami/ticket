import Image from "next/image"

type Props = {
  url: string
}

export default function TicketImage({ url }: Props) {
  console.log(url)
  if (!url) return null
  return (
    <div>
        <Image
          src={url}
          alt="チケット画像"
          width={40}
          height={20}
        />
      </div>
  )
}
