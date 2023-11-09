


import { SidebarMain } from "./mainComponent/sidebar"
import { AnimationContext } from "@/provider/animationProvider"
import TaskPage from "./task"
import { useContext, useEffect } from "react"
import SideApp from "./mainComponent/sideApp"
import Header from "./playgroundComponent/header"
import { PostContext } from "@/provider/postProvider"
import { UpdateObject } from "typing"
import { CategoryContext } from "@/provider/categoryProvider"
import {BloggerContext} from '@/provider/BloggerProvider'


export default function MusicPage() {
  const animation = useContext(AnimationContext)
  const postcontext = useContext(PostContext)
  const categoryContext = useContext(CategoryContext)
  const blogContext = useContext(BloggerContext)
  useEffect(() => {
    sessionStorage.clear()
    if(animation.sidebarRight)
    {
      animation.toggle('SideBarRight')
    }
    postcontext.ChangeObject({} as UpdateObject)
    postcontext.ChangeVariable('null')
    categoryContext.deleteData()
    blogContext.deleteData()
  },[])

  

  return (
    <>
      <div className="hidden md:block">
        <div className="border-t">
          <div className="bg-background">
            <div className="flex flex-column items-start">
              <SidebarMain className="" />
              <SideApp></SideApp>
              <div  className={`main ${animation.sidebar ? 'open': ''} flex-grow`}>
              <Header className="flex h-[52px] px-[16px] justify-between items-center self-stretch border-b border-[#E4E4E7]"/>
                <div className="h-full px-4 py-6 lg:px-8">
                     <TaskPage ></TaskPage> 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}