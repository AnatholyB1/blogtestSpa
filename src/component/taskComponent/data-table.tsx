

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
import { TabContextType } from "typing"

interface DataTableProps<TData, TValue> {
  columns: (ColumnDef<TData, TValue>)[]
  data: TData[]
  currentTab : TabContextType
}

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
    <div className="space-y-4 w-full">
      {currentTab != 'Overview' ? <DataTableToolbar table={table} /> : <h1 className="text-[#09090B] font-Inter text-[18px] font-semibold leading-[28px]"
>Track your latest posts</h1>}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} >
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
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}   onClick={() => {cell.getValue()? setGoView(cell.id) : null}} >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
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