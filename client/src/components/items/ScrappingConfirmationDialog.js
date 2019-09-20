import React, { useState, useEffect } from "react";

import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import ItemCard from "./ItemCard.js";
import ScrappingConfirmationStyles from "./styles/ScrappingConfirmationStyles.js";

function ScrappingConfirmationDialog(props) {
  const classes = ScrappingConfirmationStyles();
  const { makeDialogClosed, listDataController } = props;
  // const [aState, setAState] = useState(listDataController.state);
  const [state, setState] = useState({
    _id: "",
    name: "",
    prices: undefined,
    image: "",
    url: ""
  });
  let { _id, name, prices, image, url } = state;

  useEffect(() => {
    console.log("this is an effect", listDataController);
    if (listDataController.state.tempInformation !== undefined) {
      console.log("effect reaches set state");
      setState(listDataController.state.tempInformation);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listDataController.state]);

  const handleConfirm = () => {
    listDataController.loadListDataWithLoading();
    makeDialogClosed("ScrappingConfirmationDialog");
  };

  return (
    <div>
      <DialogTitle style={{ textAlign: "center" }}>
        Item Confirmation
      </DialogTitle>
      <div className={classes.containerStyle}>
        <ItemCard
          hasButton={false}
          hasNewPrice={false}
          tileStyle={classes.tileStyle}
          item={{
            name: name,
            image: image,
            link: url,
            oldPrice: "",
            newPrice: prices === undefined ? "" : `$${prices[0].price}`
          }}
        />
        <div className={classes.buttonContainer}>
          <Button
            variant="contained"
            size="large"
            className={classes.buttonStyle}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            size="large"
            className={classes.buttonStyle}
            onClick={handleConfirm}
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ScrappingConfirmationDialog;
