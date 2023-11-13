
import React from "react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import {
    Card,
    CardContent,
  } from "@/components/ui/card"
  import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useHotkeys } from "react-hotkeys-hook";
import { useNavigate } from "react-router-dom";

export default function Overview ({className, children} : {className ?: string, children ?: React.ReactNode})
{
    const nav = useNavigate()
    useHotkeys('shift+p', 
        () => 
            {
            nav('/newPost')
    },{preventDefault : true});
    useHotkeys('shift+b', 
    () => 
        {
        nav('/newCategories')
},{preventDefault : true});
useHotkeys('shift+s', 
() => 
    {
        nav('/newBlogger')
},{preventDefault : true});
useHotkeys('shift+g', 
() => 
    {
    console.log('Do something!')
},{preventDefault : true});
    return (
        <div className={cn('flex flex-col w-full gap-[24px] max-w-[1100px]',className)}>
            <div className="flex flex-row gap-[15px] self-stretch items-center justify-center">
            <Card className="bg-[#F4F4F5] p-[24px] w-full h-[228px]">
            <CardContent className="flex flex-row justify-between items-start p-0 gap-[8px]">
                <div className="flex w-[273px] h-[180px] flex-col items-start gap-[8px] justify-center">
                    <h1 className="text-[#09090B] font-Inter text-[18px] font-semibold leading-[28px] mb-4">
                        Create your first blog post
                    </h1>
                    <p className="text-[#71717A] font-Inter text-[14px] font-medium leading-[20px]"
                    >Say hello to the world and let readers know what your blog is all about.</p>
                    <Link title='new post' to='/newPost'><Button className="flex items-center justify-center gap-2"><PlusCircle className="w-4 h-4 stroke1"></PlusCircle> New post</Button></Link>
                </div>
                <div className="flex-end items-center">
                    <img width={120} height={120} src="./src/public/image402.png" alt="image" />
                </div>
            </CardContent>
            </Card>
            <Card className="bg-[#F4F4F5] w-full p-[24px] h-[228px]">
            <CardContent className="flex flex-row justify-between items-start p-0 gap-[8px]">
                <div className="flex w-[273px] h-[180px] flex-col items-start gap-[8px] justify-center">
                    <h1 className="text-[#09090B] font-Inter text-[18px] font-semibold leading-[28px] mb-4">
                        Get Subscribers
                    </h1>
                    <p className="text-[#71717A] font-Inter text-[14px] font-medium leading-[20px]"
                    >Say hello to the world and let readers know what your blog is all about.</p>
                    <Link title='new post' to='/newPost'><Button className="flex items-center justify-center gap-2"><PlusCircle className="w-4 h-4 stroke1"></PlusCircle> New post</Button></Link>
                </div>
                <div className="flex-end items-center">
                    <img width={120} height={120} src="./src/public/image403.png" alt="image" />
                </div>
            </CardContent>
            </Card>
            </div>
            <Separator></Separator>
            {children}
            
        </div>
    )
}