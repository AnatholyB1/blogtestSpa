

import * as React from "react"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { UserType} from "typing"
import { useFrappeGetDocList } from "frappe-react-sdk"
import { PostContext } from "@/provider/postProvider"
import { useContext, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import NewBlogger from "./newBlogger"
import { BloggerContext } from "@/provider/BloggerProvider"



export function WriterSelector({mode} : {mode : string} ) {
  const [open, setOpen] = React.useState(false)
  const [selectedModel, setSelectedModel] = React.useState<UserType>()
  const postContext = useContext(PostContext);
  const bloggerContext = useContext(BloggerContext);
  const {data, mutate} = useFrappeGetDocList<UserType>('Blogger',{fields : [
  'name',
  'full_name'
   ],limit:200} )
   const [dialogOpen, setDialogOpen] = React.useState(false);

   useEffect(() => {
    if(dialogOpen)
    {
      sessionStorage.removeItem('blogger')
    }else{
      mutate()
    }
  }, [dialogOpen,sessionStorage.getItem('blogger')]);

  useEffect(() => {
    if(sessionStorage.getItem('blogger'))
    {
      setSelectedModel(JSON.parse(sessionStorage.getItem('blogger')!))
    }
  },[])

  useEffect(() => {
    if(typeof bloggerContext.data != 'undefined')
    {
      setSelectedModel(bloggerContext.data)
    }
  },[bloggerContext.data])



  useEffect(() => {
    if(selectedModel)
    {
      postContext.ChangeObject(undefined,'writer',selectedModel.name)
      sessionStorage.setItem('blogger',JSON.stringify(selectedModel))
    }
  },[selectedModel])


  useEffect(() => {
    if(postContext.data?.blogger)
    {
      
      setSelectedModel(data?.filter((item) => item.name === postContext.data?.blogger)[0])
      sessionStorage.setItem('blogger',JSON.stringify(data?.filter((item) => item.name === postContext.data?.blogger)[0]))
    }
  },[postContext.data?.blogger])
  //use commandGroup tu categorise category in group
  return (
    <div className="grid gap-2">
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <h1>Writter</h1>
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
      <Popover open={open} onOpenChange={setOpen} >
        <PopoverTrigger asChild>
          <Button
            disabled={mode == 'view' ? true : false} 
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a model"
            className="flex flex-row justify-between"
          >
            {selectedModel ? selectedModel.full_name : "Select a blogger..."}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-[250px] p-0">
          <HoverCard>
            <Command loop>
              <CommandList className="h-[var(--cmdk-list-height)] max-h-[400px]">
                <CommandInput placeholder="Search Models..." />
                <CommandEmpty>No users found.</CommandEmpty>
                <HoverCardTrigger />
                {data?.map((type) => (
                  <ModelItem
                    key={type.full_name}
                    model={type}
                    isSelected={selectedModel?.full_name === type.full_name}
                    onSelect={() => {
                      setSelectedModel(type)
                      setOpen(false)
                    }}
                  />
                ))}
              </CommandList>
            </Command>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen} >
              <DialogTrigger>
                <Button variant="ghost" className="w-full"  >New Blogger</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Blogger</DialogTitle>
                  <DialogDescription>
                    Create a new blogger
                  </DialogDescription>
                </DialogHeader>
                  <NewBlogger custom></NewBlogger>
                <DialogFooter>
                  <Button onClick={() => {bloggerContext.changeSubmit(true)}} type="submit">Save changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </HoverCard>
        </PopoverContent>
      </Popover>
    </div>
  )
}

interface ModelItemProps {
  model: UserType
  isSelected: boolean
  onSelect: () => void
}

function ModelItem({ model, isSelected, onSelect }: ModelItemProps) {
  const ref = React.useRef<HTMLDivElement>(null)

  return (
    <CommandItem
      key={model.full_name}
      onSelect={onSelect}
      ref={ref}
      className="aria-selected:bg-primary aria-selected:text-primary-foreground"
    >
      {model.full_name}
      <CheckIcon
        className={cn(
          "ml-auto h-4 w-4",
          isSelected ? "opacity-100" : "opacity-0"
        )}
      />
    </CommandItem>
  )
}