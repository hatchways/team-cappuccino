import React, { useState, useContext, useEffect } from 'react';
import { Link } from "react-router-dom";
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



const Login = (props) => {
    const authContext = useContext(AuthContext);
    const { login, error, isAuthenticated } = authContext;

    useEffect(() => {
        if(isAuthenticated) {
            props.history.push('/profile')
        }
    }, [error, isAuthenticated, props.history]);

    // set state for user login
    const [user, setUser] = useState({ 
        email: "",
        password: "",
    });

    // define user
    const { email, password } = user;

    const handleChange = name => e => setUser({ ...user, [name]: e.target.value });

    const handleSubmit = e => {
      e.preventDefault();
      if (email === '' || password === '') {
          console.log('Please provide valid email and password');
      } else {
        login({
          email,
          password
        });
      }
    };

    // classes for styles 
    const { classes } = props;

    return(
    <div className={classes.formContainer}>
        <div className={classes.formDetails}>
            <h1>Sign In</h1>
            <TextField
              id="Email"
              label="Email"
              variant="outlined"
              type="email"
              onChange={handleChange}
              className={classes.formTextArea}
            />
            <TextField
              id="Password"
              label="Password"
              variant="outlined"
              type="password"
              onChange={handleChange}
              className={classes.formTextArea}
            />
            <Button
                variant="contained"
                size="large"
                type="submit"
                buttonStyle={{ borderRadius: 25, width: "15vw" }}
                style={{ borderRadius: 25, width: "15vw" }}
                className={classes.formButton}
                onClick={handleSubmit}
            >Log In</Button>
            <p className={classes.createAccount}>
                Don't have an account?{" "}
                <Link 
                    to="/signup" 
                    className={classes.createLink}>
                Create an account
                </Link>
            </p>
        </div>
    </div>
    )
}

export default withStyles(FormContainer)(Login);