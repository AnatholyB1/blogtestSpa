
import PlaygroundPage from "@/component/playground"
import { Suspense } from "react"

export default function NewCategory () {
    return(
        <Suspense fallback={'Loading...'}>
        <PlaygroundPage state={'new'} page={'Categories'}></PlaygroundPage >
        </Suspense>
    )
}