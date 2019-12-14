import React from "react";
import PropTypes from "prop-types";
import { Form, Alert } from "react-bootstrap";

const TextFieldGroup = ({ field, value, label, error, type, onChange }) => {
  return (
    <div>
      <Form.Group>
        <Form.Label>{label}</Form.Label>
        <Form.Control
          type={type}
          name={field}
          placeholder={label}
          value={value}
          onChange={onChange}
        />
        {error && <Alert variant="danger">{error}</Alert>}
      </Form.Group>
    </div>
  );
};

TextFieldGroup.propTypes = {
  field: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

TextFieldGroup.defaultProps = {
  type: "text"
};

export default TextFieldGroup;
