
import { cn } from "@/lib/utils"
import { useContext } from "react"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import { TabContext } from "@/provider/tabProvider"
import { Bell, ChevronDown } from "lucide-react"
import { Separator } from "@/components/ui/separator"
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
    <div className={cn(className,'')}>
        <div className="flex flex-row items-center gap-[8px]">
            <Avatar >
                <AvatarImage  src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="text-[#18181B] font-Inter font-medium text-[14px] leading-[20px]">Zaviago / {tab.variable}</span>
        </div>
        <div  className="flex flex-row items-center space-x-4">
            <div className="flex px-[2px] items-center space-x-4">
                <div className="flex items-center gap-[3px]">
                    <button className="flex h-[36px] w-[130px] px-[2px] justify-center items-center gap-4 rounded-mb bg-white">
                        <LightningBoltIcon className="text-[#006AFF] w-4 h-4"/>
                        <span className="text-[#006AFF] font-Inter text-[12px] font-normal leading-[20px]">Upgrade to Pro</span>
                    </button>
                    <Separator orientation="vertical" ></Separator>
                    <div className="flex w-[320px] min-h-[40px] h-[40px] py-2 px-4 items-center gap-3 rounded-md bg-[#F4F4F5]">
                        <ZaviagoIcon></ZaviagoIcon>
                        <input id='search' className="outline-none focus:border-0 bg-[#F4F4F5]" type="text" placeholder="Search or type a command" />
                        <span className="text-[#71717A] w-[70px] h-[20px]  font-Inter text-[12px] font-normal leading-[20px]">(CTRL + G)</span>
                    </div>
                </div>
                <Bell className="h-4 w-4 stroke-1"></Bell>
            </div>
            <Separator orientation="vertical" ></Separator>
            <DropdownMenu>
            <DropdownMenuTrigger className="flex h-[36px] py-2 px-4 justify-center items-center gap-2"><span className="text-[#18181B] font-Inter text-[12px] font-normal leading-[20px]">Help</span><ChevronDown className="w-4 h-4 stroke-1"></ChevronDown></DropdownMenuTrigger>
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
            <DropdownMenuTrigger>            
                <Avatar >
                    <AvatarImage  src="https://github.com/shadcn.png" />
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