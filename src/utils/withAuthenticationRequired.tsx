import React from 'react';
import { Navigate } from 'react-router-dom';
import { getToken } from './helper';

const withAuthenticationRequired = (ComposedComponent: any) => {
    const Component = (props: any) => {
        if (getToken()) {
            return (
                <ComposedComponent {...props} />
            );
        }
        return <Navigate to={'/login'} />;
    };
    return <Component />;
};

export default withAuthenticationRequired;
