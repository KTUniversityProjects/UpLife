import React from "react";
import notfound from "./notfound.gif";
import "./notfound.scss";

class NotFound extends React.Component {
  render() {
    return (
      <div className="page-container">
        <div
          className="bg"
          style={{ backgroundImage: "url(" + notfound + ")" }}
        ></div>
        <h1 className="title">
          404
          <br />
          Sorry, the page couldn't be found
        </h1>
      </div>
    );
  }
}

export default NotFound;
