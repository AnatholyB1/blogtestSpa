import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonHeader = () => {
    return(
        <div className="flex flex-row justify-between items-center w-full border-b py-2 px-2">
            <div className="flex items-center gap-2  w-[300px]">
                <Skeleton className="h-[14px] w-[14px] " />
                <Skeleton className=" h-[14px] w-[80px]" />
                <Skeleton className=" w-[120px] h-[36px]" />
            </div>
            <div className="flex items-center gap-2 ">
                <Skeleton className="h-[36px] w-[45px] " />
                <Skeleton className="h-[36px] w-[45px] " />
                <Skeleton className="h-[36px] w-[36px] " />
            </div>
        </div>
    )

}
