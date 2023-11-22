


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
import { useHotkeys } from "react-hotkeys-hook";
import { useNavigate } from "react-router-dom";
import { SystemPageContext } from "@/provider/SystemPageProvider"
import { PageContext } from "@/provider/pageProvider"

export default function MusicPage() {
  const animation = useContext(AnimationContext)
  const postcontext = useContext(PostContext)
  const categoryContext = useContext(CategoryContext)
  const blogContext = useContext(BloggerContext)
  const system = useContext(SystemPageContext)
  const pageConstext = useContext(PageContext)
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
    pageConstext.setData({} as any)
    pageConstext.mutate()
    system.mutate()
  },[])
      const nav = useNavigate()
      useHotkeys('shift+p', 
          () => 
              {
              nav('/newPost')
      },{preventDefault : true});
      useHotkeys('shift+c', 
      () => 
          {
          nav('/newCategories')
    },{preventDefault : true});
    useHotkeys('shift+w', 
    () => 
      {
          nav('/newBlogger')
    },{preventDefault : true});
    useHotkeys('shift+g', 
    () => 
      {
    },{preventDefault : true});
      

  return (
    
    <>
      <div className="hidden md:block">
        <div className="bg-background">
          <div className="flex flex-column items-start">
            <SidebarMain className="" />
            <SideApp />
            <div  className={`main ${animation.sidebar ? 'open': ''} flex-grow  `}>
            <Header className="flex h-[52px] px-[16px] justify-between items-center self-stretch border-b border-[#E4E4E7]"/>
              <div className="h-full ">
                <TaskPage />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}