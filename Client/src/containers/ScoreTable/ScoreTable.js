import React from "react";
import { Table, Jumbotron, Container } from "react-bootstrap";
import { makeGetRequest } from "../../utils/request";

export default class ScoreTable extends React.Component {
  state = {
    users: [],
    alert: null
  };

  componentDidMount() {
    makeGetRequest("user").then(response => {
      this.setState({
        users: response
      });
    });
  }

  render() {
    return (
      <Jumbotron>
        <Container fluid>
          <center>
            <h1>Score table</h1>
          </center>
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>Username</th>
                <th>Name, Lastname</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {this.state.users.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.username}</td>
                    <td>
                      {item.name} {item.lastname}
                    </td>
                    <td>{item.score === null ? 0 : item.score}</td>
                  </tr>
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
