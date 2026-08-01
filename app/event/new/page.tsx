import { EventFormProvider } from "@/app/providers/EventFormProvider"
import CreateEventContent from "@/app/components/CreateEventContent"

export default function EventCreatePage() {
  // 思い出画像の削除モーダル

  return (
    <div className="mt-5">
      <EventFormProvider>
        <CreateEventContent/>
      </EventFormProvider>
    </div>
  )
}

// npm install uuid