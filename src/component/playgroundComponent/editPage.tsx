

import "@blocknote/core/style.css";
import { useFrappeUpdateDoc } from 'frappe-react-sdk'
import { useEffect } from 'react'
import Composer from './composer'
import { useFormik } from 'formik';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { PageContext } from "@/provider/pageProvider";
import PostSkeleton from "@/skeletonComponent/skeletonPost";



    const EditPage = ({state} : {state :string}) => {
    const pageContext = useContext(PageContext)
    const data = pageContext.data? pageContext.data : {} as any;
    const { updateDoc, loading : docLoading, isCompleted } = useFrappeUpdateDoc()
    const router = useNavigate()



    useEffect(() => {
        if(isCompleted && pageContext.update == 1)
        {
            pageContext.changeSubmit(2)
            router('/')
        }
    },[isCompleted])

    useEffect(() =>{
        if(typeof window !== 'undefined' && pageContext.update == 1)
        {
            formik.handleSubmit()
        }
    },[pageContext.update])

    const formik = useFormik({
        initialValues: {
            title: data?.title ?? "",
            content_type: data?.content_type ?? "",
            content_json: JSON.parse(data?.content_json) ?? {},
        },
        onSubmit: (values) => updateDoc("BlogPage", data.name , {
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


export default EditPage