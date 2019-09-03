import {
  getAllUsers,
  getUser,
  addFollowing,
  removeFollowing
} from "../api/index.js";
import { isAuthenticated } from "../auth/index.js";

function FriendsData() {
  this.followingData = [];
  this.suggestedData = [];
}

FriendsData.prototype.fetchSuggestedData = function(completion) {
  getAllUsers().then(data => {
    if (data.error) {
      console.log(data.error);
    } else {
      this.suggestedData = data;
      completion();
    }
  });
};

FriendsData.prototype.followingFromSuggested = function(idList, myId) {
  let newSuggested = [];
  this.suggestedData.map((person, index) => {
    if (idList.find(id => id._id === person._id) !== undefined) {
      this.followingData.push(person);
    } else {
      if (person._id != myId) {
        newSuggested.push(person);
      }
    }
  });
  this.suggestedData = newSuggested;
  console.log(this.followingData);
  console.log(this.suggestedData);
};

FriendsData.prototype.fetchFollowingData = function(completion) {
  getUser().then(data => {
    if (data.error) {
      console.log(data.error);
    } else {
      console.log(data);
      this.followingFromSuggested(data.following, data._id);
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
  const body = { userId: isAuthenticated().user._id, followId: id };
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
