
import "@blocknote/core/style.css";
import { useFrappeUpdateDoc, useFrappeFileUpload } from 'frappe-react-sdk'
import { useEffect, useState } from 'react'

import { useFormik } from 'formik';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { BloggerContext } from "@/provider/BloggerProvider";
import { BloggerType } from "typing";






export default function Blogger () {
    const bloggerContext = useContext(BloggerContext)
    const data = bloggerContext.data? bloggerContext.data : {} as BloggerType;
    const [file, setFile] = useState<File>()
    const { updateDoc, loading : docLoading, isCompleted } = useFrappeUpdateDoc()
    const {upload} = useFrappeFileUpload()
    const router = useNavigate()
    const [name,setName] = useState<string>()
    const [bio, setBio] = useState<string>()
    const [disabled, setDisabled] = useState<boolean>()
    const [url , setUrl] = useState('')

    const handleFile = (target : FileList | null) => {
        if(target)
        {
            setFile(target[0])
            setUrl(URL.createObjectURL(target[0]))
        }
    }
    useEffect(() => {
        if (data)
        {
            setBio(data.bio)
            setUrl(data.avatar)
            setDisabled(data.disabled)
            setName(data.full_name)

        }
    },[data])

    useEffect(() => {
        if(url != '' && bloggerContext.update == 1)
        {
            formik.setFieldValue('avatar',url);
            formik.handleSubmit()
        }
    },[url])

    useEffect(() => {
        if(isCompleted && bloggerContext.update == 1)
        {
            bloggerContext.changeSubmit(2)
            router('/')
        }
    },[isCompleted])

    useEffect(() =>{

        if(bloggerContext.update == 1)
        {
            if(file)
            {
                upload(file,{
                    /** If the file access is private then set to TRUE (optional) */
                    "isPrivate": false,
                    "doctype" : "Blogger",
                    "docname" : data.name,
                    "fieldname" : "avatar"
                  }).then((response) => {setUrl(response.file_url)})
            }
            else{
                formik.handleSubmit()
            }
        }
    },[bloggerContext.update])

    const formik = useFormik<BloggerType>({
        initialValues: {
        name :  data?.name ?? '',
        full_name : data?.full_name ?? '',
        bio : data?.bio ?? '',
        avatar : data?.avatar ?? '',
        disabled : data?.disabled ?? false,
        short_name : data?.short_name ?? ''
        },
        onSubmit: (values) => updateDoc("Blogger", data.name , {
            ...values,
        }).then(() => {}),
    })

    return (
        <>
            {docLoading ? 'loading ...' :             
            <form className="flex h-full flex-col space-y-4" onSubmit={formik.handleSubmit}>
                <div className='flex h-full flex-col space-y-4 '>
                    <div className="flex flex-column gap-2 items-start ">
                        <label htmlFor="name">name</label>
                        <input readOnly={true} id='name' draggable='true' className="border rounded " type="text"  value={name} onChange={(e ) => {formik.setFieldValue('full_name', e.target.value  ) , setName(e.target.value)}}/>
                    </div>
                    <div>
                        <label htmlFor="bio">bio</label>
                        <input readOnly={true} id='bio' type='text' className="border rounded " value={bio} onChange={(e ) => {formik.setFieldValue('bio', e.target.value), setBio(e.target.value ) }}/>
                    </div>
                    <div>
                        <label htmlFor="avatar">avatar</label>
                        <input  readOnly={true} id='avatar' type='file' className="border rounded " value='' onChange={(e ) => handleFile(e.target.files)}/>
                        {url && <img className="w-10 h-10" src={`https://dev.zaviago.com${url}` } alt="Selected File" />}
                    </div>
                    <div>
                        <label htmlFor="disabled">disabled</label>
                        <input readOnly={true} id="diasabled" type='checkbox'   value={disabled ? 'true' : 'false'} onChange={(e) => {formik.setFieldValue('disabled', e.target.value), setDisabled(!disabled)}}></input>
                    </div>

                </div>
            </form>}
        
        </>
    );
}


