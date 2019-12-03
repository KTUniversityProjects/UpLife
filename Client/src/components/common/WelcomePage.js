import React from "react";
import { Jumbotron, Container } from "react-bootstrap";
import "./welcomePage.scss";
class WelcomePage extends React.Component {
  render() {
    return (
      <Jumbotron>
        <Container fluid>
          <div class="grid-container">
            <div class="grid-right">
              <h1>Welcome to BIDERIS</h1>
              <p>
                The worlds #1 app - if Aruodas.lt and Tinder had a child, and
                then would give it away to an orphanage, this would be it.
              </p>
            </div>
            <div class="grid-left">
              <img
                alt=""
                src="/Images/your-logo-2.png"
                className="titleImage"
              />
            </div>
          </div>
        </Container>
      </Jumbotron>
    );
  }
}

export default WelcomePage;
