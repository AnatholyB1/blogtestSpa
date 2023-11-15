import { Skeleton } from "@/components/ui/skeleton"
 
export function NavSkeleton() {
  return (
    <div className="flex flex-row justify-between items-center w-full  border-b py-2 px-2">
      <div className="flex items-center gap-2 ">
        <Skeleton className="h-[27px] w-[27px] " />
        <Skeleton className=" h-[14px] w-[80px]" />
        <Skeleton className=" h-[14px] w-[80px]" />
        <Skeleton className=" h-[14px] w-[80px]" />
      </div>
        <Skeleton className="h-[27px] w-[27px] rounded-full" />
    </div>
  )
}