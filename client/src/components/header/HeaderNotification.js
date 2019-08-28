import React, { useState, useEffect } from "react";

import headerNotificationStyles from "./styles/HeaderNotificationStyles.js";
import Popover from "@material-ui/core/Popover";
import IconButton from "@material-ui/core/IconButton";
import shoppingPlaceHolder from "../../assets/shoppingPlaceHolder.png";
import ArrowRight from "@material-ui/icons/KeyboardArrowRight";
import ArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import Close from "@material-ui/icons/Close";

function HeaderNotification(props) {
  const classes = headerNotificationStyles();
  const { anchorEl, handleClose } = props;
  let { elements } = props;
  const [position, setPosition] = useState(0);
  const [positionChanged, setPositionChanged] = useState(false);

  const open = Boolean(anchorEl);

  useEffect(() => {
    if (elements.length === 0) {
      handleClose();
    }
  }, [elements.length, handleClose, position]);

  function changePosition(dir) {
    if (dir === "+") {
      if (position === elements.length - 1) {
        setPosition(0);
      } else {
        setPosition(position + 1);
      }
    }
    if (dir === "-") {
      if (position === 0) {
        setPosition(elements.length - 1);
      } else {
        setPosition(position - 1);
      }
    }
    if (dir === "0") {
      if (position > elements.length - 1) {
        setPosition(position - 1);
      } else {
        setPositionChanged(!positionChanged);
      }
    }
  }

  function NotificationHeader() {
    return (
      <div className={classes.headerDiv}>
        <h3
          className={classes.notificationFont}
          style={{ padding: `calc(10vh * .1)` }}
        >
          New Price!
        </h3>
        <span className={classes.cardCountContainer}>
          <IconButton
            style={{ padding: "0px" }}
            onClick={() => changePosition("-")}
          >
            <ArrowLeft />
          </IconButton>
          <h3
            className={classes.cardCountFont}
            style={{ padding: `calc(10vh * .1) 5px calc(10vh * .1) 5px` }}
          >
            {position + 1} / {elements.length}
          </h3>
          <IconButton
            style={{ padding: "0px" }}
            onClick={() => changePosition("+")}
          >
            <ArrowRight />
          </IconButton>
        </span>
        <IconButton
          style={{ padding: "0px", position: "absolute", right: 0 }}
          onClick={() => {
            elements.splice(position, 1);
            changePosition("0");
          }}
        >
          <Close />
        </IconButton>
      </div>
    );
  }

  function DisplayItem(props) {
    const { element } = props;

    return (
      <div className={classes.notificationBody}>
        <NotificationHeader />
        <div
          key={element}
          className={classes.tileStyle}
          style={{ height: "10vh", padding: `calc(10vh * .1)` }}
        >
          <div className={classes.contentContainer}>
            <div className={classes.imgContainerStyle}>
              <img
                src={shoppingPlaceHolder}
                alt="item"
                className={classes.imgStyle}
              />
            </div>
            <div className={classes.textBlock}>
              <h3 className={classes.itemNameFont}>Some Name</h3>
              <h4 className={classes.linkFont}>{element}</h4>
              <div className={classes.prices}>
                <h5 className={classes.oldPriceFont}>$60</h5>
                <p className={classes.newPriceFont}>$50</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      transformOrigin={{ vertical: "top", horizontal: "center" }}
      PaperProps={{
        style: { borderRadius: "0px", boxShadow: "none", overflow: "visible" }
      }}
    >
      <div className={classes.topBar}>
        <div className={classes.arrowUp}></div>
      </div>
      <DisplayItem element={elements[position]} />
    </Popover>
  );
}

export default HeaderNotification;
