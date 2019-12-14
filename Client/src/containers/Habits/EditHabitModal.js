import React from "react";
import { Form, Modal, Button } from "react-bootstrap";
import TextFieldGroup from "../common/TextFieldGroup";
import SweetAlert from "react-bootstrap-sweetalert";
import "./EditHabitModal.scss";
import { makePutRequest, makeDeleteRequest } from "../../utils/request";

export default class EditHabitModal extends React.Component {
  state = {
    name: this.props.name,
    desc: this.props.desc,
    id: this.props.id,
    show: false,
    alert: null
  };

  handleClose = () => {
    this.setState({
      name: "",
      desc: "",
      id: "",
      show: false,
      alert: null
    });
  };

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
    makePutRequest(`habit/${this.state.id}`, {
      name: this.state.name,
      description: this.state.desc
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
        warning
        title="You sure you want to delete?"
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
          makeDeleteRequest(`habit/${this.state.id}`).then(() => {
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
              label="Name"
              onChange={this.onChange}
              value={this.state.name}
              field="name"
              type="text"
            />
            <hr></hr>
            <TextFieldGroup
              label="Description"
              onChange={this.onChange}
              value={this.state.desc}
              field="desc"
              type="text"
            />
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
