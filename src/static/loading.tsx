import { Skeleton } from "@/components/ui/skeleton"


export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <>
        <div className="h-screnn">
        <Skeleton className="h-screen">
          <Skeleton
            className="block dark:hidden w-8 h8"
          />
          <Skeleton
            className="hidden dark:block w-8 h-8"
          />
        </Skeleton>
        <Skeleton className="hidden md:block">
          <Skeleton className='rounded-none border-b border-none px-2 lg:px-4'/>
          <Skeleton className="border-t">
            <Skeleton className="bg-background">
              <Skeleton className="grid lg:grid-cols-5">
                <Skeleton  className="hidden lg:block pb-12" />
                <Skeleton  className="col-span-3 lg:col-span-4 lg:border-l">
                  <Skeleton className="h-full px-4 py-6 lg:px-8">
                       <Skeleton className="h-full flex-1 flex-col space-y-8 p-8 md:flex" ></Skeleton>      
                  </Skeleton>
                </Skeleton>
              </Skeleton>
            </Skeleton>
          </Skeleton>
        </Skeleton>
        </div>
      </>

    )
}


