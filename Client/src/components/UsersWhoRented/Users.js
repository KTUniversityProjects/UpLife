import React from "react";
import { Table, Jumbotron, Container } from "react-bootstrap";
import SingleUserLine from "./SingleUserLine";
import SweetAlert from "react-bootstrap-sweetalert";
import { makePostRequest, makeGetRequest } from "../../App/request";

class Users extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
      alert: null
    };
  }

  componentDidMount() {
    makeGetRequest("apartment/winners/" + sessionStorage.userID).then(
      response => {
        this.setState({
          users: response
        });
      }
    );
  }

  handleDelete = id => {
    makeGetRequest("landlord/deleteWinner/" + id).then();
    const getAlert = () => (
      <SweetAlert
        warning
        title="Deleted"
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

  wrResponse = (id, response, rate) => {
    makePostRequest(
      "landlord/writeReview/" + sessionStorage.userID + "/" + id,
      {
        rate: rate,
        feedback: response
      }
    ).then(window.location.reload());
  };

  render() {
    return (
      <Jumbotron>
        <Container fluid>
          <center>
            <h1>Users, who rented your chatas</h1>
          </center>
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>User name</th>
                <th>House name</th>
                <th>Adress</th>
              </tr>
            </thead>
            <tbody>
              {this.state.users.map((item, index) => {
                return (
                  <SingleUserLine
                    key={index}
                    index={item.id}
                    userID={item.winner.id}
                    name={item.winner.firstName}
                    surname={item.winner.lastName}
                    house={item.post.name}
                    address={
                      item.post.country +
                      ", " +
                      item.post.city +
                      ", " +
                      item.post.houseNumber
                    }
                    delete={this.handleDelete}
                    wrResponse={this.wrResponse}
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

export default Users;
