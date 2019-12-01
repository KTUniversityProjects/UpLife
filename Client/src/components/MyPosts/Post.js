import React from "react";
import Picture from "../common/DisplayImage";

function Post(props) {
  return (
    <tr>
      <th>
        <Picture imgPaths={props.imgPaths} />
      </th>
      <th>{props.house}</th>
      <th>{props.address}</th>
    </tr>
  );
}

export default Post;
