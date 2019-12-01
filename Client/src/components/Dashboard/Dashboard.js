import React from "react";
import { Jumbotron, Container, Button } from "react-bootstrap";
import Picture from "./Picture.js";
import { makePostRequest, makeGetRequest } from "../../App/request";
import imges from "../../mock_data/images.js";
import SweetAlert from "react-bootstrap-sweetalert";

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      users: [],
      imges: imges,
      isLoading: false,
      alert: null
    };
    this.onRatingClick = this.onRatingClick.bind(this);
    this.onRatingClickPositive = this.onRatingClickPositive.bind(this);
  }

  componentDidMount() {
    makeGetRequest("apartment/all").then(response => {
      this.setState({
        users: response
      });
    });
  }

  onRatingClickPositive() {
    const getAlert = () => (
      <SweetAlert
        success
        title="OPA LIKED!"
        onConfirm={() => {
          this.setState({ alert: null });
        }}
      />
    );
    makePostRequest(
      "user/like/" +
        sessionStorage.userID +
        "/" +
        this.state.users[this.state.index].id
    ).then(() => {
      this.setState({
        alert: getAlert()
      });
    });
    this.onRatingClick();
  }

  onRatingClick() {
    if (this.state.index === this.state.users.length - 1) {
      this.setState({
        index: 0
      });
    } else {
      this.setState({
        index: this.state.index + 1
      });
    }
  }

  render() {
    let info = "";
    if (this.state.users.length !== 0) {
      info =
        "Price: " +
        this.state.users[this.state.index].price +
        ", Name: " +
        this.state.users[this.state.index].name +
        ", City: " +
        this.state.users[this.state.index].city;
    }
    return (
      <Jumbotron>
        <Container fluid>
          <h1>here are some lithuanian beauties for ya</h1>
          <Picture imgPaths={this.state.imges.imges.imgPaths} info={info} />
          <center>
            <Button
              variant="outline-success"
              size="lg"
              onClick={this.onRatingClickPositive}
            >
              <span role="img" aria-label="heart">
                ❤️
              </span>
            </Button>
            <Button
              variant="outline-danger"
              size="lg"
              onClick={this.onRatingClick}
            >
              <span role="img" aria-label="thumbs-down">
                👎
              </span>
            </Button>
          </center>
        </Container>
        {this.state.alert}
      </Jumbotron>
    );
  }
}

export default Dashboard;
