import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";

import { getUser } from "../components/api";
import { isAuthenticated, logout } from "../components/auth";
import { Avatar, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LoadingSpinner from "../components/utils/LoadingSpinner.js";

const profileStyles = makeStyles(theme => ({
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
  const history = props.history;
  const classes = profileStyles();
  const [state, setState] = useState({
    user: "",
    error: "",
    loading: true
  });

  useEffect(() => {
    onMount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onMount() {
    const token = isAuthenticated().token;
    getUser(token, history).then(data => {
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
      {state.loading && <LoadingSpinner />}
      <h1 className={classes.pageStart}>Profile</h1>
      <Avatar className={classes.avatarStyle} src={state.user.avatar} />
      <h1 className={classes.userName}>{state.user.name}</h1>
      <Button
        onClick={() => {
          logout(history);
        }}
        className={classes.signOutButton}
        size="large"
      >
        Sign Out
      </Button>
    </div>
  );
}

export default withRouter(Profile);
