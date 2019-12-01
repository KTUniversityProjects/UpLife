import React from "react";
import { Button, Form, Table } from "react-bootstrap";
import TextFieldGroup from "../common/TextFieldGroup";
import { makePostRequest } from "../../App/request";

class MyAuctions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: null,
      bid: ""
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    makePostRequest("auction/bid/add", {
      sum: this.state.bid,
      userFk: sessionStorage.userID,
      auctionFk: this.props.id
    }).then(() => {
      this.props.update();
    });
    this.setState({
      bid: ""
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <>
        <center>
          <h1>BIDS</h1>
        </center>
        <Table responsive striped hover>
          <thead>
            <tr>
              <th>Sum</th>
              <th>Date</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            {this.props.bids.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.sum}</td>
                  <td>{item.date}</td>
                  <td>{item.user.userName}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <Form>
          <TextFieldGroup
            onChange={this.onChange}
            value={this.state.bid}
            label="Enter your bid here.."
            placeholder="BID"
            field="bid"
            type="number"
          />
          <Button block variant="danger" onClick={this.handleSubmit}>
            BID
          </Button>
        </Form>
      </>
    );
  }
}

export default MyAuctions;
