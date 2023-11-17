

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
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"
import { PostContext } from "@/provider/postProvider"
import { useContext, useEffect } from "react"

export function DatePicker({mode} : {mode : string} ) {
  const [date, setDate] = React.useState<Date>()
  const postContext = useContext(PostContext);


    
  

  useEffect(() => {
    if(sessionStorage.getItem('date'))
    {
      setDate(new Date(sessionStorage.getItem('date')!))
    }
  },[])

  useEffect(() => {
    if(postContext.data?.published_on)
    {
      
      setDate(new Date(postContext.data.published_on))
    
    }
  },[postContext.data?.blog_category])

  useEffect(() => {
    if(date)
    {
      const newDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
      postContext.ChangeObject(undefined,`publish_date`,newDate)
      sessionStorage.setItem('date',newDate)
    }
  },[date])


  return (
    <div className="grid gap-2">
        <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <h1>Publish Date</h1>
        </HoverCardTrigger>
        <HoverCardContent
          align="start"
          className="w-[260px] text-sm"
          side="left"
        >
          The model which will generate the completion. Some models are suitable
          for natural language tasks, others specialize in code. Learn more.
        </HoverCardContent>
      </HoverCard>
    <Popover>
      <PopoverTrigger asChild >
        <Button
          disabled={mode == 'view' ? true : false}
          variant={"outline"}
          className={cn(
            " flex items-center felx-grow justify-between w-[175px]",
            !date && "text-muted-foreground"
          )}
        >
          {date ? format(date, "PPP") : <span>Pick a date</span>}
          <CalendarIcon className="mr-2 h-4 w-4" />
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
    </div>
  )
}
