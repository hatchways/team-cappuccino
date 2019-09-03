import React from "react";

import { makeStyles } from "@material-ui/core";
import { Button } from "@material-ui/core";

const itemCardStyles = makeStyles(theme => ({
  tileStyle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    overflow: "hidden",
    backgroundColor: "white"
  },
  contentContainer: {
    height: "100%",
    width: "70%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  imgContainerStyle: {
    minWidth: "10vh",
    width: "10vh",
    height: "100%",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  imgStyle: {
    height: "100%"
  },
  textBlock: {
    width: "80%",
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
    marginBottom: "0px",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    width: "100%"
  },
  linkFont: {
    fontSize: ".6em",
    color: "grey",
    marginTop: "4px",
    marginBottom: "0px",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    width: "100%"
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
  },
  removeButton: {
    borderRadius: "20px",
    marginRight: "20px",
    fontSize: ".6em"
  }
}));

function ItemCard(props) {
  const classes = itemCardStyles();
  const { hasButton, hasNewPrice, tileStyle, item, buttonOnClick } = props;

  return (
    <div
      key={item.name}
      className={`${tileStyle} ${classes.tileStyle}`}
      style={{
        height: "10vh",
        padding: `calc(10vh * .1)`
      }}
    >
      <div className={classes.contentContainer}>
        <div className={classes.imgContainerStyle}>
          <img src={item.image} alt="item" className={classes.imgStyle} />
        </div>
        <div
          className={classes.textBlock}
          style={{ width: hasButton ? "80%" : "100%" }}
        >
          <h3 className={classes.itemNameFont}>{item.name}</h3>
          <h4 className={classes.linkFont}>{item.link}</h4>
          <div className={classes.prices}>
            {hasNewPrice && (
              <h5 className={classes.oldPriceFont}>{item.oldPrice}</h5>
            )}
            <p className={classes.newPriceFont}>{item.newPrice}</p>
          </div>
        </div>
      </div>
      {hasButton && (
        <Button
          variant="outlined"
          size="large"
          className={classes.removeButton}
          onClick={() => buttonOnClick()}
        >
          Remove
        </Button>
      )}
    </div>
  );
}

export default ItemCard;
