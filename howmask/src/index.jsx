import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/common.css";
import { Navbar } from "react-bootstrap";
import Router from "./router";
import LoginBtn from "./login_btn";

import "./css/main.css";

const navbarStyle = {
  margin: "0 auto",
};
const navLinkStyle = {
  margin: 5,
};

ReactDOM.render(
  <React.StrictMode>
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
        <div id="memberMenu">
          {sessionStorage.getItem("type") === "1" ? (
            <NavLink style={navLinkStyle} to="/store">
              store
            </NavLink>
          ) : (
            <></>
          )}
          {sessionStorage.getItem("login") ? (
            <NavLink style={navLinkStyle} to="/modify">
              회원정보 수정
            </NavLink>
          ) : (
            <></>
          )}
          
          <LoginBtn />
        </div>
      </Navbar>
      <Router />
    </HashRouter>{" "}
    <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?libraries=services&appkey=%REACT_APP_KAKAO_MAP_KEY%"></script>
  </React.StrictMode>,
  document.getElementById("container")
);
