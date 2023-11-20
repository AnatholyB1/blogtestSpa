
import { Button } from "@/components/ui/button"
import { PostContext } from "@/provider/postProvider"
import { useContext} from "react"
import { TabContextType } from "typing"
import { BloggerContext } from "@/provider/BloggerProvider"
import { PanelLeftClose, UploadCloud, PanelRightClose, Trash2 } from "lucide-react"
import { AnimationContext } from "@/provider/animationProvider"
import { CategoryContext } from "@/provider/categoryProvider"
import { useNavigate } from "react-router-dom"
import { TypeContext } from "@/provider/typeProvider"

type CaseType = 'publish' | 'save'

interface PresetSaveProps extends React.HTMLProps<HTMLDivElement>  {page : TabContextType, onsaveclick? : () => void, onpublishclick? : () => void}

export function PresetSave( {page, ...props } : PresetSaveProps) {
  const postContext = useContext(PostContext);
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
        case 'Blogger':
          blogContext.changeSubmit(true)
          break;
        case 'Categories':
        categoryContext.changeSubmit(true)
        break;
        default:
          if(props.onpublishclick)
          {
            props.onpublishclick()
          }
          break;
      }
    }
    else if ('save'){
      switch (page) {
        case 'Post':
          postContext.setPublish(false)
          postContext.setSubmit(true)
          break;
        default :
          if(props.onsaveclick)
          {
            props.onsaveclick()
          }
          break;

      }
    }
  }



  return (
    <div className="flex justify-center items-center gap-[8px]">
      {page == 'Blogger' || page == 'Categories' ? (<><Button className="flex gap-2" variant={'destructive'}><Trash2 className="w-4 h-4 stroke-1"></Trash2>Delete</Button> <Button className="flex justify-center items-center gap-[5px]" type="submit" onClick={()=> handleClick('publish')}><UploadCloud className="w-[16px] h-[16px] stroke-1"/> Publish</Button> </>)
      : (<>
            <Button variant={'ghost'} onClick={() => {preview.changepage(page), router('/preview')}}>Preview</Button>
            <Button className="flex justify-center items-center gap-[5px]"  type="submit" onClick={()=> handleClick('publish')}><UploadCloud className="w-[16px] h-[16px] stroke-1"/> Publish</Button> 
            {page != 'SystemPage' && <Button className="flex justify-center items-center gap-[5px]" variant={'secondary'} type="submit" onClick={()=> {handleClick('save')}}>Save</Button>}
          </>)}
      {((page !=  'Categories') && (page != 'Blogger') )   &&   ( <Button variant={'secondary'} onClick={() => {animation.toggle('SideBarRight'), animation.itemSideBar && animation.toggle('ItemSideBar')}}>{animation.sidebarRight ? <PanelRightClose className="w-[16px] h-[16px] stroke-1"/> : <PanelLeftClose className="w-[16px] h-[16px] stroke-1"/>}</Button>)}
    </div>
  )
}