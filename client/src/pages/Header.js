import React from "react";
import { isAuthenticated } from "../components/auth";
import { AppBar, Button, Toolbar, Grid, Badge } from "@material-ui/core";
import { withRouter } from "react-router";
import { logout } from "../components/auth";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import AppIcon from "../assets/logo.png";
import HeaderDropDown from "../components/header/header-dropdown";

const headerStyles = makeStyles(theme => ({
  topBar: {
    boxShadow: "none"
  },
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
    fontSize: ".8em",
    fontWeight: 250,
    letterSpacing: "0em",
    color: "black",
    whiteSpace: "nowrap"
  },
  logo: {
    width: "30px"
  },
  dealsMateGrid: {
    marginLeft: "20px"
  },
  dealsMateName: {
    font: theme.typography.fontFamily,
    fontSize: "1em",
    fontWeight: 250,
    letterSpacing: "0.5em",
    color: "black"
  },
  badgeColor: {
    color: theme.primary
  },
  accountCircle: {
    color: theme.primary,
    width: "1.5em",
    height: "1.5em"
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

const Header = props => {
  const classes = headerStyles();

  return (
    <AppBar className={classes.topBar}>
      <Toolbar style={{ backgroundColor: "white" }}>
        <Grid
          container
          direction="row"
          spacing={2}
          alignItems="center"
          edge="start"
          style={{ cursor: "pointer" }}
          onClick={() => {
            props.history.push("/profile");
          }}
        >
          <Grid item>
            <img src={AppIcon} alt="logo" className={classes.logo} />
          </Grid>
          <Grid item className={classes.dealsMateGrid}>
            <h1 className={classes.dealsMateName}>DEALS MATE</h1>
          </Grid>
        </Grid>

        {isAuthenticated() ? (
          <div className={classes.grow}>
            <AccountCircle className={classes.accountCircle} />
            <HeaderDropDown />
            <StyledBadge variant="dot">
              <Button className={classes.label}>Notifications</Button>
            </StyledBadge>
            <Button
              className={classes.label}
              onClick={() => {
                props.history.push("/friends");
              }}
            >
              Friends
            </Button>
            <Button
              className={classes.label}
              onClick={() => logout(props.history)}
            >
              Sign Out
            </Button>
          </div>
        ) : null}
      </Toolbar>
    </AppBar>
  );
};

export default withRouter(Header);
