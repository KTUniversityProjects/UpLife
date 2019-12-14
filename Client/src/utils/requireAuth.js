import React from "react";
import { browserHistory } from "react-router";

export default function(ComposedComponent) {
  class Authenticate extends React.Component {
    componentWillMount() {
      if (!localStorage.getItem("token")) browserHistory.push("/login");
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  return Authenticate;
}
