
import React from "react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import {
    Card,
    CardContent,
  } from "@/components/ui/card"
  import { Button } from "@/components/ui/button";
import { Bell, PlusCircle } from "lucide-react";

export default function Overview ({className, children} : {className ?: string, children ?: React.ReactNode})
{
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
                    <Button className="flex items-center justify-center gap-2"><PlusCircle className="w-4 h-4 stroke1"></PlusCircle> New post</Button>
                </div>
                <div className="flex-end items-center">
                    <img width={120} height={120} src="/image402.png" alt="image" />
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
                    <Button className="flex items-center justify-center gap-2"><PlusCircle className="w-4 h-4 stroke1"></PlusCircle> New post</Button>
                </div>
                <div className="flex-end items-center">
                    <img width={120} height={120} src="@public/image403.png" alt="image" />
                </div>
            </CardContent>
            </Card>
            </div>
            <Separator></Separator>
            {children}
            <Separator></Separator>
            <div className="flex flex-col flex-start flex-1">
                <h1 className="text-[#09090B] font-Inter text-[18px] font-semibold leading-[28px]">
                    Start a post with a template</h1>
                <h2 className="text-[#71717A] font-Inter text-[16px] font-normal leading-[24px]">
                    Choose a template</h2>
            </div>
            <div className="flex flex-row gap-[20px] self-stretch items-center justify-center">
            <Card className="w-full h-auto px-[8px] py-[14px]">
            <CardContent className="flex flex-row justify-between items-start p-0 gap-[16px]">
                <img src={'/image404.png'} width={57} height={57} alt="image"/>
                <div className="flex w-full h-auto flex-col items-start gap-[8px] justify-center">
                    <h1 className="text-[#09090B] font-Inter text-[14px] font-semibold leading-[20px]">
                        Welcome blog
                    </h1>
                    <p className="text-[#71717A] font-Inter text-[14px] font-medium leading-[20px]"
                    >Email digest, mentions & all activity.</p>
                </div>
            </CardContent>
            </Card>
            <Card className="w-full h-auto px-[8px] py-[14px]">
            <CardContent className="flex flex-row justify-between items-start p-0 gap-[16px]">
                <div className="flex items-center h-[48px]"><Bell className="w-[20x] h-[20px] stroke-1"></Bell></div>
                <div className="flex w-full h-auto flex-col items-start gap-[8px] justify-center">
                    <h1 className="text-[#09090B] font-Inter text-[14px] font-semibold leading-[20px]">
                        How to
                    </h1>
                    <p className="text-[#71717A] font-Inter text-[14px] font-medium leading-[20px]"
                    >Email digest, mentions & all activity.</p>
                </div>
            </CardContent>
            </Card>
            <Card className="w-full h-auto px-[8px] py-[14px]">
            <CardContent className="flex flex-row h-full justify-between items-start p-0 gap-[16px]">
                <div className="flex items-center h-[48px]"><Bell className="w-[20x] h-[20px] stroke-1"></Bell></div>
                <div className="flex w-full h-auto flex-col items-start gap-[8px] justify-center">
                    <h1 className="text-[#09090B] font-Inter text-[14px] font-semibold leading-[20px]">
                        Everything
                    </h1>
                    <p className="text-[#71717A] font-Inter text-[14px] font-medium leading-[20px]"
                    >Email digest, mentions & all activity.</p>
                </div>
            </CardContent>
            </Card>
            </div>
            <div className="flex flex-row gap-[24px] ">
            <Card className="bg-[#F4F4F5] p-[24px]  w-full h-[213px]">
            <CardContent className="flex flex-row w-full h-auto justify-between items-start p-0 gap-[8px]">
                <div className="flex w-full h-auto flex-col items-start gap-[8px] justify-center">
                    <h1 className="text-[#09090B] font-Inter text-[18px] font-semibold leading-[28px] mb-[8px] mt-[16px]">
                    Check out the Blogging Guide
                    </h1>
                    <p className="text-[#71717A] font-Inter text-[14px] font-medium leading-[20px] mb-[15px]"
                    >Say hello to the world and let readers know what your blog is all about.</p>
                    <Button variant={'secondary'} className="flex items-center justify-center gap-2"><PlusCircle className="w-4 h-4 stroke1"></PlusCircle> Read the guide</Button>
                </div>
                <div className="flex-end items-center">
                    <img width={120} height={120} src="/image403.png" alt="image" />
                </div>
            </CardContent>
            </Card>
            <Card className="bg-[#F4F4F5] p-[24px] h-[213px] w-auto">
            <CardContent className="flex flex-row justify-between items-start p-0 gap-[8px]">
                <div className="flex w-auto h-auto flex-col items-start gap-[8px] justify-center">
                    <h1 className="mt-[16px] mb-[8px] text-[#09090B] font-Inter text-[18px] font-semibold leading-[28px]">
                        We're here for you
                    </h1>
                    <p className="text-[#71717A] mb-[15px] font-Inter text-[14px] font-medium leading-[20px]"
                    >Get help with the ins and outs of your blog, or ask our experts in the community forum.</p>
                    <Button variant={'ghost'} className="flex items-center justify-center gap-2"><PlusCircle className="w-4 h-4 stroke1"></PlusCircle> Visit help Center</Button>
                </div>

            </CardContent>
            </Card>
            </div>
        </div>
    )
}