import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from './index';


const PrivateRoute = ({ component: Component, ...otherComponents }) => (
    <Route 
        {...otherComponents}
        render={props =>
            isAuthenticated() ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/",
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
)


export default PrivateRoute;