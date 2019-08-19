import React from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import { Button, Paper, GridList, GridListTile } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import listImage from "../assets/shoppingPlaceHolder.png";
import AddItem from "./AddItem.js";

const editListStyles = makeStyles(theme => ({
  titleFont: {
    fontSize: "1em",
    fontWeight: 700,
    margin: "30px 0px 0px 0px",
    textAlign: "center",
    padding: "0px"
  },
  itemCountFont: {
    fontSize: ".8em",
    color: "grey",
    fontWeight: 400,
    textAlign: "center",
    margin: "0px 0px 20px 0px"
  },
  gridListContainer: {
    overflow: "hidden",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "50px"
  },
  gridListStyles: {
    height: "40vh",
    width: "90%"
  },
  tileStyle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    overflow: "hidden",
    backgroundColor: "white",
    marginTop: "15px",
    marginBottom: "5px",
    borderRadius: "10px"
  },
  contentContainer: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  imgContainerStyle: {
    width: "10vh",
    // height: `calc(10vh * .9)`,
    // margin: `calc(10vh * .1)`,
    height: "100%",
    overflow: "hidden"
    // borderRadius: "5px"
  },
  imgStyle: {
    width: "100%"
  },
  textBlock: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginLeft: "20px"
  },
  itemNameFont: {
    fontSize: "1em",
    fontWeight: 700,
    marginTop: "10px",
    marginBottom: "0px"
  },
  linkFont: {
    fontSize: ".6em",
    color: "grey",
    marginTop: "4px",
    marginBottom: "0px"
  },
  prices: {
    marginTop: "4px",
    display: "inline-flex",
    alignItems: "center"
  },
  oldPriceFont: {
    fontSize: ".7em",
    margin: "0px",
    textDecoration: "line-through"
  },
  newPriceFont: {
    fontSize: ".8em",
    margin: "0px",
    marginLeft: "2px",
    color: theme.primary
  },
  removeButton: {
    borderRadius: "20px",
    marginRight: "20px",
    fontSize: ".6em"
  },
  addNewItemButton: {
    borderRadius: "20px",
    fontSize: ".8em",
    fontWeight: 400,
    color: "white",
    backgroundColor: theme.primary,
    marginTop: "40px",
    height: "38px"
  }
}));

function EditList(props) {
  const { open, handleModalState } = props;
  const list = ["a", "b", "c", "d", "f", "g"];
  const classes = editListStyles();

  return (
    <Dialog
      open={open}
      onClose={handleModalState("editList")}
      PaperProps={{ style: { background: "WhiteSmoke" } }}
    >
      <DialogTitle className={classes.titleFont}>Clothes</DialogTitle>
      <h1 className={classes.itemCountFont}>x items</h1>
      <div className={classes.gridListContainer}>
        <GridList cols={1} className={classes.gridListStyles}>
          {list.map(item => (
            <div
              className={classes.tileStyle}
              style={{ height: "10vh", padding: `calc(10vh * .1)` }}
            >
              <div className={classes.contentContainer}>
                <div className={classes.imgContainerStyle}>
                  <img
                    src={listImage}
                    alt="item image"
                    className={classes.imgStyle}
                  />
                </div>
                <div className={classes.textBlock}>
                  <h3 className={classes.itemNameFont}>Some Name</h3>
                  <h4 className={classes.linkFont}>
                    Some link goes right here
                  </h4>
                  <div className={classes.prices}>
                    <h5 className={classes.oldPriceFont}>$60</h5>
                    <p className={classes.newPriceFont}>$50</p>
                  </div>
                </div>
              </div>
              <Button
                variant="outlined"
                size="large"
                className={classes.removeButton}
              >
                Remove
              </Button>
            </div>
          ))}
        </GridList>
        <Button
          size="large"
          className={classes.addNewItemButton}
          onClick={prevState => {
            handleModalState("editList")(prevState);
            handleModalState("addItem")(prevState);
          }}
        >
          Add New Item
        </Button>
      </div>
    </Dialog>
  );
}

export default EditList;
