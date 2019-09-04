import React, { useEffect, useState } from "react";
import { getUser } from "../components/api";
import { isAuthenticated, logout } from "../components/auth";
import { deleteUser } from "../components/api";
import AvatarUpload from "../components/user/Avatar-Upload";
import { Avatar, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LoadingSpinner from "../components/utils/LoadingSpinner.js";
import moment from "moment";

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
    fontWeight: "bold",
    letterSpacing: ".3rem"
  },
  avatarStyle: {
    margin: "15px 0px 15px 0px",
    width: "15vh",
    height: "15vh"
  },
  emailSection: {
    fontSize: "1.2em",
    fontWeight: 400,
    letterSpacing: ".3rem"
  },
  joinedSection: {
    fontWeight: 400,
    letterSpacing: ".2rem",
    fontSize: ".8rem",
    marginTop: "-.1rem",
    marginBottom: "2rem"
  },
  signOutButton: {
    backgroundColor: theme.primary,
    color: "white",
    fontSize: "1em",
    fontWeight: 400,
    borderRadius: "25px"
  },
  deleteAccountButton: {
    backgroundColor: "blue",
    color: "white",
    fontSize: "1em",
    fontWeight: 400,
    borderRadius: "25px",
    marginBottom: "1rem"
  },
  userAvatarContainerOverlay: {
    position: "absolute",
    background: "rgba(0,0,0,0)",
    color: "#f1f1f1",
    width: "100%",
    transition: ".5 ease",
    opacity: "0",
    fontSize: "1rem",
    padding: ".5rem",
    textAlign: "center"
  },
  userAvatarContainer: {
    "&:hover": {
      opacity: "1"
    },
    cursor: "pointer"
  }
}));

function Profile(props) {
  const classes = profileStyles();
  const [state, setState] = useState({
    user: "",
    avatar: "",
    error: "",
    loading: true
  });
  const [open, setOpen] = React.useState(false);

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

  function handleClickOpen() {
    setOpen(true);
  }

  const handleClose = value => {
    setOpen(false);
  };

  function deleteAccount() {
    deleteUser();
    localStorage.removeItem("token");
  }

  return (
    <div className={classes.pageContainer}>
      {state.loading && <LoadingSpinner />}
      <div className={classes.userAvatarContainer}>
        <AvatarUpload open={open} onClose={handleClose} />
        <Avatar
          onClick={handleClickOpen}
          src={state.user.avatar}
          className={classes.avatarStyle}
        />
      </div>
      <h1 className={classes.pageStart}>{state.user.name}</h1>
      <h2 className={classes.emailSection}>{state.user.email}</h2>
      <p className={classes.joinedSection}>
        Joined {moment(state.user.joined).format("ll")}
      </p>
      <Button
        onClick={() => {
          deleteAccount();
        }}
        className={classes.deleteAccountButton}
        size="large"
      >
        Delete Account
      </Button>
      <Button
        onClick={() => {
          logout();
          props.history.push("/");
        }}
        className={classes.signOutButton}
        size="large"
      >
        Sign Out
      </Button>
    </div>
  );
}

export default Profile;
