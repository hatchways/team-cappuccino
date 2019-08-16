import React from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const addItemStyles = makeStyles(theme => ({}));

function AddItem(props) {
  const classes = addItemStyles();
  const { open, onClose } = props;
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        style: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: "WhiteSmoke"
        }
      }}
    >
      <DialogTitle>Add New Item</DialogTitle>
      <DialogContent>
        <h3 style={{ textAlign: "center" }}>Paste link to item</h3>
        <TextField
          style={{ width: "20vw" }}
          InputProps={{ disableUnderline: true }}
          inputProps={{ style: { textAlign: "center" } }}
          placeholder="Paste your link here"
          style={{ backgroundColor: "white" }}
        />
        <h3 style={{ textAlign: "center" }}>Select list</h3>
        <TextField
          style={{ width: "20vw" }}
          InputProps={{ disableUnderline: true }}
          inputProps={{ style: { textAlign: "center" } }}
          placeholder="Select"
        />
      </DialogContent>
    </Dialog>
  );
}

export default AddItem;
