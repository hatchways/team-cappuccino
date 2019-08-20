import React, { useState, useContext, useEffect } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import { Button } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

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

const Register = props => {
    const authContext = useContext(AuthContext);
    const { register, error, clearErrors, isAuthenticated } = authContext;

    useEffect(() => {
        if(isAuthenticated) {
          props.history.push('/profile');
        }
    }, [error, isAuthenticated, props.history]);

    // set up state ofr user registering
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
    });

    // define user state
    const { name, email, password } = user;

    const handleChange = name => e => setUser({ ...user, [name]: e.target.value });

    const handleSubmit = e => {
        e.preventDefault();
        register({
            name,
            email,
            password
          });
    }

    const { classes } = props;
    return (
      <div className={classes.formContainer}>
        <div className={classes.formDetails}>
          <h1>Sign Up</h1>
          <TextField
            id="Name"
            label="Name"
            autoFocus="true"
            variant="outlined"
            onChange={handleChange('name')}
            value={name}
            className={classes.formTextArea}
          />
          <TextField
            id="Email"
            label="Email"
            variant="outlined"
            onChange={handleChange('email')}
            value={email}
            className={classes.formTextArea}
          />
          <TextField
            id="Password"
            label="Password"
            variant="outlined"
            autoComplete="current-password"
            onChange={handleChange('password')}
            value={password}
            className={classes.formTextArea}
          />
          <Button
            variant="contained"
            size="large"
            type="submit"
            buttonStyle={{
              borderRadius: 25,
              width: "15vw"
            }}
            style={{ borderRadius: 25, width: "15vw" }}
            className={classes.formButton}
            onClick={handleSubmit}
          >
            Register
          </Button>
          <p className={classes.createAccount}>
          Already have an account?{" "}
          <Link to="/" className={classes.createLink}>
            Sign In
          </Link>
          </p>
      </div>
    </div>
    )
}


export default withRouter(withStyles(FormContainer)(Register));