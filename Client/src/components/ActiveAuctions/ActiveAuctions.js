import React from "react";
import { Table, Jumbotron, Container } from "react-bootstrap";
import SingleActiveAuctionLine from "./SingleActiveAuctionLine";
import { browserHistory } from "react-router";
import { makeGetRequest } from "../../App/request";

class ActiveAuctions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      alert: null
    };
    this.handleParticipate = this.handleParticipate.bind(this);
  }

  componentDidMount() {
    makeGetRequest("auction/user/" + sessionStorage.userID).then(response => {
      console.log(response);
      this.setState({
        users: response
      });
    });
  }

  handleParticipate = (id, date) => {
    console.log("Participate:" + id);
    browserHistory.push({
      pathname: "/activeauction",
      state: {
        id: id,
        date: date
      }
    });
  };

  render() {
    return (
      <Jumbotron>
        <Container fluid>
          <center>
            <h1>Active auctions</h1>
          </center>
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Place</th>
                <th>Price</th>
                <th>Time left to start</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {this.state.users.map((item, index) => {
                return (
                  <SingleActiveAuctionLine
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
                    startDate={item.startDate}
                    bidStarted={item.status}
                    participate={this.handleParticipate}
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

export default ActiveAuctions;
