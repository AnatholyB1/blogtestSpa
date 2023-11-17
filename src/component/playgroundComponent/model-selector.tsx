

import * as React from "react"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"


import { cn } from "@/lib/utils"
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
import { Category} from "typing"
import { useFrappeGetDocList } from "frappe-react-sdk"
import { PostContext } from "@/provider/postProvider"
import { useContext, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import NewCategory from "./newCategories"
import { CategoryContext } from "@/provider/categoryProvider"


export function ModelSelector({mode} : {mode : string} ) {
  const [open, setOpen] = React.useState(false)
  const [selectedModel, setSelectedModel] = React.useState<Category>()
  const categoryContext = useContext(CategoryContext)
  const {data, mutate } = useFrappeGetDocList<Category>('Blog Category',{fields : [ 'title',
  'name',
  'published'
   ],limit : 200} )
  const postContext = useContext(PostContext);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  useEffect(() => {
    if(!dialogOpen)
    {
      mutate()
    }
  }, [dialogOpen,sessionStorage.getItem('category')]);

  useEffect(() => {
    if(sessionStorage.getItem('category'))
    {
      setSelectedModel(JSON.parse(sessionStorage.getItem('category')!))
    }
  },[])

  useEffect(() => {
    if(typeof categoryContext.data != 'undefined')
    {
      setSelectedModel(categoryContext.data)
    }
  },[categoryContext.data])



  useEffect(() => {
    if(selectedModel)
    {
      postContext.ChangeObject(undefined,'category',selectedModel.name)
      sessionStorage.setItem('category',JSON.stringify(selectedModel))
    }
  },[selectedModel])


  useEffect(() => {
    if(postContext.data?.blog_category)
    {
      
      setSelectedModel(data?.filter((item) => item.name === postContext.data?.blog_category)[0])
    
    }
  },[postContext.data?.blog_category])


  //use commandGroup tu categorise category in group
  return (

    <div className="grid gap-2">
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <h1 >Category</h1>
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
            className="w-[175px] justify-between"
          >
            {selectedModel ? selectedModel.title : "Select a model..."}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-[250px] p-0">
          <HoverCard>
            <Command loop>
              <CommandList className="h-[var(--cmdk-list-height)] max-h-[400px]">
                <CommandInput placeholder="Search Models..." />
                <CommandEmpty>No Models found.</CommandEmpty>
                <HoverCardTrigger />
                {data?.map((type) => (
                  <ModelItem
                    key={type.title}
                    model={type}
                    isSelected={selectedModel?.title === type.title}
                    onSelect={() => {
                      setSelectedModel(type)
                      setOpen(false)
                    }}
                  />
                ))}
              </CommandList>
            </Command>
              <Dialog open={dialogOpen}  onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <Button  variant="ghost" className="w-full flex-grow" >New Category</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[400px]" >
                    <DialogHeader>
                      <DialogTitle>Edit Category</DialogTitle>
                    </DialogHeader>
                      <NewCategory ></NewCategory>
                    <DialogFooter style={{justifyContent : "space-between"}}>
                      <Button variant={'outline'} onClick={() => {setDialogOpen(false)}} type={'reset'}>Cancel</Button><Button onClick={() => {categoryContext.changeSubmit(true)}} type="submit">Generate new Category</Button>
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
  model: Category
  isSelected: boolean
  onSelect: () => void
}

function ModelItem({ model, isSelected, onSelect }: ModelItemProps) {
  const ref = React.useRef<HTMLDivElement>(null)

  return (
    <CommandItem
      key={model.title}
      onSelect={onSelect}
      ref={ref}
      className="aria-selected:bg-primary aria-selected:text-primary-foreground"
    >
      {model.title}
      <CheckIcon
        className={cn(
          "ml-auto h-4 w-4",
          isSelected ? "opacity-100" : "opacity-0"
        )}
      />
    </CommandItem>
  )
}