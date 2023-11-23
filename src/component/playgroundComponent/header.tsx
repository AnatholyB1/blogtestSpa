
import { cn } from "@/lib/utils"
import { useContext } from "react"
import { TabContext } from "@/provider/tabProvider"
import { Bell, ChevronDown, Search } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import ZaviagoIcon from "@/public/zaviagoIcon"
import { BellIcon, LightningBoltIcon } from "@radix-ui/react-icons"
import HelpMenu from "./header/helpMenu"
import AvatarMenu from "./header/avatarMenu"
import UpgradeProModal from "./header/upgradeProModal"

export default function Header ({className} : {className ?: string}) {
    const tab = useContext(TabContext)
    return ( 
      <div className={cn(className,'font-inter h-12 px-7')}>
        <div className="flex flex-row items-center gap-[8px]">
            <span className="text-[#18181B] font-Inter font-medium text-[14px] leading-[20px]">{tab.variable}</span>
        </div>
        <div className="flex flex-row items-center space-x-3">
            <div className="flex px-[2px] items-center pr-6">
                <div className="flex items-center">
                  <UpgradeProModal />
                  <div className="space-x-5 flex items-center">
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

                    <BellIcon color='#7D7D7D' width='21' height='21'/>
                  </div>
                </div>
            </div>
            <Separator orientation="vertical" className="h-6 m-[0!important]"/>

            <HelpMenu />

            <AvatarMenu />
        </div>
    </div>)
}