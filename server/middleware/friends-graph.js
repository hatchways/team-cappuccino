const User = require("../models/user");
var mongoose = require("mongoose");

const getFollowing = async userId => {
  const user = await User.findById(userId).exec();

  return user.following.map(el => el.toString());
};

const getTopFollowed = async (user, numberOfUsers) => {
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
};

const BFS = async userId => {
  let visited = new Set([userId]);
  const user = await User.findById(userId).exec();
  let queue = user.following.slice(0).map(el => el.toString());
  let alreadyFollowing = new Set(
    user.following.slice(0).map(el => el.toString())
  );
  let suggested = [];

  while (queue.length > 0 && suggested.length <= 10) {
    const nextVisited = queue.shift();
    const nextVisitedFollowing = await getFollowing(nextVisited);

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
    const topFollowed = await getTopFollowed(userId, 10 - suggested.length);
    topFollowed.forEach(usr => {
      if (!suggested.includes(user)) {
        suggested.push(usr._id.toString());
      }
    });
  }
  return suggested;
};

module.exports = BFS;
