import React from "react";
import { Button } from "react-bootstrap";
import DateCountdown from "react-date-countdown-timer";

function SingleActiveAuctionLine(props) {
  console.log(props);
  let bidStarted = props.bidStarted !== "Started" ? true : false;
  console.log(props);
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.house}</td>
      <td>{props.sum}</td>
      <td>
        <DateCountdown dateTo={props.startDate} />
      </td>
      <td>
        <Button
          disabled={bidStarted}
          variant="success"
          onClick={() => props.participate(props.index, props.startDate)}
        >
          Participate
        </Button>
      </td>
    </tr>
  );
}

export default SingleActiveAuctionLine;
