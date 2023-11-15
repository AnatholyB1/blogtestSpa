import { useState, useEffect, useContext } from "react"

import { Progress,  } from "@/components/ui/progress"
import { LoadingStateContext } from "@/provider/loadinStateProvider"


export function ProgressDemo() {
  const [progress, setProgress] = useState(0)
  const loading =  useContext(LoadingStateContext)

  useEffect(() => {
    if(loading.loading)
    {
      setProgress(66)
    }
    if(loading.progress !== 0)
    {
      setProgress(loading.progress)
    }
    if(loading.completed)
    {
      setProgress(100)
    }
  }, [loading.progress, loading.loading, loading.completed])

  useEffect(() => {
    var timer = {} as NodeJS.Timeout
    if(progress !== 0)
    {
      timer = setTimeout(() => setProgress(66), 500)
    }
    if(progress === 66)
    {
      timer = setTimeout(() => setProgress(100), 1000)
    }
    if(progress === 100)
    {
      return () => {clearTimeout(timer); setProgress(0)}
    }
    return () => {clearTimeout(timer); setProgress(0)}
  }, [progress])

  return <Progress value={progress} className="w-full z-20 h-1 rounded-none fixed top-0 left-0  bg-transparent ;
  ] " />
}
