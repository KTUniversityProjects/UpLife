import React from "react";
import { Jumbotron, Container } from "react-bootstrap";
import "./welcomePage.scss";
class WelcomePage extends React.Component {
  render() {
    return (
      <Jumbotron>
        <Container fluid>
          <div className="grid-container">
            <div className="grid-container__text">
              <h1 className="grid-container__text--title">
                Upgrade your lifestyle today
              </h1>
              <p>
                UpLife - a web application, which is meant to help you create a
                better daily routine, get new habits or throw out bad ones out
                of your life. Join now.
              </p>
            </div>
            <div className="grid-container__image">
              <img
                alt=""
                src="/Images/your-logo-2.png"
                className="landing-image"
              />
            </div>
          </div>
        </Container>
      </Jumbotron>
    );
  }
}

export default WelcomePage;
