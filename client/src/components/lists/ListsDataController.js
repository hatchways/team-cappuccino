import React, { useState } from "react";

import {
  getLists,
  addItem,
  deleteItem,
  getAllListItems,
  getAllUsersItems
} from "../api/index.js";
import Lists from "../../pages/Lists.js";

function ListsDataController(makeSnackBar, changeParentState, history) {
  this.reactState = useState({
    downloaded: false,
    downloading: false,
    lists: [],
    listData: [],
    tempInformation: {},
    selectedList: {},
    itemsChanged: false
  });
  this.state = this.reactState[0];
  this.setState = this.reactState[1];
  this.makeSnackBar = makeSnackBar;
  this.changeParentState = changeParentState;
  this.history = history;
}

ListsDataController.prototype.setTempInformation = function(data) {
  this.setState({ ...this.state, tempInformation: data });
};

ListsDataController.prototype.setSelectedList = function(data) {
  this.setState({ ...this.state, selectedList: data });
};

ListsDataController.prototype.getListItems = function(list) {
  return this.state.listData.filter(item => item.list === list._id);
};

ListsDataController.prototype.loadListData = function(completion) {
  getLists(this.history).then(data => {
    if (data.error) {
      console.log(data.error, "there was an error");
    } else {
      completion(data);
    }
  });
};

ListsDataController.prototype.loadAllListItems = function(completion) {
  getAllUsersItems(this.history).then(data => {
    if (data.error) {
      console.log(data.error, "there was an error");
    } else {
      completion(data);
    }
  });
};

ListsDataController.prototype.loadListDataWithLoading = function() {
  this.setState({ ...this.setState, downloading: true });
  this.loadListData(listData => {
    this.loadAllListItems(itemData => {
      this.setState({
        ...this.state,
        downloaded: true,
        lists: listData,
        listData: itemData,
        downloading: false
      });
    });
  });
};

ListsDataController.prototype.uploadItem = function(body, completion) {
  addItem(body, this.history).then(data => {
    if (data.error) {
      this.makeSnackBar("Item upload failed");
      console.log(data.error);
    } else {
      this.setState({ ...this.state, tempInformation: data });
      completion();
    }
  });
};

ListsDataController.prototype.updateListAndDataItemRemoval = function(itemId) {
  const indexListDataToRemove = this.state.listData.findIndex(
    element => element._id === itemId
  );
  let list = this.state.lists.find(
    list => list._id === this.state.listData[indexListDataToRemove].list
  );
  list.__v -= 1;
  list.items = list.items.filter(item => (item = itemId));
  this.state.listData.splice(indexListDataToRemove, 1);
};

ListsDataController.prototype.deleteAItem = function(id, completion) {
  deleteItem(id, this.history).then(data => {
    if (data.error) {
      this.makeSnackBar("error deleting item");
    } else {
      this.updateListAndDataItemRemoval(id);
      this.setState({ ...this.state, itemsChanged: !this.state.itemsChanged });
      completion();
    }
  });
};

export default ListsDataController;
