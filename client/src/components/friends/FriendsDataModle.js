import {
  getAllUsers,
  getUser,
  addFollowing,
  removeFollowing,
  getSuggested,
  getFollowing
} from "../api/index.js";
import { isAuthenticated } from "../auth/index.js";

function FriendsData() {
  this.followingData = [];
  this.suggestedData = [];
}

FriendsData.prototype.fetchSuggestedData = function(completion) {
  getSuggested().then(data => {
    console.log("this is suggested data", data);
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
