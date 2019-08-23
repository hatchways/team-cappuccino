import React, { useState } from "react";

import Snackbar from "@material-ui/core/Snackbar";

export default function SnackBar(props) {
  const { state } = props;
  const { open, onClose, message, timeShown } = state;
  const vertical = "bottom";
  const horizontal = "center";

  function handleClose() {
    // setState({ ...state, open: false });
    onClose();
  }

  // if(newVertical != undefined){setState({vertical: newVertical, ...state});}
  // if(newHorizontal != undefined){setState({horizontal: newHorizontal, ...state})}

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      onClose={handleClose}
      message={<span>{message}</span>}
      autoHideDuration={timeShown}
    />
  );
}
