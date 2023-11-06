
import { createContext, useEffect, useState } from "react";


const CategoryContext = createContext<contextValueBlogger>({} as contextValueBlogger);


import { useFrappeGetDocList} from 'frappe-react-sdk'
import { Category } from "../../typing";


// Créez le fournisseur de contexte
const CategoryProvider = ({children} : {children : any}) => { 
    // Définissez la variable d'état et la fonction pour la mettre à jour
    const [myVariable, setMyVariable] = useState<string>('');
    const [data , setData] = useState<Category>()
    const [submited , setSubmit] = useState(2)
    // Fonction pour changer la variable
    const changeVariable = (newValue : string) => {
      setMyVariable(newValue);
    };
    
    var {data : dataList , mutate} = useFrappeGetDocList<Category>('Blog Category',{fields : [
    'name',
    'title',
    'image',
    'published',
    'description']} )

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
  
    return <CategoryContext.Provider value={contextValue}>{children}</CategoryContext.Provider>;
  };
  
  export { CategoryContext, CategoryProvider };

  type contextValueBlogger = {
    update: number;
    variable: string;
    dataList: Category[] | undefined;
    data: Category | undefined;
    changeSubmit: (value: number) => void;
    changeVariable: (newValue: string) => void;
  }