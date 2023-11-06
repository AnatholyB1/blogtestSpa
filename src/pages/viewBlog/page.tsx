
import PlaygroundPage from "@/component/playground"
import { Suspense } from "react"

export default function ViewBlog () {
    return(
        <Suspense fallback={'Loading...'}>
        <PlaygroundPage state={'view'} page={'Post'}></PlaygroundPage>
        </Suspense>
    )
}