import React, { Component } from "react";
import axios from "axios";

export default class extends Component {
  state = {
    getResponse: null,
    putResponse: null,
    deleteResponse: null,
    updateResponse: null
  };

  makeRequest = req => {
    console.log(req);
    //axios.post('http://localhost:3001/api/' + req)
  };

  render() {
    return (
      <div>
        <button onClick={this.makeRequest("get")}>GET</button>
      </div>
    );
  }
}
