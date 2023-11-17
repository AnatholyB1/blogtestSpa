
import "@blocknote/core/style.css";
import {useFrappeGetDocList, useFrappeCreateDoc, useFrappeFileUpload } from 'frappe-react-sdk'
import { useEffect, useState } from 'react'
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
  import { Check, ChevronsUpDown } from "lucide-react"
  import { cn } from "@/lib/utils";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useToast } from "@/components/ui/use-toast";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
  import {Button} from "@/components/ui/button"
 
const formSchema = z.object({
    bio : z.string().min(0).max(50).default(''),
    full_name :  z.string({
        required_error: "Please select a User.",
      }).min(2,{
        message: "Username must be at least 2 characters.",
      }).max(50), 
    avatar : z.string().max(50).default(''),
    disabled :  z.number().default(0),
    short_name :  z.string().min(2).max(50).default(''),
})
import { LoadingStateContext } from "@/provider/loadinStateProvider";

interface BloggerProps extends React.FormHTMLAttributes<HTMLFormElement>  {
    className?: string,
    children?: React.ReactNode,
    custom? : boolean,
}

export default function NewBlogger ({ ...props } : BloggerProps) {
    const bloggerContext = useContext(BloggerContext)
    const [file, setFile] = useState<File>()
    const { createDoc, isCompleted, loading : updatedoc } = useFrappeCreateDoc()
    const {upload, progress} = useFrappeFileUpload()
    const [url , setUrl] = useState('')
    const {data : Users} = useFrappeGetDocList('User', {fields : ['full_name'], filters : [['user_type', '=' , 'System User']],limit: 200})
    const [open, setOpenCommand] = useState(false)
    const {toast} = useToast()
    const [preview, setPreview] = useState<string | null>(null);
    const [loading, setloading] =  useState(true)
    const loadingState = useContext(LoadingStateContext)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues : {
            full_name : 'Writer Name',
            bio : 'Write something about the writer.',
            disabled  : 0,
            avatar : '',
        }
    })

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


    useEffect(() => {
        if(progress > 0)
        {
            loadingState.setProgress(progress)
        }
    },[progress])

    useEffect(() => {
        if(sessionStorage.getItem('blogger'))
        {
   
            form.setValue('full_name',JSON.parse(sessionStorage.getItem('blogger')!).full_name);
            form.setValue('bio',JSON.parse(sessionStorage.getItem('blogger')!).bio);
            form.setValue('avatar',JSON.parse(sessionStorage.getItem('blogger')!).avatar);
            form.setValue('disabled',JSON.parse(sessionStorage.getItem('blogger')!).disabled);
            form.setValue('short_name',JSON.parse(sessionStorage.getItem('blogger')!).short_name);
            setPreview( 'https://dev.zaviago.com' + JSON.parse(sessionStorage.getItem('blogger')!).avatar ?? undefined)
            setloading(false)
        }else{
            form.setValue('full_name','Writter Name');
            form.setValue('bio','Write something about the writer.');
            form.setValue('disabled',0);
            setloading(false)
        }
        if(sessionStorage.getItem('avatar'))
        {
            setPreview(sessionStorage.getItem('avatar'))
        }
    },[])

    function onSubmit(values: z.infer<typeof formSchema>) {
        createDoc("Blogger", {
            ...values,
        }).then((response) => {response ? toast({title :'New Blogger created !' , description: form.getValues('full_name')}) : toast({variant : 'destructive',title: 'Blogger Created'})})
    }
 
    const handleFile = (target : FileList | null) => {
        if(target)
        {
            setFile(target[0])
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string)
                sessionStorage.setItem('avatar', reader.result as string )
            };
            reader.readAsDataURL(target[0]);
            
        }
    }

    useEffect(() => {
        if(url != '' && bloggerContext.update)
        {
            form.setValue('avatar',url);    
        }
    },[url])

    useEffect(() => {
        if(form.getValues('avatar') != '' && bloggerContext.update)
        {
            form.handleSubmit(onSubmit, (errors) => { toast({variant : 'destructive', title : 'Error', description : 'errors'}), bloggerContext.changeSubmit(false)})()

        }
    },[form.watch('avatar')])

    useEffect(() => {

        if(form.getValues())
        {
            sessionStorage.setItem('blogger',JSON.stringify(form.getValues()))
        }
    },[form.watch('avatar'),form.watch('bio'),form.watch('full_name'),form.watch('disabled'),form.watch('short_name')])

    useEffect(() => {
        if(isCompleted && bloggerContext.update)
        {
            bloggerContext.changeSubmit(false)
        }
    },[isCompleted])

    useEffect(() => {
        if(bloggerContext.dataList)
        {
            const current = bloggerContext.dataList
            const index = current?.findIndex((item) => item.full_name == form.getValues().full_name)
            index != -1 && bloggerContext.changeVariable(index.toString())
            form.reset()
        }
    },[bloggerContext.dataList])

    useEffect(() =>{

        if(bloggerContext.update)
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
                form.handleSubmit(onSubmit, (errors) => { toast({variant : 'destructive', title : 'Error', description : 'errors'}), bloggerContext.changeSubmit(false)})()
            }
        }
    },[bloggerContext.update])


    return (
        <>
            {loading ? 'loading ...' :
             <Form {...form}>          
                <form className={cn('flex flex-col gap-4',props.className)} onSubmit={form.handleSubmit(onSubmit)}  {...props}>
                    <>{props.title && <h1 className="text-[#09090B] font-Inter text-[18px] font-semibold leading-[28px] mb-4">{props.title}</h1>}</>
                    <FormField
                        control={form.control}
                        name="avatar"
                        render={() => (
                            <FormItem className="w-[107px] h-[107px]">
                            <FormLabel className="w-full h-full" htmlFor="avatar">
                                <Avatar className="w-full h-full text-center">
                                    <AvatarImage src={preview ?? ''} />
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
                        <h1 className="text-[#71717A] font-Inter text-[36px] font-extrabold leading-[40px] tracking[-0.9px]"
                        >{form.getValues('full_name')}</h1>
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
                                      {!props.custom ? <FormField
                        control={form.control}
                        name="full_name"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                            <FormLabel>Admin User</FormLabel>
                                <Popover open={open} onOpenChange={setOpenCommand}>
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
                                                    setOpenCommand(false)
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
                            </FormItem>)} /> :
                            <FormField
                            control={form.control}
                            name="full_name"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                <FormLabel>Admin User</FormLabel>
                                            <FormControl>
                                                <div
                                                role="combobox"
                                                aria-expanded={open}
                                                onAbort={() => setOpenCommand(false)}
                                                onClick={() => setOpenCommand(!open)}
                                                className={
                                                    `w-full flex flex-row items-center px-3 justify-between border border-slate-400 rounded-md ${field.value == 'Writer Name' && "text-muted-foreground"}`
                                                }
                                                >
                                                {field.value != 'Writer Name'
                                                    ? field.value
                                                    : "Select Admin User in team..."}
                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                        <Command  className={`${open ? 'fixed' : 'hidden'} left-6 -bottom-[100px] border border-gray-500/50 bg-white w-[200px] h-[200px] z-[999] `} >
                                                            <CommandInput  className="h-9 bg-white" placeholder="Select Admin User in team..."/>                        
                                                            <CommandEmpty >No results found.</CommandEmpty>
                                                            <CommandGroup  heading="System User" className="overflow-y-auto h-[200px]">
                                                                {Users && Users.map((user, index) => (
                                                                <CommandItem key={index} value={user.full_name} 
                                                                onSelect={() => {
                                                                    form.setValue('full_name', user.full_name)
                                                                    form.setValue('short_name', user.full_name)
                                                                    setOpenCommand(false)
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
                                                </div>
                                            </FormControl>
                                <FormDescription>
                                    Select any admin user in team for writer.
                                </FormDescription>
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

