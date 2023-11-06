
import PlaygroundPage from "@/component/playground"
import { Suspense } from "react"

export default function ViewBlogger () {
    return(
        <Suspense fallback={'Loading...'}>
        <PlaygroundPage state={'view'} page={'Blogger'}></PlaygroundPage>
        </Suspense>
    )
}