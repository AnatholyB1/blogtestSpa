
import React from 'react';
import Heading from './heading';

const DraggableHeading: React.FC = () => {
  const handleDrag = (event : React.DragEvent<HTMLButtonElement>) => {
    event.dataTransfer.setData('text', event.currentTarget.id)
  };

  return (
      <button id='heading' draggable={true} onDragStart={handleDrag} className="cursor-grab flex w-[142px] py-[20px]  flex-col justify-center items-center gap-[16px] rounded-sm bg-[#E5F5FF]">
            <Heading/>
            <span className="text-[#00B2FF] text-center leading-trim text-cap font-Inter text-[14px] font-medium leading-[16px]">Heading</span>
      </button>
  );
};

export default DraggableHeading;
