
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuShortcut,
  } from "@/components/ui/dropdown-menu"
  import { Button } from "@/components/ui/button"
  import { ChevronDown, FolderTree, Check, PlayCircle, PlusCircle, LifeBuoy, Settings } from "lucide-react"
  
export default function MoreActionsComponent () {
    return (
        <DropdownMenu>
        <DropdownMenuTrigger>
            <Button variant={'secondary'} className="h-[40px] w-[160px] flex gap-[8px] justify-center items-center"><span>More Actions</span><ChevronDown className="w-4 h-4 stroke-1"></ChevronDown></Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[256px]">
            <DropdownMenuItem><PlusCircle className="w-4 h-4 stroke-1 mr-2"></PlusCircle>Create post<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut></DropdownMenuItem>
            <DropdownMenuItem><FolderTree className="w-4 h-4 stroke-1 mr-2"></FolderTree>Create Category<DropdownMenuShortcut>⌘B</DropdownMenuShortcut></DropdownMenuItem>
            <DropdownMenuItem><Check className="w-4 h-4 stroke-1 mr-2"></Check>Add Writer<DropdownMenuShortcut>⌘S</DropdownMenuShortcut></DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem><PlayCircle className="w-4 h-4 stroke-1 mr-2"></PlayCircle>Video Tutorial</DropdownMenuItem>
            <DropdownMenuItem><LifeBuoy className="w-4 h-4 stroke-1 mr-2"></LifeBuoy>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem><Settings className="w-4 h-4 stroke-1 mr-2"></Settings>Blog settings<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut></DropdownMenuItem>
        </DropdownMenuContent>
        </DropdownMenu>
    )
}

