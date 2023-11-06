
import { BlockNoteView, useBlockNote} from '@blocknote/react';
import { useFormik } from 'formik';
import { useFrappeCreateDoc } from 'frappe-react-sdk';
import { PageContext } from "@/provider/pageProvider"
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

const NewPage = () => {
    const [blocks, setBlocks] = useState<any>()
    const { createDoc, isCompleted} = useFrappeCreateDoc();
    const pageContext = useContext(PageContext);
    const router = useNavigate()

    useEffect(() => {
        if(isCompleted && pageContext.update== 1)
        {
            pageContext.changeSubmit(2)
            router('/')
        }
    },[isCompleted])

    useEffect(() =>{
    
        if(pageContext.update  == 1)
        {
            formik.handleSubmit()

        }
    },[pageContext.update])
    const editor = useBlockNote({
        initialContent: Contents,
        onEditorContentChange: (editor) => setBlocks(editor.topLevelBlocks)
    });
    const formik = useFormik({
        initialValues: {
            content_type: "JSON",
            content_json: {} as JSON,

        },
        onSubmit: (values) => createDoc("BlogPage", {
            ...values,
            title: blocks![0].content[0].text,
            content_json: { blocks },
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

export default NewPage
