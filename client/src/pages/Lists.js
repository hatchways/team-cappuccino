import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import { withRouter } from "react-router-dom";
import List from "../components/lists/List.js";
import { getLists } from "../components/api/index.js";
import SnackBarMessage from "../components/utils/SnackBarMessage.js";
import AddItemBar from "../components/items/addItemBar.js";
import { Dialog, DialogTitle, DialogContent, Button } from "@material-ui/core";
import FancyDialog from "../components/utils/FancyDialog.js";
import ListsDataController from "../components/lists/ListsDataController.js";
import UploadItemDialog from "../components/items/UploadItemDialog.js";
import ScrappingConfirmationDialog from "../components/items/ScrappingConfirmationDialog.js";
import AddListDialog from "../components/lists/AddListDialog.js";
import EditListDialog from "../components/lists/EditListDialog.js";
import AddItemDialog from "../components/items/AddItemDialog.js";

function Lists() {
  const [snackBarState, setSnackBarState] = useState({
    message: "",
    open: false,
    onClose: () => setSnackBarState({ ...snackBarState, open: false }),
    timeShown: 3000
  });
  const [testState, setTestState] = useState({
    modal: true,
    content: 0
  });

  function makeSnackBar(message) {
    setSnackBarState({
      ...snackBarState,
      message: message,
      open: true
    });
  }
  // let [listDataController, setDataController] = useState(
  let listDataController = new ListsDataController(makeSnackBar, setTestState);
  // );
  console.log(listDataController.state);

  useEffect(() => {
    if (
      !listDataController.state.downloaded &&
      !listDataController.state.downloading
    ) {
      listDataController.loadListDataWithLoading();
    }
  });

  useEffect(() => {
    document.body.style.backgroundColor = "WhiteSmoke";
  }, []);

  let uploadRef = React.createRef();
  function callback() {
    console.log("current height", uploadRef.current.scrollHeight);
  }

  const children = [
    <UploadItemDialog key="UploadItemDialog" />,
    <ScrappingConfirmationDialog
      key="ScrappingConfirmationDialog"
      listDataController={listDataController}
    />,
    <AddListDialog key="AddListDialog" />,
    <EditListDialog
      key="EditListDialog"
      listDataController={listDataController}
    />,
    <AddItemDialog
      key="AddItemDialog"
      listDataController={listDataController}
      ref={uploadRef}
      callback={callback}
    />
  ];

  const node = ReactDOM.findDOMNode(this);
  if (node != null) {
    console.log("this is a height", node, node.scrollHeight);
  }

  let childrenStates = {
    UploadItemDialog: {
      visible: false,
      style: {
        width: "20vw",
        height: "20vw"
      }
    },
    ScrappingConfirmationDialog: {
      visible: false,
      style: {
        width: "30vw"
        // height: "auto"
      }
    },
    AddListDialog: {
      visible: false,
      style: {
        width: "30vw",
        height: "30vh"
      }
    },
    EditListDialog: {
      visible: false,
      style: {
        width: "50vw",
        background: "WhiteSmoke"
      }
    },
    AddItemDialog: {
      visible: false,
      style: {
        width: "50vw",
        background: "WhiteSmoke"
      }
    }
  };

  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div>
      <FancyDialog
        dialogStates={childrenStates}
        dialogs={children}
        open={dialogOpen}
        setOpen={setDialogOpen}
      >
        <AddItemBar
          listDataController={listDataController}
          makeSnackBar={makeSnackBar}
        />
        <List
          makeSnackBar={makeSnackBar}
          listDataController={listDataController}
        />
        <SnackBarMessage state={snackBarState} />
      </FancyDialog>
    </div>
  );
}

export default withRouter(Lists);
