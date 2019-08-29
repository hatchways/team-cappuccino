
export const getUser = (userId, token) => {
  return fetch(`/api/user/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

//===== LISTS =====//

// creating list
export const createList = (userId, token, listData) => {
  return fetch(`/api/lists/new/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: listData
  })
    .then(response => response.json())
    .catch(err => console.log(err));
};

// get users' lists
export const getLists = (userId, token) => {
  return fetch(`/api/lists/by/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => response.json())
    .catch(err => console.log(err));
};

// get list
export const getSingleList = (listId, token) => {
  return fetch(`/api/lists/${listId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => response.json())
    .catch(err => console.log(err));
};

// update list
export const updateList = (listId, token, listData) => {
  return fetch(`/api/lists/${listId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: listData
  })
    .then(response => response.json())
    .catch(err => console.log(err));
};

// delete list
export const deleteList = (listId, token) => {
  return fetch(`/api/lists/${listId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => response.json())
    .catch(err => console.log(err));
};

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

export const deleteItem = id => {
  console.log(id);
  return makeAuthCall({}, `api/items/${id}`, "DELETE", false);
};
