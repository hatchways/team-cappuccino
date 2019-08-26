import React, { useEffect, useState } from "react";
import { getUser } from "../components/api";
import { isAuthenticated, logout } from "../components/auth";
import { Avatar, Button } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Spinner from "../components/utils/spinner.js";
import CircularProgress from "@material-ui/core/CircularProgress";

const profileStyles = makeStyles(theme => ({
  loadingContainer: {
    width: "100vw",
    height: "100vh",
    zIndex: 25,
    backgroundColor: "rgb(245, 245, 245, .7)",
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  loadingProgress: {
    color: theme.primary
  },
  pageContainer: {
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  pageStart: {
    margin: "0px 0px 0px 0px",
    fontWeight: 400
  },
  avatarStyle: {
    margin: "15px 0px 15px 0px",
    width: "15vh",
    height: "15vh"
  },
  userName: {
    fontSize: "1.5em",
    fontWeight: 400,
    margin: "20px 0px 20px 0px"
  },
  signOutButton: {
    backgroundColor: theme.primary,
    color: "white",
    fontSize: "1em",
    fontWeight: 400,
    borderRadius: "25px"
  }
}));

function Profile(props) {
  const classes = profileStyles();
  const [state, setState] = useState({
    user: "",
    error: "",
    loading: true
  });

  useEffect(() => {
    onMount();
  }, []);

  function onMount() {
    const token = isAuthenticated().token;
    getUser(token).then(data => {
      if (data.error) {
        setState({ user: { name: "" }, error: data.error, loading: false });
      } else {
        console.log(data);
        setState({ error: "", user: data, loading: false });
      }
    });
  }

  return (
    <div className={classes.pageContainer}>
      {state.loading && (
        <div className={classes.loadingContainer}>
          {" "}
          <CircularProgress className={classes.loadingProgress} />{" "}
        </div>
      )}
      <h1 className={classes.pageStart}>Profile</h1>
      <Avatar className={classes.avatarStyle} />
      <h1 className={classes.userName}>{state.user.name}</h1>
      <Button
        onClick={() => {
          logout();
          props.history.push("/");
        }}
        className={classes.signOutButton}
        size="large"
      >
        Logout
      </Button>
    </div>
  );
}

export default Profile;
