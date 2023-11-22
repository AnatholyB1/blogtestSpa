import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from "@/components/ui/command"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Keyboard, Layout, LogOut } from 'lucide-react'

export default function AvatarMenu(){
  return (
    <Popover>
      <PopoverTrigger>
        <Avatar className='w-7 h-7 text-sm'>
          <AvatarImage src="" />
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className='p-0 w-[243px]'>
        <Command>
          <CommandList>
            <CommandGroup>
              <CommandItem>
                <User viewBox='0 0 24 24' width='16' height='16' className='mr-2'/>
                Account settings
              </CommandItem>
              <CommandItem>
                <Keyboard viewBox='0 0 24 24' width='16' height='16' className='mr-2'/>
                Keyboard shortcuts
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup>
              <CommandItem>
                <Layout viewBox='0 0 24 24' width='16' height='16' className='mr-2'/>
                View website
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup>
              <CommandItem>
                <LogOut viewBox='0 0 24 24' width='16' height='16' className='mr-2'/>
                Logout
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}