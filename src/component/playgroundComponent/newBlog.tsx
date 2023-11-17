
import Composer from './composer';
import { useFormik } from 'formik';
import { useFrappeCreateDoc, useFrappeFileUpload } from 'frappe-react-sdk';
import { PostContext } from "@/provider/postProvider"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { AnimationContext } from '@/provider/animationProvider';
import { error } from 'typing';
import { useToast } from '@/components/ui/use-toast';
import { LoadingStateContext } from '@/provider/loadinStateProvider';
import { Loader2 } from 'lucide-react';


const NewBlog = ({state} : {state :string}) => {
    const [Contents, setContent] = useState<any>()
    const [blocks, setBlocks] = useState<any>()
    const { createDoc, isCompleted, loading : updatedoc } = useFrappeCreateDoc();
    const postContext = useContext(PostContext);
    const {upload, progress} = useFrappeFileUpload()
    const [url , setUrl] = useState('')
    const [loading, setloading] =  useState(true)
    const router = useNavigate()
    const animation = useContext(AnimationContext)
    const {toast} = useToast()
    const loadingState = useContext(LoadingStateContext)

    useEffect(() => { return ( ) => {postContext.setSubmit(false)}},[])


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

    const formik = useFormik({
        initialValues: {
            blog_category: "",
            blogger: "",
            content_type: "JSON",
            content_json: {} as JSON,
            content: "",
            published_on : '',
            meta_image : "",
            published : 1,
            title : '',

        },
        onSubmit: (values) => {
            let errorTemp = {} as error
            if(!values.blog_category)
            {
                errorTemp.category = 'No category selected'
            }
            if(!blocks![0].content[0]){
                errorTemp.title = 'Plase create a title for the document'
            }
            if(!values.blogger)
            {
                errorTemp.blogger =  ' No blogger selected'
            }
            if(errorTemp.blogger || errorTemp.category || errorTemp.title)
            {
       
                if(!animation.sidebarRight)
                {
                   
                    animation.toggle('SideBarRight')
                    
                }
                toast({
                    duration: 3000,
                    variant: "destructive",
                    title: "Ther is error on input infomation",
                    description: `${errorTemp.blogger ? errorTemp.blogger : ''} ${errorTemp.category ? errorTemp.category : ''} ${errorTemp.title ? errorTemp.title : '' }`
                })
                postContext.setSubmit(false)
            }else{
                createDoc("Blog Post", {
                ...values,
                title: blocks![0].content[0].text,
                content_type: "JSON",
                content_json: { blocks },
                content: "",
            }).then((response) => {response ? (toast({title :'Post updated'})) : toast({title :'Error', description : 'An error occured'})})}
        },
    });



    useEffect(() => {
        const temp = sessionStorage.getItem('block') ?? null
        if(temp)
        {
            setContent(JSON.parse(temp))
            setBlocks(JSON.parse(temp))
            
        }else{
            setContent([{
                "id": "45947528-bc73-432b-937e-5d6148f4d4c3",
                "type": "heading",
                "props" : {
                    "textColor" : "default",
                    "backgroundColor" : "default",
                    "textAlignment" : "left",
                    "level" : "1"
                } as any,
                "content": [
                    {
                        "type": "text",
                        "text": "Title",
                        "styles": {}
                    }
                ] as any ,
                "children": []
            },
            {
                "id": "0153698c-1c59-474f-a0ab-36303d2e2064",
                "type": "paragraph",
                "props": {
                    "textColor": "default",
                    "backgroundColor": "default",
                    "textAlignment": "left"
                },
                "content": [],
                "children": []
            }]
            )
            setBlocks([{
                "id": "45947528-bc73-432b-937e-5d6148f4d4c3",
                "type": "heading",
                "props" : {
                    "textColor" : "default",
                    "backgroundColor" : "default",
                    "textAlignment" : "left",
                    "level" : "1"
                } as any,
                "content": [
                    {
                        "type": "text",
                        "text": "Title",
                        "styles": {}
                    }
                ] as any ,
                "children": []
            },
            {
                "id": "0153698c-1c59-474f-a0ab-36303d2e2064",
                "type": "paragraph",
                "props": {
                    "textColor": "default",
                    "backgroundColor": "default",
                    "textAlignment": "left"
                },
                "content": [],
                "children": []
            }]
            )
        }
      },[])

    useEffect(() =>{
        if(Contents)
        {
            setloading(false)
   
        }
    },[Contents])
    
    useEffect(() => {
        if(url != '')
        {
            formik.setFieldValue('meta_image',url);
        }
    },[url])

    useEffect(() => {
        if(formik.values.meta_image != '' && postContext.submit)
        {
            formik.handleSubmit()
        }
    },[formik.values.meta_image])

    useEffect(() => {
        if(isCompleted && postContext.submit)
        {
            postContext.setSubmit(false)
            formik.resetForm()
            router('/')
        }
    },[isCompleted])


    useEffect(() =>{
        if(!postContext.publish)
        {
            
            formik.setFieldValue('published', 0)
        }else{
            formik.setFieldValue('published', 1)
        }} ,[postContext.publish])

        useEffect(() =>{
            if(postContext.update.category)
            {
                formik.setFieldValue('blog_category', postContext.update.category)
            }} ,[postContext.update.category])
    
    useEffect(() =>{
        if(postContext.update.writer)
        {
            formik.setFieldValue('blogger', postContext.update.writer)
        }} ,[postContext.update.writer])
    
    useEffect(() =>{
        if(postContext.update.publish_date)
        {
            formik.setFieldValue('published_on', postContext.update.publish_date)
        }},[postContext.update.publish_date])





    useEffect(() =>{
        if(postContext.submit || formik.initialValues != formik.values)
        {
            if(postContext.update.image)
            {
                
                upload(postContext.update.image,{
                    /** If the file access is private then set to TRUE (optional) */
                    "isPrivate": false,
                    "doctype" : "Blog Post",
                    "docname" : blocks![0].content[0].text,
                    "fieldname" : "meta_image"
                    }).then((response) => {setUrl(response.file_url)})
            }
            else{
                    
                    formik.handleSubmit()
                
            }
            
        }
       
    },[postContext.submit , postContext.update.image])

    

    return (
        <form className="w-full h-full" onSubmit={formik.handleSubmit}>
            {loading ? <Loader2 className='w-10 h-10 storke-2 animate-spin absolute left-1/2 top-1/2'></Loader2> : <Composer page='Post' state={state} value={Contents} onChange={(value: any) => {formik.setFieldValue("content_json", { value }),setBlocks(value)}}></Composer>}
        </form>
    );
}

export default NewBlog
