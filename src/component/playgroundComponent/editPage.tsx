import "@blocknote/core/style.css";
import { useContext, useEffect, useState } from 'react'
import Composer from './composer'
import { PageInput } from "./data/page-data";
import {
    Form,
    FormControl,

    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { cn } from "@/lib/utils";
import { ComboboxDemo } from "./combobox";
import { Loader2 } from "lucide-react";
import { PageContext } from "@/provider/pageProvider";
import { useFrappeUpdateDoc } from "frappe-react-sdk";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { DatePickerDemo } from "./datepicker";
import SideBarRight from "./sidebareright";

const formSchema = z.object({
    name : z.string(),
    blogger : z.string({ required_error: "Please select a writter." }).min(2,{ message: "Writter must be at least 2 characters.", }).max(50),
    title : z.string({ required_error: "Please enter a title." }).min(2,{ message: "Title must be at least 2 characters.", }).max(50),
    content_json : z.object({blocks : z.array(z.any())}).required(),
    published : z.number(),
    published_on : z.string().optional(),
})

interface EditPageProps extends React.FormHTMLAttributes<HTMLFormElement>  {
    className?: string,
    children?: React.ReactNode,
    custom?: boolean,
    state? : string,
    save : boolean,
    publish : boolean,
    returnsaveClick? : () => void,
    returnpublishClick? : () => void,
}


export default function EditPage ({ ...props}: EditPageProps)  {
    const [loading, setLoading] = useState(true)
    const Pagecontext = useContext(PageContext)
    const { updateDoc, isCompleted , loading : updatedoc} = useFrappeUpdateDoc()
    const {toast} = useToast()
    const router = useNavigate()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    const unclick = () => {
        props.returnpublishClick!()
        props.returnsaveClick!()
    }

    useEffect(() => {
        if(updatedoc)
        {
            setLoading(updatedoc)
        }
    },[updatedoc])

    useEffect(() => {
        if(isCompleted)
        {
            setLoading(false)
            unclick()
            router('/')
        }
    },[isCompleted])


    useEffect(()=>{
        if(props.publish || props.save)
        {
            console.log('here')
            if(props.save)
            {
                form.setValue('published',0)
            }
            else if(props.publish)
            {
                if(form.watch('published_on') == null)
                {
                    form.setValue('published',1)
                }else{
                    form.setValue('published',0)
                }
            }
            form.handleSubmit(onSubmit)();
            if(form.formState.errors)
            {
                Object.entries(form.formState.errors).forEach(([field, error]) => {
                    toast({title:`Error in the field ${field}`, description:  `${error.message}` , variant:'destructive'});
                  });
                unclick()

            }
        }
    },[props.publish, props.save])



    useEffect(() => {
        if(sessionStorage.getItem('data') != null)
        {
            const data = JSON.parse(sessionStorage.getItem('data')!)
            form.setValue( 'content_json' ,JSON.parse(data.content_json)),
            form.setValue( 'blogger' ,data.blogger),
            form.setValue( 'name' ,data.name),
            form.setValue( 'published' ,data.published),
            form.setValue( 'published_on' ,data.published_on ?? null),
            form.setValue( 'title' ,data.title),
            setLoading(false)
        }
    },[])

    useEffect(() => {
        if(form.watch('content_json'))
        {
            form.setValue('title',form.watch('content_json').blocks[0].content[0].text)
        }
        if(form.watch('content_json') || form.watch('blogger') || form.watch('published') || form.watch('published_on') || form.watch('title'))
        {
            sessionStorage.setItem('data',JSON.stringify({content_json : JSON.stringify(form.watch('content_json')), blogger : form.watch('blogger'), name : form.watch('name'), published : form.watch('published'), published_on : form.watch('published_on'), title : form.watch('title')}))
        }
    },[form.watch('content_json'), form.watch('blogger'), form.watch('published'), form.watch('published_on'), form.watch('title')])

    useEffect(() => {
        if(typeof Pagecontext.data?.content_json == 'string')
        {
            console.log(Pagecontext.data)
            form.setValue( 'content_json' ,JSON.parse(Pagecontext.data.content_json));
            form.setValue( 'blogger' ,Pagecontext.data.blogger );
            form.setValue( 'name' ,Pagecontext.data.name );
            form.setValue( 'published' ,Pagecontext.data.published);
            form.setValue( 'published_on' ,Pagecontext.data.published_on);
            form.setValue( 'title' ,Pagecontext.data.title);
            setLoading(false)
            sessionStorage.setItem('data',JSON.stringify(Pagecontext.data))
        }
    },[Pagecontext.data])




    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        updateDoc('BlogPage',values.name,values)
            .then((response) => {response && toast({title :'Page updated'})})
            .catch((err : any) => {toast({title : 'Error', description : err.message, variant : 'destructive'}); setLoading(false);unclick()})

    }



    return (<>
        {loading ? <Loader2 className="w-8 h-8 stoke-1 animate-spin absolute top-1/2 left-1/2"></Loader2> : 
        <Form {...form} >
            <form {...props}  className={cn('flex gap-4 ',props.className)} onSubmit={form.handleSubmit(onSubmit)}  >
                <SideBarRight default>
                    {PageInput.map((input) => {
                            return(
                                <FormField
                                        key={input.name}                       
                                        control={form.control}
                                        name={input.name}
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col">
                                            <FormLabel>Writter</FormLabel>
                                            <FormControl>
                                                {!input.dropdown ?  <DatePickerDemo className="w-[200px]" default={field.value!} onDateSelected={(date) => {form.setValue('published_on',`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)}} ></DatePickerDemo> 
                                                : 
                                                <ComboboxDemo default={field.value!} data={input.data!} onChange={(e : any) => form.setValue('blogger',e.name)} />}
                                            </FormControl>
                                            <FormMessage />
                                            </FormItem>
                                        )}
                                />
                            )
                        })
                    }
                </SideBarRight>
                <FormField
                        control={form.control}
                        name="content_json"
                        render={({ field }) => (
                            <FormItem className="w-full h-full">
                            <FormControl>
                                <Composer noImage page={'Post'} state={props.state!} value={field.value.blocks} onChange={(blocks: any) => {form.setValue("content_json", { blocks })} } /> 
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                />
            </form>
        </Form>}
    </>)
}