import React from "react";
import { makePostRequest } from "../../App/request";
import validateInput from "../../App/Validations/signup";
import TextFieldGroup from "../common/TextFieldGroup";
import { Form, Button } from "react-bootstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import { browserHistory } from "react-router";

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      password2: "",
      firstName: "",
      lastName: "",
      about: "",
      errors: {},
      isLoading: false,
      alert: null,
      date: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.showAlert = this.redirectAlert.bind(this);
  }

  onChange(e) {
    console.log(e.target.value);
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      makePostRequest("user/add", {
        userName: this.state.username,
        email: this.state.email,
        password: this.state.password,
        password2: this.state.password2,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        about: this.state.about,
        birthdate: this.state.date
      }).then(
        res => {
          console.log(res);
          this.redirectAlert();
        },
        ({ data }) =>
          this.setState({ errors: data.status.errors, isLoading: false })
      );
    } else {
      this.setState({
        errors: { password2: "Passwords must match" },
        isLoading: false
      });
    }
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  redirectAlert() {
    const getAlert = () => (
      <SweetAlert
        success
        title="Signed up successfuly!"
        onConfirm={() => browserHistory.push("/login")}
      >
        You can log in now.
      </SweetAlert>
    );
    this.setState({
      alert: getAlert()
    });
  }

  render() {
    const { errors } = this.state;
    return (
      <Form onSubmit={this.onSubmit}>
        <h1>Sign up</h1>
        <TextFieldGroup
          error={errors.username}
          label="Username"
          onChange={this.onChange}
          value={this.state.username}
          field="username"
        />
        <TextFieldGroup
          error={errors.email}
          label="Email"
          onChange={this.onChange}
          value={this.state.email}
          field="email"
          type="Email"
        />
        <TextFieldGroup
          error={errors.password}
          label="Password"
          onChange={this.onChange}
          value={this.state.password}
          field="password"
          type="password"
        />
        <TextFieldGroup
          error={errors.password2}
          label="Confirm password"
          onChange={this.onChange}
          value={this.state.password2}
          field="password2"
          type="password"
        />
        <TextFieldGroup
          error={errors.firstName}
          label="First name"
          onChange={this.onChange}
          value={this.state.firstName}
          field="firstName"
        />
        <TextFieldGroup
          error={errors.lastName}
          label="Last name"
          onChange={this.onChange}
          value={this.state.lastName}
          field="lastName"
        />
        <TextFieldGroup
          error={errors.about}
          label="About"
          onChange={this.onChange}
          value={this.state.about}
          field="about"
        />
        <TextFieldGroup
          error={errors.date}
          label="Date"
          onChange={this.onChange}
          value={this.state.date}
          field="date"
          type="date"
        />
        <Button disabled={this.state.isLoading} variant="dark" type="submit">
          Sign up
        </Button>
        {this.state.alert}
      </Form>
    );
  }
}

export default SignupForm;
