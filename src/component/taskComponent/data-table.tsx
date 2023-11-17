

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
import {  TabContextType } from "typing"



interface DataTableProps<TData, TValue> {
  columns: (ColumnDef<TData, TValue>)[]
  data: TData[]
  currentTab : TabContextType
}


const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];



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

  const router = useNavigate()
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )

  const [sorting, setSorting] = React.useState<SortingState>([])

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
    <div className="space-y-4 w-full ">
      {currentTab != 'Overview' ? <DataTableToolbar table={table} /> : <h1 className="text-[#09090B] font-Inter text-[18px] font-semibold leading-[28px]"
>Track your latest posts</h1>}
      <div className="rounded-md border">
        <Table>
          <TableHeader >
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
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
                  className=" "
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => {
                    if(cell.column.id == 'published_on')
                    {
                      if(new Date(cell.renderValue() as string).toString() != 'Invalid Date')
                      {
                        const item = new Date(cell.renderValue() as string)
                        return(
                          <TableCell  key={cell.id}   onClick={() => {cell.getValue()? setGoView(cell.id) : null}} >
                            {`${new Date(item).getDate()} ${monthNames[new Date(item).getMonth()]} ${new Date(item).getFullYear()}`}
                          </TableCell>)
                      
                      }
                    }
                    return(
                    <TableCell  key={cell.id}   onClick={() => {cell.getValue()? setGoView(cell.id) : null}} >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>)
                  })}
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

/*
                      setLoadingLength(4)
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];
  const {data : postData, isLoading} = useFrappeGetDocList<DataDocList>('Blog Post',{fields:['*'],limit : 200});
    const [loadinglenght, setLoadingLength] = React.useState<number>(4)
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
          <div id="body" className="grid grid-cols-6 py-2 border-l border-b last:border-left last:border-b-0 pl-2"key={item.name}><span id="item" className="col-span-2">{item.title}</span><span id="item" className="col-span-2 flex ietms-center gap-2">{status.find((sub)=> item.published == sub.value)?.icon}{status.find((sub)=> item.published == sub.value)?.label}</span> <span id="item" className="col-span-2">{item.published_on? `${new Date(item.published_on).getDate()} ${monthNames[new Date(item.published_on).getMonth()]} ${new Date(item.published_on).getFullYear()}`: '-'}</span> </div>
        )
    })} </>: (null)}{(postData ? postData?.filter((item)=> item.blog_category === row.getValue('title')).length : 0) > loadinglenght && <Button onClick={() => {setLoadingLength(200)}}>Load more...</Button>}</div>}
</div>}*/