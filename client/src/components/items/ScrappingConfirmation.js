import React from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import scrappingConfirmationStyles from "./styles/ScrappingConfirmationStyles.js";
import ItemCard from "./ItemCard.js";
import shoppingPlaceHolder from "../../assets/shoppingPlaceHolder.png";

function ScrappingConfirmation(props) {
  const classes = scrappingConfirmationStyles();
  const { open, handleClose, returnedInformation } = props;
  const { _id, name, prices, image, url } = returnedInformation;

  console.log(image);

  function handleConfirm() {
    handleClose();
  }

  return (
    <Dialog open={open} onClose={handleClose} className={classes.dialogStyle}>
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
    </Dialog>
  );
}

export default ScrappingConfirmation;
