
import { Suspense } from "react"


import MusicPage from "@/component/main"

export default function Blog  () {
    
    return (
      <Suspense fallback={'Loading...'}>
      <MusicPage></MusicPage>
      </Suspense>
    )
}
