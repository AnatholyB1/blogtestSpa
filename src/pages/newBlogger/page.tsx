
import PlaygroundPage from "@/component/playground"
import { Suspense } from "react"

export default function NewBlogger () {
    return(
        <Suspense fallback={'Loading...'}>
        <PlaygroundPage state={'new'} page={'Blogger'}></PlaygroundPage>
        </Suspense>
    )
}