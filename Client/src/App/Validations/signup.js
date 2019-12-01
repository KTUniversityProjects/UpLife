import Validator from "validator";
import isEmpty from "lodash/isEmpty";

export default function validateInput(data) {
  let errors = {};
  if (Validator.isEmpty(data.username)) {
    errors.username = "This field is required";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "This field is required";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "This field is required";
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "This field is required";
  }
  if (data.password2 !== data.password) {
    errors.password2 = "Passwords do not match";
  }
  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = "This field is required";
  }
  if (Validator.isEmpty(data.lastName)) {
    errors.lastName = "This field is required";
  }
  if (Validator.isEmpty(data.about)) {
    errors.about = "This field is required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
}
