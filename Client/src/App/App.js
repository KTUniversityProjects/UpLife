import React, { Component } from "react";
import axios from "axios";

export default class extends Component {
  state = {
    getResponse: null,
    putResponse: null,
    deleteResponse: null,
    postResponse: null
  };

  getRequest = req => {
    fetch("http://localhost:3000/users")
      .then(data => data.json())
      .then(res => this.setState({ data: res.data }));
  };

  postRequest = req => {
    axios
      .post("http://localhost:3001/api/" + req, {
        message: "HI FROM " + req
      })
      .then(res => this.processReq(res, req));
  };

  deleteRequest = req => {
    console.log(req);
    axios
      .delete("http://localhost:3001/api/" + req + "/HIFROMDELETE")
      .then(res => this.processReq(res, req));
  };

  processReq = (res, req) => {
    let propName = req + "Response";
    this.setState({
      [propName]: res.data.data
    });
  };

  render() {
    return (
      <div>
        <button onClick={() => this.getRequest("get")}>GET</button>
        {this.state.data}
        <br />
        <button onClick={() => this.postRequest("post")}>POST</button>
        {this.state.postResponse}
        <br />
        <button onClick={() => this.deleteRequest("delete")}>DELETE</button>
        {this.state.deleteResponse}
        <br />
        <button onClick={() => this.postRequest("put")}>PUT</button>
        {this.state.putResponse}
        <br />
      </div>
    );
  }
}
