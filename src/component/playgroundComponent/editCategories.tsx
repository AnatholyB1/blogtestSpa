

import "@blocknote/core/style.css";
import {useFrappeUpdateDoc, useFrappeFileUpload } from 'frappe-react-sdk'
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Textarea } from "@/components/ui/textarea"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import { Input } from "@/components/ui/input";
 
  import {ImagePlus } from "lucide-react"
  import { TypeContext } from "@/provider/typeProvider";


import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { CategoryContext } from "@/provider/categoryProvider";
 
const formSchema = z.object({
    description : z.string().min(0).max(50).default(''),
    title :  z.string({
        required_error: "Please select a title.",
      }).min(2,{
        message: "Title must be at least 2 characters.",
      }).max(50), 
    image : z.string().min(2).max(50).default(''),
    published :  z.boolean().default(false),
})



export default function EditCategory () {
    const typeContext = useContext(TypeContext)
    const getData = typeContext.data
    const {data : dataList} = getData()
    const data = dataList[parseInt(typeContext.variable)]
    const categoryContext = useContext(CategoryContext)
    const [file, setFile] = useState<File>()
    const { updateDoc, loading : docLoading, isCompleted } = useFrappeUpdateDoc()
    const {upload} = useFrappeFileUpload()
    const router = useNavigate()
    const [url , setUrl] = useState('')


    const handleFile = (target : FileList | null) => {
        if(target)
        {
            setFile(target[0])
            setUrl(URL.createObjectURL(target[0]))
        }
    }

    useEffect(() => {
        if(url != '' && categoryContext.update == 1)
        {
            form.setValue('image',url);
            form.handleSubmit(onSubmit)()
    
        }
    },[url])

    useEffect(() => {
        if(isCompleted && categoryContext.update == 1)
        {
            categoryContext.changeSubmit(2)
            router('/pages/blog')
        }
    },[isCompleted])

    useEffect(() =>{

        if(categoryContext.update == 1)
        {
            if(file)
            {
                upload(file,{
                    /** If the file access is private then set to TRUE (optional) */
                    "isPrivate": false,
                    "doctype" : "Blog Category",
                    "docname" : form.getValues('title'),
                    "fieldname" : "avatar"
                  }).then((response) => {setUrl(response.file_url)})
            }
            else{
                form.handleSubmit(onSubmit)();
            }
        }
    },[categoryContext.update])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues : {
            title : data?.title ?? 'Category title..',
            published  : data?.published ?? true,
            image : data?.image ?? '',
            description : data?.description ?? '',
        }
    })
    function onSubmit(values: z.infer<typeof formSchema>) {
        updateDoc("Blog Category", data.name,{
            ...values,
        })
      }

    return (
        <>
            {docLoading ? 'loading ...' :
             <Form {...form}>          
                <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem className="w-auto h-auto">
                            <FormLabel className="w-full h-full" htmlFor="image">
                                    {(field.value || url != '') ?  <img src={field.value ?  `https://dev.zaviago.com${field.value}`  : url} alt={'error'}/> : 
                                    <div className="flex flex-row items-center text-[#71717A] h-[36px]  w-[180px] rounded-md justify-center font-Inter text-[14px] gap-2 font-medium leading-[20px] hover:bg-[#F4F4F5]"
                                    ><ImagePlus className="w-4 h-4 stroke-1"></ImagePlus>Add a feature image</div> }
                                    <Input id="image" className="hidden" hidden={true} type='file' onChange={(e) => handleFile(e.target.files)} />
                            </FormLabel>
                            <FormControl>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                            <FormLabel></FormLabel>
                            <FormControl>
                                <input className="text-[#71717A] font-Inter text-[36px] font-extrabold leading-[40px] tracking[-0.9px] focus:outline-none" type='text' {...field}></input>
                            </FormControl>
                            <FormDescription>
                            </FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Add a note about the category orgive examples of what is included" {...field} />
                            </FormControl>
                            <FormDescription>
                            </FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                </form>
            </Form>  
            
            }
        
        </>
    );
}


