import React from "react";

import Popover from "@material-ui/core/Popover";
import { makeStyles } from "@material-ui/core/styles";
import shoppingPlaceHolder from "../../assets/shoppingPlaceHolder.png";

const headerNotificationStyles = makeStyles(theme => ({
  topBar: {
    width: "100%",
    height: "3px",
    backgroundColor: "black",
    display: "flex",
    justifyContent: "center"
  },
  arrowUp: {
    width: "0",
    height: "0",
    borderLeft: "4px solid transparent",
    borderRight: "4px solid transparent",
    borderBottom: "4px solid black",
    position: "absolute",
    top: "-4px"
  },
  notificationBody: {
    display: "flex",
    flexDirection: "column",
    width: "25vw",
    padding: "10px",
    overflow: "hidden"
  },
  tileStyle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    overflow: "hidden",
    backgroundColor: "white",
    marginTop: "5px",
    marginBottom: "5px",
    borderRadius: "0px"
  },
  notificationFont: {
    fontSize: "1em",
    fontWeight: 700,
    margin: "0px"
  },
  contentContainer: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  imgContainerStyle: {
    width: "10vh",
    height: "100%",
    overflow: "hidden"
  },
  imgStyle: {
    width: "100%"
  },
  textBlock: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginLeft: "20px"
  },
  itemNameFont: {
    fontSize: "1em",
    fontWeight: 700,
    marginTop: "10px",
    marginBottom: "0px"
  },
  linkFont: {
    fontSize: ".6em",
    color: "grey",
    marginTop: "4px",
    marginBottom: "0px"
  },
  prices: {
    marginTop: "4px",
    display: "inline-flex",
    alignItems: "center"
  },
  oldPriceFont: {
    fontSize: ".7em",
    margin: "0px",
    textDecoration: "line-through"
  },
  newPriceFont: {
    fontSize: ".8em",
    margin: "0px",
    marginLeft: "2px",
    color: theme.primary
  }
}));

function HeaderNotification(props) {
  const classes = headerNotificationStyles();
  const { anchorEl, handleClose, elements } = props;

  const open = Boolean(anchorEl);

  function DisplayItem(props) {
    const { element } = props;

    return (
      <div className={classes.notificationBody}>
        <h3
          className={classes.notificationFont}
          style={{ padding: `calc(10vh * .1)` }}
        >
          New Price!
        </h3>
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
      <DisplayItem element="a" />
    </Popover>
  );
}

export default HeaderNotification;
