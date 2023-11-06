
import PlaygroundPage from "@/component/playground"
import { Suspense } from "react"

export default function NewPage () {
    return(
        <Suspense fallback={'Loading...'}>
        <PlaygroundPage state={'new'} page={'Page'}></PlaygroundPage>
        </Suspense>
    )
}