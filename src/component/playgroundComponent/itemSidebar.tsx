
import{ useContext } from "react";
import { cn } from "@/lib/utils";
import { AnimationContext } from "@/provider/animationProvider";
import DraggableHeading from "./items/dragHeading";
import DragHorinzontalRule from "./items/dragHorizontalRule";
import DragInput from "./items/dragInput";
import PopOverDrag from "./items/popOverDrag";

export default function ItemSideBar ({className} : {className ? : string}) {
    const animation = useContext(AnimationContext)
    return(
        <div className={cn(className,`ItemSideBar ${animation.itemSideBar  ? 'open' : ''} border-r border-solid border-gray-300 bg-white h-screen`)}>
            <div className="flex flex-col px-[12px] items-start gap-[8px] self-stretch">
                <h2 className="w-full text-[#797979] font-Inter text-[14px] font-semibold leading-[28px] tracking-wide">Elements</h2>
                <div className="flex justify-between items-start content-start gap-y-[8px] self-stretch flex-wrap">
                    <DraggableHeading></DraggableHeading>
                    <DragHorinzontalRule></DragHorinzontalRule>
                    <DragInput/>
                    <PopOverDrag/>
                </div>
            </div>
        </div>
    )
}