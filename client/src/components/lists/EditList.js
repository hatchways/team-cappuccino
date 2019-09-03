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
