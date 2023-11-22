import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from "@/components/ui/command"
import { BadgeInfo, BookCopy, ChevronDown, ClipboardList, Info, MessageCircle, Zap, User, Keyboard, Layout, LogOut, Search, BadgeHelp } from 'lucide-react'
import { useState } from 'react'

export default function HelpMenu(){
  return (
    <Popover>
      <PopoverTrigger className='text-[13px] w-[45px] flex justify-between items-center'>
        Help
        <ChevronDown viewBox='0 0 24 24' width='14' height='14' strokeWidth='1'/>
      </PopoverTrigger>
      <PopoverContent className='p-0 w-[243px]'>
        <Command>
          <CommandList>
            <CommandGroup>
              <CommandItem onSelect={() => window.location.href = "https://zaviago-platform-doc.vercel.app/"}>
                <BookCopy viewBox='0 0 24 24' width='16' height='16' className='mr-2'/>
                Documentation
              </CommandItem>
              <CommandItem>
                <MessageCircle viewBox='0 0 24 24' width='16' height='16' className='mr-2'/>
                User forum
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup>
              <CommandItem>
                <ClipboardList viewBox='0 0 24 24' width='16' height='16' className='mr-2'/>
                Report an Issue
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup>
              <CommandItem>
                <Info viewBox='0 0 24 24' width='16' height='16' className='mr-2'/>
                About
              </CommandItem>
              <CommandItem>
                <BadgeHelp viewBox='0 0 24 24' width='16' height='16' className='mr-2'/>
                Support
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}