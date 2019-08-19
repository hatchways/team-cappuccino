import React, { useState } from "react";

import {
  Button,
  Grid,
  Paper,
  InputBase,
  FormControl,
  NativeSelect
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddItem from "./AddItem.js";
import List from "./List.js";

const profilePageStyles = makeStyles(theme => ({
  backgroundColor: {
    backgroundColor: "WhiteSmoke",
    height: "100vh"
  },
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
  emptyListSelect: {
    fontSize: ".8em",
    color: "grey"
  },
  nonEmptyListSelect: {
    fontSize: ".8em"
  },
  listSelect: {
    marginLeft: 25,
    marginTop: 10,
    marginBottom: 10,
    width: "8vw"
  },
  addItemButton: {
    marginLeft: 25,
    marginRight: 10,
    backgroundColor: theme.primary,
    fontSize: ".8em",
    color: "white"
  }
}));

function ProfilePage() {
  const [list, setList] = useState("");
  const [modalState, setModalState] = React.useState({
    addItem: false,
    addList: false,
    editList: false
  });

  const handleModalState = modalName => event => {
    setModalState(prevState => {
      return { ...prevState, [modalName]: !modalState[modalName] };
    });
  };

  const handleChange = event => {
    setList(event.target.value);
  };

  const listOptions = ["a", "b", "c"];

  const classes = profilePageStyles();

  function getClassName() {
    if (list === "") {
      return classes.emptyListSelect;
    } else {
      return classes.nonEmptyListSelect;
    }
  }
  return (
    <div className={classes.backgroundColor}>
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
              placeholder="Paste your link here"
              className={classes.linkInput}
            />
          </Paper>
          <Paper className={classes.paperListContainer}>
            <FormControl className={classes.listSelect}>
              <NativeSelect
                value={list}
                onChange={handleChange}
                // InputProps={{ disableUnderline: true }}
                input={<InputBase className={getClassName()} />}
              >
                <option value="" disabled>
                  Select list
                </option>
                {listOptions.map(op => (
                  <option key={op} value={op}>
                    {op}
                  </option>
                ))}
              </NativeSelect>
            </FormControl>
            <Button
              variant="contained"
              size="large"
              style={{
                borderRadius: 25,
                width: "100px"
              }}
              onClick={handleModalState("addItem")}
              className={classes.addItemButton}
            >
              Add
            </Button>
            <AddItem
              open={modalState.addItem}
              onClose={handleModalState("addItem")}
            />
          </Paper>
        </Grid>
      </Grid>

      <List modalState={modalState} handleModalState={handleModalState} />
    </div>
  );
}

export default ProfilePage;
