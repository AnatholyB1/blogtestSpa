
import { TypeContextType, contextType, view, Category } from "../../typing";
import { createContext, useState} from "react";
const TypeContext = createContext<contextType>({} as contextType);


import {useFrappeGetDocList} from 'frappe-react-sdk'

// Créez le fournisseur de contexte
const TypeProvider = ({children} : {children : any}) => { 
    // Définissez la variable d'état et la fonction pour la mettre à jour
    const [myVariable, setMyVariable] = useState<TypeContextType>('');
    const [previousPage, setPreviousPage] = useState<string>('')
    const [block, setBlock] = useState<any>({})
    const [view, setView] = useState<view>('desktop')

    const changeView = (newvalue : view) => {
      setView(newvalue)
    }
    // Fonction pour changer la variable
    const changeVariable = (newValue : TypeContextType) => {
      setMyVariable(newValue);
    };

    const changepage = (newValue : string) => {
      setPreviousPage(newValue);
    };

    const changeBlock = (newValue : any) => {
      setBlock(newValue);
    };

    const getdata = () => {
      var {data ,isLoading} = useFrappeGetDocList<Category>('Blog Category',{fields : [ 
      'title',
      'name',
      'published',
      'image',
      'description'
       ]} )
      if (data){
        return {data, isLoading}
      }else{
        data = {} as Category[];
        return {data, isLoading}
      }
 
    } 


    // Valeur fournie par le contexte
    const contextValue : contextType = {
      view : view,
      changeView : changeView,
      previousPage : previousPage,
      block : block,
      changeBlock : changeBlock,
      changepage : changepage,
      variable : myVariable,
      data : getdata ,
      ChangeVariable : changeVariable,
    };
  
    return <TypeContext.Provider value={contextValue}>{children}</TypeContext.Provider>;
  };
  
  export { TypeContext, TypeProvider };