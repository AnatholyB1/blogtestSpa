

import {useState, createContext} from "react"

type AnimationType = {
   error : boolean
   sidebarRight : boolean,
   sidebar : boolean,
   sideApp : boolean,
   itemSideBar : boolean,
   toggle  : (value : objectAnimation) => void,
}

type objectAnimation = 'SideBar' | 'SideApp' | 'SideBarRight' | 'ItemSideBar' | 'Error'

const AnimationContext = createContext<AnimationType>({} as AnimationType)

const AnimationProvider = ({children} : {children : any}) => {
    const [SideBarRight, setSideBarRight] = useState<boolean>(false)
    const [Sidebar, setSidebar] = useState<boolean>(false)
    const [SideApp, setSideApp] = useState<boolean>(false)
    const [ItemSideBar, setItemSideBar] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)


    const toggle = (value : objectAnimation) => {
        switch(value)
        {
            case 'SideBar':
                setSidebar(!Sidebar)
                break;
            case 'SideApp':
                setSideApp(!SideApp)
                break;
            case 'SideBarRight':
                setSideBarRight(!SideBarRight)
                break;
            case 'ItemSideBar':
                setItemSideBar(!ItemSideBar)
                break;
            case 'Error':
                
                setError(!error)
                break;
        }
    }

    const contextValue : AnimationType = {
        error : error,
        sidebarRight : SideBarRight,
        sidebar : Sidebar,
        sideApp : SideApp,
        itemSideBar : ItemSideBar,
        toggle : toggle
    }

    return <AnimationContext.Provider value={contextValue}>{children}</AnimationContext.Provider>
}

export {AnimationProvider, AnimationContext}