import React from "react";
import { isAuthenticated } from "../auth";
import { getLists } from "../api";
import { GridList } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import AddList from './list-actions/add-list';
import List from "./list";


const ListsStyle = theme => ({
  shoppingListsContainer: {
    marginLeft: "10vw",
    marginRight: "10vw",
    marginTop: "10vh"
  },
  shoppingListText: {
    font: theme.typography.fontFamily,
    fontSize: "2em",
    fontWeight: 500,
    letterSpacing: "0em",
    color: "black"
  }
});

class Lists extends React.Component {
  state = {
    lists: [],
    error: "",
    open: false
  };

  componentDidMount() {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;
    // load lists
      getLists(userId, token).then(data => {
        if (data.error) this.setState({ error: data.error });
        // set state
        this.setState({ lists: data });
    });
  }

  handleOpen = () => {
    this.setState({ open: !this.state.open });
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  render() {
    const { lists } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.shoppingListsContainer}>
        <h1 className={classes.shoppingListText}>My Shopping Lists:</h1>
        <GridList cellHeight={400}>
          {lists.map((list, i) => (
            <List key={i} id={list.id} title={list.title} totalItem={lists.items}/>
          ))}
        </GridList>
        <AddList />

      </div>
    );
  }
}

export default withStyles(ListsStyle)(Lists);
