import React from "react";
import { register } from "../auth";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
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
    color: "red",
  },
  formSuccess: {
    color: "green",
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
    color: "white",
    borderRadius: "25",
    width: "15vw"
  },
  createAccount: {
    marginTop: "30px"
  },
  createLink: {
    color: theme.primary
  }
});

class Register extends React.Component {
  state = {
    name: "",
    email: "",
    password: "",
    error: "",
    open: false
  };

  handleChange = name => event => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { name, email, password } = this.state;
    // define user
    const user = {
      name,
      email,
      password
    };

    register(user).then(data => {
      if (data.error) {
        this.setState({ error: data.error });
      }
      else {
        this.setState({
          error: "",
          name: "",
          email: "",
          password: "",
          open: true
        });
      }
    });
  };

  render() {
    const { name, email, password, error, open } = this.state;
    const { classes } = this.props;


    return (
      <div className={classes.formContainer}>
        <div className={classes.formDetails}>
          <h1>Sign Up</h1>
          {/* Failure Message */}
          <div
            className={classes.formAlert}
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
          {/* Successful Message */}
          <div
            className={classes.formSuccess}
            style={{ display: open ? "" : "none" }}
          >
            New account is successfully created. Please{" "}
            <Link to="/">Sign In</Link>.
          </div>
          <TextField
            id="Name"
            label="Name"
            variant="outlined"
            onChange={this.handleChange("name")}
            value={name}
            className={classes.formTextArea}
          />
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
            style={{ borderRadius: 25, width: "15vw" }}
            className={classes.formButton}
            onClick={this.handleSubmit}
          >
            Register
          </Button>
          <p className={classes.createAccount}>
            Already have an account?{" "}
            <Link to="/" className={classes.createLink}>
              Log In
            </Link>
          </p>
        </div>
      </div>
    );
  }
}

export default withStyles(FormContainer)(Register);
