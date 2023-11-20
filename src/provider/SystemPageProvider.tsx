
import { createContext, useEffect, useState} from "react";


const SystemPageContext = createContext<contextValueSystemPage>({} as contextValueSystemPage);


import { useFrappeGetDocList} from 'frappe-react-sdk'
import { SystemPage, UpdateObject } from "../../typing";


// Créez le fournisseur de contexte
const SystemPageProvider = ({children} : {children : any}) => { 
    // Définissez la variable d'état et la fonction pour la mettre à jour
    const [myVariable, setMyVariable] = useState<string>('');
    const [data , setData] = useState<SystemPage>()
    const [object , setMyObject] = useState<UpdateObject>({} as UpdateObject)
    // Fonction pour changer la variable
    const changeVariable = (newValue : string) => {
      setMyVariable(newValue);
    };
    
    var {data : dataList , mutate} = useFrappeGetDocList<SystemPage>('SystemPage',{fields : ['*']} )

    useEffect(() => {
      if(dataList)
      {
        if(myVariable)
        {
          let variable = parseInt(myVariable)
          setData(dataList[variable])
        }
        else{
          setData({} as SystemPage)
        }
      }
    },[dataList,myVariable])


  
    const changeObject = (newobj? : UpdateObject, property?: keyof UpdateObject, value?: UpdateObject[keyof UpdateObject]) => {
      if (newobj) {
        setMyObject(newobj);
      } else if (property && value) {
        setMyObject(prevObject => ({ ...prevObject,[property]: value }));
      }
    };

    // Valeur fournie par le contexte
    const contextValue : contextValueSystemPage= {
      update : object,
      variable : myVariable,
      dataList : dataList ,
      data : data,
      changeSubmit : changeObject,
      changeVariable : changeVariable,
      mutate : mutate,
    };
  
    return <SystemPageContext.Provider value={contextValue}>{children}</SystemPageContext.Provider>;
  };
  
  export { SystemPageContext, SystemPageProvider };

  type contextValueSystemPage = {
    update: UpdateObject;
    variable: string;
    dataList: SystemPage[] | undefined;
    data: SystemPage | undefined;
    changeSubmit: (newobj?: UpdateObject, property?: keyof UpdateObject, value?: UpdateObject[keyof UpdateObject]) => void;
    changeVariable: (newValue: string) => void;
    mutate: () => void;
  }