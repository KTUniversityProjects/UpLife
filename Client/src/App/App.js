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

  testRequest = () => {
    fetch("http://localhost:3000/user/", {
      method: "GET",
      headers: {
        authorization: "bearer " + localStorage.getItem("token")
      }
    })
      .then(data => data.json())
      .then(res => console.log(res));
    // axios
    //   .request({
    //     url: '"http://localhost:3000/user"',
    //     method: "get",
    //     headers: { authorization: localStorage.getItem("token") }
    //   })
    //   .then(res => console.log(res));
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
    const logOut = (
      <div>
        <button onClick={() => this.logOut()}>Logout</button>
        <button onClick={() => this.testRequest()}>Trest request</button>
      </div>
    );
    return <div>{this.state.loggedIn ? logOut : logIn}</div>;
  }
}
