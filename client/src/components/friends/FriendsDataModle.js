import {
  addFollowing,
  removeFollowing,
  getSuggested,
  getFollowing,
  searchUsers
} from "../api/index.js";
import { isAuthenticated } from "../auth/index.js";
import AwesomeDebouncePromise from "awesome-debounce-promise";

function FriendsData() {
  this.followingData = [];
  this.suggestedData = [];
  this.searchData = [];
  this.searchState = false;
}

FriendsData.prototype.fetchSearchUser = function(searchTerm, completion) {
  searchUsers(searchTerm).then(data => {
    if (data.error) {
      console.log(data.error);
    } else {
      if (this.searchState) {
        console.log(data);
        this.searchData = data;
        completion();
      }
    }
  });
};

// FriendsData.prototype.fetchSearchUserDebounced = text =>
//   AwesomeDebouncePromise(text => {
//     this.fetchSearchUser(text);
//   }, 500)(text);

// FriendsData.prototype.handleSuggestedChange = async text => {
//   const result = await this.friendsData.fetchSearchUserDebounced(text);
//   this.searchData = result;
// };

FriendsData.prototype.fetchSuggestedData = function(completion) {
  getSuggested().then(data => {
    if (data.error) {
      console.log(data.error);
    } else {
      this.suggestedData = data;
      completion();
    }
  });
};

FriendsData.prototype.fetchFollowingData = function(completion) {
  getFollowing().then(data => {
    if (data.error) {
      console.log(data.error);
    } else {
      console.log("following data", data);
      this.followingData = data;
      completion();
    }
  });
};

FriendsData.prototype.addFollowing = function(id, completion) {
  const person = this.suggestedData.find(el => el._id === id);
  const index = this.suggestedData.findIndex(el => el._id === id);
  const body = { userId: isAuthenticated().user._id, followId: id };
  addFollowing(body).then(data => {
    if (data.error) {
      console.log(data.error);
    } else {
      this.suggestedData.splice(index, 1);
      this.followingData.push(person);
      completion();
    }
  });
};

FriendsData.prototype.removeFollowing = function(id, completion) {
  const person = this.followingData.find(el => el._id === id);
  const index = this.followingData.findIndex(el => el._id === id);
  const body = { userId: isAuthenticated().user._id, unfollowId: id };
  removeFollowing(body).then(data => {
    if (data.error) {
      console.log(data.error);
    } else {
      this.followingData.splice(index, 1);
      this.suggestedData.push(person);
      completion();
    }
  });
};

FriendsData.prototype.downloadAllData = function(completion) {
  this.fetchSuggestedData(() => {
    this.fetchFollowingData(() => {
      completion();
    });
  });
};

export default FriendsData;
