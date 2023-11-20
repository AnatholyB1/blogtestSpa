
"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


interface DatePickerProps extends React.FormHTMLAttributes<HTMLFormElement> {  default : string, onDateSelected? : (date : Date) => void}

export function DatePickerDemo({...props}: DatePickerProps) {
  const [date, setDate] = React.useState<Date>()
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    if(props.default)
    {
      console.log(props.default)
      setDate(new Date(props.default))
      console.log(new Date(props.default))
    }
  },[props.default])

  React.useEffect(() => {
    if(date)
    {

      props.onDateSelected!(date)
    }
  },[date, props.onChange])

  return (
    <Popover  open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[200px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}






