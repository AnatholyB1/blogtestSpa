


import { columnsTask, columnsCategory, columnsBlogger } from "./taskComponent/columns"
import {DataTable} from "./taskComponent/data-table"
import { BloggerTask, GetData } from "typing"
import { Task , CategoryTab } from "typing"
import { Button } from "@/components/ui/button"
import {useFrappeGetDocList} from 'frappe-react-sdk'
import { useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"
import TabSkeleton from "../skeletonComponent/tabSkeleton"
import { useContext } from "react"
import { TabContext } from "@/provider/tabProvider"
import { PlusCircle } from "lucide-react"
import DeleteModal from "./taskComponent/deleteModal"
import Overview from "./taskComponent/overview"
import MoreActionsComponent from "./taskComponent/more-actions"
import { useNavigate } from "react-router-dom"



export default function TaskPage() {
  const tabType = useContext(TabContext);
  let doctype = 'Blog Post';
  type field = keyof GetData
  let fields : field[] = []
  switch(tabType.variable)
  {
    case 'Categories':
      doctype = 'Blog Category'
      fields = ['name', 'title', 'published']
      break;
    case 'Post':
      doctype = 'Blog Post'
      fields = ['name', 'title', 'blog_category', 'content_type', 'published']
      break;
    case 'Page':
    doctype = 'BlogPage'
    fields = ['name', 'title', 'content_type']
    break;
    case 'Blogger':
    doctype = 'Blogger'
    fields = ['name', 'full_name', 'avatar', 'bio', 'disabled', 'short_name']
    break;
    case 'SystemPage':
    doctype = 'SystemPage'
    fields = ['name', 'content_json', 'content_type', 'published', 'meta_image', 'title']
    break;
    case 'Overview':
      doctype = 'Blog Post'
      fields = ['name', 'title', 'blog_category', 'content_type', 'published']
      break;
      

  }
  const {data , isLoading, mutate, error} = useFrappeGetDocList<GetData>(doctype,{ fields: fields });
  let tasks : any = [];
  if (data) {
    switch(tabType.variable) {
      case 'Categories':
        tasks = data.reduce((acc: CategoryTab [], item) => {
          acc.push({ 
            id: item.name,
            title: item.title,
            status: item.published == 1 ? "Published" : "Drafted",
          });
          return acc;
        }, []);
        break;
      case 'Blogger':
        tasks = data.reduce((acc: BloggerTask [], item) => {
          acc.push({ 
            id: item.name,
            name: item.full_name,
            avatar : item.avatar,
            status: !item.disabled,
          });
          return acc;
        }, []);
        break;
      case 'Overview':
        tasks = data.reduce((acc: Task [], item) => {
          acc.push({ 
            id: item.name,
            title: item.title,
            status: item.published == 1 ? "Published" : "Drafted",
            contentType: item.content_type,
          });
          return acc;
        }, []).slice(0, 3);
        
        break;
      default:
        tasks = data.reduce((acc: Task [], item) => {
          acc.push({ 
            id: item.name,
            title: item.title,
            status: item.published == 1 ? "Published" : "Drafted",
            contentType: item.content_type,
          });
          return acc;
        }, []);
        break;
    }
  }
  const router = useNavigate()
  const {toast} = useToast()

  useEffect(() => {
    mutate()
    if (error) {
      toast({title:'Eroor : error while fetching the blogs'})
    }
  },[error, tabType.mutate])
  return (
    <>
      <div className="flex h-full flex-1 flex-col gap-[24px] p-8  flex-wrap content-center">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Blog {tabType.variable}</h2>
            {tabType.variable == 'Overview' && <p className="text-[#71717A] font-Inter text-[16px] font-normal leading-[24px]">Manage posts, track post performance and learn about new ways to improve your blog.</p>}
          </div>
          <div className="flex items-center space-x-2">
          </div>
          <div className="flex flex-row gap-2">
          {tabType.variable == 'Overview' && <MoreActionsComponent></MoreActionsComponent>}
          {tabType.delete && <DeleteModal className="w-[160px] h-[40px]"></DeleteModal>}
          <Button className="h-[40px] w-[160px]" onClick={() => {router(`new${tabType.variable}`)}}><PlusCircle className="w-[16px] h-[16px]" ></PlusCircle > <span className="pl-2" >New {tabType.variable}</span></Button>
          </div>
        </div>
        {isLoading ? <TabSkeleton/> : (() => {
          switch(tabType.variable)
          {
            case "Categories":
              return <DataTable data={tasks} columns={columnsCategory} currentTab={tabType.variable}/>
            
            case "Blogger":
              return <DataTable data={tasks} columns={columnsBlogger} currentTab={tabType.variable}/>
            
            case "Overview":
              return <Overview ><DataTable data={tasks} columns={columnsTask} currentTab={tabType.variable}/></Overview>
            
            default :
               return <DataTable data={tasks} columns={columnsTask} currentTab={tabType.variable}/>
             
          }
        })()
        }
      </div>
    </>
  )
}