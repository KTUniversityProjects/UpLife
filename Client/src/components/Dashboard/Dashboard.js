import React from "react";
import { Jumbotron, Container, Button } from "react-bootstrap";
import { makePostRequest, makeGetRequest } from "../../App/request";
import imges from "../../mock_data/images.js";
import SweetAlert from "react-bootstrap-sweetalert";
import "./Dashboard.scss";
class Dashboard extends React.Component {
  state = {
    habits: [
      { title: "brush yo teeth", check: "false" },
      { title: "brush yo ass", check: "true" },
      { title: "brush yo pp", check: "false" },
      { title: "brush yo eyes", check: "false" }
    ]
  };
  // componentDidMount() {
  //   // makeGetRequest("apartment/all").then(response => {
  //   //   this.setState({
  //   //     users: response
  //   //   });
  //   // });
  // }

  // onRatingClickPositive() {
  //   const getAlert = () => (
  //     <SweetAlert
  //       success
  //       title="OPA LIKED!"
  //       onConfirm={() => {
  //         this.setState({ alert: null });
  //       }}
  //     />
  //   );
  //   makePostRequest(
  //     "user/like/" +
  //       sessionStorage.userID +
  //       "/" +
  //       this.state.users[this.state.index].id
  //   ).then(() => {
  //     this.setState({
  //       alert: getAlert()
  //     });
  //   });
  //   this.onRatingClick();
  // }

  createScheduleHeader() {
    let schedule = [<p>Days/Habits</p>];
    for (let index = 1; index <= 7; index++) {
      schedule.push(<p>{index}</p>);
    }
    return schedule;
  }

  getCurrentMonth() {
    const date = new Date();
    const day = date.getDay() + 1;
    const month = date.toLocaleString("default", { month: "long" });
    return `${month}, ${day}`;
  }

  render() {
    return (
      <>
        <div className="dashboard">
          <div className="dashboard__scheduler"></div>
          <h3>This week's progress</h3>
          <hr />
          <h5>{this.getCurrentMonth()}</h5>
          <div className="dashboard__scheduler__row--header">
            {this.createScheduleHeader()}
          </div>
          {this.state.habits.map((habit, index) => (
            <h1>habit</h1>
          ))}
          <div className="dashboard__diary"></div>
        </div>
        {this.state.alert}
      </>
    );
  }
}

export default Dashboard;
