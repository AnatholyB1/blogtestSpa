

import { useContext } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, Smartphone, Tablet, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TypeContext } from "@/provider/typeProvider";
import { useNavigate } from "react-router-dom";

export default function Headbar (className : {className ? : string}) {
    const preview = useContext(TypeContext)
    const router = useNavigate()
    return (
        <div className={cn("flex px-[32px] py-[16px] justify-between items-center self-stretch border-b border-[#EBEBED]", className)}>
            <Button variant={'ghost'} className="flex items-center gap-[5px]" onClick={() => router(preview.previousPage)}>
                <ChevronLeft className="w-4 h4 stroke-1"></ChevronLeft>
                <span className="text-black font-Inter text-[18px] font-semibold leading-[28px]">Back</span>
            </Button>
            <div className="flex items-start justify-center gap-[10px] self-stretch">
                <Button onClick={() => preview.changeView('mobile')} className="flex h-[40px] w-[40px] justify-center items-center p-0" variant={'secondary'}><Smartphone className="w-4 h-4 stroke-1"/></Button>
                <Button onClick={() => preview.changeView('tablet')} className="flex h-[40px] w-[40px] justify-center items-center p-0" variant={'secondary'}><Tablet className="w-5 h-4 stroke-1"/></Button>
                <Button onClick={() => preview.changeView('desktop')} className="flex h-[40px] w-[40px] justify-center items-center p-0" variant={'secondary'}><Monitor className="w-4 h-4 stroke-1"/></Button>
            </div>
        </div>
    )
}