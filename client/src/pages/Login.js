import React, { Component } from "react";
import { signin, authenticate } from '../components/auth';
import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Link, Redirect } from "react-router-dom";
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
  state = {
    email: "",
    password: "",
    error: "",
    redirectToReferer: false,
    loading: false,
  }


  // input handling
  handleChange = name => event => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };

  // submit form
  onSubmit = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const { email, password } = this.state;
    const user = { email, password};

    // sign in user
    try {
      signin(user).then(data => {
        // if (data.error) this.setState({ error: data.error, loading: false });
        console.log('User is logged in!');

        // set token
        authenticate(data.token, () => {
          this.setState({ redirectToReferer: true });
        });
      })
    } catch(e) {
      console.log(e);
    }
  }

  render() {
    const { classes } = this.props;
    const { email , password } = this.state;

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
            value={email}
            onChange={this.handleChange("email")}
          />
          <TextField
            id="Password"
            label="Password"
            variant="outlined"
            className={classes.password}
            value={password}
            onChange={this.handleChange("password")}
          />
          <Button
            variant="contained"
            size="large"
            buttonStyle={{ borderRadius: 25, width: "15vw" }}
            style={{ borderRadius: 25, width: "15vw" }}
            className={classes.loginButton}
            onClick={this.onSubmit}
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
