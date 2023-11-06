
import { AnimationContext } from "@/provider/animationProvider"
import { useContext } from "react"
import { X } from "lucide-react"



export default function SideApp () {
    const animation = useContext(AnimationContext)
    return (
        <div className={`sideApp ${animation.sideApp ? 'open' : ''} flex flex-col items-start gap-[16px] p-[24px] border-r border-gray-300 `}>
            <button className="absolute top-[24px] right-[24px]" onClick={() => animation.toggle('SideApp')} ><X className="w-[16px] h-[16px]"></X></button>
            <div className="flex flex-col items-start gap-[8px] self-stretch w-full h-auto">
                <h2 className="text-[#09090B] font-Inter font-medium text-[14px] leading-[20px]">Apps</h2>
                <p className="text-[#71717A] font-Inter font-medium text-[14px] leading-[20px]">All the application you have inside your WorkSpace</p>
            </div> 
            <div className="w-full h-auto" >App here</div>
        </div>
    )
}