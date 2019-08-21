import React, { Fragment } from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { theme } from "./themes/theme";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/Signup";
import ProfilePage from './components/user/profile';
import ListPage from "./pages/Profile";
import Header from "./pages/Header";
import FriendsPage from "./pages/Friends";
import PrivateRoute from './components/auth/PrivateRoute';

import "./App.css";
import LoggedInRoute from "./components/auth/LoggedinRoute";



 class App extends React.Component{
  
  render() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Fragment>
          <Header /> 
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/login" />} />
            {/* Auth routes */}
            <LoggedInRoute exact path="/login" component={LoginPage} />
            <LoggedInRoute exact path="/register" component={SignUpPage} />
            <Route path="/friends" component={FriendsPage} />
            <PrivateRoute exact path="/profile" component={ProfilePage} />
            <PrivateRoute exact path="/lists" component={ListPage} />
          </Switch>
        </Fragment>
      </BrowserRouter>
    </MuiThemeProvider>
  );
  }
}

export default App;
