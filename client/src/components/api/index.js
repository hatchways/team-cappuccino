import makeAuthCall from "./makeAuthCall.js";

export const getUser = token => {
  return makeAuthCall({}, `/api/user`, "GET", false);
};

export const addItem = body => {
  return makeAuthCall(body, `api/items`, "POST", false);
};

export const getLists = () => {
  return makeAuthCall({}, `api/lists`, "GET", false);
};

export const createList = body => {
  return makeAuthCall(body, `api/lists`, "POST", false);
};
