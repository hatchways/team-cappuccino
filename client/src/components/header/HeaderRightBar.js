import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

import { isAuthenticated } from "../auth";
import { getUser } from "../api";
import { Button, Badge, Avatar } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/styles";
import HeaderNotification from "./HeaderNotification.js";
import { logout } from "../../components/auth";

const headerRightBarStyles = makeStyles(theme => ({
  grow: {
    display: "flex",
    justifyContent: "flex-end",
    flexDirection: "row",
    flexGrow: "1",
    alignItems: "center"
  },
  label: {
    marginLeft: "15px",
    font: theme.typography.fontFamily,
    fontSize: ".6em",
    fontWeight: 250,
    letterSpacing: "0em",
    color: "black",
    whiteSpace: "nowrap"
  },
  badgeColor: {
    color: theme.primary
  },
  accountCircle: {
    color: theme.primary,
    width: "1.7em",
    height: "1.7em",
    marginLeft: "20px"
  },
  profile: {
    marginLeft: "5px",
    font: theme.typography.fontFamily,
    fontSize: ".6em",
    fontWeight: 250,
    letterSpacing: "0.1em",
    color: "black",
    whiteSpace: "nowrap"
  }
}));

const StyledBadge = withStyles(theme => ({
  badge: {
    top: "25%",
    right: 5,
    background: `${theme.primary}`
  }
}))(Badge);

function HeaderRightBar(props) {
  const history = props.history;
  const classes = headerRightBarStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const notificationElements = ["a", "b", "c", "d", "e"];
  const { changeLocation } = props;
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

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <div className={classes.grow}>
      <Button
        className={classes.label}
        onClick={() => {
          changeLocation("/lists");
        }}
      >
        Shopping List
      </Button>
      <Button
        className={classes.label}
        onClick={() => {
          changeLocation("/friends");
        }}
      >
        Friends
      </Button>
      {notificationElements.length > 0 ? (
        <StyledBadge variant="dot">
          <Button className={classes.label} onClick={handleClick}>
            Notifications
          </Button>
        </StyledBadge>
      ) : (
        <Button className={classes.label} disabled>
          Notifications
        </Button>
      )}
      <HeaderNotification
        anchorEl={anchorEl}
        handleClose={handleClose}
        elements={notificationElements}
      />
      <Avatar className={classes.accountCircle} src={state.user.avatar} />
      <Button
        className={classes.profile}
        onClick={() => {
          changeLocation("/profile");
        }}
      >
        Profile
      </Button>
      <Button
        className={classes.profile}
        onClick={() => {
          logout(props.history);
        }}
      >
        Sign Out
      </Button>
    </div>
  );
}

export default withRouter(HeaderRightBar);
