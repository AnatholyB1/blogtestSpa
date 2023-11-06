
import "@blocknote/core/style.css";
import {useFrappeUpdateDoc} from 'frappe-react-sdk'
import { BloggerType } from "typing";
import {useFrappeGetDocList, useFrappeFileUpload } from 'frappe-react-sdk'
import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { BloggerContext } from "@/provider/BloggerProvider";
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
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
  import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
  } from "@/components/ui/command"
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
  import { Check, ChevronsUpDown } from "lucide-react"
  import { Button } from "@/components/ui/button";
  import { cn } from "@/lib/utils";
  


import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
 
const formSchema = z.object({
    bio : z.string().min(0).max(50).default(''),
    full_name :  z.string({
        required_error: "Please select a User.",
      }).min(2,{
        message: "Please select a User.",
      }).max(50), 
    avatar : z.string().min(2).max(50).default(''),
    disabled :  z.boolean().default(false),
    short_name :  z.string().min(2).max(50).default(''),
})





export default function NewBlogger () {
    const bloggerContext = useContext(BloggerContext)
    const data = bloggerContext.data? bloggerContext.data : {} as BloggerType;
    const { updateDoc, loading : docLoading, isCompleted } = useFrappeUpdateDoc()
    const [file, setFile] = useState<File>()
    const {upload} = useFrappeFileUpload()
    const router = useNavigate()
    const [url , setUrl] = useState('')
    const {data : Users} = useFrappeGetDocList('User', {fields : ['full_name'], filters : [['user_type', '=' , 'System User']],limit: 200})
    const [open, setOpen] = React.useState(false)

    const handleFile = (target : FileList | null) => {
        if(target)
        {
            setFile(target[0])
            setUrl(URL.createObjectURL(target[0]))
        }
    }

    useEffect(() => {
        if(url != '' && bloggerContext.update == 1)
        {
            form.setValue('avatar',url);
            form.handleSubmit(onSubmit)()
    
        }
    },[url])

    useEffect(() => {
        if(isCompleted && bloggerContext.update == 1)
        {
            bloggerContext.changeSubmit(2)
            router('/')
        }
    },[isCompleted])

    useEffect(() =>{

        if(bloggerContext.update == 1)
        {
            if(file)
            {
                upload(file,{
                    /** If the file access is private then set to TRUE (optional) */
                    "isPrivate": false,
                    "doctype" : "Blogger",
                    "docname" : form.getValues('short_name'),
                    "fieldname" : "avatar"
                  }).then((response) => {setUrl(response.file_url)})
            }
            else{
                form.handleSubmit(onSubmit)();
            }
        }
    },[bloggerContext.update])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues : {
            full_name : data?.full_name ?? "Writer Name",
            bio : data?.bio ?? '',
            disabled  : data?.disabled ?? false,
            avatar : data?.avatar ?? '',
            short_name : data?.short_name ?? '',
        }
    })
    function onSubmit(values: z.infer<typeof formSchema>) {
        updateDoc("Blogger", data.name,{
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
                        name="avatar"
                        render={({ field }) => (
                            <FormItem className="w-[107px] h-[107px]">
                            <FormLabel className="w-full h-full" htmlFor="avatar">
                                <Avatar className="w-full h-full">
                                    <AvatarImage src={field.value ?  `https://dev.zaviago.com${field.value}` : url} />
                                    <AvatarFallback>{form.getValues('short_name') ? form.getValues('short_name') : 'CN'}</AvatarFallback>
                                    <Input id="avatar" className="hidden" hidden={true} type='file' onChange={(e) => handleFile(e.target.files)} />
                                </Avatar>
                            </FormLabel>
                            <FormControl>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <h1 className="text-[#71717A] font-Inter text-[36px] font-extrabold leading-[40px] tracking[-0.9px]">{form.getValues('full_name')}</h1>
                    <FormField
                        control={form.control}
                        name="bio"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Bio</FormLabel>
                            <FormControl>
                                <Textarea placeholder="write something about the writer." {...field} />
                            </FormControl>
                            <FormDescription>
                                You can @mention other users and organizations to link to them.
                            </FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    <FormField
                        control={form.control}
                        name="full_name"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                            <FormLabel>Admin User</FormLabel>
                                <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                <FormControl>
                                    <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    className={cn(
                                        "w-full justify-between",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                    {field.value != 'Writer Name'
                                        ? field.value
                                        : "Select Admin User in team..."}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0">
                                    <Command>
                                        <CommandInput className="h-9" placeholder="Select Admin User in team..."/>                        
                                            <CommandEmpty>No results found.</CommandEmpty>
                                            <CommandGroup heading="System User" className="overflow-y-auto h-[200px]">
                                                {Users && Users.map((user, index) => (
                                                <CommandItem key={index} value={user.full_name} 
                                                onSelect={() => {
                                                    form.setValue('full_name', user.full_name)
                                                    form.setValue('short_name', user.full_name)
                                                    setOpen(false)
                                                }}>{user.full_name}
                                                    <Check
                                                        className={cn(
                                                            "ml-auto h-4 w-4",
                                                            field.value === user.full_name ? "opacity-100" : "opacity-0"
                                                        )}
                                                        />
                                                </CommandItem>
                                                )
                                                )}
                                            </CommandGroup>
                                    </Command>
                                </PopoverContent>
                                </Popover>
                            <FormDescription>
                                Select any admin user in team for writer.
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


