
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
import DeleteModal from "./deleteModal"
import { Table } from "@tanstack/react-table"
import { CategoryContext } from "@/provider/categoryProvider"
import { TypeContext } from "@/provider/typeProvider"
import { PageContext } from "@/provider/pageProvider"
import { SystemPageContext } from "@/provider/SystemPageProvider"

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
  const typeContext = useContext(TypeContext)
  const postContext = useContext(PostContext)
  const categoryContext = useContext(CategoryContext)



  useEffect(() => {
    if(row.getIsSelected())
    {
      tabProvider.setDelete(true)
      tabProvider.addRow(row.getValue('title')? row.getValue('title') : row.getValue('name'))
    }else{
      tabProvider.suppRow(row.getValue('title')? row.getValue('title') : row.getValue('name'))
    }
    if(!table.getIsSomeRowsSelected())
    {
      tabProvider.setDelete(false)
    }
  },[row.getIsSelected()])


  useEffect(() => {
    table.resetRowSelection()
  },[tabProvider.mutate])

  const tabType = useContext(TabContext);
  const pageContext = useContext(PageContext)
  const systemPageContext = useContext(SystemPageContext)
  const [page, setPage] = useState('default')
  const [copy, setCopy] = useState(false)


  useEffect(() => {
    if (page !='default')
    {
      if(!copy)
      {
        switch (tabType.variable) {
          case 'Post':
            postContext.ChangeVariable(page);
            typeContext.changepage('Post');
            router('/preview');
            break;
          case 'Page':
            pageContext.changeVariable(page);
            typeContext.changepage('Page');
            router('/preview');
            break;
          case 'SystemPage':
            systemPageContext.changeVariable(page);
            typeContext.changepage('SystemPage');
            router('/preview');
            break;
        }

      }else{
        switch (tabType.variable) {
          case 'Post':
            postContext.makeCopy(page)
            break;
          case 'Categories':
            categoryContext.makeCopy(page);
            break;
        }
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
      {tabType.variable != 'Blogger' && tabType.variable != 'Categories' ? <DropdownMenuItem  onClick={() => {setPage(row.id)}}>View</DropdownMenuItem> : <></>}
      <DropdownMenuItem onClick={() => {setCopy(true),setPage(row.id)}} >Make a copy</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DeleteModal custom={true} className="w-full">
        <DropdownMenuItem className="flex justify-between w-full" onClick={() => {tabType.addRow(row.getValue('title') ? row.getValue('title') : row.getValue('name'))}}>
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut> 
        </DropdownMenuItem>
      </DeleteModal>
    </DropdownMenuContent>
    </DropdownMenu>
    </>
  )
}