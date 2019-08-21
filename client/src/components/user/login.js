import React from "react";
import { Link, Redirect } from "react-router-dom";
import { authenticate, login } from "../auth";
import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Spinner from "../utils/spinner";
import TextField from "@material-ui/core/TextField";

const FormContainer = theme => ({
  formContainer: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  formDetails: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  formAlert: {
    color: "red"
  },
  formTextArea: {
    marginTop: "40px",
    width: "25vw",
    minWidth: "240px"
  },
  formButton: {
    marginTop: "30px",
    minWidth: "110px",
    maxWidth: "185px",
    backgroundColor: theme.primary,
    color: "white"
  },
  createAccount: {
    marginTop: "30px"
  },
  createLink: {
    color: theme.primary
  }
});

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    error: "",
    redirectToReferer: false,
    loading: false
  };

  handleChange = name => event => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ loading: true });
    // define user
    const { email, password } = this.state;
    const user = { email, password };
    // sign user up
    login(user).then(data => {
      if (data.error) {
        this.setState({ error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          this.setState({ redirectToReferer: true });
        });
      }
    });
  };

  render() {
    const { email, password, error, loading, redirectToReferer } = this.state;
    const { classes } = this.props;

    if(redirectToReferer) {
      return <Redirect to="/profile" />
    }

    return (
      <div className={classes.formContainer}>
        <div className={classes.formDetails}>
          <h1>Sign In</h1>
          <div
            className={classes.formAlert}
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
          {loading ? (
            <div>
              <Spinner />
            </div>
          ) : (
            ""
          )}
          <TextField
            id="Email"
            label="Email"
            variant="outlined"
            onChange={this.handleChange("email")}
            value={email}
            className={classes.formTextArea}
          />
          <TextField
            id="Password"
            label="Password"
            variant="outlined"
            autoComplete="current-password"
            onChange={this.handleChange("password")}
            value={password}
            className={classes.formTextArea}
          />
          <Button
            variant="contained"
            size="large"
            type="submit"
            buttonStyle={{ borderRadius: 25, width: "15vw" }}
            style={{ borderRadius: 25, width: "15vw" }}
            className={classes.formButton}
            onClick={this.handleSubmit}
          >
            Log In
          </Button>
          <p className={classes.createAccount}>
            Don't have an account?{" "}
            <Link to="/register" className={classes.createLink}>
              Create an account
            </Link>
          </p>
        </div>
      </div>
    );
  }
}

export default withStyles(FormContainer)(Login);
