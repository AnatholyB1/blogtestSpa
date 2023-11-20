


import { columnsTask, columnsCategory, columnsBlogger, columnsPage, columnsSystemPage } from "./taskComponent/columns"
import {DataTable} from "./taskComponent/data-table"
import { BloggerTask, GetData, TabContextType } from "typing"
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

const description : {id : TabContextType, des : string}[] = [{id : 'Post', des : 'Manage posts, track post performance and learn about new ways to improve your blog.' },{ id  : 'Categories', des : 'Organize your blog content by effortlessly managing blog categories'},{id : 'Blogger', des : 'Manage bloggers in the app, including adding, editing, and deleting bloggers.' },{id : 'Overview', des : 'Manage posts, track post performance and learn about new ways to improve your blog.'}]

export type SystemTask = {
  id : string,
  title : string,
  published_on : string
}




export default function TaskPage() {
  const tabType = useContext(TabContext);
  let doctype = 'Blog Post';
  type field = keyof GetData
  switch(tabType.variable)
  {
    case 'Categories':
      doctype = 'Blog Category'
      break;
    case 'Post':
      doctype = 'Blog Post'
      break;
    case 'Page':
    doctype = 'BlogPage'
    break;
    case 'Blogger':
    doctype = 'Blogger'
    break;
    case 'SystemPage':
    doctype = 'SystemPage'
    break;
    case 'Overview':
      doctype = 'Blog Post'
      break;
  }
  const {data , isLoading, mutate, error} = useFrappeGetDocList<GetData>(doctype,{ fields: [ '*'] , limit : 200});
  let tasks : any = [];
  if (data) {
    switch(tabType.variable) {
      case 'Categories':
        console.log(data)
        tasks = data.reduce((acc: CategoryTab [], item) => {
          acc.push({ 
            id: item.name,
            title: item.title,
            status: item.published == 1 ? "Published" : "Drafted",
            modified : item.modified
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
            published_on: item.published_on ?? '-' ,
          });
          return acc;
        }, []).slice(0, 3);
        
        break;
      case 'SystemPage':
        tasks = data.reduce((acc: SystemTask [], item) => {
          acc.push({ 
            id: item.name,
            title: item.title,
            published_on: item.published_on ?? '-' ,
          });
          return acc;
        }, []);
        break;
        case 'Page':
          tasks = data.reduce((acc: SystemTask [], item) => {
            acc.push({ 
              id: item.name,
              title: item.title,
              published_on: item.creation ?? '-' ,
            });
            return acc;
          }, []);
          break;
      default:
        tasks = data.reduce((acc: Task [], item) => {
          acc.push({ 
            id: item.name,
            title: item.title,
            status: item.published == 1 ? "Published" : "Drafted",
            published_on: item.published_on ?? '-' ,
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
      <div className="flex h-full flex-1 flex-col gap-[20px] px-[50px] py-[20px] flex-wrap content-center">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="blog-title">{tabType.variable}</h2>
            <p className="blog-description">{description.find((item) => item.id =tabType.variable)?.des}</p>
          </div>
          <div className="flex items-center space-x-2">
          </div>
          <div className="flex flex-row gap-2">
          {tabType.delete && <DeleteModal className="w-[160px] h-[40px]"></DeleteModal>}
           <MoreActionsComponent></MoreActionsComponent> {tabType.variable != 'SystemPage'  && <Button className="" onClick={() => {router(`new${tabType.variable == 'Overview' ? 'Post' : tabType.variable}`)}}><PlusCircle className="w-[16px] h-[16px]" ></PlusCircle > <span className="pl-2" >New {tabType.variable == 'Overview' ? "Post" : tabType.variable }</span></Button>}
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
            case "SystemPage":
              return <DataTable data={tasks} columns={columnsSystemPage} currentTab={tabType.variable}/>
            case "Page":
              return <DataTable data={tasks} columns={columnsPage} currentTab={tabType.variable}/>
            default :
               return <DataTable data={tasks} columns={columnsTask} currentTab={tabType.variable}/>
          }
        })()
        }
      </div>
    </>
  )
}