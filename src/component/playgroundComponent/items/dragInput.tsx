
import React from "react";
import Input from "./input";


export default function DragInput () {
    const handleDrag = (event : React.DragEvent<HTMLButtonElement>) => {
        event.dataTransfer.setData('text', event.currentTarget.id)
      };
    return (
        <button id='input' draggable={true} onDragStart={handleDrag} 
        className="cursor-grab flex w-[142px] h-[133px] flex-col justify-center items-center rounded-sm bg-[#F7E3F1]">
            <Input></Input>
            <span className="text-[#B90C21] text-center leading-trim text-cap font-Inter text-[14px] font-medium leading-[16px]">Input</span>
        </button>
    )
}