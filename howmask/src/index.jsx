import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/common.css";
import { Navbar } from "react-bootstrap";
import Router from "./router";
import LoginBtn from "./login_btn";


import "./css/main.css";
import "./css/map.css";

const navbarStyle = {
  margin: "0 auto"
};
const navLinkStyle = {
  margin: 5
};

ReactDOM.render(
    <HashRouter>
      <Navbar bg="light" variant="light">
        <Navbar.Brand href="/" style={navbarStyle}>
          <img
            alt=""
            src="/white_mask.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
          <span>마스크 어때?</span>
        </Navbar.Brand>
        <LoginBtn />
        
      </Navbar>
      <Router />
    </HashRouter>,
  document.getElementById("container")
);
