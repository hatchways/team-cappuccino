import React from "react";
import { Button, Badge } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
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
    width: "1.5em",
    height: "1.5em",
    marginLeft: "40px"
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
  const classes = headerRightBarStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const notificationElements = ["a", "b", "c", "d", "e"];
  const { changeLocation } = props;

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
      <AccountCircle className={classes.accountCircle} />
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
          logout();
          changeLocation("/");
        }}
      >
        Sign Out
      </Button>
    </div>
  );
}

export default HeaderRightBar;
