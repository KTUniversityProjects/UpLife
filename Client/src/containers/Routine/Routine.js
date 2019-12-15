import React from "react";
import Moment from "moment";
import { Table, Jumbotron, Container, Form, Button } from "react-bootstrap";
import { makeGetRequest, makePostRequest } from "../../utils/request";
import SweetAlert from "react-bootstrap-sweetalert";
import EditTimeModal from "./EditTimeModal";
import TextFieldGroup from "../common/TextFieldGroup";
import "./Routine.scss";

export default class Routine extends React.Component {
  state = {
    habits: [],
    times: [],
    alert: null,
    start: "",
    end: "",
    habit: ""
  };

  componentDidMount() {
    this.performDataFetch();
  }

  performDataFetch = (alert = null) => {
    const id = localStorage.getItem("userId");
    makeGetRequest("habit").then(resHabit => {
      let habits = resHabit.filter(x => x.user_id === parseInt(id));
      makeGetRequest("habitTime", { IDUser: id }).then(res => {
        if (res) {
          res.forEach(t => {
            t.starttime = parseInt(t.starttime.split("T")[1].split(":")[0]) + 2;
            t.endtime = parseInt(t.endtime.split("T")[1].split(":")[0]) + 2;
          });
          res.forEach(time => {
            habits.forEach(habit => {
              if (time.habit_id === habit.id) time["name"] = habit.name;
            });
          });
        }
        this.setState({
          habits,
          times: res,
          alert: alert
        });
      });
    });
  };

  convertTime(time) {
    let result = Moment(
      new Date(
        Moment()
          .toDate()
          .setHours(time)
      )
    ).format();
    result = result.substring(0, result.length - 6);
    return result;
  }

  onTimeSave = () => {
    const successAlert = () => (
      <SweetAlert
        success
        title="Your time has been added!"
        onConfirm={() => {
          this.setState({ alert: null });
        }}
      />
    );

    if (!this.state.start || !this.state.end) {
      const failAlert = () => (
        <SweetAlert
          warning
          title="Please don't leave any empty fields!"
          onConfirm={() => {
            this.setState({ alert: null });
          }}
        />
      );
      this.setState({ alert: failAlert() });
    }

    makePostRequest(`habitTime`, {
      routine_id: 1,
      starttime: this.convertTime(this.state.start),
      endtime: this.convertTime(this.state.end),
      habit_id: this.state.habit
    }).then(() => {
      this.performDataFetch(successAlert());
    });
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <Jumbotron>
        <div className="habits_container">
          <Container fluid>
            <center>
              <h1>Set up your daily routine</h1>
            </center>
            <Table bordered responsive striped hover>
              <thead>
                <tr>
                  <th>Start time</th>
                  <th>End time</th>
                  <th colSpan="2">Habit</th>
                </tr>
              </thead>
              <tbody>
                {this.state.times &&
                  this.state.times.map(item => {
                    return (
                      <tr key={item.id}>
                        <td>{item.starttime}</td>
                        <td>{item.endtime}</td>
                        <td>{item.name}</td>
                        <td>
                          <EditTimeModal
                            name={item.name}
                            start={item.starttime}
                            end={item.endtime}
                            id={item.id}
                            habit_id={item.habit_id}
                            habits={this.state.habits}
                            refresh={this.performDataFetch}
                          />
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </Container>
        </div>
        <Form>
          <TextFieldGroup
            label="Start time"
            onChange={e => this.onChange(e)}
            value={this.state.start}
            field="start"
            type="number"
          />
          <hr></hr>
          <TextFieldGroup
            label="End time"
            onChange={e => this.onChange(e)}
            value={this.state.end}
            field="end"
            type="number"
          />
          <hr></hr>
          <Form.Label>Select habit</Form.Label>
          <Form.Control
            as="select"
            onChange={e => this.onChange(e)}
            name="habit"
            value={this.state.habit}
          >
            {this.state.habits.map(item => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </Form.Control>
          <Button onClick={() => this.onTimeSave()} variant="info" block>
            Add new habit
          </Button>
        </Form>
        {this.state.alert}
      </Jumbotron>
    );
  }
}
