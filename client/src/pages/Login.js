import React, { Component } from "react";

import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";

const loginPageStyle = theme => ({
  signInContainer: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  signIn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  email: {
    marginTop: "40px",
    width: "25vw",
    minWidth: "240px"
  },
  password: {
    marginTop: "30px",
    width: "25vw",
    minWidth: "240px"
  },
  loginButton: {
    marginTop: "30px",
    minWidth: "110px",
    maxWidth: "185px",
    backgroundColor: theme.primary,
    color: "white"
  },
  createAccount: {
    marginTop: "30px"
  }
});

class LoginPage extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.signInContainer}>
        <div className={classes.signIn}>
          <h1>Sign In</h1>
          <TextField
            id="Email"
            label="Email"
            autoFocus="true"
            variant="outlined"
            className={classes.email}
          />
          <TextField
            id="Password"
            label="Password"
            variant="outlined"
            className={classes.password}
          />
          <Button
            variant="contained"
            size="large"
            buttonStyle={{ borderRadius: 25, width: "15vw" }}
            style={{ borderRadius: 25, width: "15vw" }}
            className={classes.loginButton}
          >
            Login
          </Button>
          <p className={classes.createAccount}>
            Don't have an account? <Link to="/signup">Create an account</Link>
          </p>
        </div>
      </div>
    );
  }
}

export default withStyles(loginPageStyle)(LoginPage);
