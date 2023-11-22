import "@blocknote/core/style.css";
import { useContext, useEffect, useState } from 'react'
import Composer from './composer'
import { SystemPageInput } from "./data/system-data";
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
import SideBarRight from "./sidebareright";
import { Input } from "@/components/ui/input";
import { ComboboxDemo } from "./combobox";
import { Loader2 } from "lucide-react";
import { SystemPageContext } from "@/provider/SystemPageProvider";
import { useFrappeUpdateDoc } from "frappe-react-sdk";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
    name : z.string(),
    blogger : z.string({ required_error: "Please select a writer." }).min(2,{ message: "Writer must be at least 2 characters.", }).max(50),
    content_json : z.object({blocks : z.array(z.any())}).required(),

})

interface EditSystemProps extends React.FormHTMLAttributes<HTMLFormElement>  {
    className?: string,
    children?: React.ReactNode,
    custom?: boolean,
    state? : string,
    save : boolean,
    publish : boolean,
    returnsaveClick? : () => void,
    returnpublishClick? : () => void,
}


export default function EditSystemPage ({ ...props}: EditSystemProps)  {
    const [loading, setLoading] = useState(true)
    const Systemcontext = useContext(SystemPageContext)
    const { updateDoc, isCompleted , loading : updatedoc} = useFrappeUpdateDoc()
    const {toast} = useToast()
    const router = useNavigate()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

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
            props.returnpublishClick!()
            router('/')
        }
    },[isCompleted])


    useEffect(()=>{
        if(props.publish)
        {
            form.handleSubmit(onSubmit)();
            if(form.formState.errors)
            {
                Object.entries(form.formState.errors).forEach(([field, error]) => {
                    toast({title:`Error in the field ${field}`, description:  `${error.message}` , variant:'destructive'});
                  });
                props.returnpublishClick!()
            }
        }
    },[props.publish])

    useEffect(() => {
        if(form.watch('content_json') || form.watch('blogger'))
        {
            console.log(form.watch('content_json'), form.watch('blogger'))
            sessionStorage.setItem('data',JSON.stringify({content_json : JSON.stringify(form.watch('content_json')), blogger : form.watch('blogger'), name : form.watch('name')}))
        }
    },[form.watch('content_json'), form.watch('blogger')])

    useEffect(() => {
        if(sessionStorage.getItem('data') != null)
        {
            const data = JSON.parse(sessionStorage.getItem('data')!)
            form.setValue( 'content_json' ,JSON.parse(data.content_json))
            form.setValue( 'blogger' ,data.blogger)
            form.setValue( 'name' ,data.name)
            setLoading(false)
        }
    },[])

    useEffect(() => {
        if(typeof Systemcontext.data?.content_json == 'string')
        {
            form.setValue( 'content_json' ,JSON.parse(Systemcontext.data.content_json))
            form.setValue( 'blogger' ,Systemcontext.data.blogger ?? '')
            form.setValue( 'name' ,Systemcontext.data.name ?? '')
            setLoading(false)
            sessionStorage.setItem('data',JSON.stringify(Systemcontext.data))
        }
    },[Systemcontext.data])




    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        updateDoc('SystemPage',values.name,values)
            .then((response) => {response && toast({title :'Page updated'})})
            .catch((err : any) => {toast({title : 'Error', description : err.message, variant : 'destructive'}); setLoading(false);props.returnpublishClick!()})

    }



    return (<>
        {loading ? <Loader2 className="w-8 h-8 stoke-1 animate-spin absolute top-1/2 left-1/2"></Loader2> : 
        <Form {...form} >
            <form {...props}  className={cn('flex gap-4 ',props.className)} onSubmit={form.handleSubmit(onSubmit)}  >
                <SideBarRight default>
                    {SystemPageInput.map((input) => {
                            return(
                                <FormField
                                        key={input.name}                       
                                        control={form.control}
                                        name={input.name}
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col">
                                            <FormLabel>Writer</FormLabel>
                                            <FormControl>
                                                {!input.dropdown ?  <Input {...input} {...field}  /> : <ComboboxDemo default={form.getValues('blogger')} data={input.data!} onChange={(e : any) => form.setValue('blogger',e.name)} />}
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