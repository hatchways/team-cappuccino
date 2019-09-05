const User = require("../models/user");
var mongoose = require("mongoose");

class FriendsGraph {
  constructor(adjacencyList) {
    //the adjacency list represents all the people a user is following NOT a users followers
    this.adjacencyList = adjacencyList;
  }

  static async build() {
    const adjacencyList = new Map();

    const users = await User.find().exec();

    users.forEach(user => {
      adjacencyList.set(user._id.toString(), user.following);
    });

    return new FriendsGraph(adjacencyList);
  }

  getFollowing(user) {
    return this.adjacencyList.get(user);
  }

  setFollowing(user, newFollowingId) {
    this.getFollowing(user).push(newFollowingId);
  }

  removeFollowing(user, oldFollowingId) {
    const following = this.getFollowing(user);
    const index = following.indexOf(oldFollowingId);
    if (index >= 0) {
      following.splice(index, 1);
    }
  }

  async getTopFollowed(user, numberOfUsers) {
    const topFollowedUsers = await User.aggregate([
      {
        $match: {
          _id: { $ne: mongoose.Types.ObjectId(user) },
          followers: { $ne: mongoose.Types.ObjectId(user) }
        }
      },
      {
        $project: {
          length: { $size: "$followers" }
        }
      },
      {
        $sort: {
          length: -1
        }
      },
      { $limit: numberOfUsers }
    ]).exec();
    console.log(topFollowedUsers);
    return topFollowedUsers;
  }

  //search from user and find top 10 userIds that user hasn't already followed
  async BFS(user) {
    let visited = new Set([user]);
    let queue = this.getFollowing(user).slice(0);
    let alreadyFollowing = new Set(this.getFollowing(user).slice(0));
    let suggested = [];

    while (queue.length > 0 && suggested.length <= 10) {
      const nextVisited = queue.shift();
      const nextVisitedFollowing = this.getFollowing(nextVisited);

      if (!visited.has(nextVisited) && !alreadyFollowing.has(nextVisited)) {
        suggested.push(nextVisited);
      }

      nextVisitedFollowing.forEach(el => {
        if (!visited.has(el)) {
          queue.push(el);
        }
      });
      visited.add(nextVisited);
    }

    //if there's not enough suggested from the bfs then supplement with the most followed people
    if (suggested.length < 10) {
      const topFollowed = await this.getTopFollowed(
        user,
        10 - suggested.length
      );
      topFollowed.forEach(usr => {
        suggested.push(usr._id.toString());
      });
    }
    return suggested;
  }
}

module.exports = FriendsGraph;
