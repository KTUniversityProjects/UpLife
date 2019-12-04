import React from "react";
import "./Footer.scss";
import IconText from "../IconText/IconText";
import {
  faFacebook,
  faGithub,
  faLinkedin
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__content">
        <div className="footer__content--column-logo">
          <img
            src="/Images/logo-white.png"
            alt="White logo"
            className="logo"
          ></img>
        </div>
        <div className="footer__content--column-contacts">
          <IconText
            text="Github"
            icon={faGithub}
            href="https://www.github.com"
          />
          <IconText
            text="LinkedIn"
            icon={faLinkedin}
            href="https://www.linkedin.com"
          />
          <IconText
            text="Facebook"
            icon={faFacebook}
            href="https://www.facebook.com"
          />
        </div>
        <div className="footer__content--column-info">
          <p className="footer__content--column-info-text">
            Application made with ReactJS.
          </p>
          <p className="footer__content--column-info-text">
            Styled using Bootstrap and custom styling.
          </p>
          <p className="footer__content--column-info-text">
            2019. Copyright to Benas Mandravickas.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
