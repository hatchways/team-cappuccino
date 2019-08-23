import React from "react";
import { isAuthenticated } from "../../auth";
import { Redirect } from "react-router-dom";
import { createList } from "../../api";
import Add from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/core/styles";
import AddListForm from "./add-list-form";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import { TextField, Button } from "@material-ui/core";

const CreateListStyle = theme => ({
  addNewItemFont: {
    fontSize: "1em",
    fontWeight: 700,
    marginTop: "30px"
  },
  addButtonContainer: {
    position: "absolute",
    right: "0",
    textAlign: "center",
    padding: "0 2rem .5rem 0"
  },
  addButton: {
    color: theme.primary,
    border: "5px solid red",
    borderRadius: "50%",
    padding: ".4rem",
    cursor: "pointer",
    marginBottom: "-10px"
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
  }
});

class CreateList extends React.Component {
  state = {
    title: "",
    image: "",
    error: "",
    user: {},
    loading: false,
    redirectToLists: false,
    open: false
  };

  componentDidMount() {
    this.listData = new FormData();
    this.setState({ user: isAuthenticated().user });
  }

  isValid = () => {
    const { title, fileSize } = this.state;
    if (fileSize > 100000) {
      this.setState({
        error: "File size should be less than 100kb",
        loading: false
      });
      return false;
    }
    if (title.length === 0) {
      this.setState({ error: "All fields are required", loading: false });
      return false;
    }
    return true;
  };

  handleChange = name => event => {
    this.setState({ error: "" });
    const value = name === "photo" ? event.target.files[0] : event.target.value;

    const fileSize = name === "photo" ? event.target.files[0].size : 0;
    this.listData.set(name, value);
    this.setState({ [name]: value, fileSize });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ loading: true });

    // check validation
    if (this.isValid()) {
      const userId = isAuthenticated().user._id;
      const token = isAuthenticated().token;

      createList(userId, token, this.listData).then(data => {
        if (data.error) this.setState({ error: data.error });
        else {
          this.setState({
            loading: false,
            title: "",
            body: "",
            redirectToProfile: true
          });
        }
      });
    }
  };

  handleClickOpen = () => {
    this.setState({ open: !this.state.open });
  };

  handleClickClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { title, error, loading, open, redirectToProfile } = this.state;
    const { classes } = this.props;

    if(redirectToProfile) {
      return <Redirect to="/lists" />
    }

    return (
      <div>
        <div className={classes.addButtonContainer}>
          <Add onClick={this.handleClickOpen} className={classes.addButton} />
          <p>Add New List</p>
        </div>
        <AddListForm open={open} onClose={this.handleClickClose}>
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
            <h3
              className={classes.pasteLinkFont}
              style={{ textAlign: "center" }}
            >
              Add a title
            </h3>
            <TextField
              InputProps={{
                disableUnderline: true,
                style: { width: "100%" }
              }}
              id="Title"
              label="title"
              variant="outlined"
              value={title}
              onChange={this.handleChange("title")}
              placeholder="Enter your list title"
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
            <h3
              className={classes.selectListFont}
              style={{ textAlign: "center" }}
            >
              Add a cover
            </h3>
            <input
              onChange={this.handleChange("photo")}
              type="file"
              accept="image/*"
            />
            <Button
              size="large"
              variant="contained"
              type="submit"
              onClick={this.handleSubmit}
              className={classes.button}
            >
              Create List
            </Button>
          </DialogContent>
        </AddListForm>
      </div>
    );
  }
}

export default withStyles(CreateListStyle)(CreateList);
