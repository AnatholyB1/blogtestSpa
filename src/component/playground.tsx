

import {
  Tabs,
} from "@/components/ui/tabs"

import { PresetSave } from "./playgroundComponent/preset-save"
import EditBlog from "./playgroundComponent/editblog"
import NewBlog from "./playgroundComponent/newBlog"
import Blog from "./playgroundComponent/Blog"
//import  {useRouter}  from "next/navigation"
//import { PostContext } from "provider/postProvider"
import { useContext, useState } from "react"
//import { UpdateObject, contextType } from "typing"
import Page from "./playgroundComponent/pageDoc"
import EditPage from "./playgroundComponent/editPage"
import NewPage from "./playgroundComponent/newPage"
import { TabContextType } from "typing"
import EditBlogger from "./playgroundComponent/editBlogger"
import Blogger from "./playgroundComponent/blogger"
import NewBlogger from "./playgroundComponent/newBlogger"
import SystemPage from "./playgroundComponent/systemPage"
import NewSystemPage from "./playgroundComponent/newSystemPage"
import EditSystemPage from "./playgroundComponent/editSystemPage"
//import { BloggerContext } from "provider/BloggerProvider"
//import { PageContext } from "provider/pageProvider"
//import { SystemPageContext } from "provider/SystemPageProvider"
import SideBarRight from "./playgroundComponent/sidebareright"
import Header from "./playgroundComponent/header"
import Sidebar from "./playgroundComponent/sidebar"
import MainSideBar from "./playgroundComponent/mainsidebar"
import { ChevronLeft, ChevronRight, MessageSquare } from "lucide-react"
import { TabContext } from "@/provider/tabProvider"
import { Button } from "@/components/ui/button"
import { ArrowRightToLine, ArrowLeftToLine } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import ItemSideBar from "./playgroundComponent/itemSidebar"
import { AnimationContext } from "@/provider/animationProvider"
import SideApp from "./mainComponent/sideApp"
import { SidebarMain} from "./mainComponent/sidebar"
import NewCategory from "./playgroundComponent/newCategories"
import EditCategoy from "./playgroundComponent/editCategories"
import Category from "./playgroundComponent/Category"



export default function PlaygroundPage({state, page} : {state : string, page : TabContextType }) {

  //const router = useNavigate()
  const tab = useContext(TabContext)
  //const postContext = useContext(PostContext)
  //const bloggerContext = useContext(BloggerContext)
  //const pageContext = useContext(PageContext)
  //const systemPageContext = useContext(SystemPageContext)
  const [animation , SetAnimation] = useState(false)
  const animationContext = useContext(AnimationContext)

  /*const handleClick = () => {
    switch(page)
    {
      case 'Blogger' :
        bloggerContext.changeSubmit(2)
        break;
      case 'Page' :
        pageContext.changeSubmit(2)
        break;
      case 'Post' :
        postContext.ChangeObject({} as UpdateObject) 
       break;
      case 'SystemPage':
        systemPageContext.changeSubmit({} as UpdateObject)
        break;
    }
    router.push('/pages/blog')
  }*/
  return (
    <>
      <div className="hidden w-screen h-screen flex-row md:flex">
        {page == ('Categories' || 'Blogger') ? (<> 
        <SidebarMain/>
        <SideApp></SideApp>
         </>) : 
        (<>
        <SideApp></SideApp>
        <Sidebar className="flex flex-col w-[300px] h-screen pt-[6px]  pb-[16px]  items-start gap-[16px] self-stretch border-r border-solid border-gray-200 bg-white z-10"></Sidebar>
        <ItemSideBar/>
        <MainSideBar></MainSideBar>
        </>)}
        <div className={`${page == ('Categories' || 'Blogger') && 'main'} ${animationContext.sidebar ? 'open': ''} flex flex-col pb-0 items-center flex-1 self-stretch h-screen w-full`}>
          <Header className="flex h-[52px] px-[16px] justify-between items-center self-stretch border-b border-[#E4E4E7]"></Header>
          <div className="flex px-[32px] z-10 py-[16px] justify-between items-center self-stretch border-b border-[#E4E4E7] ">
            <div className="flex items-center gap-[5px]">
              {animation ? 
              (
              <>
                <ChevronLeft className="w-4 h-4 stroke-1"/>
                <span className="text-black font-Inter text-[18px] font-semibold leading-[28px]">{tab.variable}</span>
                <Avatar className="w-[35px] h-[35px]">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span className="text-[#09090B] font-Inter text-[14px] font-medium leading-[20px]">Name</span>
                <span className="text-[#71717A] font-Inter text-[13px] font-normal leading-[20px]">Last Updated : </span><span className="text-[#71717A] font-Inter text-[13px] font-bold leading-[20px]">time</span>
                <Button className="flex px-[16px] py-[8px] justify-center items-center gap-[8px]" variant={'outline'}><MessageSquare className="w-[16px] h-[16px] stroke-1"></MessageSquare><span className="text-[#18181B] font-Inter text-[14px] font-medium leading-[20px]">Comment</span></Button>
                <Button className="px-[16px] py-[8px]" variant={'secondary'} onClick={() => SetAnimation(!animation)} ><ArrowLeftToLine className="w-4 h-4 stroke-1"></ArrowLeftToLine></Button>
              </>
             
               ) : (
                <>
                <ChevronRight className="w-4 h-4 stroke-1"/>
                <span className="text-black font-Inter text-[18px] font-semibold leading-[28px]">{tab.variable}</span>
                <Button className="px-[16px] py-[8px]" variant={'secondary'} onClick={() => SetAnimation(!animation)} ><ArrowRightToLine className="w-4 h-4 stroke-1"></ArrowRightToLine> Info</Button>
              </>
               )}
              
            </div>
            <div className="">
              {state != 'view' ? <PresetSave page={page} /> : null }
            </div>
          </div>
          <Tabs defaultValue="complete" className={`editor overflow-auto flex  p-6 8 6 0 items-start flex-1 self-stretch ${animationContext.itemSideBar ? 'open' : ''} ${animationContext.sidebarRight ? 'openright' : ''}`}>
            <SideBarRight state={state}/>
                  <div className="w-full h-full">
                      {(() => {
                        switch(page)
                        {
                        case 'Page' :
                          switch (state) {
                            case 'edit':
                              return <EditPage state={state}/>;
                            case 'new':
                              return <NewPage />;
                            case 'view':
                              return <Page/>;
                            default:
                              return null;
                          }
                        case 'Post' :
                          switch (state) {
                            case 'edit':
                              return <EditBlog state={state} />;
                            case 'new':
                              return <NewBlog state={state}/>;
                            case 'view':
                              return <Blog/>;
                            default:
                              return null;
                          }
                        case 'Blogger':
                          switch (state) {
                            case 'edit':
                              return <EditBlogger />;
                            case 'new':
                              return <NewBlogger />;
                            case 'view':
                              return <Blogger/>;
                            default:
                              return null;
                          }
                        case 'SystemPage':
                          switch (state) {
                            case 'edit':
                              return <EditSystemPage/>;
                            case 'new':
                              return <NewSystemPage />;
                            case 'view':
                              return <SystemPage/>;
                            default:
                              return null;
                          }
                        case 'Categories':
                          switch (state){
                            case 'edit':
                              return < EditCategoy/>;
                            case 'new':
                              return < NewCategory />;
                            case 'view':
                              return <Category/>
                            default:
                                return null;
                          }
                        }
                      })()}
            </div>
          </Tabs>
        </div>
      </div>
    </>
  )
}