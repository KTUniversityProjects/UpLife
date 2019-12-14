import React from "react";
import { Table, Jumbotron, Container, Button, Form } from "react-bootstrap";
import { makeGetRequest, makePostRequest } from "../../utils/request";
import SweetAlert from "react-bootstrap-sweetalert";
import EditHabitModal from "./EditHabitModal";
import "./Habits.scss";

export default class Habits extends React.Component {
  state = {
    habits: [],
    userHabits: [],
    alert: null,
    habitName: "",
    habitDesc: ""
  };

  componentDidMount() {
    this.performDataFetch();
  }

  performDataFetch = alert => {
    const id = localStorage.getItem("userId");
    makeGetRequest("habit").then(response => {
      this.setState(state => {
        state.habits = response.filter(habit => habit.user_id !== parseInt(id));
        state.userHabits = response.filter(
          habit => habit.user_id === parseInt(id)
        );
        state.alert = alert ? alert : null;
        return { ...state };
      });
    });
  };

  onInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onHabitSave = () => {
    const successAlert = () => (
      <SweetAlert
        success
        title="Your habit has been added!"
        onConfirm={() => {
          this.setState({ alert: null });
        }}
      />
    );

    if (!this.state.habitName || !this.state.habitDesc) {
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
      return;
    }

    makePostRequest(`habit`, {
      user_id: localStorage.getItem("userId"),
      name: this.state.habitName,
      description: this.state.habitDesc
    }).then(() => {
      this.performDataFetch(successAlert());
    });
  };

  addHabitFromTable = obj => {
    const successAlert = () => (
      <SweetAlert
        success
        title="Habit added!"
        onConfirm={() => {
          this.setState({
            alert: null
          });
        }}
      />
    );
    const infoAlert = () => (
      <SweetAlert
        info
        showCancel={true}
        showCloseButton={true}
        cancelBtnBsStyle="danger"
        title="Add this habit to list of your habits?"
        onConfirm={() => {
          makePostRequest(`habit`, {
            user_id: localStorage.getItem("userId"),
            name: obj.name,
            description: obj.desc
          }).then(() => {
            this.performDataFetch(successAlert());
          });
        }}
        onCancel={() => {
          this.setState({ alert: null });
        }}
      />
    );
    this.setState({ alert: infoAlert() });
  };

  render() {
    return (
      <Jumbotron>
        <div className="habits_container">
          <Container fluid>
            <center>
              <h1>Your habits</h1>
            </center>
            <Table bordered responsive striped hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th colSpan="2">Description</th>
                </tr>
              </thead>
              <tbody>
                {this.state.userHabits.map(item => {
                  return (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.description}</td>
                      <td>
                        <EditHabitModal
                          name={item.name}
                          desc={item.description}
                          id={item.id}
                          refresh={this.performDataFetch}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <h6>
              <b>Add a new habit:</b>
              <div className="habit_form">
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Name of the habit</Form.Label>
                  <Form.Control
                    type="text"
                    value={this.state.habitName}
                    name="habitName"
                    placeholder="Ex.: Morning showers.."
                    onChange={e => this.onInputChange(e)}
                  />
                  <hr></hr>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    name="habitDesc"
                    value={this.state.habitDesc}
                    placeholder="Taking a shower every morning wakes you up and ..."
                    onChange={e => this.onInputChange(e)}
                  />
                </Form.Group>
                <hr></hr>
                <Button onClick={() => this.onHabitSave()} variant="info" block>
                  Add new habit
                </Button>
              </div>
            </h6>
          </Container>
          <Container fluid>
            <center>
              <h1>All habits</h1>
            </center>
            <Table bordered responsive striped hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {this.state.habits.map(item => {
                  return (
                    <tr
                      key={item.id}
                      onClick={() =>
                        this.addHabitFromTable.call(this, {
                          id: item.id,
                          name: item.name,
                          desc: item.description
                        })
                      }
                    >
                      <td>{item.name}</td>
                      <td>{item.description}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <h6 className="habit_form">
              Want to add any of the habits above to your habits? Just press on
              any of them!
            </h6>
          </Container>
        </div>
        {this.state.alert}
      </Jumbotron>
    );
  }
}
