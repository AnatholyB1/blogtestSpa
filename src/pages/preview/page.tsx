
import {Suspense} from "react";
import PreviewPage from "@/component/preview";

export default function Preview () {
    return (
        <Suspense fallback={'Loading...'}>
            <PreviewPage></PreviewPage>
        </Suspense>
    )
}