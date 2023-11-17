import {createContext, useState} from 'react';

type loadingStateType = {
    loading : boolean,
    setLoading : (newValue : boolean) => void
    progress : number,
    setProgress : (newValue : number) => void,
    completed : boolean,
    setCompleted : (newValue : boolean) => void
}

const LoadingStateContext = createContext({} as loadingStateType)


const LoadingStateProvider = ({children} : {children : any}) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [progress, setProgress] = useState<number>(0)
    const [completed, setCompleted] = useState<boolean>(false)


    const ChangeLoading = (newValue : boolean) => {
        setLoading(newValue);
    }
    const ChangeCompleted = () => {
            setCompleted(true);
            setLoading(false)
    }

    const ChangeProgress = (newValue : number) => {
        setProgress(newValue);
    }

    const contextValue : loadingStateType = {
        loading : loading,
        setLoading : ChangeLoading,
        progress : progress,
        setProgress : ChangeProgress,
        completed : completed,
        setCompleted : ChangeCompleted,
    };

    return <LoadingStateContext.Provider value={contextValue}>{children}</LoadingStateContext.Provider>;
};


export {LoadingStateContext, LoadingStateProvider};