import React, { Component } from "react";
import NavBar from "../components/common/NavBar";
import Footer from "../components/common/Footer";
import "./App.scss";
class App extends Component {
  render() {
    return (
      <>
        <div className="container">
          <div className="content-wrap">
            <NavBar />
            {this.props.children}
          </div>
          <Footer />
        </div>
      </>
    );
  }
}

export default App;
