import React from "react";
import { Navigate } from "react-router-dom";
import { getToken } from "./helpers";

const withoutAuthenticationRequired = (ComposedComponent: any) => {
    const Component = (props: any) => {
        if (getToken()) {
            return <Navigate to={"/"} />
        }
        return <ComposedComponent {...props} />;
    }

    return <Component />;
}

export default withoutAuthenticationRequired;