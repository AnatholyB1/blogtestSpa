

import "@blocknote/core/style.css";
import {  useFrappeUpdateDoc, useFrappeFileUpload } from 'frappe-react-sdk'
import { useEffect, useState } from 'react'
import Composer from './composer'
import { useFormik } from 'formik';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { PostContext } from "@/provider/postProvider";
import PostSkeleton from "@/skeletonComponent/skeletonPost";
import { DataDocList } from "typing";


    const EditBlog = ({state} : {state :string}) => {
    const postContext = useContext(PostContext)
    const data = postContext.data? postContext.data : {} as DataDocList;
    const [file, setFile] = useState<File>()
    const { updateDoc, loading : docLoading, isCompleted } = useFrappeUpdateDoc()
    const {upload} = useFrappeFileUpload()
    const router = useNavigate()
    const [url , setUrl] = useState('')

    useEffect(() => {
        if(url != '' && postContext.update.submited == 1)
        {
            formik.setFieldValue('meta_image',url);
            formik.handleSubmit()
        }
    },[url])

    useEffect(() => {
        if(isCompleted && postContext.update.submited == 1)
        {
            postContext.ChangeObject(undefined,'submited', 2)
            router('/')
        }
    },[isCompleted])

    useEffect(() =>{
        if(postContext.update.category)
        {
            formik.setFieldValue('blog_category', postContext.update.category)
        }
        if(postContext.update.writer)
        {
            formik.setFieldValue('blogger', postContext.update.writer)
        }
        if(postContext.update.publish_date)
        {
            formik.setFieldValue('published_on', postContext.update.publish_date)
        }
        if(postContext.update.image)
        {
            setFile(postContext.update.image)
        }
        if(postContext.update.submited == 1)
        {
            if(file)
            {
                upload(file,{
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
    },[postContext.update])

    const formik = useFormik({
        initialValues: {
            title: data?.title ?? "",
            content_type: data?.content_type ?? "",
            content_json: JSON.parse(data?.content_json) ?? {},
            published: data?.published ?? 0,
            blogger: data?.blogger ?? "",
            blog_category: data?.blog_category,
            published_on : data?.published_on,
            meta_image : data?.meta_image,
        },
        onSubmit: (values) => updateDoc("Blog Post", data.name , {
            ...values,
            title: values.content_json.blocks[0].content[0].text,
            content_type: "JSON",
            content: "",
        }).then(() => {}),
    })

    return (
        <>
            {docLoading ? 'loading ...' :             
            <form className="flex h-full flex-col space-y-4" onSubmit={formik.handleSubmit}>
                <div className='flex h-full flex-col space-y-4 '>
                    {data ? <Composer state={state} value={formik.initialValues.content_json.blocks} onChange={(value: any) => formik.setFieldValue("content_json", { blocks: value })} /> :  <PostSkeleton></PostSkeleton>}
                </div>
            </form>}
        
        </>
    );
};


export default EditBlog