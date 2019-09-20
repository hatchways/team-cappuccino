import React, { useState, useEffect } from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Button, GridList } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import listImage from "../../assets/shoppingPlaceHolder.png";
import AddItem from "../items/AddItem.js";
import ItemCard from "../items/ItemCard.js";
import { deleteItem, getAllListItems } from "../api/index.js";
import LoadingSpinner from "../utils/LoadingSpinner.js";
import editListStyles from "./styles/EditListStyles.js";

function EditListDialog(props) {
  const classes = editListStyles();
  const { listDataController, changeDialogState } = props;
  const [state, setState] = useState({
    list: { name: "", __v: "" },
    listData: [],
    listDataLoaded: false
  });
  const { list, listData } = state;

  useEffect(() => {
    if (
      listDataController.state.selectedList !== undefined &&
      !state.listDataLoaded
    ) {
      setState({
        ...state,
        listDataLoaded: true,
        list: listDataController.state.selectedList,
        listData: listDataController.getListItems(
          listDataController.state.selectedList
        )
      });
    }
  }, [
    listDataController,
    listDataController.state.selectedList,
    state,
    listDataController.state.listData
  ]);

  return (
    <>
      <DialogTitle className={classes.titleFont}>{list.title}</DialogTitle>
      <h1 className={classes.itemCountFont}>{list.__v} items</h1>
      <div className={classes.gridListContainer}>
        <GridList cols={1} className={classes.gridListStyles}>
          {state.listData.map(item => (
            <ItemCard
              key={item._id}
              hasButton={true}
              buttonOnClick={() => {
                listDataController.deleteAItem(item._id, () => {
                  setState({
                    ...state,
                    listDataLoaded: false
                  });
                });
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
            changeDialogState("EditListDialog", "AddItemDialog");
          }}
        >
          Add New Item
        </Button>
      </div>
    </>
  );
}

export default EditListDialog;
