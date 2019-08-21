import React from "react";
import { AppBar, Button, Toolbar, Grid, Badge } from "@material-ui/core";
import { withRouter } from 'react-router';
import AccountCircle from "@material-ui/icons/AccountCircle";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import AppIcon from "../assets/logo.png";

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
    fontSize: ".6em",
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

function Header(props) {
  const classes = headerStyles();
  const { location } = props;

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

        {location.pathname !== "/" && location.pathname !== "/signup" && (
          <div className={classes.grow}>
            <Button className={classes.label}>Shopping List</Button>
            <Button
              className={classes.label}
              onClick={() => {
                props.history.push("/friends");
              }}
            >
              Friends
            </Button>
            <StyledBadge variant="dot">
              <Button className={classes.label}>Notifications</Button>
            </StyledBadge>
            <AccountCircle className={classes.accountCircle} />
            <Button className={classes.profile}>Profile</Button>
            <Button 
            className={classes.profile}
            onClick={() => props.signout}>Sign Out</Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default withRouter(Header);
