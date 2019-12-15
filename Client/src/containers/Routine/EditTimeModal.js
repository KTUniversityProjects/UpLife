import React from "react";
import { Form, Modal, Button } from "react-bootstrap";
import TextFieldGroup from "../common/TextFieldGroup";
import Moment from "moment";
import SweetAlert from "react-bootstrap-sweetalert";
import "./EditTimeModal.scss";
import { makePutRequest, makeDeleteRequest } from "../../utils/request";

export default class EditTimeModal extends React.Component {
  state = {
    start: this.props.start,
    end: this.props.end,
    id: this.props.id,
    name: this.props.name,
    habits: this.props.habits,
    habit_id: this.props.habit_id,
    show: false,
    alert: null
  };

  handleClose = () => {
    this.setState({
      name: "",
      start: "",
      end: "",
      id: "",
      show: false,
      alert: null
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

  handleSubmit = () => {
    const getAlert = () => (
      <SweetAlert
        success
        title="Updated!"
        onConfirm={() => {
          this.setState({ alert: null });
        }}
      />
    );
    makePutRequest(`habitTime/${this.state.id}`, {
      habit_id: this.state.habit_id,
      starttime: this.convertTime(this.state.start),
      endtime: this.convertTime(this.state.end)
    }).then(() => {
      this.setState({
        alert: getAlert(),
        show: false
      });
      this.props.refresh();
    });
  };

  handleDelete = () => {
    const success = () => (
      <SweetAlert
        success
        title="Deleted!"
        onConfirm={() => {
          this.setState({ alert: null, show: false });
        }}
      />
    );
    const getAlert = () => (
      <SweetAlert
        warning
        title="You sure you want to delete?"
        onConfirm={() => {
          makeDeleteRequest(`habitTime/${this.state.id}`).then(() => {
            this.setState({
              alert: success()
            });
            this.props.refresh();
          });
        }}
      />
    );
    this.setState({ alert: getAlert() });
  };

  handleShow = () => {
    this.setState({ show: true });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <>
        <Button block variant="success" onClick={this.handleShow}>
          Edit
        </Button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit</Modal.Title>
          </Modal.Header>
          <Form>
            <TextFieldGroup
              label="Start time"
              onChange={this.onChange}
              value={this.state.start}
              field="start"
              type="number"
            />
            <hr></hr>
            <TextFieldGroup
              label="End time"
              onChange={this.onChange}
              value={this.state.end}
              field="end"
              type="number"
            />
            <hr></hr>
            <Form.Label>Select habit</Form.Label>
            <Form.Control
              as="select"
              onChange={e => this.onChange(e)}
              name="habit_id"
              value={this.state.habit_id}
            >
              {this.state.habits.map(item => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </Form.Control>
          </Form>
          <Modal.Footer>
            <Button
              className="button"
              block
              variant="danger"
              onClick={this.handleDelete}
            >
              Delete habit
            </Button>
            <Button
              className="button"
              block
              variant="success"
              onClick={this.handleSubmit}
            >
              Save edit
            </Button>
          </Modal.Footer>
        </Modal>
        {this.state.alert}
      </>
    );
  }
}
