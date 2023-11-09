
import Headbar from "./previewComponent/headbar";
import Main from "./previewComponent/main";

export default function PreviewPage () {
    return (
        <div className="w-screen h-auto hidden md:grid grid-low-row ">
            <Headbar className="place-slef-start"/>
            <Main className="place-slef-auto w-full h-full " />
        </div>
    )
}