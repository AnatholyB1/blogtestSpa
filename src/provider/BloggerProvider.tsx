
import { createContext, useEffect, useState } from "react";


const BloggerContext = createContext<contextValueBlogger>({} as contextValueBlogger);


import { useFrappeGetDocList} from 'frappe-react-sdk'
import { Blogger } from "../../typing";


// Créez le fournisseur de contexte
const BloggerProvider = ({children} : {children : any}) => { 
    // Définissez la variable d'état et la fonction pour la mettre à jour
    const [myVariable, setMyVariable] = useState<string>('');
    const [data , setData] = useState<Blogger>()
    const [submited , setSubmit] = useState(2)
    // Fonction pour changer la variable
    const changeVariable = (newValue : string) => {
      setMyVariable(newValue);
    };
    
    var {data : dataList , mutate} = useFrappeGetDocList<Blogger>('Blogger',{fields : [
    'name',
    'full_name',
    'short_name',
    'avatar',
    'disabled',
    'bio']} )

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
      mutate()
  
    },[submited])
  
    const changeSubmit = (value : number) => {
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
    };
  
    return <BloggerContext.Provider value={contextValue}>{children}</BloggerContext.Provider>;
  };
  
  export { BloggerContext, BloggerProvider };

  type contextValueBlogger = {
    update: number;
    variable: string;
    dataList: Blogger[] | undefined;
    data: Blogger | undefined;
    changeSubmit: (value: number) => void;
    changeVariable: (newValue: string) => void;
  }