
import { cn } from "@/lib/utils";
import React, {useState} from "react";
import { Input } from "@/components/ui/input";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"
import { PostContext } from "@/provider/postProvider"
import { useContext, useEffect } from "react"
import { Button } from "@/components/ui/button";
import { ImagePlus } from "lucide-react";


export default function FileSelection ({mode} : {mode : string} ) {
    const [preview, setPreview] = useState<string | null>(null);
    const postContext = useContext(PostContext);
    useEffect(() => {
      if (postContext.data?.meta_image && !preview && mode != 'new')
      {
        setPreview('https://dev.zaviago.com' + postContext.data.meta_image)
      }
    })
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        postContext.ChangeObject(undefined,'image',file)
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setPreview(null);
      }
    };


  
    return (
        <div className="" >
        <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <label htmlFor="add_image">
          <Button variant={'ghost'} className="gap-2"><ImagePlus className="w-4 h-4 stroke-1"></ImagePlus><span>Change feature image</span></Button>
          <input id="add_image"    type="file" accept=".svg, .png, .jpeg" onChange={handleFileChange} className={'hidden'}></input>
          </label>
        </HoverCardTrigger>
        <HoverCardContent
          align="start"
          className="w-[260px] text-sm"
          side={'right'}
        >
          Chosse the image to add as header
        </HoverCardContent>
      </HoverCard>
        {preview && (
        <img src={preview} alt="Preview" />
        )}
        </div>
    )
}