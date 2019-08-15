import React, { Component, useState } from "react";

import {
  AppBar,
  Button,
  Toolbar,
  Grid,
  Badge,
  Paper,
  TextField,
  InputBase,
  FormControl,
  NativeSelect,
  InputLabel,
  GridList,
  GridListTile,
  ListSubheader
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Add from "@material-ui/icons/Add";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import AppIcon from "../assets/logo.png";
import listImage from "../assets/shoppingPlaceHolder.png";

const profilePageStyles = makeStyles(theme => ({
  backgroundColor: {
    backgroundColor: "WhiteSmoke",
    height: "100vh"
  },
  topBar: {
    boxShadow: "none"
  },
  grow: {
    display: "flex",
    justifyContent: "flex-end",
    flexDirection: "row",
    flexGrow: "1",
    alignItems: "center"
  },
  label: {
    marginLeft: "15px",
    font: theme.typography.fontFamily,
    fontSize: ".6em",
    fontWeight: 250,
    letterSpacing: "0em",
    color: "black",
    whiteSpace: "nowrap"
  },
  logo: {
    width: "30px"
  },
  dealsMateGrid: {
    marginLeft: "20px"
  },
  dealsMateName: {
    font: theme.typography.fontFamily,
    fontSize: "1em",
    fontWeight: 250,
    letterSpacing: "0.5em",
    color: "black"
  },
  badgeColor: {
    color: theme.primary
  },
  accountCircle: {
    color: theme.primary,
    width: "1.5em",
    height: "1.5em",
    marginLeft: "40px"
  },
  profile: {
    marginLeft: "5px",
    font: theme.typography.fontFamily,
    fontSize: ".6em",
    fontWeight: 250,
    letterSpacing: "0.1em",
    color: "black",
    whiteSpace: "nowrap"
  },
  bodyStart: {
    paddingTop: "100px"
  },
  addNewItem: {
    font: theme.typography.fontFamily,
    fontSize: "2em",
    fontWeight: 500,
    letterSpacing: "0em",
    color: "black"
  },
  paperLinkContainer: {
    borderRadius: "50px 0px 0px 50px",
    boxShadow: "none",
    borderRight: "1px solid WhiteSmoke"
  },
  linkInput: {
    marginLeft: 25,
    marginTop: 10,
    marginBottom: 10,
    width: "25vw",
    fontSize: ".8em"
  },
  paperListContainer: {
    borderRadius: "0px 50px 50px 0px",
    boxShadow: "none",
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  emptyListSelect: {
    fontSize: ".8em",
    color: "grey"
  },
  nonEmptyListSelect: {
    fontSize: ".8em"
  },
  listSelect: {
    marginLeft: 25,
    marginTop: 10,
    marginBottom: 10,
    width: "8vw"
  },
  addItemButton: {
    marginLeft: 25,
    marginRight: 10,
    backgroundColor: theme.primary,
    fontSize: ".8em",
    color: "white"
  },
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
  },
  listTile: {
    backgroundColor: "white",
    marginRight: "20px",
    borderRadius: "15px"
  }
}));

const StyledBadge = withStyles(theme => ({
  badge: {
    top: "25%",
    right: 5,
    background: `${theme.primary}`
  }
}))(Badge);

// class ProfilePage extends Component {
function ProfilePage() {
  const [list, setList] = useState("");

  const handleChange = event => {
    setList(event.target.value);
  };

  const listOptions = ["a", "b", "c"];
  const listNames = ["Clothes", "Furniture", "Luxury"];

  const classes = profilePageStyles();

  function getClassName() {
    if (list === "") {
      return classes.emptyListSelect;
    } else {
      return classes.nonEmptyListSelect;
    }
  }
  return (
    <div className={classes.backgroundColor}>
      <AppBar className={classes.topBar}>
        <Toolbar style={{ backgroundColor: "white" }}>
          <Grid
            container
            direction="row"
            spacing={2}
            alignItems="center"
            edge="start"
          >
            <Grid item>
              <img src={AppIcon} className={classes.logo} />
            </Grid>
            <Grid item className={classes.dealsMateGrid}>
              <h1 className={classes.dealsMateName}>DEALS MATE</h1>
            </Grid>
          </Grid>

          <div className={classes.grow}>
            <Button className={classes.label}>Shopping List</Button>
            <Button className={classes.label}>Friends</Button>
            <StyledBadge variant="dot">
              <Button className={classes.label}>Notifications</Button>
            </StyledBadge>
            <AccountCircle className={classes.accountCircle} />
            <Button className={classes.profile}>Profile</Button>
          </div>
        </Toolbar>
      </AppBar>

      <Grid
        container
        direction="column"
        alignItems="center"
        className={classes.bodyStart}
      >
        <h1 className={classes.addNewItem}>Add new item:</h1>
        <Grid container direction="row" justify="center">
          <Paper className={classes.paperLinkContainer}>
            <InputBase
              placeholder="Paste your link here"
              className={classes.linkInput}
            />
          </Paper>
          <Paper className={classes.paperListContainer}>
            <FormControl className={classes.listSelect}>
              <NativeSelect
                value={list}
                onChange={handleChange}
                // InputProps={{ disableUnderline: true }}
                input={<InputBase className={getClassName()} />}
              >
                <option value="" disabled>
                  Select list
                </option>
                {listOptions.map(op => (
                  <option key={op} value={op}>
                    {op}
                  </option>
                ))}
              </NativeSelect>
            </FormControl>
            <Button
              variant="contained"
              size="large"
              buttonStyle={{ borderRadius: 25, width: "30px" }}
              style={{
                borderRadius: 25,
                width: "100px"
              }}
              className={classes.addItemButton}
            >
              Add
            </Button>
          </Paper>
        </Grid>
      </Grid>
      <div className={classes.shoppingListsContainer}>
        <h1 className={classes.shoppingListText}>My Shopping Lists:</h1>
        <GridList cellHeight={400}>
          {listNames.map(list => (
            <GridListTile
              //   cols={1}
              style={{ padding: "0px", width: "288px", height: "400px" }}
              className={classes.listTile}
            >
              <Grid container direction="row" justify="center">
                <div
                  style={{
                    height: "300px",
                    overflow: "hidden",
                    borderRadius: "15px 15px 0px 0px"
                  }}
                >
                  <img src={listImage} width="100%" />
                </div>
                <h2
                  style={{
                    width: "100%",
                    marginBottom: "0px",
                    alignSelf: "center",
                    textAlign: "center"
                  }}
                >
                  {list}
                </h2>
                <h3 style={{ marginTop: "10px" }}>x items</h3>
              </Grid>
            </GridListTile>
          ))}
          <GridListTile
            style={{
              padding: "0px",
              width: "288px",
              height: "400px"
            }}
          >
            <Grid
              container
              direction="column"
              justify="center"
              style={{
                backgroundColor: "white",
                width: "100%",
                height: "100%",
                borderRadius: "15px 15px 15px 15px"
              }}
            >
              <Button>
                <Add />
              </Button>
              <h1 style={{ textAlign: "center" }}>Add New List</h1>
            </Grid>
          </GridListTile>
        </GridList>
      </div>
    </div>
  );
}

export default ProfilePage;
