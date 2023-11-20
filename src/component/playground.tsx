

import {
  Tabs,
} from "@/components/ui/tabs"

import { PresetSave } from "./playgroundComponent/preset-save"
import EditBlog from "./playgroundComponent/editblog"
import NewBlog from "./playgroundComponent/newBlog"

//import  {useRouter}  from "next/navigation"
//import { PostContext } from "provider/postProvider"
import { useContext, useState } from "react"
//import { UpdateObject, contextType } from "typing"

import EditPage from "./playgroundComponent/editPage"
import NewPage from "./playgroundComponent/newPage"
import { TabContextType } from "typing"
import EditBlogger from "./playgroundComponent/editBlogger"

import NewBlogger from "./playgroundComponent/newBlogger"
import EditSystemPage from "./playgroundComponent/editSystemPage"
//import { BloggerContext } from "provider/BloggerProvider"
//import { PageContext } from "provider/pageProvider"
//import { SystemPageContext } from "provider/SystemPageProvider"
import SideBarRight from "./playgroundComponent/sidebareright"
import Header from "./playgroundComponent/header"
import { ChevronLeft, ChevronRight, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ArrowRightToLine, ArrowLeftToLine } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AnimationContext } from "@/provider/animationProvider"
import SideApp from "./mainComponent/sideApp"
import { SidebarMain} from "./mainComponent/sidebar"
import NewCategory from "./playgroundComponent/newCategories"
import EditCategoy from "./playgroundComponent/editCategories"
import { NavSkeleton } from "@/skeletonComponent/navSkeleton"
import { SkeletonHeader } from "@/skeletonComponent/headSkeleton"
import { PlaygroundSkeleton } from "@/skeletonComponent/playgroundskeletin"
import { LoadingStateContext } from "@/provider/loadinStateProvider"
import { TabContext } from "@/provider/tabProvider"
import { AlertReturn } from "./playgroundComponent/alertreturn"
import ItemSideBar from "./playgroundComponent/itemSidebar"



export default function PlaygroundPage({state, page} : {state : string, page : TabContextType }) {

  //const router = useNavigate()
  const loadingContext = useContext(LoadingStateContext)
  const tab = useContext(TabContext)
  //const postContext = useContext(PostContext)
  //const bloggerContext = useContext(BloggerContext)
  //const pageContext = useContext(PageContext)
  //const systemPageContext = useContext(SystemPageContext)
  const [animation , SetAnimation] = useState(false)
  const animationContext = useContext(AnimationContext)
  const [isSaveClicked, setIsSaveClicked] = useState(false);
  const [isPublishClicked, setIsPublishClicked] = useState(false);

  const handleSaveClick = () => {
    setIsSaveClicked(true);
  };
  const handlePublishClick = () => {
    setIsPublishClicked(true);
  };
  const returnsaveClick = () => {
    setIsSaveClicked(false);
  }
  const returnpublishClick = () => {
    setIsPublishClicked(false);
  }
    


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
        <AlertReturn ></AlertReturn>
        <SidebarMain/>
        <SideApp ></SideApp>
        <div className={`main ${animationContext.sidebar ? 'open': ''} flex flex-col pb-0 items-center flex-1 self-stretch h-screen w-full`}>
          {!loadingContext.loading ? <Header className="flex h-[52px] px-[16px] justify-between items-center self-stretch border-b border-[#E4E4E7]"></Header> : <NavSkeleton></NavSkeleton>}
          {!loadingContext.loading ? <div className="flex px-[32px] z-10 py-[16px] justify-between items-center self-stretch border-b border-[#E4E4E7] ">
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
              {state != 'view' ? <PresetSave onsaveclick={handleSaveClick} onpublishclick={handlePublishClick} page={page} /> : null }
            </div>
          </div> : <SkeletonHeader></SkeletonHeader>}
          <Tabs defaultValue="complete" className={`editor overflow-auto flex  p-6 8 6 0  flex-1 self-stretch ${animationContext.sidebar ? 'open' : ''} ${animationContext.sidebarRight ? 'openright' : ''}`}>
            <SideBarRight state={state}/>
                  <div className="w-full h-full flex items-start justify-center">
                      {(() => {
                        switch(page)
                        {
                        case 'Page' :
                          switch (state) {
                            case 'edit':
                              return <EditPage returnpublishClick={returnpublishClick}  returnsaveClick={returnsaveClick}   save={isSaveClicked} publish={isPublishClicked} state={state} className="w-full  mt-[4rem]  p-4 rounded-md "/>;
                            case 'new':
                              return <NewPage returnpublishClick={returnpublishClick}  returnsaveClick={returnsaveClick}   save={isSaveClicked} publish={isPublishClicked} state={state} className="w-full  mt-[4rem]  p-4 rounded-md " />;
                            default:
                              return null;
                          }
                        case 'Post' :
                          switch (state) {
                            case 'edit':
                              return <EditBlog state={state} />;
                            case 'new':
                              return <NewBlog state={state}/>;

                            default:
                              return null;
                          }
                        case 'Blogger':
                          switch (state) {
                            case 'edit':
                              return <EditBlogger title="Edit Blogger" className=" w-[400px] mt-[4rem]  p-4 rounded-md shadow-sm" />;
                            case 'new':
                              return <NewBlogger  title="New Blogger" className=" w-[400px] mt-[4rem] p-4 rounded-md shadow-sm" />;

                            default:
                              return null;
                          }
                        case 'SystemPage':
                          switch (state) {
                            case 'edit':
                              return <EditSystemPage  returnpublishClick={returnpublishClick}  returnsaveClick={returnsaveClick}   save={isSaveClicked} publish={isPublishClicked} state={state} className="w-full  mt-[4rem]  p-4 rounded-md " />;

                            default:
                              return null;
                          }
                        case 'Categories':
                          switch (state){
                            case 'edit':
                              return < EditCategoy title="Edit Category" className="  w-[400px] mt-[4rem] p-4 rounded-md shadow-sm"/>;
                            case 'new':
                              return < NewCategory title="New Category" className=" w-[400px] mt-[4rem] p-4 rounded-md shadow-sm" />;

                            default:
                                return null;
                          }
                        }
                      })()}
            </div>
          </Tabs>
          {loadingContext.loading && <PlaygroundSkeleton  ></PlaygroundSkeleton>}
        </div>
      </div>
    </>
  )
}