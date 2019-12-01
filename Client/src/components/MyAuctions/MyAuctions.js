import React from "react";
import { Table, Jumbotron, Container } from "react-bootstrap";
import SingleAuctionLine from "./SingleAuctionLine";
import SweetAlert from "react-bootstrap-sweetalert";
import { makePostRequest, makeGetRequest } from "../../App/request";

class MyAuctions extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
      alert: null
    };
  }

  componentDidMount() {
    makeGetRequest("auction/ended/" + sessionStorage.userID).then(response => {
      this.setState({
        users: response
      });
    });
  }

  handleAccept = id => {
    console.log("Accept:" + id);
    makePostRequest(
      "auction/accept/" + sessionStorage.userID + "/" + id
    ).then();
    const getAlert = () => (
      <SweetAlert
        success
        title="Accepted!"
        onConfirm={() => {
          this.setState({ alert: null });
        }}
      />
    );
    this.setState({
      alert: getAlert()
    });
    window.location.reload();
  };

  render() {
    return (
      <Jumbotron>
        <Container fluid>
          <center>
            <h1>Auctions, which have ended and in which you participated</h1>
          </center>
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {this.state.users.map((item, index) => {
                return (
                  <SingleAuctionLine
                    key={index}
                    index={item.id}
                    name={item.post.name}
                    house={
                      item.post.country +
                      ", " +
                      item.post.city +
                      ", " +
                      item.post.houseNumber
                    }
                    sum={item.post.price}
                    isWinner={
                      sessionStorage.username === item.winner.userName
                        ? true
                        : false
                    }
                    status={item.status}
                    accept={this.handleAccept}
                  />
                );
              })}
            </tbody>
          </Table>
        </Container>
        {this.state.alert}
      </Jumbotron>
    );
  }
}

export default MyAuctions;
