
import PlaygroundPage from "@/component/playground"
import { Suspense } from "react"

export default function ViewSystemPage () {
    return(
        <Suspense fallback={'Loading...'}>
        <PlaygroundPage state={'view'} page={'SystemPage'}></PlaygroundPage>
        </Suspense>
    )
}