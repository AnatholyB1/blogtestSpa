
import Headbar from "./previewComponent/headbar";
import Main from "./previewComponent/main";

export default function PreviewPage () {
    return (
        <div className="w-screen h-screen flex flex-col align-center flex-1 self-stretch ">
            <Headbar />
            <Main/>
        </div>
    )
}