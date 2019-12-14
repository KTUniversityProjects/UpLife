import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./IconText.scss";
export default props => {
  return (
    <div className="iconText">
      <a href={props.href} className="iconText__link">
        <div className="iconText__icon">
          <FontAwesomeIcon icon={props.icon} />
        </div>
        <div className="iconText__text">
          <p>{props.text}</p>
        </div>
      </a>
    </div>
  );
};
