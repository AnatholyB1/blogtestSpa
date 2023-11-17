
import { cn } from "@/lib/utils"
import { useContext } from "react"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import { TabContext } from "@/provider/tabProvider"
import { Bell, ChevronDown, Search } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from "@/components/ui/command"
import ZaviagoIcon from "@/public/zaviagoIcon"
import { LightningBoltIcon } from "@radix-ui/react-icons"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"


export default function Header ({className} : {className ?: string}) {
    const tab = useContext(TabContext)
    return ( 
    <div className={cn(className,'font-inter h-12 px-7')}>
        <div className="flex flex-row items-center gap-[8px]">
            <span className="text-[#18181B] font-Inter font-medium text-[14px] leading-[20px]">{tab.variable}</span>
        </div>
        <div  className="flex flex-row items-center space-x-4">
            <div className="flex px-[2px] items-center space-x-4">
                <div className="flex items-center gap-[3px]">
                    <button className="flex h-[36px] w-[130px] px-[2px] justify-center items-center gap-4 rounded-mb bg-white">
                        <LightningBoltIcon className="text-[#006AFF] w-4 h-4"/>
                        <span className="text-[#006AFF] font-Inter text-[12px] font-normal leading-[20px]">Upgrade to Pro</span>
                    </button>
                    <Separator orientation="vertical" ></Separator>
                    <Dialog>
                    <DialogTrigger className='bg-zinc-100 rounded-md px-2 py-[6px] text-[13px] h-7 flex items-center w-[300px] text-zinc-500 tracking-[0.02em] gap-x-[9px] leading-5'>
                        <Search viewBox='0 0 24 24' width='14' height='14' className='ml-1'/>
                        Search or type a command (Ctrl + G)
                    </DialogTrigger>
                    <DialogContent className='p-0'>
                        <Command>
                        <CommandInput placeholder="Type a command or search..." />
                        <CommandList>
                            <CommandEmpty>No results found.</CommandEmpty>
                            <CommandGroup heading="Suggestions">
                            <CommandItem>Calendar</CommandItem>
                            <CommandItem>Search Emoji</CommandItem>
                            <CommandItem>Calculator</CommandItem>
                            </CommandGroup>
                            <CommandSeparator />
                            <CommandGroup heading="Settings">
                            <CommandItem>Profile</CommandItem>
                            <CommandItem>Billing</CommandItem>
                            <CommandItem>Settings</CommandItem>
                            </CommandGroup>
                        </CommandList>
                        </Command>
                    </DialogContent>
                    </Dialog>
                </div>
                <Bell className="h-4 w-4 stroke-1"></Bell>
            </div>
            <Separator orientation="vertical" className="h-6"/>
            <DropdownMenu>
              <DropdownMenuTrigger className="m-[0!important] flex h-[36px] py-2 px-4 justify-center items-center gap-2"><span className="text-[#18181B] font-Inter text-[12px] font-normal leading-[20px]">Help</span><ChevronDown className="w-4 h-4 stroke-1"></ChevronDown></DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger className="m-[0!important]">            
                <Avatar className="h-7 w-7">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        </div>
    </div>)
}