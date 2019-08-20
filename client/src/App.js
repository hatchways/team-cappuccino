import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { withRouter } from "react-router";

import { theme } from "./themes/theme";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/Signup";
import ProfilePage from "./pages/Profile";
import Header from "./pages/Header";
import FriendsPage from "./pages/Friends";

import "./App.css";

function App() {
  const HeaderWithRouter = withRouter(Header);
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <HeaderWithRouter />
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route path="/signup" component={SignUpPage} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/friends" component={FriendsPage} />
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
