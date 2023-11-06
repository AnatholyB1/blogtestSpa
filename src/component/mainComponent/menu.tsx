
import {
    Menubar,
  } from "@/components/ui/menubar"

  import { UserNav } from "./user-nav"
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
  import { TabContext } from "@/provider/tabProvider"
  import { useContext } from "react"

  
  export function Menu() {
    const tab = useContext(TabContext)
    return (
      <Menubar className="rounded-none border-b border-none flex h-13 px-4 justify-between items-center self-stretch">
        <div className="flex items-center gap-2">
        <Avatar className="rounded-none">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <h2 className="text-gray-700 font-inter text-base font-medium leading-5">{`Zaviago/${tab.variable ? tab.variable : 'loading'}`}</h2>
        </div>
        <div className="flex items-center space-x-4"> <UserNav></UserNav></div>
      </Menubar>
    )
  }