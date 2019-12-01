import React from "react";
import { Alert, Button } from "react-bootstrap";

function SingleAuctionLine(props) {
  let disable = !props.isWinner || props.status === "Done" ? true : false;
  let accepted = props.isWinner && props.status === "Done" ? true : false;
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.house}</td>
      <td>{props.sum}</td>
      <td>
        {accepted ? (
          <Alert variant="info">CONFIRMED</Alert>
        ) : props.isWinner ? (
          <Alert variant="success">SUCCESS</Alert>
        ) : (
          <Alert variant="danger">FAILURE</Alert>
        )}
      </td>
      <td>
        <Button
          disabled={disable}
          variant="success"
          onClick={() => props.accept(props.index)}
        >
          Accept
        </Button>
      </td>
    </tr>
  );
}

export default SingleAuctionLine;
