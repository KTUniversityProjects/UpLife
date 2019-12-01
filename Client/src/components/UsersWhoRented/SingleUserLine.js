import React from "react";
import { Button } from "react-bootstrap";
import ReviewModal from "../common/ReviewModal";

function SingleUserLine(props) {
  return (
    <tr>
      <td>
        {props.name} {props.surname}
      </td>
      <td>{props.house}</td>
      <td>{props.address}</td>
      <td>
        <Button variant="danger" onClick={() => props.delete(props.index)}>
          Delete
        </Button>
        <ReviewModal id={props.userID} wrResponse={props.wrResponse} />
      </td>
    </tr>
  );
}

export default SingleUserLine;
