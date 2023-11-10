

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
import { Category } from "typing";
import {useToast} from "@/components/ui/use-toast";
 
const formSchema = z.object({
    description : z.string().min(0).max(100).default(''),
    title :  z.string({
        required_error: "Please select a title.",
      }).min(2,{
        message: "Title must be at least 2 characters.",
      }).max(50), 
    image : z.string().min(0).default(''),
    published :  z.number().default(1),
})



export default function EditCategory () {
    const typeContext = useContext(TypeContext)
    const getData = typeContext.data
    const {data : dataList} = getData()
    const [data, setData] = useState<Category>()
    const categoryContext = useContext(CategoryContext)
    const [loading, setloading] =  useState(true)
    const [file, setFile] = useState<File>()
    const { updateDoc, isCompleted } = useFrappeUpdateDoc()
    const {upload} = useFrappeFileUpload()
    const router = useNavigate()
    const [url , setUrl] = useState('')
    const [preview, setPreview] = useState<string | null>(null);
    const {toast} = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues : {
            title : data?.title ?? 'Category title..',
            published  : data?.published ?? 1,
            image : data?.image ?? '',
            description : data?.description ?? '',
        }
    })
    function onSubmit(values: z.infer<typeof formSchema>) {
        updateDoc("Blog Category", data?.name ? data.name : '',{
            ...values,
        }).then((response) => {response ? toast({title :'Category updated'}) : toast({title :'Error', description : 'An error occured'})})
      }
    
        useEffect(() => {
        if(sessionStorage.getItem('category'))
        {
   
  
            form.setValue('title',JSON.parse(sessionStorage.getItem('category')!).title)
            form.setValue('published',JSON.parse(sessionStorage.getItem('category')!).published)
            form.setValue('image',JSON.parse(sessionStorage.getItem('category')!).image)
            form.setValue('description',JSON.parse(sessionStorage.getItem('category')!).description)
            setPreview( 'https://dev.zaviago.com' + JSON.parse(sessionStorage.getItem('category')!).image ?? undefined)
            setloading(false)
        }
        if(sessionStorage.getItem('image'))
        {
            setPreview(sessionStorage.getItem('image'))
        }
    },[])

    useEffect(() => {
        if(data){
       
            form.setValue('title',data.title)
            form.setValue('published',data.published)
            form.setValue('image',data.image)
            form.setValue('description',data.description)
            setPreview( "https://dev.zaviago.com" + data.image ?? undefined)
            sessionStorage.setItem('category',JSON.stringify(data))
            setloading(false)
        }

    },[data])

    useEffect(() => {
        if(dataList)
        {
            setData(dataList[parseInt(typeContext.variable)])
        }
    },[dataList])



    useEffect(() => {

        if(form.getValues())
        {
            sessionStorage.setItem('category',JSON.stringify(form.getValues()))
        }
    },[form.watch('description'), form.watch('title'), form.watch('published')])


    const handleFile = (target : FileList | null) => {
        if(target)
        {
            setFile(target[0])
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string)
                sessionStorage.setItem('image', reader.result as string )
            };
            reader.readAsDataURL(target[0]);
            
        }
    }

    useEffect(() => {
        if(url != '' && categoryContext.update)
        {
            form.setValue('image',url);
        }
    },[url])

    useEffect(() => {
        if(form.getValues('image') != '' && categoryContext.update )
        {
            form.handleSubmit(onSubmit, (errors) => { toast({variant : 'destructive', title : 'Error', description : 'errors'}), categoryContext.changeSubmit(false)})()

        }
    },[form.watch('image')])

    useEffect(() => {
        
        if(isCompleted && categoryContext.update )
        {
            categoryContext.changeSubmit(false)
            form.reset()
            router('/')
        }
    },[isCompleted])

    useEffect(() =>{
   
        if(categoryContext.update )
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
              
                form.handleSubmit(onSubmit, (errors) => { toast({variant : 'destructive', title : 'Error', description : 'errors'}), categoryContext.changeSubmit(false)})()
            }
        }
    },[categoryContext.update, file])

  

    return (
        <>
            {loading ? 'loading ...' :
             <Form {...form}>          
                <form className="space-y-4 h-full " onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="image"
                        render={() => (
                            <FormItem className="w-auto h-auto">
                            <FormLabel className="w-full h-full" htmlFor="image">
                                    {preview ?  
                                        <img className="w-full h-[16rem] object-cover  bg-Slot " src={preview} alt="no image"/> : 
                                        <div title='header' className="w-full h-[16rem]  bg-Slot button-text"></div>
                                    }
                                    <div className="flex flex-row items-center text-[#71717A] h-[36px]  w-[180px] rounded-md justify-center font-Inter text-[14px] gap-2 font-medium leading-[20px] hover:bg-[#F4F4F5]"
                                    ><ImagePlus className="w-4 h-4 stroke-1"></ImagePlus>Add a feature image</div> 
                                    <Input id="image" accept=".png, .jpg, .jpeg" className="hidden" hidden={true} type='file' onChange={(e) => handleFile(e.target.files)} />
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
                                <Textarea {...field} placeholder="Add a note about the category orgive examples of what is included" />
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


