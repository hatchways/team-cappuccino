import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import { TextField, Button } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import Wallpaper from "@material-ui/icons/Wallpaper";
import { makeStyles } from "@material-ui/core/styles";
import { createList } from "../api/index.js";

const addItemStyles = makeStyles(theme => ({
  addNewItemFont: {
    fontSize: "1em",
    fontWeight: 700,
    marginTop: "30px"
  },
  pasteLinkFont: {
    fontSize: ".8em",
    fontWeight: 700,
    marginTop: "20px"
  },
  selectListFont: {
    fontSize: ".8em",
    fontWeight: 700,
    marginTop: "40px"
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
    marginTop: "20px",
    marginBottom: "40px"
  },
  addNewAvatarFont: {
    fontSize: "1em",
    fontWeight: 700,
    marginTop: "30px"
  },
  alignItems: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  }
}));

function AddList(props) {
  const classes = addItemStyles();
  const { open, onClose, reloadData, makeSnackBar } = props;
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);

  function fileChangeHandler(e) {
    const file = e.target.files[0];
    if (file === undefined || file === null || file === "") {
      setImage(null);
    } else {
      setImage(file);
    }
  }

  function uploadList() {
    const formData = new FormData();
    formData.append("title", name);
    formData.append("listImage", image);
    createList(formData).then(res => {
      const data = res.data;
      if(data.error) {
        console.log(data.error);
        makeSnackBar("There was an Error creating this list");
      } else {
        makeSnackBar("List created successfully");
        reloadData();
        onClose();
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
        <p className={classes.addNewItemFont}>Create new list</p>
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
        <h3 className={classes.pasteLinkFont} style={{ textAlign: "center" }}>
          Add a title
        </h3>
        <TextField
          InputProps={{
            disableUnderline: true,
            style: { width: "100%" }
          }}
          inputCenterProps={{ style: { textAlign: "center" } }}
          placeholder="Enter name"
          onChange={e => {
            setName(e.target.value);
          }}
          style={{
            backgroundColor: "white",
            width: "75%",
            height: "50px",
            borderRadius: "5px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
          }}
        />
        <h3 className={classes.selectListFont} style={{ textAlign: "center" }}>
          Add a cover
        </h3>
        <input
          accept="image/*"
          id="upload-list-photo"
          type="file"
          style={{ display: "none" }}
          onChange={fileChangeHandler}
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
          onClick={uploadList}
        >
          Create List
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default AddList;
