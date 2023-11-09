
import { cn } from "@/lib/utils";
import { useContext } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import ZaviagoIcon from "@/public/zaviagoIcon";
  import { Button } from "@/components/ui/button";
  import { ChevronLeft, Search } from "lucide-react";
  import { PlusCircle } from "lucide-react";
import { AnimationContext } from "@/provider/animationProvider";
import { Toggle } from "@/components/ui/toggle"
import { PanelRightClose } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { TextCursorInput } from "lucide-react";
import { PlayCircle } from "lucide-react";
import { BadgeCheck } from "lucide-react";
import { Layout } from "lucide-react";
import { LayoutGrid } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"




  
export default function Sidebar ({className} : {className ? : string}){
    const animation = useContext(AnimationContext)
    return(
        <div className={cn(className,'')}>
            <div className="">
                <div className="inline-flex p-[12px] gap-2 items-start">
                    <Select>
                    <SelectTrigger className="w-[180px] h-[40px] bg-[#F4F4F5]">
                    <ZaviagoIcon></ZaviagoIcon>
                    <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="flex flex-col items-start w-60">
                    <div className="flex h-10 px-3 items-center gap-2 self-stretch border-b border-gray-300">
                        <Search></Search>
                        <input type={'text'} className="flex py-2 px-0 items-center gap-4 text-gray-500 font-inter text-sm leading-5" placeholder="Search app.." ></input>
                    </div>
                    <div className="flex py-1 px-4 flex-col items-start self-stretch">
                        <p className="text-gray-500 font-inter text-xs font-medium leading-4" >Current App</p>
                        <SelectItem  value="Blog / Pages">
                            <div className="flex flex-start gap-2 w-auto">
                            <div className="bg-gradient-to-b from-gray-400 to-gray-800 w-5 h-5 rounded-[50%] inline-block ">
                            </div>
                            <span className="text-gray-900 font-inter text-sm leading-5">
                                Blog / Pages
                            </span>
                            </div>
                        </SelectItem>
                    </div>
                    <div className="flex py-1 px-4 flex-col items-start self-stretch border-b border-gray-300">
                        <p className="text-gray-500 font-inter text-xs font-medium leading-4">Apps</p>
                        <SelectItem  value="Loyalty System">
                        <div className="flex flex-start gap-2 w-auto">
                            <div className="rounded-[50%] bg-gradient-to-b from-blue-400 to-blue-800 w-5 h-5 inline-block"></div>
                            <span className="text-gray-900 font-inter text-sm leading-5 ">Loyalty System </span>
                        </div>
                        </SelectItem>
                        <SelectItem  value="Data Studio">
                        <div className="flex flex-start gap-2 w-auto">
                            <div className="rounded-[50%] bg-gradient-to-b from-green-400 to-green-800 w-5 h-5 inline-block"></div>
                            <span className="text-gray-900 font-inter text-sm leading-5">Data Studio</span>
                        </div>
                        </SelectItem>
                        <SelectItem  value="B2B CRM">
                        <div className="flex flex-start gap-2 w-auto">
                            <div className="rounded-[50%] w-5 h-5 bg-gradient-to-b from-yellow-400 to-yellow-800 inline-block"></div> 
                            <span className="text-gray-900 font-inter text-sm leading-5">B2B CRM</span> 
                        </div>
                        </SelectItem>
                        <SelectItem  value="Commerce">
                        <div className="flex flex-start gap-2 w-auto">
                        <div className="rounded-[50%] w-5 h-5 bg-gradient-to-b from-pink-400 to-pink-800 inline-block"></div> 
                        <span className="text-gray-900 font-inter text-sm leading-5">Commerce</span>
                        </div>
                        </SelectItem>
                    </div>
                    <div className="flex py-1 px-4 flex-col items-start self-stretch">
                        <div className="flex flex-start gap-2 w-full ">
                        <Button variant={'ghost'} onClick={() => animation.toggle('SideApp')}>
                            <PlusCircle className="h-[16px] w-[16px] flex-shrink stroke-1"></PlusCircle>
                            <span className="pl-4 text-gray-900 font-inter text-sm leading-5" >See more Apps</span>
                        </Button>
                        </div>
                    </div>
                    </SelectContent>
                    </Select>
                    <Toggle className="flex w-[40px] h-[40px] min-w-[40px] p-2 justify-center items-center gap-1 self-stretch rounded-md bg-[#F4F4F5]  " onClick={() => animation.toggle('SideBar')}><PanelRightClose className="h-[16px] w-[16px] flex-shrink stroke-1"/></Toggle>
                </div>
                <div className="flex flex-col w-[266px] pl-[12px] pr-[12px] items-center">
                <Tabs defaultValue="account" className="">
                <TabsList className="w-[242px] h-[40px]">
                    <TabsTrigger value="account">Template</TabsTrigger>
                    <TabsTrigger value="password">Items</TabsTrigger>
                </TabsList>
                </Tabs>
                </div>
            </div>
            <div className="flex flex-col p-2 gap-2 items-start self-stretch">
                <h1 className="px-[16px] flex justify-center items-center text-[#797979] font-Inter font-semibold text-[14px] leading-[28px] tracking-wider">Elements</h1>
                <div  className="flex flex-col items-start gap-[12px] self-stretch">
                    <button className="flex h-[36px] py-2 px-4 justify-between items-center self-stretch rounded-md bg-white hover:bg-slate-50" onClick={() => {animation.toggle('ItemSideBar'),animation.sidebarRight && animation.toggle('SideBarRight')}}>
                        <div className="flex items-center gap-2">
                            <div className="flex w-9 h-9 p-2.5 justify-between items-center rounded-md bg-[#F48] shadow-md hover:bg-black">
                                <TextCursorInput className="h-4 w-4 stroke-1 text-white"></TextCursorInput>
                            </div>
                            <p className="text-[#09090B] font-Inter text-[13px] font-normal leading-[20px]">Text</p>
                        </div>
                        {animation.itemSideBar ? <ChevronLeft className="h-4 w-4 stroke-1"/> : <ChevronRight className="h-4 w-4 stroke-1"></ChevronRight>}
                    </button>
                    <button className="flex h-[36px] py-2 px-4 justify-between items-center self-stretch rounded-md bg-white hover:bg-slate-50">
                        <div className="flex items-center gap-2">
                            <div className="flex w-9 h-9 p-2.5 justify-between items-center rounded-md bg-[#F82] shadow-md hover:bg-black">
                                <PlayCircle className="h-4 w-4 stroke-1 text-white"></PlayCircle>
                            </div>
                            <p className="text-[#09090B] font-Inter text-[13px] font-normal leading-[20px]">Media</p>
                        </div>
                        <ChevronRight className="h-4 w-4 stroke-1"></ChevronRight>
                    </button>
                    <button className="flex h-[36px] py-2 px-4 justify-between items-center self-stretch rounded-md bg-white hover:bg-slate-50">
                        <div className="flex items-center gap-2">
                            <div className="flex w-9 h-9 p-2.5 justify-between items-center rounded-md bg-[#4DD] shadow-md hover:bg-black">
                                <BadgeCheck className="h-4 w-4 stroke-1 text-white"></BadgeCheck>
                            </div>
                            <p className="text-[#09090B] font-Inter text-[13px] font-normal leading-[20px]">Icon</p>
                        </div>
                        <ChevronRight className="h-4 w-4 stroke-1"></ChevronRight>
                    </button>
                </div>
            </div>
            <div className="flex flex-col p-2 gap-2 items-start self-stretch">
                <h1 className="flex justify-center items-center px-4 text-[#797979] font-Inter font-semibold text-[14px] leading-[28px] tracking-wide">Pages</h1>
                <div className="flex flex-col items-start gap-1 self-stretch">
                    <button className="flex h-[36px] py-[8px] px-[16px] items-center gap-2 self-stretch rouded-mb bg-white hover:hover:bg-slate-50">
                        <Layout className="w-4 h-4 stroke-1"></Layout>
                        <span className="text-[#09090B] font-Inter text-[13px] font-normal leading-2">Pages</span>
                    </button>
                    <button className="flex h-[36px] py-[8px] px-[16px] items-center gap-2 self-stretch rouded-mb bg-white hover:hover:bg-slate-50">
                        <LayoutGrid className="w-4 h-4 stroke-1"></LayoutGrid>
                        <span className="text-[#09090B] font-Inter text-[13px] font-normal leading-2">System Page</span>
                    </button>
                </div>
            </div>
        </div>
    )
}