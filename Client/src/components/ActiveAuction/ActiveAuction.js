import React from "react";
import { Jumbotron, Container, Row, Col } from "react-bootstrap";
import BidPage from "./BidPage";
import ChatPage from "./ChatPage";
import { makeGetRequest } from "../../App/request";
import DateCountdown from "react-date-countdown-timer";

class ActiveAuction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: props.location.state.date,
      id: props.location.state.id,
      bids: [],
      msgs: []
    };
    this.updatePage = this.updatePage.bind(this);
  }

  componentDidMount() {
    this.interval = setInterval(() => this.updatePage(), 5000);
  }

  updatePage() {
    makeGetRequest("auction/bids/" + this.state.id).then(response => {
      this.setState({
        bids: response
      });
    });
    makeGetRequest("auction/messages/" + this.state.id).then(response => {
      console.log(response);
      this.setState({
        msgs: response
      });
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <Jumbotron>
        <Container fluid>
          <h1>
            <DateCountdown dateTo={this.state.date} />
          </h1>
          <Row>
            <Col>
              <BidPage
                bids={this.state.bids}
                id={this.state.id}
                update={this.updatePage}
              />
            </Col>
            <Col>
              <ChatPage
                msgs={this.state.msgs}
                id={this.state.id}
                update={this.updatePage}
              />
            </Col>
          </Row>
        </Container>
      </Jumbotron>
    );
  }
}

export default ActiveAuction;
