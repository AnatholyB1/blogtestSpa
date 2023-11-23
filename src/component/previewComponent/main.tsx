
import { useContext, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Composer from "../playgroundComponent/composer";
import { TypeContext } from "@/provider/typeProvider";
import { Smartphone, Tablet, Monitor } from "lucide-react";
import { TabContextType } from "typing";
import { PostContext } from "@/provider/postProvider";

export default function Main ({className} : {className? : string}) {
    const view = useContext(TypeContext)
    const postContext = useContext(PostContext)
    const [isloading, setloading] = useState(true)
    const [content, setContent] = useState<any>()

    useEffect(() => {
        const temp = sessionStorage.getItem('block') ?? null
        if(temp)
        {
            setContent(JSON.parse(temp))
        }
    },[])

    useEffect(() => {
        if(typeof postContext.data?.content_json !== 'undefined')
        {
            setContent(JSON.parse(postContext.data.content_json).blocks)
        }
    },[postContext.data ])

    useEffect(() => {
        if(content)
        {
            setloading(false)
        }
    },[content])

    return(
        <section style={{height : 'calc(100vh - 5rem)'}} className={cn('p-5 flex flex-col gap-4 place-items-center bg-white/20 w-screen', className)}>
            {isloading ? <div>Loading...</div> :
                ( <>
                    <div className={`flex items-center py-2 px-4 rounded-md bg-[#E7F3FF] gap-x-4 transition-[width] duration-300
                        ${view.view == 'desktop' && 'w-[1536px]'} 
                        ${view.view == 'mobile' && 'w-[640px]'} 
                        ${view.view == 'tablet' && 'w-[1024px]'}`}>
                        <div className="text-white bg-[#3796FF] rounded-md p-2">
                            {view.view == 'desktop' && <Monitor className="w-4 h-4 storke-2"/> }
                            {view.view == 'mobile' && <Smartphone className="w-4 h-4 storke-2"/>}
                            {view.view == 'tablet' && <Tablet className="w-5 h-4 storke-2"/>}
                        </div>
                        <span className="text-[#3796FF] leading-trim text-cap font-Inter text-[14px] font-semibold leading-[19.5px]">
                            {view.view == 'desktop' && 'Desktop 1536' }
                            {view.view == 'mobile' && 'Mobile 640'}
                            {view.view == 'tablet' && 'Tablet 1024'}
                        </span>
                    </div>
                    <div className={`
                        ${view.view == 'desktop' && 'w-[1536px] h-full'} 
                        ${view.view == 'mobile' && 'w-[640px] h-full'} 
                        ${view.view == 'tablet' && 'w-[1024px] h-full'}
                        bg-white shadow-sm overflow-auto transition-[width] duration-300` }>
                        <Composer  page={view.previousPage ? view.previousPage : {} as TabContextType} state='view' value={content} viewOnly={true} ></Composer>
                    </div>
                </>
                )
        }
        </section>
    )
}