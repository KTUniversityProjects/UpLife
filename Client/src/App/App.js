import React from "react";
import NavBar from "../containers/NavBar/NavBar";
import Footer from "../containers/Footer/Footer";
import "./App.scss";

export default props => {
  return (
    <>
      <div className="container">
        <div className="content-wrap">
          <NavBar />
          {props.children}
        </div>
        <Footer />
      </div>
    </>
  );
};
