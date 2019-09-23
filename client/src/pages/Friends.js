import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

import { makeStyles } from "@material-ui/styles";
import {
  Tabs,
  Tab,
  Avatar,
  Button,
  TextField,
  InputAdornment
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import SearchIcon from "@material-ui/icons/Search";
import CancelIcon from "@material-ui/icons/Cancel";
import FriendsData from "../components/friends/FriendsDataModle.js";
import AwesomeDebouncePromise from "awesome-debounce-promise";

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
    overflowY: "scroll",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
    "&::-webkit-scrollbar": {
      width: "0px"
    }
  },
  searchStyle: {
    width: "100%",
    background: "white",
    margin: "0px 0px 1px 0px"
  },
  suggestedCard: {
    width: "100%",
    // height: "40px",
    padding: "5px 0px 5px 0px",
    margin: "2px 0px 3px 0px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    background: "white",
    color: "silver",
    fontSize: ".5em"
  },
  peopleCard: {
    width: "100%",
    height: "90px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    background: "white",
    margin: "0px 0px 1px 0px"
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

function FriendsPage(props) {
  const history = props.history;
  const classes = friendsPageStyles();
  const [currentTab, setTab] = useState(0);
  const [currentSearch, setSearch] = useState("");
  const [state, setState] = useState({
    downloading: false,
    downloaded: false,
    changedLists: false
  });
  let [friendsData, updateFriendsData] = useState(new FriendsData(history));

  const searchAPI = text =>
    friendsData.fetchSearchUser(text, () =>
      setState({ ...state, downloading: false })
    );
  const suggestedSearchDebounced = AwesomeDebouncePromise(searchAPI, 500);

  useEffect(() => {
    setState({ ...state, downloading: true });
    friendsData.downloadAllData(() => {
      setState({ ...state, downloading: false });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleChange(event, newTab) {
    setTab(newTab);
  }

  const handleSuggestedSearchChange = async event => {
    setState({ ...state, downloading: true });
    const newInput = event.target.value;
    setSearch(newInput);
    if (newInput !== "") {
      friendsData.searchState = true;
      await suggestedSearchDebounced(event.target.value);
    } else {
      setState({ ...state, downloading: false });
      friendsData.searchData = [];
      friendsData.searchState = false;
    }
  };

  function handleFollowingSearchChange(event) {
    setSearch(event.target.value);
  }

  function PeopleCard(props) {
    const { name, id } = props;
    return (
      <div className={classes.peopleCard}>
        <div className={classes.avatarAndName}>
          <Avatar className={classes.avatarStyle}>
            <AccountCircle />
          </Avatar>
          <p>{name}</p>
        </div>
        <Button
          variant="outlined"
          className={classes.buttonStyle}
          size="large"
          onClick={
            currentTab === 1
              ? () =>
                  friendsData.addFollowing(id, () =>
                    setState({ ...state, changedLists: !state.changedLists })
                  )
              : () =>
                  friendsData.removeFollowing(id, () =>
                    setState({ ...state, changedLists: !state.changedLists })
                  )
          }
        >
          {currentTab === 1 ? "Follow" : "Unfollow"}
        </Button>
      </div>
    );
  }

  function makePeoples(list) {
    return (
      list
        // .filter(person => person.name.includes(currentSearch))
        .map((person, index) => (
          <PeopleCard key={index} name={person.name} id={person._id} />
        ))
    );
  }

  function makeSuggested() {
    let searched = makePeoples(friendsData.searchData);
    let peoples = makePeoples(friendsData.suggestedData);
    peoples.splice(
      0,
      0,
      <div key="suggested header" className={classes.suggestedCard}>
        suggested
      </div>
    );
    let final = searched.concat(peoples);
    console.log(final);
    return final;
  }

  function SearchArea() {
    return (
      <>
        <div className={classes.peopleContainer}>
          <TextField
            value={currentSearch}
            autoFocus={true}
            placeholder={currentTab === 1 ? "search" : "search following"}
            className={classes.searchStyle}
            onChange={
              currentTab === 1
                ? handleSuggestedSearchChange
                : handleFollowingSearchChange
            }
            InputProps={{
              disableUnderline: true,
              startAdornment: (
                <InputAdornment
                  position="start"
                  style={{ color: "silver", margin: "0px 5px 0px 10px" }}
                >
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment
                  position="end"
                  style={{
                    color: "silver",
                    margin: "0px 5px 0px 0px",
                    cursor: "pointer"
                  }}
                  onClick={() => {
                    setSearch("");
                    setState({ ...state, downloading: false });
                    friendsData.searchData = [];
                    friendsData.searchState = false;
                  }}
                >
                  <CancelIcon />
                </InputAdornment>
              ),
              style: { height: "50px" }
            }}
          />

          {currentTab === 1
            ? makeSuggested()
            : makePeoples(friendsData.followingData)}
        </div>
      </>
    );
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
        <SearchArea />
      </div>
    </div>
  );
}

export default FriendsPage;
