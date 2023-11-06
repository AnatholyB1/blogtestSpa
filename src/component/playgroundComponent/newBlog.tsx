
import Composer from './composer';
import { useFormik } from 'formik';
import { useFrappeCreateDoc, useFrappeFileUpload } from 'frappe-react-sdk';
import { PostContext } from "@/provider/postProvider"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";



const Contents =  [{
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

const NewBlog = ({state} : {state :string}) => {
    const [blocks, setBlocks] = useState<any>()
    const { createDoc, isCompleted } = useFrappeCreateDoc();
    const postContext = useContext(PostContext);
    const [file, setFile] = useState<File>()
    const {upload} = useFrappeFileUpload()
    const [url , setUrl] = useState('')
    const router = useNavigate()

    useEffect(() => {
        if(url != '' && postContext.update.submited == 1 )
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
        if(postContext.update.submited  == 1)
        {
            if(file)
            {
                upload(file,{
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
    },[postContext.update])
    const formik = useFormik({
        initialValues: {
            blog_category: "",
            blogger: "",
            content_type: "JSON",
            content_json: {} as JSON,
            content: "",
            published_on : undefined,
            meta_image : ""

        },
        onSubmit: (values) => createDoc("Blog Post", {
            ...values,
            title: blocks![0].content[0].text,
            content_type: "JSON",
            content_json: { blocks },
            content: "",
        }),
    });

    return (
        <form className="w-full h-full" onSubmit={formik.handleSubmit}>

            <Composer state={state} value={Contents} onChange={(value: any) => {formik.setFieldValue("content_json", { value }),setBlocks(value)}}></Composer>

        </form>
    );
}

export default NewBlog
