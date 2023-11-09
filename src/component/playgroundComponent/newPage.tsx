
import { useFormik } from 'formik';
import { useFrappeCreateDoc } from 'frappe-react-sdk';
import { PageContext } from "@/provider/pageProvider"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import Composer from './composer';



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

const NewPage = ({state} : {state : string}) => {
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
        <form className="w-full h-full" onSubmit={formik.handleSubmit}>

            <Composer page='Page' state={state} value={Contents} onChange={(value: any) => {formik.setFieldValue("content_json", { value }),setBlocks(value)}}></Composer>

        </form>
    );
}

export default NewPage
