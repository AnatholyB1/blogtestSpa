
import PlaygroundPage from "@/component/playground"
import { Suspense } from "react"

export default function NewSystemPage () {
    return(
        <Suspense fallback={'Loading...'}>
        <PlaygroundPage state={'new'} page={'SystemPage'}></PlaygroundPage>
        </Suspense>
    )
}