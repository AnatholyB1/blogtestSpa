
import { useContext } from "react"
import { ModelSelector } from "./model-selector"
import { DatePicker } from "./publishdate-selector"
import { WriterSelector } from "./writer-select"
import { AnimationContext } from "@/provider/animationProvider"

export default function SideBarRight ({state} : {state : string}) {
    const animation = useContext(AnimationContext)
    return (
        <div className={`SideBarRight ${animation.sidebarRight && ('open')}`}>
                <ModelSelector mode={state} />
                <DatePicker mode={state}></DatePicker>
                <WriterSelector mode={state}></WriterSelector>
        </div>
    )
}