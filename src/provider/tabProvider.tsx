
import { TabContextType, contextTab } from "../../typing";
import { createContext, useState } from "react";


const TabContext = createContext<contextTab>({} as contextTab);

// Créez le fournisseur de contexte
const TabProvider = ({children} : {children : any}) => {
    // Définissez la variable d'état et la fonction pour la mettre à jour
    const [myVariable, setMyVariable] = useState<TabContextType>('Post');
    const [del, setDelete] = useState<boolean>(false)
    const [rows, setRows] = useState<string[]>([])
    const [mutate, setMutate] = useState<boolean>(false)
  
    const changeMutate = () => {
      setMutate(!mutate)
      setRows([])
    }

    const addRows = (value : string) => {
      rows.push(value)
    }
  
    const suppRows = (value : string) => {
        const index = rows.indexOf(value);
        if (index > -1) {
            rows.splice(index, 1);
        }
    }
 
    // Fonction pour changer la variable
    const changeVariable = (newValue : TabContextType) => {
      setMyVariable(newValue);
    };
  
    // Valeur fournie par le contexte
    const contextValue = {
      mutate : mutate,
      toggleMutate : changeMutate,
      rows : rows,
      addRow : addRows,
      suppRow : suppRows,
      delete : del,
      setDelete : setDelete,
      variable : myVariable,
      ChangeVariable : changeVariable,
    };
  
    return <TabContext.Provider value={contextValue}>{children}</TabContext.Provider>;
  };
  
  export { TabContext, TabProvider };