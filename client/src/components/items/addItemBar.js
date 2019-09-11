import React, { useState } from "react";
import { Button, Grid, Paper, InputBase } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SelectField from "../utils/SelectListField";
import ScrappingConfirmation from "./ScrappingConfirmation.js";
import UploadItem from "./uploadItem.js";

const addItemBarStyles = makeStyles(theme => ({
  bodyStart: {
    paddingTop: "100px"
  },
  addNewItem: {
    font: theme.typography.fontFamily,
    fontSize: "2em",
    fontWeight: 500,
    letterSpacing: "0em",
    color: "black"
  },
  paperLinkContainer: {
    borderRadius: "50px 0px 0px 50px",
    boxShadow: "none",
    borderRight: "1px solid WhiteSmoke"
  },
  linkInput: {
    marginLeft: 25,
    marginTop: 10,
    marginBottom: 10,
    width: "25vw",
    fontSize: ".8em"
  },
  paperListContainer: {
    borderRadius: "0px 50px 50px 0px",
    boxShadow: "none",
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  addItemButton: {
    marginLeft: 25,
    marginRight: 10,
    backgroundColor: theme.primary,
    fontSize: ".8em",
    color: "white"
  }
}));

export default function AddItemBar(props) {
  const classes = addItemBarStyles();
  const {
    makeSnackBar,
    makeDialogOpen,
    listDataController,
    changeDialogState
  } = props;
  const [state, setState] = useState({
    list: { name: "", _id: "" },
    inputUrl: "",
    inputUrlChanged: false,
    listSelected: false
  });

  const itemNameTemp = "Some Name";

  function handleChangeList(selectedList) {
    setState({ ...state, list: selectedList, listSelected: true });
  }

  function handleChangeURL(newURL) {
    setState({ ...state, inputUrl: newURL, inputUrlChanged: true });
  }

  function handleClick() {
    if (state.inputUrlChanged && state.listSelected) {
      makeDialogOpen("UploadItemDialog");
      listDataController.uploadItem(
        { name: itemNameTemp, url: state.inputUrl, list: state.list },
        () => {
          changeDialogState("UploadItemDialog", "ScrappingConfirmationDialog");
        }
      );
    } else {
      makeSnackBar("Please input a url and select a list");
    }
  }

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      className={classes.bodyStart}
    >
      <h1 className={classes.addNewItem}>Add new item:</h1>
      <Grid container direction="row" justify="center">
        <Paper className={classes.paperLinkContainer}>
          <InputBase
            value={state.inputUrl}
            placeholder="Paste your link here"
            className={classes.linkInput}
            onChange={e => {
              handleChangeURL(e.target.value);
            }}
          />
        </Paper>
        <Paper className={classes.paperListContainer}>
          <SelectField
            listValues={listDataController.state.lists}
            promptText="Select list"
            onChangeHandler={handleChangeList}
            fillWidthOf="8vw"
            fontSize=".8em"
            alignTextTo="start"
            textPadding="0px 0px 0px 8px"
          />
          <Button
            variant="contained"
            size="large"
            style={{
              borderRadius: 25,
              width: "100px"
            }}
            onClick={handleClick}
            className={classes.addItemButton}
          >
            Add
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
}
