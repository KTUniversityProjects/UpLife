import React from "react";
import { Link } from "react-router";
import { Navbar, Nav, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./NavBar.scss";
export default class NavBar extends React.Component {
  state = {
    isLoggedIn: false
  };

  componentDidMount() {
    let tokens = window.location.hash
      .replace("#token=", "")
      .replace("#userId", "")
      .split("=");
    let isToken = tokens[0];
    let isUserId = tokens[1];
    const token = isToken || null;
    const userId = isUserId || null;
    if (localStorage.getItem("token")) {
      this.setState({
        isLoggedIn: true
      });
    }
    if (token && userId) {
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      window.location.href = "http://localhost:3000";
    }
  }

  logOut = () => {
    console.log("Logged out");
    localStorage.clear();
    this.setState({
      loggedIn: false
    });
    window.location.href = "http://localhost:3000";
  };

  render() {
    // const isLoggedIn = sessionStorage.getItem("auth");
    //Userio navbar'as
    const userLinks = (
      <>
        <LinkContainer to="/Dashboard">
          <Nav.Link href="#">
            <Button variant="outline-light" block>
              Dashboard
            </Button>
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to="/UsersWhoRented">
          <Nav.Link href="#">
            <Button variant="outline-light" block>
              Habits
            </Button>
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to="/myposts">
          <Nav.Link href="#">
            <Button variant="outline-light" block>
              Scoretable
            </Button>
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to="/myauctions">
          <Nav.Link href="#">
            <Button variant="outline-light" block>
              Routine
            </Button>
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to="/">
          <Nav.Link href="#">
            <Button variant="outline-light" block onClick={this.logOut}>
              Log out
            </Button>
          </Nav.Link>
        </LinkContainer>
      </>
    );

    const guestLinks = (
      <form action="http://localhost:4000/__/auth/facebook" method="post">
        <button className="loginBtn--facebook" type="submit">
          Login
        </button>
      </form>
    );

    return (
      <Navbar
        fixed="top"
        collapseOnSelect
        expand="lg"
        variant="dark"
        className="navbar__container"
      >
        <Navbar.Brand>
          <Link to="/">
            <img
              alt=""
              src="/Images/your-logo.png"
              width="100"
              height="100"
              className="d-inline-block align-top"
            />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            {this.state.isLoggedIn ? userLinks : guestLinks}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
