import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar } from "react-bootstrap";
import Router from "./router";
import Search from "./search";

import "./css/main.css";
import "./css/map.css";

const navbarStyle = {
  margin: "0 auto"
};
const navLinkStyle = {
  margin: 5
};

ReactDOM.render(
  <div>
    <HashRouter>
      <Navbar bg="light" variant="light">
        <Navbar.Brand href="/" style={navbarStyle}>
          <img
            alt=""
            src="/logo.svg"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          마스크 어때?
        </Navbar.Brand>
        <NavLink style={navLinkStyle} to="/map_p">
          map_p
        </NavLink>
        <NavLink style={navLinkStyle} to="/store">
          store
        </NavLink>
        <NavLink style={navLinkStyle} to="/register">
          register
        </NavLink>
        <NavLink style={navLinkStyle} to="/login">
          login
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
        <NavLink style={navLinkStyle} to="/search">
          search
        </NavLink>
        <NavLink style={navLinkStyle} to="/storeInfoUpdate">
          storeInfoUpdate
        </NavLink>
        <NavLink style={navLinkStyle} to="/storeInfo">
          storeInfo
        </NavLink>
      </Navbar>
      <Router />
    </HashRouter>
    <div id="buyMask">오늘 마스크 구입 끝자리 0, 5</div>
    <div id="mainSearch">
      <Search />
    </div>
  </div>,
  document.getElementById("container")
);
