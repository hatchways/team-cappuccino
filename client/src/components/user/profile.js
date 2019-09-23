import React from "react";
import { withRouter } from "react-router-dom";

import { getUser } from "../api";
import { isAuthenticated, logout } from "../auth";

class Profile extends React.Component {
  state = {
    user: "",
    error: ""
  };

  componentDidMount() {
    const token = isAuthenticated().token;
    const userId = isAuthenticated().user._id;

    console.log("profile did mount");
    getUser(userId, token, this.props.history).then(data => {
      if (data.error) {
        this.setState({ error: data.error });
      } else {
        this.setState({ user: data });
      }
    });
  }

  render() {
    const { user } = this.state;

    return (
      <div>
        <h1>Profile Page</h1>
        <h1>Name: {user.name}</h1>
        <button
          onClick={() => {
            logout(this.props.history);
          }}
        >
          Logout
        </button>
      </div>
    );
  }
}

export default withRouter(Profile);
