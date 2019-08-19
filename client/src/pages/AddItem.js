import React from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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
  }
}));

function AddItem(props) {
  const classes = addItemStyles();
  const { open, onClose } = props;
  const [list, setList] = React.useState("");
  const lists = ["a", "b", "c"];

  function handleChangeList(event) {
    setList(event.target.value);
  }
  function GenerateSelectProps() {
    return list === ""
      ? {
          native: true,
          style: {
            width: "100%",
            textAlignLast: "center",
            color: "grey"
          },
          inputProps: {
            style: {
              width: "100%"
            }
          }
        }
      : {
          native: true,
          style: {
            width: "100%",
            textAlignLast: "center",
            color: "black"
          },
          inputProps: {
            style: {
              width: "100%"
            }
          }
        };
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
        <p className={classes.addNewItemFont}>Add New Item</p>
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
          Paste link to item
        </h3>
        <TextField
          InputProps={{
            disableUnderline: true,
            style: { width: "100%" }
          }}
          inputProps={{ style: { textAlign: "center" } }}
          placeholder="Paste your link here"
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
          Select list
        </h3>
        <TextField
          select
          value={list}
          onChange={handleChangeList}
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
          InputProps={{ disableUnderline: true }}
          inputProps={{ style: { paddingRight: "0px" } }}
          SelectProps={GenerateSelectProps()}
        >
          <option value="" disabled>
            Select
          </option>
          {lists.map(someList => (
            <option key={someList} value={someList}>
              {someList}
            </option>
          ))}
        </TextField>
        <Button size="large" variant="contained" className={classes.button}>
          Add Item
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default AddItem;
