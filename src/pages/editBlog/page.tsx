

import { Suspense } from "react"
import PlaygroundPage from "@/component/playground"

export default function EditBlog () {
    return(
        <Suspense fallback={'Loading...'}>
        <PlaygroundPage state={'edit'} page={'Post'}></PlaygroundPage>
        </Suspense>
    )
}