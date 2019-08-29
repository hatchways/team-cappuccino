import React, { useState, useEffect } from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Button, GridList } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import listImage from "../../assets/shoppingPlaceHolder.png";
import AddItem from "../items/AddItem.js";
import ItemCard from "../items/ItemCard.js";
import { deleteItem } from "../api/index.js";

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
    width: "100%",
    marginTop: "15px",
    marginBottom: "5px",
    borderRadius: "10px"
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
  const classes = editListStyles();
  const [addItemState, setAddItemState] = useState(false);
  const {
    open,
    handleModalState,
    lists,
    list,
    reloadData,
    makeSnackBar
  } = props;

  console.log(list);

  function deleteAItem(id) {
    deleteItem(id);
    reloadData();
  }

  return (
    <Dialog
      open={open}
      onClose={handleModalState("editList")}
      PaperProps={{ style: { background: "WhiteSmoke", width: "50vw" } }}
    >
      <DialogTitle className={classes.titleFont}>{list.name}</DialogTitle>
      <h1 className={classes.itemCountFont}>{list.__v} items</h1>
      <div className={classes.gridListContainer}>
        <GridList cols={1} className={classes.gridListStyles}>
          {list.items.map(item => (
            <ItemCard
              hasButton={true}
              buttonOnClick={() => {
                console.log(item);
                // deleteAItem(item);
              }}
              hasNewPrice={true}
              tileStyle={classes.tileStyle}
              item={{
                name: "Some Name",
                image: listImage,
                link: "www.somelink.com",
                oldPrice: "$90",
                newPrice: "$60"
              }}
            />
          ))}
        </GridList>
        <Button
          size="large"
          className={classes.addNewItemButton}
          onClick={() => {
            // handleModalState("editList")();
            // handleModalState("addItem")();
            setAddItemState(true);
          }}
        >
          Add New Item
        </Button>
      </div>
      <AddItem
        open={addItemState}
        onClose={() => {
          setAddItemState(false);
        }}
        reloadData={reloadData}
        lists={lists}
        makeSnackBar={makeSnackBar}
        startingValue={list}
      />
    </Dialog>
  );
}

export default EditList;
