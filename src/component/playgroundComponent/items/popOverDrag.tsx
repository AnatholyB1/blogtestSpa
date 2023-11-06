import React from "react";
import { PictureInPicture2 } from "lucide-react";


export default function PopOverDrag () {
    const handleDrag = (event : React.DragEvent<HTMLButtonElement>) => {
        event.dataTransfer.setData('text', event.currentTarget.id)
      };

    return (
        <button id='popover' draggable={true} onDragStart={handleDrag} className="cursor-grab flex w-[142px] h-[133px] gap-[20px] flex-col justify-center items-center rounded-sm bg-[#F7E3F1]">
            <PictureInPicture2/>
            <span className="text-[#997BFF] text-center leading-trim text-cap font-Inter text-[14px] font-medium leading-[16px]">PopOver</span>
        </button>
    )
}