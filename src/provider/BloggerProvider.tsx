
import { createContext, useEffect, useState } from "react";


const BloggerContext = createContext<contextValueBlogger>({} as contextValueBlogger);


import { useFrappeGetDocList} from 'frappe-react-sdk'
import { BloggerType } from "../../typing";


// Créez le fournisseur de contexte
const BloggerProvider = ({children} : {children : any}) => { 
    // Définissez la variable d'état et la fonction pour la mettre à jour
    const [myVariable, setMyVariable] = useState<string>('');
    const [data , setData] = useState<BloggerType>()
    const [submited , setSubmit] = useState(false)
    // Fonction pour changer la variable
    const changeVariable = (newValue : string) => {
      setMyVariable(newValue);
    };
    
    var {data : dataList , mutate} = useFrappeGetDocList<BloggerType>('Blogger',{fields : [
    'name',
    'full_name',
    'short_name',
    'avatar',
    'disabled',
    'bio'],limit:200} )
    

    const deleteData = () => {
      setData(undefined)
    }

    useEffect(() => {
      if(dataList)
      {
        if(myVariable)
        {
          let variable = parseInt(myVariable)
          setData(dataList[variable])
        }
      }
    },[dataList,myVariable])

    useEffect(()=> {
      if(!submited)
      {
        mutate()
      }
    },[submited])
  
    const changeSubmit = (value : boolean) => {
        setSubmit(value)
    }




    // Valeur fournie par le contexte
    const contextValue : contextValueBlogger= {
      update : submited,
      variable : myVariable,
      dataList : dataList ,
      data : data,
      changeSubmit : changeSubmit,
      changeVariable : changeVariable,
      deleteData : deleteData,
    };
  
    return <BloggerContext.Provider value={contextValue}>{children}</BloggerContext.Provider>;
  };
  
  export { BloggerContext, BloggerProvider };

  type contextValueBlogger = {
    update: boolean;
    variable: string;
    dataList: BloggerType[] | undefined;
    data: BloggerType | undefined;
    changeSubmit: (value: boolean) => void;
    changeVariable: (newValue: string) => void;
    deleteData : () => void;
  }