import React from "react";
import { Button, Form, Table } from "react-bootstrap";
import TextFieldGroup from "../common/TextFieldGroup";
import { makePostRequest } from "../../App/request";

class MyAuctions extends React.Component {
  constructor() {
    super();
    this.state = {
      alert: null,
      message: ""
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    makePostRequest("auction/message/add", {
      text: this.state.message,
      userFk: sessionStorage.userID,
      auctionFk: this.props.id
    }).then(() => {
      this.props.update();
    });
    this.setState({
      message: ""
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <>
        <center>
          <h1>MESSAGES</h1>
        </center>
        <Table responsive striped hover>
          <thead>
            <tr>
              <th>User</th>
              <th>Message</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {this.props.msgs.map((item, index) => {
              return (
                <tr key={index}>
                  <th>{item.user.userName}</th>
                  <th>{item.text}</th>
                  <th>{item.date}</th>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <Form>
          <TextFieldGroup
            onChange={this.onChange}
            value={this.state.message}
            label="Enter your message here.."
            placeholder="Message"
            field="message"
          />
          <Button block variant="warning" onClick={this.handleSubmit}>
            SEND
          </Button>
        </Form>
      </>
    );
  }
}

export default MyAuctions;
