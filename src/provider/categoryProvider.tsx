
import { createContext, useContext, useEffect, useState } from "react";


const CategoryContext = createContext<contextValueBlogger>({} as contextValueBlogger);


import { useFrappeCreateDoc, useFrappeGetDocList} from 'frappe-react-sdk'
import { Category } from "../../typing";
import { TabContext } from "./tabProvider";
type CategoryCreate= Omit<Category, 'name'>;

// Créez le fournisseur de contexte
const CategoryProvider = ({children} : {children : any}) => { 
    // Définissez la variable d'état et la fonction pour la mettre à jour
    const [myVariable, setMyVariable] = useState<string>('');
    const [data , setData] = useState<Category>()
    const [submited , setSubmit] = useState<boolean>(false)
    const [copy, setCopy] = useState(false)
    const tabContext = useContext(TabContext) 
    // Fonction pour changer la variable
    const changeVariable = (newValue : string) => {
      setMyVariable(newValue);
    };
    
    var {data : dataList , mutate} = useFrappeGetDocList<Category>('Blog Category',{fields : [
    'name',
    'title',
    'image',
    'published',
    'description'],limit : 200} )
    const {createDoc,isCompleted} = useFrappeCreateDoc<CategoryCreate>()
    
    const deleteData = () => {
      setData(undefined)
    }

    useEffect(() => {
      mutate()
    },[isCompleted])

    const handleCopy = ( page : string) => {
      setMyVariable(page)
      setCopy(true)
    }
    useEffect(()=> {
      if(copy)
      {
        if(dataList)
        {
          if(myVariable != 'null')
          {
            let { name, ...datatemp } = dataList[parseInt(myVariable)]
            datatemp.title = datatemp.title + ' (copy)'
            createDoc('Blog Category',datatemp).then(() => {
              tabContext.toggleMutate()
              setCopy(false)
            })
          }
        }
      }
    },[copy,dataList,myVariable])

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
      copy : copy,
      makeCopy : handleCopy,
      dataList : dataList ,
      data : data,
      changeSubmit : changeSubmit,
      changeVariable : changeVariable,
      deleteData : deleteData,
    };
  
    return <CategoryContext.Provider value={contextValue}>{children}</CategoryContext.Provider>;
  };
  
  export { CategoryContext, CategoryProvider };

  type contextValueBlogger = {
    update: boolean | undefined;
    variable: string;
    copy: boolean;
    makeCopy : (value : string) => void;
    dataList: Category[] | undefined;
    data: Category | undefined;
    changeSubmit: (value : boolean) => void;
    changeVariable: (newValue: string) => void;
    deleteData : () => void;
  }