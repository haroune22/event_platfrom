import { type Dispatch, type SetStateAction } from "react"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ChevronDownIcon } from "lucide-react"
import { format } from "date-fns"

type EventFieldsProps = {
  eventDate: string
  setEventDate: Dispatch<SetStateAction<string>>
  maxParticipants: number
  setMaxParticipants: Dispatch<SetStateAction<number>>
}

const EventFields = ({
  eventDate,
  setEventDate,
  maxParticipants,
  setMaxParticipants,
}: EventFieldsProps) => {
  return (
    <>
      <div className="rounded-xl border border-blue-100 bg-blue-50/40 p-5">
        <h3 className="mb-4 font-semibold text-blue-700">📅 Event Details</h3>
        <p className="text-sm text-orange-600">
          Create an event with a date and participant limit.
        </p>
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-53 justify-between text-left font-normal"
          >
            {eventDate ? (
              format(new Date(eventDate), "PPP")
            ) : (
              <span>Pick a date</span>
            )}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          align="start"
          className="z-50 w-auto rounded-xl border bg-white p-0 shadow-xl"
        >
          <Calendar
            mode="single"
            selected={eventDate ? new Date(eventDate) : undefined}
            onSelect={(date) => {
              if (date) {
                setEventDate(date.toISOString())
              }
            }}
          />
        </PopoverContent>
      </Popover>

      <div className="flex items-center gap-4">
        <Label className="text-md font-medium text-gray-700">
          Max participants:
        </Label>

        <Input
          type="number"
          min={1}
          max={1000}
          value={maxParticipants}
          onChange={(e) =>
            setMaxParticipants(Number(e.target.value))
          }
          className="h-10 max-w-24 border-gray-300"
        />
      </div>
    </>
  )
}

export default EventFields
