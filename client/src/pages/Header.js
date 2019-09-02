import React from "react";
import { AppBar, Toolbar, Grid } from "@material-ui/core";
import { withRouter } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import AppIcon from "../assets/logo.png";
import HeaderRightBar from "../components/header/HeaderRightBar";

const headerStyles = makeStyles(theme => ({
  topBar: {
    boxShadow: "none"
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
  }
}));

function Header(props) {
  const classes = headerStyles();

  function changeLocation(loc) {
    props.history.push(loc);
  }

  return (
    <AppBar className={classes.topBar}>
      <Toolbar style={{ backgroundColor: "white" }}>
        <Grid
          container
          direction="row"
          spacing={2}
          alignItems="center"
          edge="start"
        >
          <Grid item>
            <img src={AppIcon} alt="logo" className={classes.logo} />
          </Grid>
          <Grid item className={classes.dealsMateGrid}>
            <h1 className={classes.dealsMateName}>DEALS MATE</h1>
          </Grid>
        </Grid>

        {props.location.pathname !== "/register" &&
          props.location.pathname !== "/login" && (
            <HeaderRightBar changeLocation={changeLocation} />
          )}
      </Toolbar>
    </AppBar>
  );
};

export default withRouter(Header);
