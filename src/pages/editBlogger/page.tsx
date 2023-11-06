
import PlaygroundPage from "@/component/playground"
import { Suspense } from "react"

export default function EditBlogger () {
    return(
        <Suspense fallback={'Loading...'}>
        <PlaygroundPage state={'edit'} page={'Blogger'}></PlaygroundPage>
        </Suspense>
    )
}