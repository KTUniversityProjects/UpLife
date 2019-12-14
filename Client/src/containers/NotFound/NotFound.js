import React from "react";
import Notfound from "./NotFound.gif";
import "./NotFound.scss";

export default () => {
  return (
    <div className="page-container">
      <div
        className="bg"
        style={{ backgroundImage: `url("${Notfound}")` }}
      ></div>
      <h1 className="title">
        404
        <br />
        Sorry, the page couldn't be found
      </h1>
    </div>
  );
};
