import React, { useState, useEffect } from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SelectField from "../utils/SelectListField";
import UploadItem from "./uploadItem.js";
import UploadItemDialog from "./UploadItemDialog";

const addItemStyles = makeStyles(theme => ({
  addNewItemFont: {
    fontSize: "1em",
    fontWeight: 700,
    marginTop: "30px",
    textAlign: "center"
  },
  pasteLinkFont: {
    fontSize: ".8em",
    fontWeight: 700,
    marginTop: "20px"
  },
  selectListFont: {
    fontSize: ".8em",
    fontWeight: 700,
    marginTop: "40px"
  },
  button: {
    fontSize: ".8em",
    fontWeight: 400,
    marginTop: "40px",
    marginBottom: "60px",
    borderRadius: "25px",
    width: "130px",
    backgroundColor: theme.primary,
    color: "white"
  }
}));

function AddItemDialog(props) {
  const classes = addItemStyles();
  const { listDataController, changeDialogState } = props;
  const startingValue = listDataController.state.selectedList;
  const [state, setState] = useState({
    list: listDataController.state.selectedList,
    inputURL: "",
    body: {},
    uploading: false
  });

  //   useEffect(() => {
  //     if (ref !== undefined) {
  //       console.log("this is height of additemdialog", ref.current.scrollHeight);
  //     } else {
  //       console.log("ref is undefined", ref);
  //     }
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, []);

  //   useEffect(() => {
  //     const startingValue = listDataController.state.selectedList;
  //     setState({ ...state, list: listDataController.state.selectedList });
  //   }, [listDataController, state]);

  const itemNameTemp = "Some Name";

  function handleChangeUrl(newURL) {
    setState({ ...state, inputURL: newURL });
  }

  function handleChangeList(selectedList) {
    setState({ ...state, list: selectedList });
  }

  function handleClick() {
    changeDialogState("AddItemDialog", "UploadItemDialog");
    listDataController.uploadItem(
      { name: itemNameTemp, url: state.inputURL, list: state.list },
      () => {
        changeDialogState(
          "UploadItemDialog",
          "ScrappingConfirmationDialog",
          "AddItemDialog"
        );
      }
    );
  }

  return (
    <div>
      <DialogTitle>
        <p className={classes.addNewItemFont}>Add New Item</p>
      </DialogTitle>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "0px",
          margin: "0px"
        }}
      >
        <h3 className={classes.pasteLinkFont} style={{ textAlign: "center" }}>
          Paste link to item
        </h3>
        <TextField
          value={state.inputURL}
          onChange={e => {
            handleChangeUrl(e.target.value);
          }}
          InputProps={{
            disableUnderline: true,
            style: { width: "100%" }
          }}
          inputProps={{ style: { textAlign: "center" } }}
          placeholder="Paste your link here"
          style={{
            backgroundColor: "white",
            width: "75%",
            height: "50px",
            borderRadius: "5px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
          }}
        />
        <h3 className={classes.selectListFont} style={{ textAlign: "center" }}>
          Select list
        </h3>
        <SelectField
          listValues={listDataController.state.lists}
          promptText="Select"
          onChangeHandler={handleChangeList}
          fillWidthOf="75%"
          startingValue={startingValue}
        />
        <Button
          size="large"
          variant="contained"
          className={classes.button}
          onClick={handleClick}
        >
          Add Item
        </Button>
      </div>
    </div>
  );
}

export default AddItemDialog;
