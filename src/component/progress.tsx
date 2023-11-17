import { useState, useEffect, useContext } from "react"

import { Progress,  } from "@/components/ui/progress"
import { LoadingStateContext } from "@/provider/loadinStateProvider"



export function ProgressDemo() {
  const [progress, setProgress] = useState(0)
  const loading =  useContext(LoadingStateContext)
  var timer : NodeJS.Timeout;

  useEffect(() => {
    if(loading.loading === true)
    {
      clearTimeout(timer)
      timer = setTimeout(() => setProgress(95), 1000)
    }
    if(loading.progress !== 0)
    {
      const num = loading.progress/4
      clearTimeout(timer)
      timer = setTimeout(() => setProgress(num), 1000)
    }
    if(loading.completed)
    {
      clearTimeout(timer)
      timer = setTimeout(() => setProgress(100), 100)
    }
  }, [loading.progress, loading.loading, loading.completed])

  useEffect(() => {
    if(progress === 100)
    {
      clearTimeout(timer)
      setTimeout(() => setProgress(0), 1000)
    }
  }, [progress])


  return <Progress value={progress} className="w-full z-[9999] h-1 rounded-none fixed top-0 left-0  bg-transparent ;
  ] " />
}
