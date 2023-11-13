

import { useContext } from "react";


import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import  PostIcon  from "@/public/PostIcon"
import ZaviagoIcon from "@/public/zaviagoIcon"
import DashIcon from "@/public/dashIcon"
import ProfilIcon from "@/public/profilIcon"
import MiniPageIcon from "@/public/miniPageIcon"
import UpAndDownTriggerIcon from "@/public/UpAndDownTriggericon"
import NavBarreIcon from "@/public/navbarreicon"
import SearchIcon from "@/public/searchIcon"
import Settingsicon from "@/public/settingsicon"
import NotificationIcon from "@/public/notificationIcon"
import Addicon from "@/public/addIcon"
import { AnimationContext } from "@/provider/animationProvider"
import { TabContext } from "@/provider/tabProvider";



import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


export default function MainSideBar ({className} : {className? : string}) {
    const animation = useContext(AnimationContext) 
    const tab = useContext(TabContext)


    return (
        <div className={cn(`main-bar ${animation.sidebar ? 'open' : 'close'} h-screen border-r border-gray-300`,className)}>
        <div className="space-y-4 py-4">

        <div className="inline-flex px-4 items-start gap-4 ">
        <Select>
            <SelectTrigger className="w-[180px] bg-[#F4F4F5] h-[40px]">
              <ZaviagoIcon></ZaviagoIcon>
              <SelectValue placeholder="Zaviago" />
              <UpAndDownTriggerIcon></UpAndDownTriggerIcon>
            </SelectTrigger>
            <SelectContent className="flex flex-col items-start w-60">
              <div className="flex h-10 px-3 items-center gap-2 self-stretch border-b border-gray-300">
                <SearchIcon></SearchIcon>
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
                    <Addicon ></Addicon>
                    <span className="pl-4 text-gray-900 font-inter text-sm leading-5" >See more Apps</span>
                  </Button>
                </div>
              </div>
            </SelectContent>
          </Select>
          <Button onClick={() => animation.toggle('SideBar')} variant={'secondary'} className="h-[40px] w-[40px] flex px-2 py-1 justify-center items-center gap-2 self-stretch"><NavBarreIcon></NavBarreIcon></Button>
      </div>
          
      <div className="flex py-2 px-3 flex-col items-start space-y-2 self-stretch">
        <div className="flex flex-col items-start space-y-0.5 self-stretch">
        <Button variant="ghost" className="flex h-9 py-2 px-4  justify-start items-center space-x-2 self-stretch">
        <DashIcon></DashIcon>
        <h2 className="text-gray-900 font-inter text-sm leading-5">DashBoard</h2>
        </Button >
        <Button variant="ghost" className="flex h-9 py-2 px-4  justify-start items-center space-x-2 self-stretch">
        <NotificationIcon></NotificationIcon>
        <h2 className="text-gray-900 font-inter text-sm leading-5">Notifications</h2>
        </Button>
        <Button variant="ghost" className="flex h-9 py-2 px-4  justify-start items-center space-x-2 self-stretch">
        <SearchIcon></SearchIcon>
        <h2 className="text-gray-900 font-inter text-sm leading-5">Search</h2>
        </Button>
        <Button variant="ghost" className="flex h-9 py-2 px-4  justify-start items-center space-x-2 self-stretch">
        <Settingsicon></Settingsicon>
        <h2 className="text-gray-900 font-inter text-sm leading-5">Settings</h2>
        </Button>
        </div>
      </div>


      <div className="flex py-2 px-3 flex-col items-start space-y-2 self-stretch">


          <div className="flex px-4 justify-center items-center">          
            <h2 className="text-base font-semibold text-gray-500 font-inter leading-7 tracking-tighter">
              Blogs
            </h2>
          </div>

          <div className="flex flex-col items-start space-y-0.5 self-stretch">
              <Button variant="ghost" onClick={() => {tab.ChangeVariable('Post')}} className="flex h-9 py-2 px-4  justify-start items-center space-x-2 self-stretch">
                <PostIcon></PostIcon>
                <h2 className="text-gray-900 font-inter text-sm leading-5">Post</h2>
              </Button>
              <Button variant="ghost" onClick={() => {tab.ChangeVariable('Categories')}} className="flex h-9 py-2 px-4  justify-start items-center space-x-2 self-stretch">
                <DashIcon></DashIcon>
                <h2 className="text-gray-900 font-inter text-sm leading-5">Categories</h2>   
              </Button>
              <Button variant="ghost" onClick={() => {tab.ChangeVariable('Blogger')}} className="flex h-9 py-2 px-4  justify-start items-center space-x-2 self-stretch">
                <ProfilIcon></ProfilIcon>
                <h2 className="text-gray-900 font-inter text-sm leading-5">Blogger</h2>   
              </Button>
          </div>
        </div>

        <div className="flex py-2 px-3 flex-col items-start space-y-2 self-stretch">

        <div className="flex px-4 justify-center items-center">        
          <h2 className="text-base font-semibold text-gray-500 font-inter leading-7 tracking-tighter">
            Pages
          </h2>
        </div>

          <div className="flex flex-col items-start space-y-0.5 self-stretch">
            <Button variant="ghost"  onClick={() => {tab.ChangeVariable('Page')}} className="flex h-9 py-2 px-4  justify-start items-center space-x-2 self-stretch">
              <MiniPageIcon></MiniPageIcon>
              <h2 className="text-gray-900 font-inter text-sm leading-5"> Pages </h2>
            </Button>
            <Button variant="ghost"  onClick={() => {tab.ChangeVariable('SystemPage')}} className="flex h-9 py-2 px-4  justify-start items-center space-x-2 self-stretch">
              <DashIcon></DashIcon>
              <h2 className="text-gray-900 font-inter text-sm leading-5"> System Pages </h2>
            </Button> 
          </div>

        </div>
      </div>
        </div>
    )
}