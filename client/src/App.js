import React, { Fragment } from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { theme } from "./themes/theme";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PrivateRoute from './services/PrivateRoute';
import setAuthToken from './services/setAuthToken';
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/Signup";
import ProfilePage from "./pages/Profile";
import Header from "./pages/Header";
import "./App.css";
import AuthState from "./context/auth/AuthState";


if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () =>{
  return (
    <MuiThemeProvider theme={theme}>
      <AuthState>
        <BrowserRouter>
          <Fragment>
            <Header  />
            <Switch>
              <Route exact path="/" component={LoginPage} />
              <Route path="/signup" component={SignUpPage} />
              <PrivateRoute path="/profile" component={ProfilePage} />
            </Switch>
          </Fragment>
          </BrowserRouter>
      </AuthState>
    </MuiThemeProvider>
  );
}

export default App;
