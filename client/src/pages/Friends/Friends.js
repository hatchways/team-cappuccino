import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Tabs, Tab, Avatar, Button } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import "./ScrollDisable.css";

const friendsPageStyles = makeStyles(theme => ({
  pageContainer: {
    width: "100vw",
    height: "100vh",
    backgroundColor: "WhiteSmoke",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center"
  },
  contentContainer: {
    width: "30vw",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between"
  },
  headerTitleFont: {
    margin: "15vh 0px 0px 0px",
    fontSize: "1em",
    fontWeight: 700
  },
  tabsStyles: {
    marginTop: "30px",
    width: "100%"
  },
  tabStyle: {
    fontWeight: 700
  },
  peopleContainer: {
    width: "100%",
    height: "60vh",
    // display: "flex",
    // flexDirection: "column",
    overflowY: "scroll",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
    "$-webkit-scrollbar": {
      width: "0px",
      height: "0px"
    }
  },
  peopleCard: {
    width: "100%",
    height: "90px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    background: "white",
    marginBottom: "1px"
  },
  avatarAndName: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  avatarStyle: {
    margin: "0px 15px 0px 15px"
  },
  buttonStyle: {
    borderRadius: "20px",
    margin: "0px 20px 0px 0px",
    boxShadow: "none",
    background: "white",
    fontWeight: 700,
    fontSize: ".6em",
    height: "38px",
    "&:hover": {
      background: theme.primary,
      color: "white",
      borderColor: theme.primary
    }
  }
}));

function FriendsPage() {
  const classes = friendsPageStyles();
  const [currentTab, setTab] = useState(0);

  function handleChange(event, newTab) {
    setTab(newTab);
  }

  const followingList = [
    "following person",
    "following person",
    "following person",
    "following person",
    "following person",
    "following person",
    "following person"
  ];
  const suggestedList = [
    "suggested person",
    "suggested person",
    "suggested person",
    "suggested person",
    "suggested person",
    "suggested person",
    "suggested person"
  ];

  function PeopleCard(props) {
    const { name } = props;
    return (
      <div className={classes.peopleCard}>
        <div className={classes.avatarAndName}>
          <Avatar className={classes.avatarStyle}>
            <AccountCircle />
          </Avatar>
          <p>{name}</p>
        </div>
        <Button variant="outlined" className={classes.buttonStyle} size="large">
          Follow
        </Button>
      </div>
    );
  }

  function makePeoples(list) {
    return list.map((person, index) => (
      <PeopleCard key={index} name={person} />
    ));
  }

  return (
    <div className={classes.pageContainer}>
      <div className={classes.contentContainer}>
        <h1 className={classes.headerTitleFont}>Friends</h1>
        <Tabs
          value={currentTab}
          onChange={handleChange}
          variant="fullWidth"
          className={classes.tabsStyles}
        >
          <Tab label="following" className={classes.tabStyle} />
          <Tab label="suggested" className={classes.tabStyle} />
        </Tabs>
        <div className="peopleContainer">
          {currentTab === 1
            ? makePeoples(followingList)
            : makePeoples(suggestedList)}
        </div>
      </div>
    </div>
  );
}

export default FriendsPage;
