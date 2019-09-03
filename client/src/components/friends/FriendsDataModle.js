import { getAllUsers, getUser } from "../api/index.js";

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
    if (idList.includes(person._id)) {
      this.followingData.push(person);
    } else {
      if (person._id != myId) {
        newSuggested.push(person);
      }
    }
  });
  this.suggestedData = newSuggested;
};

FriendsData.prototype.fetchFollowingData = function(completion) {
  getUser().then(data => {
    if (data.error) {
      console.log(data.error);
    } else {
      this.followingFromSuggested(data.following, data._id);
      completion();
    }
  });
};

FriendsData.prototype.addFollowing = function(id, completion) {
  const person = this.suggestedData.find(el => el._id === id);
  const index = this.suggestedData.findIndex(el => el._id === id);
  this.suggestedData.splice(index, 1);
  this.followingData.push(person);
  completion();
};

FriendsData.prototype.removeFollowing = function(id, completion) {
  const person = this.followingData.find(el => el._id === id);
  const index = this.followingData.findIndex(el => el._id === id);
  this.followingData.splice(index, 1);
  this.suggestedData.push(person);
  completion();
};

FriendsData.prototype.downloadAllData = function(completion) {
  this.fetchSuggestedData(() => {
    this.fetchFollowingData(() => {
      completion();
    });
  });
};

export default FriendsData;
