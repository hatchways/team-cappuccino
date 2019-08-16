import React, { Component } from "react";

import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { signup } from '../components/auth';
import TextField from "@material-ui/core/TextField";

const signUpPageStyle = theme => ({
  signUpContainer: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  signUp: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  name: {
    marginTop: "40px",
    width: "25vw",
    minWidth: "240px"
  },
  email: {
    marginTop: "30px",
    width: "25vw",
    minWidth: "240px"
  },
  password: {
    marginTop: "30px",
    width: "25vw",
    minWidth: "240px"
  },
  signUpButton: {
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

class SignUpPage extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    error: "",
  }

  handleChange = name => event => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value })
  }

  onSubmit = event => {
    event.preventDefault();
    const { name, email, password } = this.state;
    const user = { name, email, password };

    // sign up user
    signup(user).then(data => {
      // if(data.error) this.setState({ error: data.error });

      this.setState({
        error: "",
        name: "",
        email: "",
        password: "",
      })
    })
  }

  render() {
    const { classes } = this.props;
    const { name, email, password } = this.state;

    return (
      <div className={classes.signUpContainer}>
        <div className={classes.signUp}>
          <h1>Sign Up</h1>
          <TextField
            id="Name"
            label="Name"
            autoFocus="true"
            variant="outlined"
            className={classes.name}
            value={name}
            onChange={this.handleChange("name")}
          />
          <TextField
            id="Email"
            label="Email"
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
            buttonStyle={{
              borderRadius: 25,
              width: "15vw"
            }}
            style={{ borderRadius: 25, width: "15vw" }}
            className={classes.signUpButton}
            onClick={this.onSubmit}
          >
            Register
          </Button>
          <p className={classes.createAccount}>
            Already have an account? <Link to="/">Sign In</Link>
          </p>
        </div>
      </div>
    );
  }
}

export default withStyles(signUpPageStyle)(SignUpPage);
