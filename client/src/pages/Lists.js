import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import List from "../components/lists/List.js";
import { getLists } from "../components/api/index.js";
import SnackBarMessage from "../components/utils/SnackBarMessage.js";
import AddItemBar from "../components/items/addItemBar.js";

function Lists() {
  const [list, setList] = useState("");
  const [modalState, setModalState] = useState({
    addItem: false,
    addList: false,
    editList: false
  });
  const [downloadState, setDownLoadState] = useState({
    downloaded: false,
    lists: []
  });
  const [snackBarState, setSnackBarState] = useState({
    message: "",
    open: false,
    onClose: () => setSnackBarState({ ...snackBarState, open: false }),
    timeShown: 3000
  });

  function makeSnackBar(message) {
    setSnackBarState({
      ...snackBarState,
      message: message,
      open: true
    });
  }

  function loadListData() {
    getLists().then(data => {
      if (data.error) {
        console.log(data.error, "there was an error");
      } else {
        console.log(data);
        setDownLoadState({ downloaded: true, lists: data });
      }
    });
  }

  useEffect(() => {
    if (!downloadState.downloaded) {
      loadListData();
    }
  });

  useEffect(() => {
    document.body.style.backgroundColor = "WhiteSmoke";
  }, []);

  const handleModalState = modalName => () => {
    setModalState(prevState => {
      return { ...prevState, [modalName]: !modalState[modalName] };
    });
  };

  return (
    <div>
      <AddItemBar
        lists={downloadState.lists}
        reloadData={loadListData}
        makeSnackBar={makeSnackBar}
      />
      <List
        modalState={modalState}
        handleModalState={handleModalState}
        lists={downloadState.lists}
        reloadData={loadListData}
        makeSnackBar={makeSnackBar}
      />
      <SnackBarMessage state={snackBarState} />
    </div>
  );
}

export default withRouter(Lists);