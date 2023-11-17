

import "@blocknote/core/style.css";
import {  useFrappeUpdateDoc, useFrappeFileUpload } from 'frappe-react-sdk'
import { useEffect, useState , useContext} from 'react'
import Composer from './composer'
import { useFormik} from 'formik';
import { useNavigate } from "react-router-dom";
import { PostContext } from "@/provider/postProvider";
import { DataDocList } from "typing";
import { AnimationContext } from '@/provider/animationProvider';
import { error } from 'typing';
import { useToast } from '@/components/ui/use-toast';
import { LoadingStateContext } from "@/provider/loadinStateProvider";


    const EditBlog = ({state} : {state :string}) => {

        const postContext = useContext(PostContext)
        let data =  {} as DataDocList;
        const [loading, setLoading] = useState(true)
        const { updateDoc, isCompleted , loading : updatedoc} = useFrappeUpdateDoc()
        const [url , setUrl] = useState('')
        const [Contents, setContent] = useState<any>()
        const [blocks, setBlocks] = useState<any>()
        const {upload , progress} = useFrappeFileUpload()
        const router = useNavigate()
        const animation = useContext(AnimationContext)
        const {toast} = useToast()
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
    
    
        useEffect(() => {
            if(progress > 0)
            {
                loadingState.setProgress(progress)
            }
        },[progress])
    

        const formik = useFormik({

            initialValues: {
                title: "",
                content_type:  "JSON",
                content_json: {} as any,
                published:  1,
                blogger:  "",
                blog_category: '',
                published_on : '',
                meta_image : '',
                name : ''
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
                updateDoc("Blog Post", values.name , {
                ...values,
                content_json : {blocks},
                title: blocks![0].content[0].text,
                content_type: "JSON",
            }).then((response) => {response ? toast({title :'Post updated'}) : toast({title :'Error', description : 'An error occured'})})
        }
        }
        })




        useEffect(() => {
            const temp = sessionStorage.getItem('block') ?? null
            if(temp)
            {
                setContent(JSON.parse(temp))
                setBlocks(JSON.parse(temp))
            }
            sessionStorage.getItem('name') && formik.setFieldValue('name', sessionStorage.getItem('name'))
          },[])






        useEffect(() => {
            if(typeof postContext.data?.name != 'undefined')
            {
        
                data = postContext.data
                formik.setValues({
                    title : data.title,
                    content_type: data.content_type,
                    content_json: JSON.parse(data.content_json),
                    published: data.published,
                    blogger: data.blogger,
                    blog_category: data.blog_category,
                    published_on : data.published_on ?? '',
                    meta_image : data.meta_image ?? '',
                    name : data.name
                    
                })
                sessionStorage.setItem('name',data.name)
                setContent(JSON.parse(data.content_json).blocks)
                setBlocks(JSON.parse(data.content_json).blocks)
            }
        },[postContext.data])
        

        useEffect(() =>{
            
            if(Contents)
            {
                setLoading(false)
            }
        },[Contents])

        useEffect(() => {
            if(url != '' )
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
            }
        },[postContext.update.category])

        useEffect(() =>{
            if(postContext.update.writer)
            {
                formik.setFieldValue('blogger', postContext.update.writer)
            }
        },[postContext.update.writer])

        useEffect(() =>{
            if(postContext.update.publish_date)
            {
                formik.setFieldValue('published_on', postContext.update.publish_date)
            }
        },[postContext.update.publish_date])


        useEffect(() =>{

            if( postContext.submit || formik.initialValues != formik.values)
            {  
                    if(postContext.update.image)
                    {
                        upload(postContext.update.image,{
                            /** If the file access is private then set to TRUE (optional) */
                            "isPrivate": false,
                            "doctype" : "Blog Post",
                            "docname" : data.name,
                            "fieldname" : "meta_image"
                        }).then((response) => {setUrl(response.file_url)})
                    }
                    else{
   
                        formik.handleSubmit()
                    }
            }
        },[postContext.submit, postContext.update.image])

    

    return (
        <>
              
            <form className="w-full h-full " onSubmit={formik.handleSubmit}>
                {loading ? 'loading ' :<Composer page={'Post'} state={state} value={Contents} onChange={(value: any) => {formik.setFieldValue("content_json", { value }),setBlocks(value)}} /> }
            </form>
        
        </>
    );
};


export default EditBlog