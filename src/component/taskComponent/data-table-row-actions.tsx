
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useContext } from "react"
import { TabContext} from "@/provider/tabProvider"
import { PostContext } from "@/provider/postProvider"
import { TypeContext } from "@/provider/typeProvider"
import { PageContext } from "@/provider/pageProvider"
import { BloggerContext } from "@/provider/BloggerProvider"
import { SystemPageContext } from "@/provider/SystemPageProvider"
import DeleteModal from "./deleteModal"
import { Table } from "@tanstack/react-table"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>,
  table: Table<TData>
}


export function DataTableRowActions<TData>({
  row,
  table
}: DataTableRowActionsProps<TData>) {
  const router = useNavigate();

  const [value, setValue] = useState(false)
  const tabProvider = useContext(TabContext)
  const postContext = useContext(PostContext)
  const typeContext = useContext(TypeContext)
  const pageContext = useContext(PageContext)
  const blogContext = useContext(BloggerContext)
  const systemPageContext = useContext(SystemPageContext);

  useEffect(() => {
    const value = table.getIsSomePageRowsSelected()
    tabProvider.setDelete(value)
    const value2 = table.getIsAllPageRowsSelected()
    if (value2){
      tabProvider.setDelete(value2)
    }

  },[table.getIsSomePageRowsSelected(),table.getIsAllPageRowsSelected() ])

  useEffect(() => {
    if(row.getIsSelected())
    {
      tabProvider.addRow(row.getValue('title')? row.getValue('title') : row.getValue('name'))
    }else{
      tabProvider.suppRow(row.getValue('title')? row.getValue('title') : row.getValue('name'))
    }
  },[row.getIsSelected()])

  const tabType = useContext(TabContext);
  const [page, setPage] = useState('default')


  useEffect(() => {
    if (page !='default')
    {
      switch (tabType.variable) {
        case 'Categories':
          typeContext.ChangeVariable(page);
          router('/viewCategory');
          break;
        case 'Post':
          postContext.ChangeVariable(page);
          router('/viewBlog');
          break;
        case 'Page':
          pageContext.changeVariable(page);
          router('/viewPage');
          break;
        case 'Blogger':
          blogContext.changeVariable(page);
          router('/viewBlogger');
          break;
        case 'SystemPage':
          systemPageContext.changeVariable(page);
          router('/viewSystemPage');
          break;

      }
 
    }

  },[page])
  return (
    <>
    
    <DropdownMenu open={value} >
    <DropdownMenuTrigger asChild>
      <Button 
        variant="ghost"
        className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        onClick={() => {setValue(true)}}
      >
        <DotsHorizontalIcon className="h-4 w-4" />
        <span className="sr-only">Open menu</span>
      </Button> 
    </DropdownMenuTrigger>
    <DropdownMenuContent  align="end" className="w-[160px]" onMouseLeave={() => setValue(false)} onMouseEnter={() => setValue(true)}>
      <DropdownMenuItem onClick={() => {setPage(row.id)}}>View</DropdownMenuItem>
      <DropdownMenuItem>Make a copy</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={() => {tabType.addRow(row.getValue('title') ? row.getValue('title') : row.getValue('name'))}}>
        <DeleteModal custom={true}>Delete<DropdownMenuShortcut className="pl-10">⌘⌫</DropdownMenuShortcut> </DeleteModal>
      </DropdownMenuItem>
    </DropdownMenuContent>
    </DropdownMenu>
    </>
  )
}