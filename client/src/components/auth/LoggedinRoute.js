
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from './index';


const LoggedInRoute = ({ component: Component, ...rest }) => (
    // props means components passed down to this pricate route component
    <Route
        {...rest}
        render={props =>
            isAuthenticated().token ? (
                <Redirect to="/lists" />
            ) : (
                <Component {...props} {...rest}/>
            )
        }
    />
);


export default LoggedInRoute;
