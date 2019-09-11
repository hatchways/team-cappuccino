import React, { useState } from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ImageUpload from "../utils/ImageUpload.js";
import { createList } from "../api/index.js";

function AddListDialog(props) {
  return (
    <DialogTitle>
      <p>This is Dialog Title</p>
    </DialogTitle>
  );
}

export default AddListDialog;
