import React, { Fragment } from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { theme } from "./themes/theme";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
<<<<<<< HEAD
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/Signup";
import ProfilePage from "./components/user/profile";
=======
import { isAuthenticated } from "./components/auth";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/Signup";
import ProfilePage from "./pages/Profile";
>>>>>>> bf4512d27fa80e4acf6c10ff1f56e784a74ad1f6
import ListPage from "./pages/Lists";
import Header from "./pages/Header";
import FriendsPage from "./pages/Friends";
import PrivateRoute from "./components/auth/PrivateRoute";
<<<<<<< HEAD
=======

>>>>>>> bf4512d27fa80e4acf6c10ff1f56e784a74ad1f6
import "./App.css";
import LoggedInRoute from "./components/auth/LoggedinRoute";
import setAuthToken from "./components/utils/setAuthToken";
import { isAuthenticated } from "./components/auth";

class App extends React.Component {
<<<<<<< HEAD
  componentDidMount() {
    const token = isAuthenticated().token;
    if (isAuthenticated()) {
      setAuthToken(token);
    }
  }
=======
>>>>>>> bf4512d27fa80e4acf6c10ff1f56e784a74ad1f6
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
