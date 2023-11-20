export interface User {
    token?: string,
    usr : string,
    pwd : string
}


export type UpdateObject = {
  publish_date? : string,
  published? : boolean,
  image? : File,
  category : string,
  writer : string
  submited : boolean
}

import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  published_on : z.string(),
})

export type Task = z.infer<typeof taskSchema>

const categorySchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  modified : z.string()
})

export type CategoryTab = z.infer<typeof categorySchema>

const PageSchema = z.object({
  id: z.string(),
  title: z.string(),
  published_on : z.string()
})

export type PageTab = z.infer<typeof PageSchema>

const SystemSchema = z.object({
  id: z.string(),
  title: z.string(),
  published_on : z.string()
})

export type SystemPageTab = z.infer<typeof SystemSchema>



export type DataDocList = {
  content_type
: 
string,
name
: 
string,
published
: 
number,
title
: 
string,
blog_category : string,
content_json : string,
blogger : string,
published_on? : string,
meta_image? : string,

}



export type TabContextType = 'Post' | 'Categories' | 'Page' | 'Blogger'|'SystemPage' |'Overview'

export type contextTab = {
  mutate: boolean,
  toggleMutate: () => void,
  rows: string[],
  addRow: (value: string) => void,
  suppRow: (value: string) => void,
  delete : boolean,
  setDelete : (value : boolean) => void,
  variable : TabContextType;
  ChangeVariable : (newValue: TabContextType) => void;
}

export type PostContextType = string

export type contextPost = {
  update : UpdateObject;
  publish : boolean;
  setPublish : (value : boolean) => void;
  submit : boolean;
  setSubmit : (value : boolean) => void;
  variable : PostContextType;
  copy : boolean;
  dataList : DataDocList[] | undefined
  data : DataDocList | undefined;
  makeCopy : (page : string) => void;
  ChangeObject :(newobj?: UpdateObject, property?: keyof UpdateObject, value?: UpdateObject[keyof UpdateObject]) => void;
  ChangeVariable : (newValue: PostContextType) => void;
}


export type TypeContextType = string
export type view = 'mobile' | 'tablet' | 'desktop'

export type contextType = {
  view : view,
  changeView : (newvalue : view ) => void,
  previousPage : TabContextType | undefined,
  block : any,
  changepage : (newvalue : TabContextType) => void,
  changeBlock : (newvalue : any) => void,
  variable : TypeContextType;
  data : () => {
    data: Category[];
    isLoading: boolean;
};
  ChangeVariable : (newValue: TypeContextType) => void;
}

export type error = {
  category : string,
  blogger : string,
  title : string,
}

export type UserType = {
  name : string,
  full_name : string
}


export type Category = {
  name : string,
  title : string,
  description : string,
  image : string,
  published : number,
}


export type BloggerType = {
  name : string,
  full_name : string,
  bio : string,
  avatar : string,
  disabled : number,
  short_name : string,
}

export type BloggerTask = {
  id : string,
  name : string,
  avatar : string,
  status : boolean,
}


export type GetData = {
  creation : string
  modified : string,
  name : string,
  full_name : string,
  bio : string,
  avatar : string,
  disabled : boolean,
  short_name : string,
  content_type
  : 
  string,
  published
  : 
  number,
  title
  : 
  string,
  blog_category : string,
  content_json : string,
  blogger : string,
  published_on? : string,
  meta_image? : string,
}

export type SystemPage = {
  content_type
: 
string,
name
: 
string,
published
: 
number,
title
: 
string,
blogger : string,
content_json : string,
published_on? : string,
meta_image? : string,
}