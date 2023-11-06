
import { PostContextType, contextPost, DataDocList } from "../../typing";
import { createContext, useEffect, useState } from "react";
import { UpdateObject } from "../../typing";

const PostContext = createContext<contextPost>({} as contextPost);


import { useFrappeGetDocList} from 'frappe-react-sdk'



// Créez le fournisseur de contexte
const PostProvider = ({children} : {children : any}) => { 
    // Définissez la variable d'état et la fonction pour la mettre à jour
    const [myVariable, setMyVariable] = useState<PostContextType>('');
    const [object, setMyObject] = useState<UpdateObject>({} as UpdateObject)
    const [data , setData] = useState<DataDocList>()
    // Fonction pour changer la variable
    const changeVariable = (newValue : PostContextType) => {
      setMyVariable(newValue);
    };

    const changeObject = (newobj? : UpdateObject, property?: keyof UpdateObject, value?: UpdateObject[keyof UpdateObject]) => {
      if (newobj) {
        setMyObject(newobj);
      } else if (property && value) {
        setMyObject(prevObject => ({ ...prevObject,[property]: value }));
      }
    };
    
    var {data : dataList , mutate} = useFrappeGetDocList<DataDocList>('Blog Post',{fields : [ 'content_type',
    'name',
    'published',
    'title',
    'blog_category', 'content_json', 'blogger','published_on','meta_image']} )
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
    },[object.submited])
  


    // Valeur fournie par le contexte
    const contextValue : contextPost = {
      update : object,
      variable : myVariable,
      dataList : dataList ,
      data : data,
      ChangeObject : changeObject,
      ChangeVariable : changeVariable,
    };
  
    return <PostContext.Provider value={contextValue}>{children}</PostContext.Provider>;
  };
  
  export { PostContext, PostProvider };