
import { BlockNoteView, useBlockNote} from '@blocknote/react';
import { useFormik } from 'formik';
import { useFrappeCreateDoc, useFrappeFileUpload } from 'frappe-react-sdk';
import { SystemPageContext } from "@/provider/SystemPageProvider"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { UpdateObject } from 'typing';



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

const NewSystemPage = () => {
    const [blocks, setBlocks] = useState<any>()
    const { createDoc, isCompleted} = useFrappeCreateDoc();
    const systemPageContext = useContext(SystemPageContext);
    const [file, setFile] = useState<File>()
    const {upload} = useFrappeFileUpload()
    const [url , setUrl] = useState('')
    const router = useNavigate()

    useEffect(() => {
        if(url != '' && systemPageContext.update.submited == 1 )
        {
            formik.setFieldValue('meta_image',url);
            formik.handleSubmit()
        }
    },[url])

    useEffect(() => {
        if(isCompleted && systemPageContext.update.submited == 1)
        {
            systemPageContext.changeSubmit({} as UpdateObject)
            router('/')
        }
    },[isCompleted])

    useEffect(() =>{
        if(systemPageContext.update.category)
        {
            formik.setFieldValue('blog_category', systemPageContext.update.category)
        }
        if(systemPageContext.update.writer)
        {
            formik.setFieldValue('blogger', systemPageContext.update.writer)
        }
        if(systemPageContext.update.publish_date)
        {
            formik.setFieldValue('published_on', systemPageContext.update.publish_date)
        }
        if(systemPageContext.update.image)
        {
            setFile(systemPageContext.update.image)
        }
        if(systemPageContext.update.submited  == 1)
        {
            if(file)
            {
                upload(file,{
                    /** If the file access is private then set to TRUE (optional) */
                    "isPrivate": false,
                    "doctype" : "Blog systemPage",
                    "docname" : blocks![0].content[0].text,
                    "fieldname" : "meta_image"
                  }).then((response) => {setUrl(response.file_url)})
            }
            else{
                formik.handleSubmit()
            }
        }
    },[systemPageContext.update])
    const editor = useBlockNote({
        initialContent: Contents,
        onEditorContentChange: (editor) => setBlocks(editor.topLevelBlocks)
    });
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
        onSubmit: (values) => createDoc("Blog systemPage", {
            ...values,
            title: blocks![0].content[0].text,
            content_type: "JSON",
            content_json: { blocks },
            content: "",
        }),
    });

    return (
        <form className="flex h-full flex-col space-y-4" onSubmit={formik.handleSubmit}>
            <div className="min-h-[400px] flex-1 p-4 md:min-h-[700px] rounded-md lg:min-h-[700px] " >
            <BlockNoteView  editor={editor} />
            </div>
        </form>
    );
}

export default NewSystemPage
