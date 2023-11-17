

import "@blocknote/core/style.css";
import {useFrappeCreateDoc, useFrappeFileUpload } from 'frappe-react-sdk'
import { useEffect, useState } from 'react'
import { useContext } from "react";
import { Textarea } from "@/components/ui/textarea"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
  } from "@/components/ui/form"
  import { Input } from "@/components/ui/input";
 
  import { UploadCloud } from "lucide-react"


  


import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { CategoryContext } from "@/provider/categoryProvider";
import { useToast } from "@/components/ui/use-toast";
 
const formSchema = z.object({
    description : z.string().min(0).max(50).default(''),
    title :  z.string({
        required_error: "Please select a title.",
      }).min(2,{
        message: "Title must be at least 2 characters.",
      }).max(50), 
    image : z.string().min(0).max(50).default(''),
    published :  z.number().default(1),
})
import { LoadingStateContext } from "@/provider/loadinStateProvider";
import { cn } from "@/lib/utils";

interface NewCategoryProps extends React.FormHTMLAttributes<HTMLFormElement>  {
    className?: string,
    children?: React.ReactNode,
    hasImage? : boolean,
}


export default function NewCategory ({...props}:NewCategoryProps) {
    const categoryContext = useContext(CategoryContext)
    const [file, setFile] = useState<File>()
    const { createDoc, isCompleted , loading : updatedoc } = useFrappeCreateDoc()
    const {upload} = useFrappeFileUpload()
    const [loading, setloading] =  useState(true)
    const [url , setUrl] = useState('')
    const {toast} = useToast()
    const [preview, setPreview] = useState<string >('undefined');
    const loadingState = useContext(LoadingStateContext)

    useEffect(() => {
        if(updatedoc === true)
        {   
            loadingState.setLoading(updatedoc)
        }
    },[updatedoc ])

    useEffect(() => {
        if(isCompleted === true){
        loadingState.setCompleted(true)}
    },[isCompleted])

    useEffect(() => {console.log(preview)},[preview])


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues : {
            description : '',
            title : '',
            published : 1,
        }
    })

    useEffect(() => {
        if(sessionStorage.getItem('category'))
        {
   
  
            form.setValue('title',JSON.parse(sessionStorage.getItem('category')!).title)
            form.setValue('published',JSON.parse(sessionStorage.getItem('category')!).published)
            form.setValue('image',JSON.parse(sessionStorage.getItem('category')!).image)
            form.setValue('description',JSON.parse(sessionStorage.getItem('category')!).description)
            setPreview(JSON.parse(sessionStorage.getItem('category')!).image ?  'https://dev.zaviago.com' + JSON.parse(sessionStorage.getItem('category')!).image : 'undefined')
            setloading(false)
        }else{
            setloading(false)
        }
        if(sessionStorage.getItem('image'))
        {
            setPreview(sessionStorage.getItem('image')!)
        }
    },[])

    function onSubmit(values: z.infer<typeof formSchema>) {
        createDoc("Blog Category", {
            ...values,
        }).then((response) => {response ? toast({title :'New category created !' , description: form.getValues('title')}) : toast({variant : 'destructive',title: 'Category not created'})})
      }


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
        if(url != '' &&  categoryContext.update )
        {
            form.setValue('image',url);
        }
    },[url])

    useEffect(() => {
        if(form.getValues('image') != '' && categoryContext.update)
        {
            form.handleSubmit(onSubmit, (errors) => {toast({variant : 'destructive', title : 'Error', description : 'errors'}), categoryContext.changeSubmit(false)})()

        }
    },[form.watch('image')])

    useEffect(() => {

        if(form.getValues())
        {
            sessionStorage.setItem('category',JSON.stringify(form.getValues()))
        }
    },[form.watch('description'), form.watch('title'), form.watch('published')])

    useEffect(() => {
        if(isCompleted && categoryContext.update)
        {
            categoryContext.changeSubmit(false)
            
        }
    },[isCompleted])

    useEffect(() => {
        if(typeof categoryContext.dataList != 'undefined')
        {
            const current = categoryContext.dataList
 

            const index = current?.findIndex((item) => item.title == form.getValues().title)

            index != -1 && categoryContext.changeVariable(index!.toString())
            form.reset()
        }
    },[categoryContext.dataList])

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
                form.handleSubmit(onSubmit, (errors) => {toast({variant : 'destructive', title : 'Error', description : 'errors'}), categoryContext.changeSubmit(false)})()

            }
        }
    },[categoryContext.update, file])



    return (
        <>
            {loading ? 'loading ...' :
             <Form  {...form}>          
                <form title={props.title!} className={cn('flex flex-col gap-4',props.className)} {...props} onSubmit={form.handleSubmit(onSubmit)}>

                    <>{props.title && <h1 className="text-[#09090B] font-Inter text-[18px] font-semibold leading-[28px] mb-4">{props.title}</h1>}</>
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                            <FormLabel>Title <span className="text-[#FF3131]">*</span></FormLabel>
                            <FormControl>
                                <Input placeholder="Category title..."  type='text' {...field}></Input>
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
                        {!props.hasImage && <FormField
                        control={form.control}
                        name="image"
                        render={() => (
                            <FormItem className="w-auto h-auto">
                            <FormLabel className="relative w-full h-full " htmlFor="image"> 
                                    {preview === 'undefined' ?                                         <>
                                            <div title='header' className="w-full h-[16rem] border rounded-md shadow-sm  button-text"></div>
                                            <div className="absolute top-1/2 left-1/2 origin-center -translate-x-1/2 -translate-y-1/2  ">
                                            <div className="flex flex-col items-center gap-2  ">
                                                <div className="flex items-center justify-center w-10 h-10 bg-slate-200/50 cursor-pointer rounded-full hover:bg-slate-200"><UploadCloud className="stroke-1"/></div>
                                                <h2>Click to upload image</h2>
                                                <p className="text-muted-foreground  text-center">PNG or JPEG (max. 800x400px)</p>
                                            </div>                                           
                                            </div>
                                        </> :
                                    <img className={`w-full h-[16rem] object-cover boder rounded-md shqdow-sm  `} src={preview} alt="no image"/>}
                                    <Input id="image" className="hidden" hidden={true} type='file' onChange={(e) => handleFile(e.target.files)} />
                            </FormLabel>
                            <FormControl>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />}
                </form>
            </Form>  
            
            }
        
        </>
    );
}


