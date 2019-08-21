import React, { Fragment } from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { theme } from "./themes/theme";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/Signup";
import ProfilePage from "./pages/Profile";
import Header from "./pages/Header";
import PrivateRoute from './components/auth/PrivateRoute';
import "./App.css";



const App = () =>{
  return (
    <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <Fragment>
            <Header  /> 
            <Switch>
              <Route exact path="/" component={LoginPage} />
              <Route exact path="/register" component={SignUpPage} />
              <PrivateRoute exact path="/profile" component={ProfilePage} />
            </Switch>
          </Fragment>
          </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
