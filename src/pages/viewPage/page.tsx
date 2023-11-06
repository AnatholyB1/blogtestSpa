
import PlaygroundPage from "@/component/playground"
export default function ViewPage () {
    if(typeof window !== "undefined" )
    return(
        <PlaygroundPage state={'view'} page={'Page'}></PlaygroundPage>
    )
}