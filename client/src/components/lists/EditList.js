import React, { useState, useEffect } from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Button, GridList } from "@material-ui/core";

import listImage from "../../assets/shoppingPlaceHolder.png";
import AddItem from "../items/AddItem.js";
import ItemCard from "../items/ItemCard.js";
import { deleteItem, getAllListItems } from "../api/index.js";
import LoadingSpinner from "../utils/LoadingSpinner.js";
import editListStyles from "./styles/EditListStyles.js";

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
  const [state, setState] = useState({
    downloaded: false,
    loadingData: false,
    listData: [{}]
  });

  function downloadListData() {
    if (open && !state.downloaded && !state.loadingData) {
      setState({ ...state, loadingData: true });
      getAllListItems(list._id).then(data => {
        console.log(data);
        setState({ loadingData: false, listData: data, downloaded: true });
      });
    }
  }

  useEffect(() => {
    downloadListData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function deleteAItem(id) {
    deleteItem(id).then(data => {
      reloadData();
      getAllListItems(list._id).then(data => {
        console.log(data);
        setState({ loadingData: false, listData: data, downloaded: true });
      });
      makeSnackBar("Item removed!");
    });
  }

  function onClose() {
    setState({ downloaded: false, loadingData: false, listData: [{}] });
    handleModalState("editList")();
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{ style: { background: "WhiteSmoke", width: "50vw" } }}
    >
      {state.loadingData && <LoadingSpinner />}
      <DialogTitle className={classes.titleFont}>{list.title}</DialogTitle>
      <h1 className={classes.itemCountFont}>{list.__v} items</h1>
      <div className={classes.gridListContainer}>
        <GridList cols={1} className={classes.gridListStyles}>
          {state.downloaded &&
            state.listData.map(item => (
              <ItemCard
                key={item._id}
                hasButton={true}
                buttonOnClick={() => {
                  console.log(item);
                  deleteAItem(item._id);
                }}
                hasNewPrice={true}
                tileStyle={classes.tileStyle}
                item={{
                  name: item.name,
                  image: item.image,
                  link: item.url,
                  oldPrice:
                    item.prices === undefined
                      ? ""
                      : item.prices.length > 1
                      ? `$${item.prices[1].price}`
                      : "",
                  newPrice:
                    item.prices === undefined ? "" : `$${item.prices[0].price}`
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
