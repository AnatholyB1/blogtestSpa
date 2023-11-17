
import React, {useState} from "react";
import { PostContext } from "@/provider/postProvider"
import { useContext, useEffect } from "react"
import { ImagePlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { TabContextType } from "typing";
import { PageContext } from "@/provider/pageProvider";
import { SystemPageContext } from "@/provider/SystemPageProvider";


export default function FileSelection ({mode, className, page} : {page : TabContextType, mode : string, className? : string} ) {
    const [preview, setPreview] = useState<string | null>(null);
    const postContext = useContext(PostContext);
    const pageContext = useContext(PageContext)
    const sysCont = useContext(SystemPageContext)
    useEffect(() => {
      if(sessionStorage.getItem('image'))
      {

        setPreview(sessionStorage.getItem('image'))

      }else{

      switch(page)
      {
        case 'Post':
          if (postContext.data?.meta_image && !preview )
          {

            setPreview('https://dev.zaviago.com' + postContext.data.meta_image)
            sessionStorage.setItem('image', 'https://dev.zaviago.com' + postContext.data.meta_image)
          }
          break;
        case 'Page':
          if (pageContext.data?.meta_image && !preview )
          {

            setPreview('https://dev.zaviago.com' + pageContext.data.meta_image)
            sessionStorage.setItem('image', 'https://dev.zaviago.com' + pageContext.data.meta_image)
          }
          break;
        case 'SystemPage':
          if(sysCont.data?.meta_image && !preview )
          { 

            setPreview('https://dev.zaviago.com' + sysCont.data.meta_image)
            sessionStorage.setItem('image', 'https://dev.zaviago.com' + sysCont.data.meta_image)
          }
          break;
      }
      }
    },[])



    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        postContext.ChangeObject(undefined,'image',file)
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
          sessionStorage.setItem('image', reader.result as string )
        };
        reader.readAsDataURL(file);
      } else {
        setPreview(null);
      }
    };


  
    return (
            <section className={cn("w-full h-auto  bg-white",className)}>
                <label htmlFor="input_add_image">
                  <div title="Header" className="w-full h-auto grid grid-flow-row place-items-start gap-4">
                    {preview &&
                      (
                        <img className="w-full h-[16rem] object-cover  bg-Slot " src={preview} alt="Preview" />
                      ) 
                    }
                     {mode != 'view' && (<div title='change image' id="buton_add_image" className="gap-2 flex flex-row px-[16px] py-[8px] hover:bg-secondary items-center rounded-md text-gray-700/60 font-[Inter] text-sm font-medium leading-3"><ImagePlus className="w-4 h-4 stroke-1"></ImagePlus><span>Change feature image</span></div>)}
                  </div>
                  {mode != 'view' && (<input   id="input_add_image"  type="file" accept=".svg, .png, .jpeg" onChange={handleFileChange} className={'hidden'}></input>)}
                </label>
            </section>
    )
}