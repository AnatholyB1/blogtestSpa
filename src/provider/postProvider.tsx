
import { PostContextType, contextPost, DataDocList } from "../../typing";
import { createContext, useContext, useEffect, useState } from "react";
import { UpdateObject } from "../../typing";

const PostContext = createContext<contextPost>({} as contextPost);


import { useFrappeGetDocList, useFrappeCreateDoc} from 'frappe-react-sdk'
import { TabContext } from "./tabProvider";



// Créez le fournisseur de contexte
const PostProvider = ({children} : {children : any}) => { 
    // Définissez la variable d'état et la fonction pour la mettre à jour
    const [myVariable, setMyVariable] = useState<PostContextType>('');
    const [object, setMyObject] = useState<UpdateObject>({} as UpdateObject)
    const [data , setData] = useState<DataDocList>()
    const [copy, setCopy] = useState(false)
    const tabContext = useContext(TabContext)

    
    // Fonction pour changer la variable
    const changeVariable = (newValue : PostContextType) => {
      setMyVariable(newValue );
    };


    const changeObject = (newobj? : UpdateObject, property?: keyof UpdateObject, value?: UpdateObject[keyof UpdateObject]) => {
      if (newobj) {
        setMyObject(newobj);
      } else if (property && value) {
        setMyObject(prevObject => ({ ...prevObject,[property]: value }));
      }
    };
    
    const {data : dataList , mutate} = useFrappeGetDocList<DataDocList>('Blog Post',{fields : [ 'content_type',
    'name',
    'published',
    'title',
    'blog_category', 'content_json', 'blogger','published_on','meta_image']} )
    const {createDoc,isCompleted} = useFrappeCreateDoc<DataDocList>()


    useEffect(() => {
      if(dataList)
      {
        if(myVariable != 'null')
        {
          let variable = parseInt(myVariable)
          setData(dataList[variable])
        }
        else{
          setData({} as DataDocList)
        }
      }
    },[dataList,myVariable])

    useEffect(()=> {
      if(!object.submited)
      {
        mutate()
      }
    },[object.submited])


    useEffect(()=> {
      if(copy)
      {
        if(dataList)
        {
          if(myVariable != 'null')
          {
            let datatemp = dataList[parseInt(myVariable)]
            datatemp.title = datatemp.title + ' (copy)'
            let json = JSON.parse(datatemp.content_json)
            json.blocks[0].content[0].text = json.blocks[0].content[0].text + ' (copy)';
            datatemp.content_json = JSON.stringify(json)
            createDoc('Blog Post',datatemp).then(() => {
              tabContext.toggleMutate()
              setCopy(false)
            })
          }
        }
      }
    },[copy,dataList,myVariable])

    useEffect(() => {
      mutate()
    },[isCompleted])

    const handleCopy = ( page : string) => {
      setMyVariable(page)
      setCopy(true)
    }


    // Valeur fournie par le contexte
    const contextValue : contextPost = {
      update : object,
      variable : myVariable,
      dataList : dataList ,
      data : data,
      copy : copy,
      makeCopy :handleCopy,
      ChangeObject : changeObject,
      ChangeVariable : changeVariable,
    };
  
    return <PostContext.Provider value={contextValue}>{children}</PostContext.Provider>;
  };
  
  export { PostContext, PostProvider };