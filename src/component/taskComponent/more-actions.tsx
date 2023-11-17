
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
import { Link } from "react-router-dom"
import { AlertComingSoon } from "./coming-soon"
import { useState } from "react"
import { CustomType } from "./coming-soon"
  
const object : CustomType = {
    title : 'Coming Soon',
    description : 'Stay tuned for a groundbreaking release – our upcoming product is set to revolutionize the way you engage with our platform.',
    button : 'Okay'
}

export default function MoreActionsComponent () {
    const [open, setOpen] = useState(false)
    return (
        <>
        <AlertComingSoon open={open}  custom={object}></AlertComingSoon>
        <DropdownMenu>
        <DropdownMenuTrigger>
            <Button variant={'secondary'} className=" flex gap-[8px] justify-center items-center"><span>More Actions</span><ChevronDown className="w-4 h-4 stroke-1"></ChevronDown></Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[256px]">
            <DropdownMenuItem><Link className="flex flex-row items-center" to="newPost"><PlusCircle className="w-4 h-4 stroke-1 mr-2"></PlusCircle>Create post</Link><DropdownMenuShortcut>⇧P</DropdownMenuShortcut></DropdownMenuItem>
            <DropdownMenuItem><Link className="flex flex-row  items-center" to={'newCategories'}><FolderTree className="w-4 h-4 stroke-1 mr-2"></FolderTree>Create Category</Link><DropdownMenuShortcut>⇧C</DropdownMenuShortcut></DropdownMenuItem>
            <DropdownMenuItem><Link className="flex flex-row  items-center" to={'newBlogger'}><Check className="w-4 h-4 stroke-1 mr-2"></Check>Add Writer</Link><DropdownMenuShortcut>⇧W</DropdownMenuShortcut></DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setOpen(!open)} ><PlayCircle className="w-4 h-4 stroke-1 mr-2"></PlayCircle>Video Tutorial</DropdownMenuItem>
            <DropdownMenuItem><Link className="flex flex-row  items-center" to='https://lin.ee/XezeGPa'><LifeBuoy className="w-4 h-4 stroke-1 mr-2"></LifeBuoy>Support</Link></DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setOpen(!open)} ><Settings className="w-4 h-4 stroke-1 mr-2"></Settings>Blog settings</DropdownMenuItem>
        </DropdownMenuContent>
        </DropdownMenu>
        </>
    )
}

