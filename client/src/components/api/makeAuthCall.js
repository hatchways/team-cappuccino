import { withRouter } from "react-router-dom";

import { isAuthenticated, logout } from "../auth";

const makeAuthCall = (body, url, method, isForm, history) => {
  const makeFormData = () => {
    let formData = new FormData();
    for (let key in body) {
      formData.append(key, body[key]);
    }
  };
  const exportBody =
    method === "GET" || method === "DELETE"
      ? {}
      : !isForm
      ? { body: JSON.stringify(body) }
      : { body: makeFormData() };

  return fetch(url, {
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${isAuthenticated().token}`
    },
    ...exportBody
  })
    .then(response => {
      if (response.status === 401) {
        logout(history);
      }
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};

export default makeAuthCall;
