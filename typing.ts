export interface User {
    token?: string,
    usr : string,
    pwd : string
}


export type UpdateObject = {
  publish_date? : string,
  image? : File,
  category : string,
  writer : string
  submited : number
}

import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  contentType: z.string(),
})

export type Task = z.infer<typeof taskSchema>

const categorySchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
})

export type CategoryTab = z.infer<typeof categorySchema>



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
  variable : PostContextType;
  dataList : DataDocList[] | undefined
  data : DataDocList | undefined;
  ChangeObject :(newobj?: UpdateObject, property?: keyof UpdateObject, value?: UpdateObject[keyof UpdateObject]) => void;
  ChangeVariable : (newValue: PostContextType) => void;
}


export type TypeContextType = string
export type view = 'mobile' | 'tablet' | 'desktop'

export type contextType = {
  view : view,
  changeView : (newvalue : view ) => void,
  previousPage : string,
  block : any,
  changepage : (newvalue : string) => void,
  changeBlock : (newvaue : any) => void,
  variable : TypeContextType;
  data : () => {
    data: Category[];
    isLoading: boolean;
};
  ChangeVariable : (newValue: TypeContextType) => void;
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
  published : boolean,
}


export type BloggerType = {
  name : string,
  full_name : string,
  bio : string,
  avatar : string,
  disabled : boolean,
  short_name : string,
}

export type BloggerTask = {
  id : string,
  name : string,
  avatar : string,
  status : boolean,
}


export type GetData = {
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
content_json : string,
published_on? : string,
meta_image? : string,
}