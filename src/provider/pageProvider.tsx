
import { createContext, useEffect, useState} from "react";


const PageContext = createContext({} as any);


import { useFrappeGetDocList} from 'frappe-react-sdk'


// Créez le fournisseur de contexte
const PageProvider = ({children} : {children : any}) => { 
    // Définissez la variable d'état et la fonction pour la mettre à jour
    const [myVariable, setMyVariable] = useState('');
    const [data , setData] = useState()
    const [submited , setSubmit] = useState(2)
    // Fonction pour changer la variable
    const changeVariable = (newValue : string) => {
      setMyVariable(newValue);
    };
    
    var {data : dataList , mutate} = useFrappeGetDocList('BlogPage',{fields : [ '*']} )

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
      if(submited == 1)
      {
        mutate()
      }
  
    },[submited])
  
    const changeSubmit = (value : number) => {
        setSubmit(value)
    }

    // Valeur fournie par le contexte
    const contextValue = {
      update : submited,
      variable : myVariable,
      dataList : dataList ,
      data : data,
      mutate : mutate,
      setData : setData,
      changeSubmit : changeSubmit,
      changeVariable : changeVariable,
    };
  
    return <PageContext.Provider value={contextValue}>{children}</PageContext.Provider>;
  };
  
  export { PageContext, PageProvider };