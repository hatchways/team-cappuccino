import React from "react";

import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Wallpaper from "@material-ui/icons/Wallpaper";

const imageUploadStyles = makeStyles(theme => ({
  uploadFont: {
    fontSize: ".6em",
    fontWeight: 400,
    maxWidth: "100px",
    textAlign: "center",
    marginTop: "20px",
    marginBottom: "40px"
  },
  alignItems: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  }
}));

function ImageUpload(props) {
  const classes = imageUploadStyles();
  const [image, setImage] = React.useState(null);

  function fileChangedHandler(event) {
    event.target.files[0] === undefined
      ? setImage(null)
      : setImage(URL.createObjectURL(event.target.files[0]));
  }

  return (
    <div>
      <input
        accept="image/*"
        id="upload-list-photo"
        type="file"
        style={{ display: "none" }}
        onChange={fileChangedHandler}
      />
      <label htmlFor="upload-list-photo">
        <Paper
          className={classes.alignItems}
          style={{
            borderRadius: "5px",
            boxShadow: "none",
            width: "12vw",
            height: "12vw",
            cursor: "pointer"
          }}
        >
          {image === null ? (
            <div
              className={classes.alignItems}
              style={{
                width: "100%",
                height: "100%"
              }}
            >
              <Wallpaper
                htmlColor="grey"
                style={{
                  width: "70px",
                  height: "70px",
                  color: "silver",
                  marginTop: "40px"
                }}
              />
              <p className={classes.uploadFont}>Select an image here</p>
            </div>
          ) : (
            <div
              className={classes.alignItems}
              style={{
                width: "90%",
                height: "90%",
                overflow: "hidden",
                borderRadius: "5px"
              }}
            >
              <img src={image} style={{ width: "100%" }} alt="Your upload" />
            </div>
          )}
        </Paper>
      </label>
    </div>
  );
}

export default ImageUpload;
