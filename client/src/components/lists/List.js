import React, { useState, useEffect } from "react";

import { Grid, GridList, GridListTile } from "@material-ui/core";
import Add from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import listImage from "../../assets/shoppingPlaceHolder.png";
import AddList from "./AddList.js";
import EditList from "./EditList.js";

const listStyles = makeStyles(theme => ({
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
    marginTop: "20px",
    zIndex: 1
  },
  hoverTransition: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    borderRadius: "15px",
    zIndex: 2,
    cursor: "pointer",
    backgroundColor: "rbga(0,0,0,0)",
    webkitTransition: "background-color 300ms linear",
    msTransition: "background-color 300ms linear",
    transition: "background-color 300ms linear",
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "rgba(128, 128, 128, 0.20)",
      zIndex: 2,
      webkitTransition: "background-color 300ms linear",
      msTransition: "background-color 300ms linear",
      transition: "background-color 300ms linear"
    }
  }
}));

function List(props) {
  const {
    modalState,
    handleModalState,
    lists,
    reloadData,
    makeSnackBar
  } = props;
  const classes = listStyles();
  const [selectedList, setSelectedList] = useState({ items: [], _id: "" });

  useEffect(() => {
    if (lists.find(element => element._id === selectedList._id) != undefined) {
      setSelectedList(lists.find(element => element._id === selectedList._id));
    }
  }, [lists, selectedList._id]);

  return (
    <div className={classes.shoppingListsContainer}>
      <h1 className={classes.shoppingListText}>My Shopping Lists:</h1>
      <GridList cellHeight={400}>
        {lists.map(list => (
          <GridListTile
            key={list.title}
            style={{
              padding: "0px",
              width: "288px",
              height: "400px"
            }}
            className={classes.listTile}
            onClick={e => {
              setSelectedList(list);
              handleModalState("editList")();
            }}
          >
            <div className={classes.hoverTransition} />
            <Grid container direction="column" alignItems="center">
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
                {list.title}
              </h2>
              <h3 style={{ marginTop: "10px" }}>{list.__v} items</h3>
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
          <div
            className={classes.hoverTransition}
            onClick={handleModalState("addList")}
          />
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
            <Add style={{ width: "2em", height: "2em" }} />
            <AddList
              open={modalState.addList}
              onClose={handleModalState("addList")}
              reloadData={reloadData}
              makeSnackBar={makeSnackBar}
            />
            <h1 style={{ textAlign: "center" }}>Add New List</h1>
          </Grid>
        </GridListTile>
      </GridList>
      <EditList
        open={modalState.editList}
        handleModalState={handleModalState}
        list={selectedList}
        lists={lists}
        reloadData={reloadData}
        makeSnackBar={makeSnackBar}
      />
    </div>
  );
}

export default List;
