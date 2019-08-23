import { isAuthenticated } from "../auth";

export const getUser = token => {
  return fetch(`/api/user`, {
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

export const addItem = body => {
  return fetch(`api/items`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${isAuthenticated().token}`
    },
    body: JSON.stringify(body)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
      console.log(err.error);
    });
};
