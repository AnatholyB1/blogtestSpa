
import { useContext } from "react";
import { cn } from "@/lib/utils";
import Composer from "../playgroundComponent/composer";
import { TypeContext } from "@/provider/typeProvider";
import { Smartphone, Tablet, Monitor } from "lucide-react";


export default function Main (className : {className? : string}) {
    const view = useContext(TypeContext)
    return (
        <div className={cn('preview ', className)}>
            <div className={`h-[42px] flex justify-start px-[15px] gap-[15px] items-center self-stretch shrink-0 rounded-md bg-[#E7F3FF] ${view.view == 'desktop' && 'w-full'} ${view.view == 'mobile' && 'w-[414px]'} ${view.view == 'tablet' && 'w-[1024px]'}`}>
                <div className="text-white bg-[#3796FF] rounded-md p-2">
                {view.view == 'desktop' && <Monitor className="w-4 h-4 storke-2"/> }{view.view == 'mobile' && <Smartphone className="w-4 h-4 storke-2"/>}{view.view == 'tablet' && <Tablet className="w-5 h-4 storke-2"/>}
                </div>
                <span className="text-[#3796FF] leading-trim text-cap font-Inter text-[14px] font-semibold leading-[19.5px]">{view.view == 'desktop' && 'Desktop 1440' }{view.view == 'mobile' && 'Mobile 360'}{view.view == 'tablet' && 'Tablet 600'}</span>
            </div>
            <Composer value={view.block} viewOnly={true} className={`${view.view == 'desktop' && 'w-full h-full'} ${view.view == 'mobile' && 'w-[414px] h-[896px]'} ${view.view == 'tablet' && 'w-[1024px] h-[600px]'} bg-white rounded-md shadow-sm` }></Composer>
        </div>
    )
}