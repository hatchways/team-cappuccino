import React, { useState, useEffect } from "react";
import { addItem } from "../api/index.js";
import LoadingSpinner from "../utils/LoadingSpinner.js";
import ScrappingConfirmation from "./ScrappingConfirmation.js";

function UploadItem(props) {
  const { open, body, makeSnackBar, reloadData, onClose } = props;
  const [state, setState] = useState({
    loading: false,
    confirmationDialog: false,
    returnedInformation: {}
  });

  function changeBoolState(name) {
    setState({ ...state, [name]: !state.name });
  }

  function onCloseConfirmation() {
    setState({
      loading: false,
      confirmationDialog: false,
      returnedInformation: {}
    });
    makeSnackBar("Item uploaded successfully");
    reloadData();
    reloadData();
    onClose();
  }

  function upload() {
    changeBoolState("loading");
    addItem(body).then(data => {
      if (data.error) {
        makeSnackBar("Item upload failed");
        console.log(data.error);
      } else {
        console.log(data);
        setState({
          loading: false,
          confirmationDialog: true,
          returnedInformation: data
        });
        // changeBoolState("loading");
        // changeBoolState("confirmationDialog");
      }
    });
  }

  useEffect(() => {
    if (open && !state.loading && !state.confirmationDialog) {
      upload();
    }
  }, [open, state.confirmationDialog, state.loading, upload]);

  return (
    <>
      {state.loading && <LoadingSpinner />}
      <ScrappingConfirmation
        open={state.confirmationDialog}
        handleClose={onCloseConfirmation}
        returnedInformation={state.returnedInformation}
      />
    </>
  );
}

export default UploadItem;
