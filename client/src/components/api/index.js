// get list
import makeAuthCall from "./makeAuthCall.js";
import { isAuthenticated } from "../auth/index.js";

export const getUser = history => {
  const userId = isAuthenticated().user._id;
  return makeAuthCall({}, `/api/user/${userId}`, "GET", false, history);
};

export const getAllUsers = history => {
  return makeAuthCall({}, `/api/users`, "GET", false, history);
};

export const addFollowing = (body, history) => {
  return makeAuthCall(body, `/api/user/follow`, "PUT", false, history);
};

export const removeFollowing = (body, history) => {
  return makeAuthCall(body, `/api/user/unfollow`, "PUT", false, history);
};

export const getSuggested = history => {
  const userId = isAuthenticated().user._id;
  return makeAuthCall(
    {},
    `/api/user/${userId}/suggested`,
    "GET",
    false,
    history
  );
};

export const getFollowing = history => {
  const userId = isAuthenticated().user._id;
  return makeAuthCall(
    {},
    `/api/user/${userId}/following`,
    "GET",
    false,
    history
  );
};

export const searchUsers = (searchTerm, history) => {
  return makeAuthCall(
    {},
    `/api/user/search/${searchTerm}`,
    "GET",
    false,
    history
  );
};

export const addItem = (body, history) => {
  return makeAuthCall(
    body,
    `api/items/new/${body.list._id}`,
    "POST",
    false,
    history
  );
};

export const getAllListItems = (listId, history) => {
  return makeAuthCall({}, `api/list/${listId}/items`, "GET", false, history);
};

export const getAllUsersItems = history => {
  const userId = isAuthenticated().user._id;
  return makeAuthCall({}, `api/list/${userId}`, "GET", false, history);
};

export const getLists = history => {
  const userId = isAuthenticated().user._id;
  return makeAuthCall({}, `api/lists/by/${userId}`, "GET", false, history);
};

export const createList = (body, history) => {
  const userId = isAuthenticated().user._id;
  return makeAuthCall(body, `api/lists/new/${userId}`, "POST", false, history);
};

export const deleteItem = (id, history) => {
  console.log(id);
  return makeAuthCall({}, `api/items/${id}`, "DELETE", false, history);
};
