
import PlaygroundPage from "@/component/playground"
import { Suspense } from "react"

export default function ViewCategory () {
    return(
        <Suspense fallback={'Loading...'}>
        <PlaygroundPage state={'view'} page={'Categories'}></PlaygroundPage >
        </Suspense>
    )
}