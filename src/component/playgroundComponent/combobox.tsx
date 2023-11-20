
import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useFrappeGetDocList } from "frappe-react-sdk"




interface ComboboxProps extends React.FormHTMLAttributes<HTMLFormElement> { data : string, default : string}

export function ComboboxDemo({...props}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState<any>()
  const {data} = useFrappeGetDocList(props.data,{fields : ['*'], limit : 200})

  React.useEffect(() => {
    if(value && props.onChange)
    {

      props.onChange(value)
    }
  },[value, props.onChange,props.default])

  React.useEffect(() => {
    if(props.default && data)
    {
      setValue(data.find((framework ) => framework.name === props.default))
    }
  },[props.default, data])



  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? data?.find((framework ) => framework === value)?.full_name
            : "Select framework..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {data?.map((framework) => (
              <CommandItem
                key={framework.name}
                value={framework.full_name}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? currentValue : framework)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === framework ? "opacity-100" : "opacity-0"
                  )}
                />
                {framework.full_name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
