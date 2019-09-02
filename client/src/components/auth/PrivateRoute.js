import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from './index';
import * as moment from 'moment';
import decode from 'jwt-decode';



const PrivateRoute = ({ component: Component, ...rest }) => (
  // props means components passed down to this pricate route component

  <Route
      {...rest}
      render={props =>
          isAuthenticated() && isValid(isAuthenticated().token) ? (
              <Component {...props} />
          ) : (
              <Redirect
                  to={{
                      pathname: "/login",
                      state: { from: props.location }
                  }}
              />
          )
      }
  />
);


const isValid = (token) => {
    const decodedToken = decode(token);
    const exp = moment.unix(decodedToken.exp);

   return moment().isBefore(exp);
}



export default PrivateRoute;
