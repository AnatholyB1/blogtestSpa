

import { ColumnDef } from "@tanstack/react-table"


import { Checkbox } from "@/components/ui/checkbox"

import { Badge } from "@/components/ui/badge"
import { statuses } from "../taskData/data"
import { Task , CategoryTab, BloggerType, PageTab, SystemPageTab} from "typing"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar"
import { useFrappeGetDocList } from "frappe-react-sdk"


function getData() {
  var {data} = useFrappeGetDocList('Blog Post', { fields: [ 'title', 'blog_category'] , limit : 200})
   return data
}

function getavatar() {
  var {data} = useFrappeGetDocList('Blogger', { fields: [ 'avatar','full_name'] , limit : 200})
   return data
}


export const columnsTask: ColumnDef<(Task)>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" className="w-[600px]"/>
    ),
    cell: ({ row }) => {
      const label = getData()?.find((item) => item.title === row.original.title)

      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.blog_category}</Badge>}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("title")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      )

      if (!status) {
        return null
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "published_on",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Published On" />
    ),
    cell: ({ row }) => {

      return (
        <div className="flex items-center">
          <span>{row.getValue('published_on')}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: "actions",
    cell: ({ row , table}) => <DataTableRowActions row={row} table={table}/>,
  },
]

export const columnsPage: ColumnDef<(PageTab)>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
  },{
      accessorKey: "title",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Title" className="w-[600px]"/>
      ),
      cell: ({ row }) => {
  
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("title")}
            </span>
          </div>
        )
      },
    },
    {
      accessorKey: "published_on",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Published On" />
      ),
      cell: ({ row }) => {
  
        return (
          <div className="flex items-center">
            <span>{row.getValue('published_on')}</span>
          </div>
        )
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
    },
    {
      id: "actions",
      cell: ({ row , table}) => <DataTableRowActions row={row} table={table}/>,
    },
]

export const columnsSystemPage: ColumnDef<(SystemPageTab)>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
  },{
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" className="w-[600px]"/>
    ),
    cell: ({ row }) => {

      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("title")}
          </span>
        </div>
      )
    },
  },
  {
    id: "published_on",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Published On" />
    ),
    cell: ({ row }) => {

      return (
        <div className="flex items-center">
          <span>{row.getValue('published_on')}</span>
        </div>
      ) 
    },
  }]

export const columnsCategory: ColumnDef<(CategoryTab)>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title"  className="w-[600px]"/>
    ),
    cell: ({ row }) => {

      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("title")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      )

      if (!status) {
        return null
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: "actions",
    cell: ({ row , table}) => <DataTableRowActions row={row} table={table}/>,
  },
]


export const columnsBlogger: ColumnDef<(BloggerType)>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => {table.toggleAllPageRowsSelected(!!value)}}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" className="w-[600px]" />
    ),
    cell: ({ row }) => {
      console.log(row)
      return (
        <div className="flex space-x-2">
                  <Avatar className="rounded-1 bg-grey">
                    <AvatarImage  className="h-6 w-6 rounded-[50%]" src={`https://dev.zaviago.com${getavatar()?.find((item)=> item.full_name == row.getValue('name')).avatar}`} />
                    <AvatarFallback className="rounded-1 bg-grey">CN</AvatarFallback>
                  </Avatar>
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("name")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" className="w-[100px]" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => row.getValue('disabled') ? status.value == "Drafted" : status.value == "Published" 
      )

      if (!status) {
        return null
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: "actions",
    cell: ({ row , table}) => <DataTableRowActions row={row} table={table} />,
  },
]