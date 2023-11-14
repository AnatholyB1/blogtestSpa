

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Suspense } from "react"
import Loading from "@/static/loading"

import { DataTablePagination } from "../taskComponent/data-table-pagination"
import { DataTableToolbar } from "../taskComponent/data-table-toolbar"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { TabContext } from "@/provider/tabProvider"
import { PostContext } from "@/provider/postProvider"
import { TypeContext } from "@/provider/typeProvider"
import { PageContext } from "@/provider/pageProvider"
import { BloggerContext } from "@/provider/BloggerProvider"
import { SystemPageContext } from "@/provider/SystemPageProvider"
import { DataDocList, TabContextType } from "typing"
import { ChevronDown,  CheckCircle2, Timer} from "lucide-react"
import { useFrappeGetDocList } from "frappe-react-sdk"
import { Button } from "@/components/ui/button"

interface DataTableProps<TData, TValue> {
  columns: (ColumnDef<TData, TValue>)[]
  data: TData[]
  currentTab : TabContextType
}

type HeaderType = 'Title' | 'Status' | 'Published On'
const headerValues:HeaderType[] = ['Title', 'Status', 'Published On']
type StatusType = {label : string, icon : JSX.Element, value : number }
const status : StatusType[] = [{
  label : 'Published',
  icon : <CheckCircle2 className="w-4 h-4 stroke-1"></CheckCircle2>,
  value : 1,
},{
  label : 'Drafted',
  value : 0,
  icon : <Timer className="w-4 h-4 stroke-1"/>
}]

export function DataTable<TData, TValue>({
  columns,
  data,
  currentTab,
}: DataTableProps<TData, TValue>) {
  const tabType = useContext(TabContext);
  const postContext = useContext(PostContext)
  const typeContext = useContext(TypeContext)
  const pageContext = useContext(PageContext)
  const blogContext = useContext(BloggerContext)
  const sysContext = useContext(SystemPageContext)
  const [loadinglenght, setLoadingLength] = React.useState<number>(4)
  const router = useNavigate()
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [selectedRow, setSelectedRow] = React.useState<{title : unknown, id : string}>()
  const [sorting, setSorting] = React.useState<SortingState>([])
  const {data : postData, isLoading} = useFrappeGetDocList<DataDocList>('Blog Post',{fields:['*'],limit : 200});
  React.useEffect(() => {console.log(postData)},[postData])
  const [goView, setGoView] = React.useState<string>('no')
  
  React.useEffect(() => {
    if(goView != 'no' )
    {
      const id = goView.match(/\d+/g)?.join('');
      if(id){
        switch(tabType.variable) {
          case 'Categories':
            typeContext.ChangeVariable(id);
            router('/editCategory');
            break;
          case 'Post':
            postContext.ChangeVariable(id);
            router('/editPost');
            break;
          case 'Page':
            pageContext.changeVariable(id);
            router('/editPage');
            break;
          case 'Blogger':
            blogContext.changeVariable(id);
            router('/editBlogger');
            break;
          case 'SystemPage':
            sysContext.changeVariable(id);
            router('/editSystemPage');
            break;
        }
      }
    }
  },[goView])
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableSorting : false,  
    autoResetPageIndex : true,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  return (
    <div className="space-y-4 w-full">
      {currentTab != 'Overview' ? <DataTableToolbar table={table} /> : <h1 className="text-[#09090B] font-Inter text-[18px] font-semibold leading-[28px]"
>Track your latest posts</h1>}
      <div className="rounded-md border">
        <Table>
          <TableHeader >
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="grid grid-cols-9  grid-rows-none">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}  className=" first:col-span-1 col-span-2  flex items-center first:justify-start">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <Suspense fallback={<Loading/>}>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                
                <TableRow
                  className="grid grid-cols-9  "
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className={`first:col-span-1  col-span-2  flex items-center first:justify-start`} key={cell.id}   onClick={() => {cell.getValue()? setGoView(cell.id) : null}} >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}{tabType.variable == 'Categories' && <div onClick={()=> {
                    if(selectedRow?.id == row.id)
                    {
                      setSelectedRow( {title : undefined, id :''})
                    }else{
                      setSelectedRow( {title : row.getValue('title'), id :row.id})
                      setLoadingLength(4)
                    }
                     
                  }} className="p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]"><div  className="items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground flex h-8 w-8 p-0 data-[state=open]:bg-muted cursor-pointer "><ChevronDown   className={`h-4 w-4 stroke-1 ${selectedRow?.id == row.id && 'rotate-180'} transform duration-300 delay-150`}></ChevronDown></div></div>}
                  {(tabType.variable == 'Categories' && selectedRow?.id == row.id) && 
                <div  className={`col-span-8 col-start-2  transition-all ease-in-out duration-500 w-full `}>
                {isLoading ? 'loading...' : <div className=" grid grid-flow-row ">
                  {postData?.filter((item)=> item.blog_category === row.getValue('title'))[0] ?
                    
                    <>
                    <div id="Header" className="grid grid-cols-6 border-b border-t border-l  py-1 pl-2">{headerValues.map((item)=> <div className="col-span-2">{item}</div>)}</div>
                    {postData?.filter((item)=> item.blog_category === row.getValue('title')).map((item,index) => 
                    {
                        if(index+1 > loadinglenght )
                        {
                          return null;
                        }
                        return(
                          <div id="body" className="grid grid-cols-6 py-2 border-l border-b last:border-left last:border-b-0 pl-2"key={item.name}><span id="item" className="col-span-2">{item.title}</span><span id="item" className="col-span-2 flex ietms-center gap-2">{status.find((sub)=> item.published == sub.value)?.icon}{status.find((sub)=> item.published == sub.value)?.label}</span> <span id="item" className="col-span-2">{item.published_on?? '-'}</span> </div>
                        )
                    })} </>: (null)}{(postData ? postData?.filter((item)=> item.blog_category === row.getValue('title')).length : 0) > loadinglenght && <Button onClick={() => {setLoadingLength(200)}}>Load more...</Button>}</div>}
                </div>}
                </TableRow>
                
              
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          </Suspense>
        </Table>
      </div>
      {currentTab != 'Overview' && <DataTablePagination table={table} />}
    </div>
  )
}