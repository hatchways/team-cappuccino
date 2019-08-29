import React from "react";

import { makeStyles } from "@material-ui/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const loadingSpinnerStyles = makeStyles(theme => ({
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
  }
}));

function LoadingSpinner() {
  const classes = loadingSpinnerStyles();

  return (
    <div className={classes.loadingContainer}>
      {" "}
      <CircularProgress className={classes.loadingProgress} />{" "}
    </div>
  );
}

export default LoadingSpinner;
