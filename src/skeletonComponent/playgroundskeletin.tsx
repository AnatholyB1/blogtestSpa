import {Skeleton} from '@/components/ui/skeleton';


export const PlaygroundSkeleton = () => {
    return (
        <div className=' w-full py-2  pl-2 bg-white z-10 h-full' >
            <div className='grid grid-cols-2 grid-row-2 gap-6  w-[500px]' >
                <div className='col-span-1 flex flex-row gap-2 items-center'><Skeleton className='w-4 h-4'></Skeleton><Skeleton className='h-4 w-full'></Skeleton></div>
                <div className='col-span-1'><Skeleton className='h-[36px] w-[130px]'></Skeleton></div>
                <div className='col-span-2'><Skeleton className='h-[38px]'></Skeleton></div>
            </div>
        </div>
    )
}