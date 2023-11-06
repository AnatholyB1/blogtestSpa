
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PostContext } from "@/provider/postProvider"
import { useContext} from "react"
import { PageContext } from "@/provider/pageProvider"
import { TabContextType } from "typing"
import { BloggerContext } from "@/provider/BloggerProvider"
import { PanelLeftClose, UploadCloud, PanelRightClose, Trash2 } from "lucide-react"
import { AnimationContext } from "@/provider/animationProvider"
import { CategoryContext } from "@/provider/categoryProvider"
import { useNavigate } from "react-router-dom"
import { TypeContext } from "@/provider/typeProvider"

export function PresetSave( {page } : { page  : TabContextType}) {
  const postContext = useContext(PostContext);
  const pageContext = useContext(PageContext);
  const blogContext = useContext(BloggerContext);
  const categoryContext = useContext(CategoryContext)
  const animation = useContext(AnimationContext)
  const preview = useContext(TypeContext)
  const router = useNavigate()

  return (
    <div className="flex justify-center items-center gap-[8px]">
      {page == 'Blogger' || page == 'Categories' ? (<><Button className="flex gap-2" variant={'destructive'}><Trash2 className="w-4 h-4 stroke-1"></Trash2>Delete</Button></>)
      : (<><Button variant={'ghost'} onClick={() => {preview.changepage('/newPost'), router('/preview')}}>Preview</Button>
      <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Share</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[475px]">
        <DialogHeader>
          <DialogTitle>Share preset</DialogTitle>
          <DialogDescription>
            This will save the current playground state as a preset which you
            can access later or share with others.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Share</Label>
            <Input id="name" autoFocus />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Input id="description" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Share</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog></>)}
    {(() => {
        switch(page)
      {
        case 'Post':
          return <><Button className="flex justify-center items-center gap-[5px]" type="submit" onClick={()=> postContext.ChangeObject(undefined,'submited',1)}><UploadCloud className="w-[16px] h-[16px] stroke-1"/> Publish</Button></>
        case 'Page':
          return <><Button className="flex justify-center items-center gap-[5px]" type="submit" onClick={()=> pageContext.changeSubmit(1)}><UploadCloud className="w-[16px] h-[16px] stroke-1"/>Publish</Button></>
        case 'Blogger':
          return <Button className="flex justify-center items-center gap-[5px]" type="submit" onClick={()=> blogContext.changeSubmit(1)}><UploadCloud className="w-[16px] h-[16px] stroke-1"/>Publish</Button>
        case 'Categories':
          return <Button className="flex justify-center items-center gap-[5px]" type="submit" onClick={()=> categoryContext.changeSubmit(1)}><UploadCloud className="w-[16px] h-[16px] stroke-1"/>Publish</Button>
        default :
          return <Button className="flex justify-center items-center gap-[5px]" type="submit" onClick={()=> postContext.ChangeObject(undefined,'submited',1)}><UploadCloud className="w-[16px] h-[16px] stroke-1"/>Publish</Button>
      }})()}
      {page != ('Blogger' ||  'Categories')   &&   <Button variant={'secondary'} onClick={() => {animation.toggle('SideBarRight'), animation.itemSideBar && animation.toggle('ItemSideBar')}}>{animation.sidebarRight ? <PanelRightClose className="w-[16px] h-[16px] stroke-1"/> : <PanelLeftClose className="w-[16px] h-[16px] stroke-1"/>}</Button>}
    </div>
  )
}