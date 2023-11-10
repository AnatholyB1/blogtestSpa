
import { Button } from "@/components/ui/button"
import { PostContext } from "@/provider/postProvider"
import { useContext, useEffect} from "react"
import { PageContext } from "@/provider/pageProvider"
import { TabContextType } from "typing"
import { BloggerContext } from "@/provider/BloggerProvider"
import { PanelLeftClose, UploadCloud, PanelRightClose, Trash2 } from "lucide-react"
import { AnimationContext } from "@/provider/animationProvider"
import { CategoryContext } from "@/provider/categoryProvider"
import { useNavigate } from "react-router-dom"
import { TypeContext } from "@/provider/typeProvider"

type CaseType = 'publish' | 'save'

export function PresetSave( {page } : { page  : TabContextType}) {
  const postContext = useContext(PostContext);
  const pageContext = useContext(PageContext);
  const blogContext = useContext(BloggerContext);
  const categoryContext = useContext(CategoryContext)
  const animation = useContext(AnimationContext)
  const preview = useContext(TypeContext)
  const router = useNavigate()

  const handleClick = (caseType: CaseType) => {
    if (caseType == 'publish') {
      switch (page) {
        case 'Post': 
          postContext.setPublish(true)
          postContext.setSubmit(true)
          break;
        case 'Page':
          pageContext.changeSubmit(1)
          break;
        case 'Blogger':
          blogContext.changeSubmit(true)
          break;
        case 'Categories':
        categoryContext.changeSubmit(true)
        break;
        default :
        postContext.ChangeObject(undefined,'submited',true)
        break;
      }
    }
    else if ('save'){
      switch (page) {
        case 'Post':
          postContext.setPublish(false)
          postContext.setSubmit(true)
          break;
        case 'Page':
          pageContext.ChangeObject(undefined, 'published', 0)
          pageContext.changeSubmit(1)
          break;
      }
    }
  }

  useEffect(() => {
    console.log(postContext.data?.published)
  }, [postContext.data?.published])

  return (
    <div className="flex justify-center items-center gap-[8px]">
      {page == 'Blogger' || page == 'Categories' ? (<><Button className="flex gap-2" variant={'destructive'}><Trash2 className="w-4 h-4 stroke-1"></Trash2>Delete</Button></>)
      : (<>
            <Button variant={'ghost'} onClick={() => {preview.changepage(page), router('/preview')}}>Preview</Button>
           <Button className="flex justify-center items-center gap-[5px]" type="submit" onClick={()=> {handleClick('save')}}>Save</Button>
          </>)}
        <Button className="flex justify-center items-center gap-[5px]" type="submit" onClick={()=> handleClick('publish')}><UploadCloud className="w-[16px] h-[16px] stroke-1"/> Publish</Button> 
      {((page !=  'Categories') && (page != 'Blogger') )   &&   ( <Button variant={'secondary'} onClick={() => {animation.toggle('SideBarRight'), animation.itemSideBar && animation.toggle('ItemSideBar')}}>{animation.sidebarRight ? <PanelRightClose className="w-[16px] h-[16px] stroke-1"/> : <PanelLeftClose className="w-[16px] h-[16px] stroke-1"/>}</Button>)}
    </div>
  )
}