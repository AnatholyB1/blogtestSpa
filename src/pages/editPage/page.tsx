
import PlaygroundPage from "@/component/playground"
import { Suspense } from "react"

export default function EditPage () {
    return(
        <Suspense fallback={'Loading...'}>
        <PlaygroundPage state={'edit'} page={'Page'}></PlaygroundPage>
        </Suspense>
    )
}