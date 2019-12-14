import React from "react";
import moment from "moment";
import { Button, Form } from "react-bootstrap";
import {
  makePutRequest,
  makeGetRequest,
  makePostRequest
} from "../../utils/request";
import SweetAlert from "react-bootstrap-sweetalert";
import "./Dashboard.scss";

export default class Dashboard extends React.Component {
  state = {
    habits: [],
    diaryText: "",
    diaryId: null,
    alert: null
  };

  componentDidMount() {
    this.performDataFetch();
  }

  performDataFetch() {
    const id = localStorage.getItem("userId");
    makeGetRequest(`habit`).then(response => {
      let habits;
      let stateHabits = [];
      if (response && response.length !== 0) {
        habits = response.filter(
          habit => parseInt(habit.user_id) === parseInt(id)
        );
        makeGetRequest(`record`).then(recordResponse => {
          if (recordResponse && recordResponse.length !== 0) {
            habits.forEach(habit => {
              let habitObj = {
                title: habit.name,
                checkMarks: [],
                id: habit.id
              };
              let habitRecords = recordResponse.filter(
                item => item.habit_id === habit.id
              );
              habitRecords.forEach(rec => {
                let now = moment();
                let input = moment(rec.date);
                if (now.isoWeek() === input.isoWeek()) {
                  habitObj.checkMarks.push({
                    day: input.isoWeekday() - 1,
                    checked: rec.check_mark,
                    id: rec.id
                  });
                }
              });
              stateHabits.push(habitObj);
            });
          } else {
            habits.forEach(habit => {
              let checkmarks = [];
              for (let i = 0; i <= 6; i++) {
                checkmarks.push({
                  checked: false,
                  habit_id: habit.id,
                  day: i
                });
              }
              stateHabits.push({
                title: habit.name,
                checkMarks: checkmarks,
                id: habit.id
              });
            });
          }
          stateHabits.forEach(habit => {
            let fullDays = [];
            habit.checkMarks.forEach(check => fullDays.push(check.day));
            for (let i = 0; i <= 6; i++) {
              if (!fullDays.includes(i))
                habit.checkMarks.push({
                  day: i,
                  checked: false
                });
            }
          });
          //Fetch diary
          makeGetRequest(`diary`).then(diaries => {
            let diaryRecord = "";
            let diaryId = null;
            if (diaries && diaries.length !== 0) {
              diaries.forEach(diary => {
                let now = moment();
                let input = moment(diary.day);
                let isCurrDate = now.isoWeekday() === input.isoWeekday();
                if (parseInt(diary.user_id) === parseInt(id) && isCurrDate) {
                  diaryRecord = diary.text;
                  diaryId = diary.id;
                }
              });
            }
            this.setState({
              habits: stateHabits,
              diaryText: diaryRecord,
              diaryId: diaryId
            });
          });
        });
      }
    });
  }

  onCheckboxChange(obj) {
    this.setState(state => {
      state.habits.forEach(habit => {
        if (habit.id === obj.habit_id)
          habit.checkMarks.forEach(checkmark => {
            if (checkmark.day === obj.day)
              checkmark.checked = !checkmark.checked;
          });
      });
      return { ...state };
    });
    if (obj.id) {
      makePutRequest(`record/${obj.id}`, { check_mark: !obj.checked });
    } else {
      let day = moment()
        .day(1)
        .add(obj.day, "d")
        .day()
        .toString();
      day = parseInt(day);
      if (day === 0) day = 7;
      day = moment()
        .day(day)
        .format("D");
      if (day.length < 2) day = `0${day}`;
      let date = `${new moment().year()}-${new moment().month() +
        1}-${day} 01:00:00`;
      makePostRequest(`record`, {
        user_id: localStorage.getItem("userId"),
        check_mark: true,
        habit_id: obj.habit_id,
        date
      });
    }
  }

  createScheduleRow(initialItem, header = false) {
    const schedule = [<p>{header ? initialItem : initialItem.title}</p>];
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    for (let index = 0; index <= 6; index++) {
      if (header) {
        schedule.push(<p key={index}>{days[index]}</p>);
      } else {
        initialItem.checkMarks.forEach(check => {
          if (check.day === index && schedule.length <= 7) {
            schedule.push(
              <p>
                <input
                  id={"checkbox-" + initialItem.id + "-" + index}
                  type="checkbox"
                  checked={check.checked}
                  onChange={this.onCheckboxChange.bind(this, {
                    checked: check.checked,
                    id: check.id,
                    habit_id: initialItem.id,
                    day: index
                  })}
                  className="form-check-input"
                />
              </p>
            );
          }
        });
      }
    }
    return schedule;
  }

  getCurrentMonth() {
    const date = new Date();
    const day = date.getDay() + 1;
    const month = date.toLocaleString("default", { month: "long" });
    return `${month}, ${day}`;
  }

  onDiaryChange(e) {
    this.setState({ diaryText: e });
  }

  onDiarySave() {
    const getAlert = () => (
      <SweetAlert
        success
        title="Diary record has been saved!"
        onConfirm={() => {
          this.setState({ alert: null });
        }}
      />
    );
    if (this.state.diaryId) {
      makePutRequest(`diary/${this.state.diaryId}`, {
        text: this.state.diaryText
      });
    } else {
      makePostRequest(`diary`, {
        name: "Diary",
        day: moment(),
        text: this.state.diaryText,
        user_id: localStorage.getItem("userId")
      });
    }
    this.setState({ alert: getAlert() });
    this.performDataFetch();
  }

  render() {
    return (
      <>
        <div className="dashboard">
          <h3 className="dashboard__title">This week's progress</h3>
          <hr />
          <h5>{this.getCurrentMonth()}</h5>
          <div className="dashboard__scheduler">
            <div className="schedule-row row--header">
              {this.createScheduleRow("Day", true)}
            </div>
            {this.state.habits.map((habit, index) => (
              <div key={index} className="schedule-row">
                {this.createScheduleRow(habit)}
              </div>
            ))}
            <div className="dashboard__diary">
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Today's diary</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="3"
                  value={this.state.diaryText}
                  placeholder="Record how your day went here"
                  onChange={e => this.onDiaryChange(e.target.value)}
                />
              </Form.Group>
              <Button
                onClick={() => this.onDiarySave()}
                variant="info"
                block
                className="dashboard__diary__button"
              >
                Save diary record
              </Button>
            </div>
          </div>
        </div>
        {this.state.alert}
      </>
    );
  }
}