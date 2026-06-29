import { useState } from "react"
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

const EventFields = () => {
  const [date, setDate] = useState<Date>()

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
            data-empty={!date}
            className="data-[empty=true]:text-muted-foreground w-53 justify-between text-left font-normal"
          >
            {date ? format(date, "PPP") : <span>Pick a date</span>}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="z-50 w-auto rounded-xl border bg-white p-0 shadow-xl"
        >
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            defaultMonth={date}
          />
        </PopoverContent>
      </Popover>
      <div className="flex gap-4">
        <Label className="text-md font-medium text-gray-700">
          Max participants:
        </Label>
        <Input
          max={20}
          min={1}
          defaultValue={1}
          type="number"
          className="h-10 max-w-20 border-gray-300 focus-visible:ring-2 focus-visible:ring-blue-500"
        />
      </div>
    </>
  )
}

export default EventFields
