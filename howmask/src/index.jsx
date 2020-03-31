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
        <NavLink style={navLinkStyle} to="/map_p">
          map_p
        </NavLink>
        <NavLink style={navLinkStyle} to="/store">
          store
        </NavLink>
        <NavLink style={navLinkStyle} to="/register">
          register
        </NavLink>
        <NavLink style={navLinkStyle} to="/register/seller">
          register_seller
        </NavLink>
        <NavLink style={navLinkStyle} to="/modify">
          modify
        </NavLink>
        <NavLink style={navLinkStyle} to="/checkPw">
          checkPw
        </NavLink>
        <NavLink style={navLinkStyle} to="/birth">
          birth
        </NavLink>
        <NavLink style={navLinkStyle} to="/location">
          location
        </NavLink>
        <NavLink style={navLinkStyle} to="/map">
          map
        </NavLink>
        <NavLink style={navLinkStyle} to="/marker">
          marker
        </NavLink>
        <NavLink style={navLinkStyle} to="/storeInfoUpdate">
          storeInfoUpdate
        </NavLink>
        <NavLink style={navLinkStyle} to="/storeInfo">
          storeInfo
        </NavLink>
      </Navbar>
      <Router />
    </HashRouter>,
  document.getElementById("container")
);
