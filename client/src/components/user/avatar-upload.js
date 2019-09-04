import React from "react";
import { withRouter } from 'react-router'
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import { Button } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import Wallpaper from "@material-ui/icons/Wallpaper";
import { makeStyles } from "@material-ui/core/styles";
import { uploadAvatar } from "../api";
import LoadingSpinner from "../utils/LoadingSpinner";

const addAvatarStyles = makeStyles(theme => ({
  addNewAvatarFont: {
    fontSize: "1em",
    fontWeight: 700,
    marginTop: "30px"
  },
  button: {
    fontSize: ".8em",
    fontWeight: 400,
    marginTop: "40px",
    marginBottom: "60px",
    borderRadius: "25px",
    width: "130px",
    backgroundColor: theme.primary,
    color: "white"
  },
  uploadFont: {
    fontSize: ".6em",
    fontWeight: 400,
    maxWidth: "100px",
    textAlign: "center",
    marginBottom: "40px"
  },
  alignItems: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  }
}));

function AvatarUpload(props) {
  const classes = addAvatarStyles();
  const { open, onClose } = props;
  const [image, setImage] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  function fileChangedHandler(e) {
    const file = e.target.files[0];
    if (file === undefined || file === null || file === "") {
      setImage(null);
    } else {
      setImage(file);
    }
  }

  function submitImage(event) {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("image", image);
    uploadAvatar(formData)
      .then(res => {
        const data = res.data;
        if (data.error) {
          console.log(data.error);
          setLoading(false);
          setError(data.error); // set error
        } else {
          setLoading(false);
          onClose();
          window.location.reload();
        }
      })
      .catch(e => {
        console.log(e);
      });
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        style: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: "WhiteSmoke",
          width: "50vw"
        }
      }}
    >
      <DialogTitle>
        <p className={classes.addNewAvatarFont}>Add Profile Picture</p>
      </DialogTitle>
      <DialogContent
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "95%",
          padding: "0px"
        }}
      >
        {loading ? <LoadingSpinner /> : ""}
        {error ? <p>{error}</p> : ""}
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
                <img
                  src={URL.createObjectURL(image)}
                  style={{ width: "100%" }}
                  alt="Your upload"
                />
              </div>
            )}
          </Paper>
        </label>
        <Button
          size="large"
          variant="contained"
          className={classes.button}
          onClick={submitImage}
        >
          Add Image
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default withRouter(AvatarUpload);
