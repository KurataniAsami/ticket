'use client'
import { EventFormProvider } from "@/app/providers/EventFormProvider"
import EditEventContent from "@/app/components/EditEventContent"

export default function EditEventPage() {
  
   return (
    <EventFormProvider>
      <EditEventContent/>
    </EventFormProvider>
  )
}
