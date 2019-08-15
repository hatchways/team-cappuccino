import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { theme } from "./themes/theme";
import LandingPage from "./pages/Landing";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/Signup";
import ProfilePage from "./pages/Profile";

import "./App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route path="/signup" component={SignUpPage} />
          <Route path="/profile" component={ProfilePage} />
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
