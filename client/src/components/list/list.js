import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, GridListTile } from "@material-ui/core";
import NoImage from "../../assets/No-Photo-Available.jpg";

const SingleListStyle = makeStyles(() => ({
  listTile: {
    backgroundColor: "lightgrey",
    marginRight: "20px",
    borderRadius: "15px",
    marginTop: "20px",
    zIndex: 1
  },
  hoverTransition: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    borderRadius: "15px",
    zIndex: 9999,
    cursor: "pointer",
    backgroundColor: "rbga(0,0,0,0)",
    webkitTransition: "background-color 300ms linear",
    msTransition: "background-color 300ms linear",
    transition: "background-color 300ms linear",
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "rgba(128, 128, 128, 0.20)",
      zIndex: 9999,
      webkitTransition: "background-color 300ms linear",
      msTransition: "background-color 300ms linear",
      transition: "background-color 300ms linear"
    }
  }
}));

const List = props => {
  const { id, title, image } = props;
  const classes = SingleListStyle();

  return (
    <GridListTile
      key={id}
      id={id}
      style={{
        padding: "0px",
        width: "288px",
        height: "400px"
      }}
      className={classes.listTile}
    >
      <div className={classes.hoverTransition} />
      <Grid container direction="column" alignItems="center">
        <div
          style={{
            height: "300px",
            overflow: "hidden",
            borderRadius: "15px 15px 0px 0px"
          }}
        >
          <img src={image === undefined || image === "" || image === null ? NoImage : image} alt="list" width="100%" />
        </div>
        <h2
          style={{
            width: "100%",
            marginBottom: "0px",
            alignSelf: "center",
            textAlign: "center"
          }}
        >
          {title}
        </h2>
        <h5 style={{ marginTop: "10px" }}>{props.totalItem === undefined || props.totalItem === 0 || props.totalItem === null ? 0 : props.totalItem} items</h5>
      </Grid>
    </GridListTile>
  );
};

export default List;
