import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";

axios.defaults.withCredentials = true;
const url = "localhost";
const headers = { withCredentials: true };

const LoginBtn = () => {
  const navLinkStyle = {
    margin: 5
  };

  const memberLogout = () => {
    axios
      .get(`http://${url}:8080/user/logout`, { headers })
      .then(returnData => {
        if (returnData.data.message) {
          alert(returnData.data.message);
          sessionStorage.removeItem("login");
          window.location.href = "/";
        }
      });
  };

  let btn;

  if (!sessionStorage.getItem("login")) {
    btn = (
      <NavLink style={navLinkStyle} to="/login">
        login
      </NavLink>
    );
  } else if(sessionStorage.getItem("login")==="hamletshu") {
    btn = (
      <>
      <Button style={navLinkStyle} onClick={memberLogout}>
        logout
      </Button>
      <NavLink style={navLinkStyle} to="/admin">
      가입된 회원정보 보기
    </NavLink>
      </>
    );

   }else{
    btn = (
      <Button style={navLinkStyle} onClick={memberLogout}>
        logout
      </Button>
    );
    }
  

  return <div>{btn}</div>;
};

export default LoginBtn;
