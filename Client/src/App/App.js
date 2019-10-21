import React, { Component } from "react";
import axios from "axios";

export default class extends Component {
  state = {
    loggedIn: false
  };

  componentDidMount() {
    let isToken = window.location.hash.split("=")[1];
    const token = isToken ? isToken : null;
    if (localStorage.getItem("token")) {
      this.setState({
        loggedIn: true
      });
    }
    if (token != null) {
      localStorage.setItem("token", token);
      window.location.href = "http://localhost:8080";
    }
  }

  logOut = () => {
    localStorage.clear();
    this.setState({
      loggedIn: false
    });
  };

  // getRequest = req => {
  //   fetch("http://localhost:3000/api/user/")
  //     .then(data => data.json())
  //     .then(res => this.setState({ data: res.data }));
  // };

  render() {
    const logIn = (
      <form action="http://localhost:3000/__/auth/facebook" method="post">
        <button type="submit">Login with facebook</button>
      </form>
    );
    const logOut = <button onClick={() => this.logOut()}>Logout</button>;
    return <div>{this.state.loggedIn ? logOut : logIn}</div>;
  }
}
