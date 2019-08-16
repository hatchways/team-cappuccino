import React from 'react';
import { Route, Redirect } from "react-router-dom";
import decode from 'jwt-decode';


const checkAuth = () => {
    const jwtToken = localStorage.getItem('jwtToken');

    if (!jwtToken) return false;

    try {
        const { exp } = decode(jwtToken);
        if (exp < new Date().getTime() / 1000) return false;

    } catch(e) {
        return false;
    }

    return true;
}
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        checkAuth() ? (
          <Component {...props} />
        ) : (
            <Redirect to={{ pathname: '/' }} />
          )
      )} />
);
  
  export default PrivateRoute;