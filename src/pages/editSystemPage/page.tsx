
import PlaygroundPage from "@/component/playground"
import { Suspense } from "react"

export default function EditSystemPage () {
    return(
        <Suspense fallback={'Loading...'}>
        <PlaygroundPage state={'edit'} page={'SystemPage'}></PlaygroundPage>
        </Suspense>
    )
}