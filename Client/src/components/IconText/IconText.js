import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./IconText.scss";
const IconText = props => {
  return (
    <div className="iconText">
      <a href={props.href} className="iconText__link">
        <div className="iconText__icon">
          <FontAwesomeIcon icon={props.icon} />
        </div>
        <div className="iconText__text">
          <h4>{props.text}</h4>
        </div>
      </a>
    </div>
  );
};

export default IconText;
