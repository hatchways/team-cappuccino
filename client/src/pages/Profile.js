import React, { useState } from "react";

import {
  Button,
  Grid,
  Paper,
  InputBase,
  FormControl,
  NativeSelect,
  GridList,
  GridListTile
} from "@material-ui/core";
import Add from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import listImage from "../assets/shoppingPlaceHolder.png";
import AddItem from "./AddItem.js";
import AddList from "./AddList.js";

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
  },
  shoppingListsContainer: {
    marginLeft: "10vw",
    marginRight: "10vw",
    marginTop: "10vh"
  },
  shoppingListText: {
    font: theme.typography.fontFamily,
    fontSize: "2em",
    fontWeight: 500,
    letterSpacing: "0em",
    color: "black"
  },
  listTile: {
    backgroundColor: "white",
    marginRight: "20px",
    borderRadius: "15px",
    marginTop: "20px"
  }
}));

function ProfilePage() {
  const [list, setList] = useState("");
  const [modalState, setModalState] = React.useState({
    addItem: false,
    addList: false
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
  const listNames = ["Clothes", "Furniture", "Luxury"];

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

      <div className={classes.shoppingListsContainer}>
        <h1 className={classes.shoppingListText}>My Shopping Lists:</h1>
        <GridList cellHeight={400}>
          {listNames.map(list => (
            <GridListTile
              style={{ padding: "0px", width: "288px", height: "400px" }}
              className={classes.listTile}
              key={list}
            >
              <Grid container direction="row" justify="center">
                <div
                  style={{
                    height: "300px",
                    overflow: "hidden",
                    borderRadius: "15px 15px 0px 0px"
                  }}
                >
                  <img src={listImage} alt="list" width="100%" />
                </div>
                <h2
                  style={{
                    width: "100%",
                    marginBottom: "0px",
                    alignSelf: "center",
                    textAlign: "center"
                  }}
                >
                  {list}
                </h2>
                <h3 style={{ marginTop: "10px" }}>x items</h3>
              </Grid>
            </GridListTile>
          ))}
          <GridListTile
            style={{
              padding: "0px",
              width: "288px",
              height: "400px",
              marginTop: "20px"
            }}
          >
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              style={{
                backgroundColor: "white",
                width: "100%",
                height: "100%",
                borderRadius: "15px 15px 15px 15px"
              }}
            >
              <Button
                style={{ width: "30px" }}
                onClick={handleModalState("addList")}
              >
                <Add style={{ width: "2em", height: "2em" }} />
              </Button>
              <AddList
                open={modalState.addList}
                onClose={handleModalState("addList")}
              />
              <h1 style={{ textAlign: "center" }}>Add New List</h1>
            </Grid>
          </GridListTile>
        </GridList>
      </div>
    </div>
  );
}

export default ProfilePage;
