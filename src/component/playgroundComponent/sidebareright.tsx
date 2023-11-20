
import { useContext } from "react"
import { ModelSelector } from "./model-selector"
import { DatePicker } from "./publishdate-selector"
import { WriterSelector } from "./writer-select"
import { AnimationContext } from "@/provider/animationProvider"

interface NavegationProps extends React.HTMLProps<HTMLDivElement> {
    state? : string,
    default? : boolean
}
export default function SideBarRight ({...props} : NavegationProps )  {
    const animation = useContext(AnimationContext)
    return (
        <div className={`SideBarRight ${animation.sidebarRight && ('open')}`} {...props}>
                {props.children}
                {!props.default && (<><ModelSelector mode={props.state!} />
                <DatePicker mode={props.state!}></DatePicker>
                <WriterSelector mode={props.state!}></WriterSelector></>)}
        </div>
    )
}